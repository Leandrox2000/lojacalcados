package br.com.faculdade.api.service;

import br.com.faculdade.api.model.PosTransacoes;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * 
 */
public interface PosTransacoesService {

    /**
     * findById
     *
     * @param id ID
     * @return {@link PosTransacoes}
     */
     PosTransacoes findById(Integer id);

    /**
     * findAll
     *
     * @return {@link PosTransacoes}
     */
     List<PosTransacoes> findAll();

    /**
     * insert
     *
     * @param posTransacoes PosTransacoes
     */
    void insert(PosTransacoes posTransacoes);

    /**
     * update
     *
     * @param posTransacoes PosTransacoes
     */
    void update(PosTransacoes posTransacoes);

    /**
     * deleteById
     *
     * @param id ID
     */
    void deleteById(Integer id);

}
