package br.com.faculdade.api.model;

import lombok.Data;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

/**
* 
*/
@Data
@Entity
@Table(name = "pos_transacoes", schema = "PROJETO")
public class PosTransacoes implements Serializable {
    /**
    * 
    */
    @Id
    @Column(name = "id_transacao")    
    private Integer idTransacao;
    /**
    * 
    */
    @Column(name = "id_pedido")    
    private Integer idPedido;
    /**
    * 
    */
    @Column(name = "id_usuario")    
    private Integer idUsuario;
    /**
    * 
    */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "data_transacao")    
    private Date dataTransacao;
    /**
    * 
    */
    @Column(name = "total")    
    private BigDecimal total;
    /**
    * 
    */
    @Column(name = "metodo_pagamento", length = 50)
    private String metodoPagamento;
    /**
    * 
    */
    @Column(name = "status_transacao", length = 50)
    private String statusTransacao;

    @PrePersist
    protected void onCreate() {
        this.dataTransacao = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PosTransacoes that = (PosTransacoes) o;
        return idTransacao.equals(that.idTransacao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idTransacao);
    }
}