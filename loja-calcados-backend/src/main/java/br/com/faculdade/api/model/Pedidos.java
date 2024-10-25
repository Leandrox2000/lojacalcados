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
@Table(name = "pedidos", schema = "PROJETO")
public class Pedidos implements Serializable {
    /**
     *
     */
    @Id
    @Column(name = "id_pedido")
    private Integer idPedido;
    /**
     *
     */
    @Column(name = "id_cliente")
    private Integer idCliente;
    /**
     *
     */
    @Temporal(TemporalType.DATE)
    @Column(name = "data_pedido")
    private Date dataPedido;
    /**
     *
     */
    @Column(name = "status")
    private String status;
    /**
     *
     */
    @Column(name = "total")
    private BigDecimal total;

    @PrePersist
    protected void onCreate() {
        this.dataPedido = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pedidos pedidos = (Pedidos) o;
        return idPedido.equals(pedidos.idPedido);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPedido);
    }
}