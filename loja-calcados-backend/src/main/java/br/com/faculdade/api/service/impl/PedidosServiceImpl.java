package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.Pedidos;
import br.com.faculdade.api.repository.PedidosRepository;
import br.com.faculdade.api.service.PedidosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidosServiceImpl implements PedidosService {

    @Autowired
    private PedidosRepository pedidosRepository;

    @Override
    public Pedidos findById(Integer id) {
        return pedidosRepository.findById(id).orElse(null);
    }

    @Override
    public List<Pedidos> findAll() {
        return (List<Pedidos>) pedidosRepository.findAll();
    }

    @Override
    public void insert(Pedidos pedidos) {
        pedidosRepository.save(pedidos);
    }

    @Override
    public void update(Pedidos pedidos) {
        pedidosRepository.save(pedidos);
    }

    @Override
    public void deleteById(Integer id) {
        pedidosRepository.deleteById(id);
    }

}
