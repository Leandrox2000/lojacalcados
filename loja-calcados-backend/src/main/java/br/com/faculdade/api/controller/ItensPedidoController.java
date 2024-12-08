package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.ItensPedido;
import br.com.faculdade.api.service.ItensPedidoService;
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
@RequestMapping("/itensPedido")
@Api(tags = "")
public class ItensPedidoController {
    private final Logger logger = LoggerFactory.getLogger(ItensPedidoController.class);
    @Autowired
    private ItensPedidoService itensPedidoService;

    @GetMapping("/{id}")
    @ApiOperation("buscar")
    public ItensPedido findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return itensPedidoService.findById(id);
    }

    @GetMapping("/listar")
    @ApiOperation("listar")
    public ResponseEntity<Object> findAll() {
        List<ItensPedido> retorno;
        try {
            retorno = itensPedidoService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("inserir")
    public void insert(@RequestBody ItensPedido itensPedido) {
        itensPedidoService.insert(itensPedido);
    }

    @PutMapping
    @ApiOperation("atualizar")
    public void update(@RequestBody ItensPedido itensPedido) {
        itensPedidoService.update(itensPedido);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deletar")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        itensPedidoService.deleteById(id);
    }
}
