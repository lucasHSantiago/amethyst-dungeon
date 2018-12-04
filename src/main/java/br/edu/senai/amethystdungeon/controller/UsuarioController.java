package br.edu.senai.amethystdungeon.controller;

import br.edu.senai.amethystdungeon.dto.ErroDTO;
import br.edu.senai.amethystdungeon.dto.UsuarioDTO;
import br.edu.senai.amethystdungeon.exception.BaseException;
import br.edu.senai.amethystdungeon.model.Usuario;
import br.edu.senai.amethystdungeon.service.UsuarioService;
import org.apache.commons.mail.EmailException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import java.util.List;

@Path("usuario")
public class UsuarioController {

    UsuarioService service = new UsuarioService();

    @POST
    @Path("cadastrar")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response salvar(Usuario usuario) throws BaseException {
        service.salvar(usuario);
        return Response.ok().build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listar() {
        List<UsuarioDTO> dtos = service.ListaUsuarios();
        return Response.ok().entity(dtos).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieve(@PathParam(value = "id") String id) {
        UsuarioDTO dto = service.buscaUsuario(id);
        if (dto == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        return Response.ok().entity(dto).build();
    }

    @GET
    @Path("login/{login}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response retrieveByLogin(@PathParam(value = "login") String login) {
        UsuarioDTO dto = service.buscaUsuarioPorLogin(login);
        if (dto == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        return Response.ok().entity(dto).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response atualizar(UsuarioDTO dto) {
        try {
            service.atualizaUsuario(dto);
            return Response.ok().build();
        } catch (Exception e) {
            ErroDTO erroDTO = new ErroDTO();
            erroDTO.setMessage(e.getMessage());
            return Response.status(Status.INTERNAL_SERVER_ERROR).entity(erroDTO).build();
        }
    }

    @POST
    @Path("/novaSenha")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response refazerSenha(UsuarioDTO dto) throws EmailException, BaseException {
        service.attSenha(dto.getLogin());
        return Response.ok().build();
    }
}
