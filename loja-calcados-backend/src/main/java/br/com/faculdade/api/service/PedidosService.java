package br.com.faculdade.api.service;

import br.com.faculdade.api.model.Pedidos;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 
 */
public interface PedidosService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link Pedidos}
     */
     Pedidos findById(Integer id);

    /**
     * findAll
     *
     * @return {@link Pedidos}
     */
     List<Pedidos> findAll();

    /**
     * insert
     *
     * @param pedidos Pedidos
     */
    void insert(Pedidos pedidos);

    /**
     * update
     *
     * @param pedidos Pedidos
     */
    void update(Pedidos pedidos);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
