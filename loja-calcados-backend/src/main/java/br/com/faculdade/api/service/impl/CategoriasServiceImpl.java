package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.Categorias;
import br.com.faculdade.api.repository.CategoriasRepository;
import br.com.faculdade.api.service.CategoriasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriasServiceImpl implements CategoriasService {

    @Autowired
    private CategoriasRepository categoriasRepository;

    @Override
    public Categorias findById(Integer id) {
        return categoriasRepository.findById(id).orElse(null);
    }

    @Override
    public List<Categorias> findAll() {
        return (List<Categorias>) categoriasRepository.findAll();
    }

    @Override
    public void insert(Categorias categorias) {
        categoriasRepository.save(categorias);
    }

    @Override
    public void update(Categorias categorias) {
        categoriasRepository.save(categorias);
    }

    @Override
    public void deleteById(Integer id) {
        categoriasRepository.deleteById(id);
    }

}
