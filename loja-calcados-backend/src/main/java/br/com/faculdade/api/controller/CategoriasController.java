package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.Categorias;
import br.com.faculdade.api.service.CategoriasService;
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
@RequestMapping("/categorias")
@Api(tags = "")
public class CategoriasController {
    private final Logger logger = LoggerFactory.getLogger(CategoriasController.class);
    @Autowired
    private CategoriasService categoriasService;

    @GetMapping("/{id}")
    @ApiOperation("buscar")
    public Categorias findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return categoriasService.findById(id);
    }

    @GetMapping("/listar")
    @ApiOperation("listar")
    public ResponseEntity<Object> findAll() {
        List<Categorias> retorno;
        try {
            retorno = categoriasService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("inserir")
    public void insert(@RequestBody Categorias categorias) {
        categoriasService.insert(categorias);
    }

    @PutMapping
    @ApiOperation("atualizar")
    public void update(@RequestBody Categorias categorias) {
        categoriasService.update(categorias);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deletar")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        categoriasService.deleteById(id);
    }
}
