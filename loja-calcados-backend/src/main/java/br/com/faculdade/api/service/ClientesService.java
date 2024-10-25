package br.com.faculdade.api.service;

import br.com.faculdade.api.model.Clientes;

import java.util.List;

/**
 *
 */
public interface ClientesService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link Clientes}
     */
    Clientes findById(Integer id);

    /**
     * findAll
     *
     * @return {@link Clientes}
     */
    List<Clientes> findAll();

    /**
     * insert
     *
     * @param clientes Clientes
     */
    void insert(Clientes clientes);

    /**
     * update
     *
     * @param clientes Clientes
     */
    void update(Clientes clientes);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
