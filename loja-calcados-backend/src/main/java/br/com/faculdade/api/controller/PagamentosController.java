package br.com.faculdade.api.controller;

import br.com.faculdade.api.model.Pagamentos;
import br.com.faculdade.api.service.PagamentosService;
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
@RequestMapping("/pagamentos")
@Api(tags = "")
public class PagamentosController {
    private final Logger logger = LoggerFactory.getLogger(PagamentosController.class);
    @Autowired
    private PagamentosService pagamentosService;

    @GetMapping("/{id}")
    @ApiOperation("findById")
    public Pagamentos findById(@ApiParam("ID") @PathVariable("id") Integer id) {
        return pagamentosService.findById(id);
    }

    @GetMapping
    @ApiOperation("findAll")
    public ResponseEntity<Object> findAll() {
        List<Pagamentos> retorno;
        try {
            retorno = pagamentosService.findAll();
        } catch (Exception exc) {
            logger.error(exc.getMessage(), exc);
            return ResponseEntity.badRequest().body(exc.getMessage());
        }
        return ResponseEntity.ok().body(retorno);
    }

    @PostMapping
    @ApiOperation("insert")
    public void insert(@RequestBody Pagamentos pagamentos) {
        pagamentosService.insert(pagamentos);
    }

    @PutMapping
    @ApiOperation("update")
    public void update(@RequestBody Pagamentos pagamentos) {
        pagamentosService.update(pagamentos);
    }

    @DeleteMapping("/{id}")
    @ApiOperation("deleteById")
    public void deleteById(@ApiParam("ID") @PathVariable("id") Integer id) {
        pagamentosService.deleteById(id);
    }
}
