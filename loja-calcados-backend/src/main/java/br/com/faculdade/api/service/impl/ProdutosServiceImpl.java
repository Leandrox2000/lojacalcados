package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.Produtos;
import br.com.faculdade.api.repository.ProdutosRepository;
import br.com.faculdade.api.service.ProdutosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutosServiceImpl implements ProdutosService {

    @Autowired
    private ProdutosRepository produtosRepository;

    @Override
    public Produtos findById(Integer id) {
        return produtosRepository.findById(id).orElse(null);
    }

    @Override
    public List<Produtos> findAll() {
        return (List<Produtos>) produtosRepository.findAll();
    }

    @Override
    public void insert(Produtos produtos) {
        produtosRepository.save(produtos);
    }

    @Override
    public void update(Produtos produtos) {
        produtosRepository.save(produtos);
    }

    @Override
    public void deleteById(Integer id) {
        produtosRepository.deleteById(id);
    }

}
