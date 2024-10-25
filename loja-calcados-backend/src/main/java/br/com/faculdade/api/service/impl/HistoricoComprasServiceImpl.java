package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.HistoricoCompras;
import br.com.faculdade.api.repository.HistoricoComprasRepository;
import br.com.faculdade.api.service.HistoricoComprasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoricoComprasServiceImpl implements HistoricoComprasService {

    @Autowired
    private HistoricoComprasRepository historicoComprasRepository;

    @Override
    public HistoricoCompras findById(Integer id) {
        return historicoComprasRepository.findById(id).orElse(null);
    }

    @Override
    public List<HistoricoCompras> findAll() {
        return (List<HistoricoCompras>) historicoComprasRepository.findAll();
    }

    @Override
    public void insert(HistoricoCompras historicoCompras) {
        historicoComprasRepository.save(historicoCompras);
    }

    @Override
    public void update(HistoricoCompras historicoCompras) {
        historicoComprasRepository.save(historicoCompras);
    }

    @Override
    public void deleteById(Integer id) {
        historicoComprasRepository.deleteById(id);
    }

}
