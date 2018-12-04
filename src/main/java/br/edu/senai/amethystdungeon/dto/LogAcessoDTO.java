package br.edu.senai.amethystdungeon.dto;

import java.util.Date;

public class LogAcessoDTO {

    private Date acesso;

    private UsuarioDTO usuario;

    public Date getAcesso() {
        return acesso;
    }

    public void setAcesso(Date acesso) {
        this.acesso = acesso;
    }

    public UsuarioDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioDTO usuario) {
        this.usuario = usuario;
    }
}
