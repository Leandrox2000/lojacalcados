package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.Pedidos;
import br.com.faculdade.api.service.PedidosService;
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
@RequestMapping("/pedidos")
@Api(tags = "")
public class PedidosController {
    private final Logger logger = LoggerFactory.getLogger(PedidosController.class);
    @Autowired
    private PedidosService pedidosService;

    @GetMapping("/{id}")
    @ApiOperation("findById")
    public Pedidos findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return pedidosService.findById(id);
    }

    @GetMapping
    @ApiOperation("findAll")
    public ResponseEntity<Object> findAll() {
        List<Pedidos> retorno;
        try {
            retorno = pedidosService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("insert")
    public void insert(@RequestBody Pedidos pedidos) {
        pedidosService.insert(pedidos);
    }

    @PutMapping
    @ApiOperation("update")
    public void update(@RequestBody Pedidos pedidos) {
        pedidosService.update(pedidos);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deleteById")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        pedidosService.deleteById(id);
    }
}
