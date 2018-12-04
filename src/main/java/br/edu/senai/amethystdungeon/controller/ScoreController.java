package br.edu.senai.amethystdungeon.controller;

import br.edu.senai.amethystdungeon.dto.ScoreDTO;
import br.edu.senai.amethystdungeon.service.ScoreService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("score")
public class ScoreController {

    ScoreService service = new ScoreService();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response salvar (ScoreDTO dto) {
        service.salvar(dto);
        return  Response.ok().build();
    }

    @GET
    @Path("/listar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listar() {
        List<ScoreDTO> dtos = service.listaScore();
        return Response.ok().entity(dtos).build();
    }
}
