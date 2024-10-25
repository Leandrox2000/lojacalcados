package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.PosTransacoes;
import br.com.faculdade.api.repository.PosTransacoesRepository;
import br.com.faculdade.api.service.PosTransacoesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PosTransacoesServiceImpl implements PosTransacoesService {

    @Autowired
    private PosTransacoesRepository posTransacoesRepository;

    @Override
    public PosTransacoes findById(Integer id) {
        return posTransacoesRepository.findById(id).orElse(null);
    }

    @Override
    public List<PosTransacoes> findAll() {
        return (List<PosTransacoes>) posTransacoesRepository.findAll();
    }

    @Override
    public void insert(PosTransacoes posTransacoes) {
        posTransacoesRepository.save(posTransacoes);
    }

    @Override
    public void update(PosTransacoes posTransacoes) {
        posTransacoesRepository.save(posTransacoes);
    }

    @Override
    public void deleteById(Integer id) {
        posTransacoesRepository.deleteById(id);
    }

}
