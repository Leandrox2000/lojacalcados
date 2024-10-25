package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.Usuarios;
import br.com.faculdade.api.service.UsuariosService;
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
@RequestMapping("/usuarios")
@Api(tags = "")
public class UsuariosController {

    private final Logger logger = LoggerFactory.getLogger(UsuariosController.class);
    @Autowired
    private UsuariosService usuariosService;

    @GetMapping("/{id}")
    @ApiOperation("findById")
    public Usuarios findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return usuariosService.findById(id);
    }

    @GetMapping
    @ApiOperation("findAll")
    public ResponseEntity<Object> findAll() {
        List<Usuarios> retorno;
        try {
            retorno = usuariosService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("insert")
    public void insert(@RequestBody Usuarios usuario) {
        usuariosService.insert(usuario);
    }

    @PutMapping
    @ApiOperation("update")
    public void update(@RequestBody Usuarios usuario) {
        usuariosService.update(usuario);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deleteById")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        usuariosService.deleteById(id);
    }
}
