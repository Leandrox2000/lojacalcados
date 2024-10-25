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
@Table(name = "fornecedores", schema = "PROJETO")
public class Fornecedores implements Serializable {
    /**
    * 
    */
    @Id
    @Column(name = "id_fornecedor")    
    private Integer idFornecedor;
    /**
    * 
    */
    @Column(name = "nome", nullable = false, length = 100)
    private String nome;
    /**
    * 
    */
    @Column(name = "contato", length = 100)
    private String contato;
    /**
    * 
    */
    @Column(name = "endereco")    
    private String endereco;
    /**
    * 
    */
    @Column(name = "produtos_fornecidos")    
    private String produtosFornecidos;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Fornecedores that = (Fornecedores) o;
        return idFornecedor.equals(that.idFornecedor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idFornecedor);
    }
}