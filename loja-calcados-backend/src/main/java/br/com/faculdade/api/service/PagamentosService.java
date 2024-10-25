package br.com.faculdade.api.service;

import br.com.faculdade.api.model.Pagamentos;

import java.util.List;

/**
 *
 */
public interface PagamentosService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link Pagamentos}
     */
    Pagamentos findById(Integer id);

    /**
     * findAll
     *
     * @return {@link Pagamentos}
     */
    List<Pagamentos> findAll();

    /**
     * insert
     *
     * @param pagamentos Pagamentos
     */
    void insert(Pagamentos pagamentos);

    /**
     * update
     *
     * @param pagamentos Pagamentos
     */
    void update(Pagamentos pagamentos);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
