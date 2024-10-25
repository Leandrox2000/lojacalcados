package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.ItensPedido;
import br.com.faculdade.api.repository.ItensPedidoRepository;
import br.com.faculdade.api.service.ItensPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItensPedidoServiceImpl implements ItensPedidoService {

    @Autowired
    private ItensPedidoRepository itensPedidoRepository;

    @Override
    public ItensPedido findById(Integer id) {
        return itensPedidoRepository.findById(id).orElse(null);
    }

    @Override
    public List<ItensPedido> findAll() {
        return (List<ItensPedido>) itensPedidoRepository.findAll();
    }

    @Override
    public void insert(ItensPedido itensPedido) {
        itensPedidoRepository.save(itensPedido);
    }

    @Override
    public void update(ItensPedido itensPedido) {
        itensPedidoRepository.save(itensPedido);
    }

    @Override
    public void deleteById(Integer id) {
        itensPedidoRepository.deleteById(id);
    }

}
