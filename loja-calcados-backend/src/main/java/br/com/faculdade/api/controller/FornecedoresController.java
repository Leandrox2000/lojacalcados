package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.Fornecedores;
import br.com.faculdade.api.service.FornecedoresService;
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
@RequestMapping("/fornecedores")
@Api(tags = "")
public class FornecedoresController {
    private final Logger logger = LoggerFactory.getLogger(FornecedoresController.class);
    @Autowired
    private FornecedoresService fornecedoresService;

    @GetMapping("/{id}")
    @ApiOperation("buscar")
    public Fornecedores findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return fornecedoresService.findById(id);
    }

    @GetMapping("/listar")
    @ApiOperation("listar")
    public ResponseEntity<Object> findAll() {
        List<Fornecedores> retorno;
        try {
            retorno = fornecedoresService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("inserir")
    public void insert(@RequestBody Fornecedores fornecedores) {
        fornecedoresService.insert(fornecedores);
    }

    @PutMapping
    @ApiOperation("atualizar")
    public void update(@RequestBody Fornecedores fornecedores) {
        fornecedoresService.update(fornecedores);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deletar")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        fornecedoresService.deleteById(id);
    }
}
