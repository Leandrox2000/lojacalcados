package br.com.faculdade.api.service;

import br.com.faculdade.api.model.Usuarios;

import java.util.List;

/**
 *
 */
public interface UsuariosService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link Usuarios}
     */
    Usuarios findById(Integer id);

    /**
     * findAll
     *
     * @return {@link Usuarios}
     */
    List<Usuarios> findAll();

    /**
     * insert
     *
     * @param usuario Usuarios
     */
    void insert(Usuarios usuario);

    /**
     * update
     *
     * @param usuario Usuarios
     */
    void update(Usuarios usuario);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
