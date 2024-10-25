package br.com.faculdade.api.service.impl;

import br.com.faculdade.api.model.Usuarios;
import br.com.faculdade.api.repository.UsuariosRepository;
import br.com.faculdade.api.service.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosServiceImpl implements UsuariosService {

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Override
    public Usuarios findById(Integer id) {
        return usuariosRepository.findById(id).orElse(null);
    }

    @Override
    public List<Usuarios> findAll() {
        return (List<Usuarios>) usuariosRepository.findAll();
    }

    @Override
    public void insert(Usuarios usuario) {
        usuariosRepository.save(usuario);
    }

    @Override
    public void update(Usuarios usuario) {
        usuariosRepository.save(usuario);
    }

    @Override
    public void deleteById(Integer id) {
        usuariosRepository.deleteById(id);
    }

}
