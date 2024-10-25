package br.com.faculdade.api.service;

import br.com.faculdade.api.model.Categorias;

import java.util.List;

/**
 *
 */
public interface CategoriasService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link Categorias}
     */
    Categorias findById(Integer id);

    /**
     * findAll
     *
     * @return {@link Categorias}
     */
    List<Categorias> findAll();

    /**
     * insert
     *
     * @param categorias Categorias
     */
    void insert(Categorias categorias);

    /**
     * update
     *
     * @param categorias Categorias
     */
    void update(Categorias categorias);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
