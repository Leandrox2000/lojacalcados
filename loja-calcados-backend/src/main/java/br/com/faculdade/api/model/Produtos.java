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
@Table(name = "produtos", schema = "PROJETO")
public class Produtos implements Serializable {
    /**
     *
     */
    @Id
    @Column(name = "id_produto")
    private Integer idProduto;
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
    /**
     *
     */
    @Column(name = "marca", length = 50)
    private String marca;
    /**
     *
     */
    @Column(name = "id_categoria")
    private Integer idCategoria;
    /**
     *
     */
    @Column(name = "tamanho", length = 10)
    private String tamanho;
    /**
     *
     */
    @Column(name = "cor", length = 50)
    private String cor;
    /**
     *
     */
    @Column(name = "preco")
    private BigDecimal preco;
    /**
     *
     */
    @Column(name = "quantidade_estoque")
    private Integer quantidadeEstoque;
    /**
     *
     */
    @Column(name = "imagem_url")
    private String imagemUrl;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Produtos produtos = (Produtos) o;
        return idProduto.equals(produtos.idProduto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProduto);
    }
}