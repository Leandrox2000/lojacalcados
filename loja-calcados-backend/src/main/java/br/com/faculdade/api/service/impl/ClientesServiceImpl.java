package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.Clientes;
import br.com.faculdade.api.repository.ClientesRepository;
import br.com.faculdade.api.service.ClientesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientesServiceImpl implements ClientesService {

    @Autowired
    private ClientesRepository clientesRepository;

    @Override
    public Clientes findById(Integer id) {
        return clientesRepository.findById(id).orElse(null);
    }

    @Override
    public List<Clientes> findAll() {
        return (List<Clientes>) clientesRepository.findAll();
    }

    @Override
    public void insert(Clientes clientes) {
        clientesRepository.save(clientes);
    }

    @Override
    public void update(Clientes clientes) {
        clientesRepository.save(clientes);
    }

    @Override
    public void deleteById(Integer id) {
        clientesRepository.deleteById(id);
    }

}
