package br.edu.senai.amethystdungeon.controller;

import br.edu.senai.amethystdungeon.dto.LogAcessoDTO;
import br.edu.senai.amethystdungeon.service.LogAcessoService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("log")
public class LogAcessoController {

    LogAcessoService service = new LogAcessoService();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listar() {
        List<LogAcessoDTO> dtos = service.listaLogs();
        return Response.ok().entity(dtos).build();
    }
}
