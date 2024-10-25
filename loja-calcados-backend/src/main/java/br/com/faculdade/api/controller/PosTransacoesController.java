package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.PosTransacoes;
import br.com.faculdade.api.service.PosTransacoesService;
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
@RequestMapping("/posTransacoes")
@Api(tags = "")
public class PosTransacoesController {
    private final Logger logger = LoggerFactory.getLogger(PosTransacoesController.class);
    @Autowired
    private PosTransacoesService posTransacoesService;

    @GetMapping("/{id}")
    @ApiOperation("findById")
    public PosTransacoes findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return posTransacoesService.findById(id);
    }

    @GetMapping
    @ApiOperation("findAll")
    public ResponseEntity<Object> findAll() {
        List<PosTransacoes> retorno;
        try {
            retorno = posTransacoesService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("insert")
    public void insert(@RequestBody PosTransacoes posTransacoes) {
        posTransacoesService.insert(posTransacoes);
    }

    @PutMapping
    @ApiOperation("update")
    public void update(@RequestBody PosTransacoes posTransacoes) {
        posTransacoesService.update(posTransacoes);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deleteById")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        posTransacoesService.deleteById(id);
    }
}
