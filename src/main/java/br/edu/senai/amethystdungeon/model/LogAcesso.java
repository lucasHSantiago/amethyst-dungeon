package br.edu.senai.amethystdungeon.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "logacesso")
public class LogAcesso {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario")
    private Usuario usuario;

    @Column(name = "acesso", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dataAcesso;

    public LogAcesso() {
    }

    public LogAcesso(String id, Usuario usuario, Date dataAcesso) {
        this.id = id;
        this.usuario = usuario;
        this.dataAcesso = dataAcesso;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Date getDataAcesso() {
        return dataAcesso;
    }

    public void setDataAcesso(Date dataAcesso) {
        this.dataAcesso = dataAcesso;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LogAcesso logAcesso = (LogAcesso) o;
        return Objects.equals(id, logAcesso.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
