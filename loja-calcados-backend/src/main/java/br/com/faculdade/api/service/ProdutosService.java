package br.com.faculdade.api.service;

import br.com.faculdade.api.model.Produtos;

import java.util.List;

/**
 *
 */
public interface ProdutosService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link Produtos}
     */
    Produtos findById(Integer id);

    /**
     * findAll
     *
     * @return {@link Produtos}
     */
    List<Produtos> findAll();

    /**
     * insert
     *
     * @param produtos Produtos
     */
    void insert(Produtos produtos);

    /**
     * update
     *
     * @param produtos Produtos
     */
    void update(Produtos produtos);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
