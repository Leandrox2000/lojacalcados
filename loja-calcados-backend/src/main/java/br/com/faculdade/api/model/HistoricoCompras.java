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
@Table(name = "historico_compras", schema = "PROJETO")
public class HistoricoCompras implements Serializable {
    /**
    * 
    */
    @Id
    @Column(name = "id_historico")    
    private Integer idHistorico;
    /**
    * 
    */
    @Column(name = "id_cliente")    
    private Integer idCliente;
    /**
    * 
    */
    @Column(name = "id_pedido")    
    private Integer idPedido;
    /**
    * 
    */
    @Temporal(TemporalType.DATE)
    @Column(name = "data_compra")    
    private Date dataCompra;
    /**
    * 
    */
    @Column(name = "total")    
    private BigDecimal total;

    @PrePersist
    protected void onCreate() {
        this.dataCompra = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HistoricoCompras that = (HistoricoCompras) o;
        return idHistorico.equals(that.idHistorico);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idHistorico);
    }
}