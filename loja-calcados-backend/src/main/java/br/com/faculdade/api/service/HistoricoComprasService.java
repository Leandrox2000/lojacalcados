package br.com.faculdade.api.service;

import br.com.faculdade.api.model.HistoricoCompras;

import java.util.List;

/**
 *
 */
public interface HistoricoComprasService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link HistoricoCompras}
     */
    HistoricoCompras findById(Integer id);

    /**
     * findAll
     *
     * @return {@link HistoricoCompras}
     */
    List<HistoricoCompras> findAll();

    /**
     * insert
     *
     * @param historicoCompras HistoricoCompras
     */
    void insert(HistoricoCompras historicoCompras);

    /**
     * update
     *
     * @param historicoCompras HistoricoCompras
     */
    void update(HistoricoCompras historicoCompras);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
