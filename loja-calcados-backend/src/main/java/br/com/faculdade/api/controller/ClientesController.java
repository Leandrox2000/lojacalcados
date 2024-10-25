package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.Clientes;
import br.com.faculdade.api.service.ClientesService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 */
@RestController
@RequestMapping("/clientes")
@Api(tags = "")
public class ClientesController {
    private final Logger logger = LoggerFactory.getLogger(ClientesController.class);
    @Autowired
    private ClientesService clientesService;

    @GetMapping("/{id}")
    @ApiOperation("findById")
    public Clientes findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return clientesService.findById(id);
    }

    @GetMapping
    @ApiOperation("findAll")
    public ResponseEntity<Object> findAll() {
        List<Clientes> retorno;
        try {
            retorno = clientesService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("insert")
    public void insert(@RequestBody Clientes clientes) {
        clientesService.insert(clientes);
    }

    @PutMapping
    @ApiOperation("update")
    public void update(@RequestBody Clientes clientes) {
        clientesService.update(clientes);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deleteById")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        clientesService.deleteById(id);
    }
}
