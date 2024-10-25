package br.com.faculdade.api.service;

import br.com.faculdade.api.model.Fornecedores;

import java.util.List;

/**
 *
 */
public interface FornecedoresService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link Fornecedores}
     */
    Fornecedores findById(Integer id);

    /**
     * findAll
     *
     * @return {@link Fornecedores}
     */
    List<Fornecedores> findAll();

    /**
     * insert
     *
     * @param fornecedores Fornecedores
     */
    void insert(Fornecedores fornecedores);

    /**
     * update
     *
     * @param fornecedores Fornecedores
     */
    void update(Fornecedores fornecedores);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
