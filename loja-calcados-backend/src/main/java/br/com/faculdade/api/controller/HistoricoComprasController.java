package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.HistoricoCompras;
import br.com.faculdade.api.service.HistoricoComprasService;
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
@RequestMapping("/historicoCompras")
@Api(tags = "")
public class HistoricoComprasController {
    private final Logger logger = LoggerFactory.getLogger(HistoricoComprasController.class);
    @Autowired
    private HistoricoComprasService historicoComprasService;

    @GetMapping("/{id}")
    @ApiOperation("buscar")
    public HistoricoCompras findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return historicoComprasService.findById(id);
    }

    @GetMapping("/listar")
    @ApiOperation("listar")
    public ResponseEntity<Object> findAll() {
        List<HistoricoCompras> retorno;
        try {
            retorno = historicoComprasService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("inserir")
    public void insert(@RequestBody HistoricoCompras historicoCompras) {
        historicoComprasService.insert(historicoCompras);
    }

    @PutMapping
    @ApiOperation("atualizar")
    public void update(@RequestBody HistoricoCompras historicoCompras) {
        historicoComprasService.update(historicoCompras);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deletar")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        historicoComprasService.deleteById(id);
    }
}
