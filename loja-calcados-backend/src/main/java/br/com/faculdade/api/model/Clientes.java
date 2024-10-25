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
@Table(name = "clientes", schema = "PROJETO")
public class Clientes implements Serializable {
    /**
     *
     */
    @Id
    @Column(name = "id_cliente")
    private Integer idCliente;
    /**
     *
     */
    @Column(name = "nome", nullable = false, length = 100)
    private String nome;
    /**
     *
     */
    @Column(name = "endereco")
    private String endereco;
    /**
     *
     */
    @Column(name = "telefone", length = 20)
    private String telefone;
    /**
     *
     */
    @Column(name = "email", length = 100)
    private String email;
    /**
     *
     */
    @Temporal(TemporalType.DATE)
    @Column(name = "data_cadastro", nullable = false)
    private Date dataCadastro;

    @PrePersist
    protected void onCreate() {
        this.dataCadastro = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Clientes clientes = (Clientes) o;
        return idCliente.equals(clientes.idCliente);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCliente);
    }
}