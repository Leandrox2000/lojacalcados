package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.Pagamentos;
import br.com.faculdade.api.repository.PagamentosRepository;
import br.com.faculdade.api.service.PagamentosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PagamentosServiceImpl implements PagamentosService {

    @Autowired
    private PagamentosRepository pagamentosRepository;

    @Override
    public Pagamentos findById(Integer id) {
        return pagamentosRepository.findById(id).orElse(null);
    }

    @Override
    public List<Pagamentos> findAll() {
        return (List<Pagamentos>) pagamentosRepository.findAll();
    }

    @Override
    public void insert(Pagamentos pagamentos) {
        pagamentosRepository.save(pagamentos);
    }

    @Override
    public void update(Pagamentos pagamentos) {
        pagamentosRepository.save(pagamentos);
    }

    @Override
    public void deleteById(Integer id) {
        pagamentosRepository.deleteById(id);
    }

}
