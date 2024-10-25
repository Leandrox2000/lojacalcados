package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.Fornecedores;
import br.com.faculdade.api.repository.FornecedoresRepository;
import br.com.faculdade.api.service.FornecedoresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FornecedoresServiceImpl implements FornecedoresService {

    @Autowired
    private FornecedoresRepository fornecedoresRepository;

    @Override
    public Fornecedores findById(Integer id) {
        return fornecedoresRepository.findById(id).orElse(null);
    }

    @Override
    public List<Fornecedores> findAll() {
        return (List<Fornecedores>) fornecedoresRepository.findAll();
    }

    @Override
    public void insert(Fornecedores fornecedores) {
        fornecedoresRepository.save(fornecedores);
    }

    @Override
    public void update(Fornecedores fornecedores) {
        fornecedoresRepository.save(fornecedores);
    }

    @Override
    public void deleteById(Integer id) {
        fornecedoresRepository.deleteById(id);
    }

}
