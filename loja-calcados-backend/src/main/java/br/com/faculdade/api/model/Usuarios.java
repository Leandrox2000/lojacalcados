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
@Table(name = "usuarios", schema = "PROJETO")
public class Usuarios implements Serializable {
    /**
     *
     */
    @Id
    @Column(name = "id_usuario")
    private Integer idUsuario;
    /**
     *
     */
    @Column(name = "nome", nullable = false, length = 100)
    private String nome;
    /**
     *
     */
    @Column(name = "cargo", length = 50)
    private String cargo;
    /**
     *
     */
    @Column(name = "email", nullable = false, length = 100)
    private String email;
    /**
     *
     */
    @Column(name = "senha", nullable = false)
    private String senha;
    /**
     *
     */
    @Column(name = "permissoes")
    private String permissoes;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuarios usuarios = (Usuarios) o;
        return idUsuario.equals(usuarios.idUsuario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUsuario);
    }
}