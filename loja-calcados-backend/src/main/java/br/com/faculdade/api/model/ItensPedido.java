package br.com.faculdade.api.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 *
 */
@Data
@Entity
@Table(name = "itens_pedido", schema = "PROJETO")
public class ItensPedido implements Serializable {
    /**
     *
     */
    @Id
    @Column(name = "id_item_pedido")
    private Integer idItemPedido;
    /**
     *
     */
    @Column(name = "id_pedido")
    private Integer idPedido;
    /**
     *
     */
    @Column(name = "id_produto")
    private Integer idProduto;
    /**
     *
     */
    @Column(name = "quantidade")
    private Integer quantidade;
    /**
     *
     */
    @Column(name = "preco_unitario")
    private BigDecimal precoUnitario;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItensPedido that = (ItensPedido) o;
        return idItemPedido.equals(that.idItemPedido);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idItemPedido);
    }
}