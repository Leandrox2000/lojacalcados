package br.com.faculdade.api.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Objects;

/**
 *
 */
@Data
@Entity
@Table(name = "categorias", schema = "PROJETO")
public class Categorias implements Serializable {
    /**
     *
     */
    @Id
    @Column(name = "id_categoria")
    private Integer idCategoria;
    /**
     *
     */
    @Column(name = "nome", nullable = false, length = 100)
    private String nome;
    /**
     *
     */
    @Column(name = "descricao")
    private String descricao;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Categorias that = (Categorias) o;
        return idCategoria.equals(that.idCategoria);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCategoria);
    }
}