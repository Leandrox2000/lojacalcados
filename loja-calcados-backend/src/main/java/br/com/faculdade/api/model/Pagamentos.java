package br.com.faculdade.api.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

/**
 *
 */
@Data
@Entity
@Table(name = "pagamentos", schema = "PROJETO")
public class Pagamentos implements Serializable {
    /**
     *
     */
    @Id
    @Column(name = "id_pagamento")
    private Integer idPagamento;
    /**
     *
     */
    @Column(name = "id_pedido")
    private Integer idPedido;
    /**
     *
     */
    @Temporal(TemporalType.DATE)
    @Column(name = "data_pagamento")
    private Date dataPagamento;
    /**
     *
     */
    @Column(name = "metodo_pagamento", length = 50)
    private String metodoPagamento;
    /**
     *
     */
    @Column(name = "status_pagamento", length = 50)
    private String statusPagamento;

    @PrePersist
    protected void onCreate() {
        this.dataPagamento = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pagamentos that = (Pagamentos) o;
        return idPagamento.equals(that.idPagamento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPagamento);
    }
}