package br.com.faculdade.api.service;

import br.com.faculdade.api.model.ItensPedido;

import java.util.List;

/**
 *
 */
public interface ItensPedidoService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link ItensPedido}
     */
    ItensPedido findById(Integer id);

    /**
     * findAll
     *
     * @return {@link ItensPedido}
     */
    List<ItensPedido> findAll();

    /**
     * insert
     *
     * @param itensPedido ItensPedido
     */
    void insert(ItensPedido itensPedido);

    /**
     * update
     *
     * @param itensPedido ItensPedido
     */
    void update(ItensPedido itensPedido);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
