package br.edu.senai.amethystdungeon.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "score")
public class Score {

    @Id
    private String id;

    @Column(name = "score", nullable = false)
    private int score;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario")
    private Usuario usuario;

    @Column(name = "datascore", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataScore;

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

    public Date getDataScore() {
        return dataScore;
    }

    public void setDataScore(Date dataScore) {
        this.dataScore = dataScore;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Score score1 = (Score) o;
        return score == score1.score &&
                Objects.equals(id, score1.id) &&
                Objects.equals(usuario, score1.usuario) &&
                Objects.equals(dataScore, score1.dataScore);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, score, usuario, dataScore);
    }
}
