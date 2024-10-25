package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.Produtos;
import br.com.faculdade.api.service.ProdutosService;
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
@RequestMapping("/produtos")
@Api(tags = "")
public class ProdutosController {
    private final Logger logger = LoggerFactory.getLogger(ProdutosController.class);
    @Autowired
    private ProdutosService produtosService;

    @GetMapping("/{id}")
    @ApiOperation("findById")
    public Produtos findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return produtosService.findById(id);
    }

    @GetMapping
    @ApiOperation("findAll")
    public ResponseEntity<Object> findAll() {
        List<Produtos> retorno;
        try {
            retorno = produtosService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("insert")
    public void insert(@RequestBody Produtos produtos) {
        produtosService.insert(produtos);
    }

    @PutMapping
    @ApiOperation("update")
    public void update(@RequestBody Produtos produtos) {
        produtosService.update(produtos);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deleteById")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        produtosService.deleteById(id);
    }
}
