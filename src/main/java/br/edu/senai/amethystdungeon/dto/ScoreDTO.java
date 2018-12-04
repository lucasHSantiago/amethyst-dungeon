package br.edu.senai.amethystdungeon.dto;

import java.util.Date;

public class ScoreDTO {

    private String id;

    private  int score;

    private int colocacao;

    private UsuarioDTO usuario;

    private Date dataScore;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public UsuarioDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioDTO usuario) {
        this.usuario = usuario;
    }

    public int getColocacao() {
        return colocacao;
    }

    public void setColocacao(int colocacao) {
        this.colocacao = colocacao;
    }

    public Date getDataScore() {
        return dataScore;
    }

    public void setDataScore(Date dataScore) {
        this.dataScore = dataScore;
    }
}

