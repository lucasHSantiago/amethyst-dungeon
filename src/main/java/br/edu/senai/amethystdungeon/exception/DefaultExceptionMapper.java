package br.edu.senai.amethystdungeon.exception;

import br.edu.senai.amethystdungeon.dto.ErroDTO;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class DefaultExceptionMapper implements ExceptionMapper<Throwable> {

    @Override
    public Response toResponse(Throwable e) {
        e.printStackTrace();
        StringBuilder msg = new StringBuilder();

        if(e instanceof BaseException) {
            msg.append(((BaseException) e).getMessage());
        } else {
            msg.append("Erro Inesperado");
        }
        ErroDTO erro = new ErroDTO();
        erro.setMessage(msg.toString());
        return Response.serverError().entity(erro).build();

    }
}
