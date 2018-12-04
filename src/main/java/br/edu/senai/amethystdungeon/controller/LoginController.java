package br.edu.senai.amethystdungeon.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.edu.senai.amethystdungeon.db.util.JwtUtil;
import br.edu.senai.amethystdungeon.dto.ErroDTO;
import br.edu.senai.amethystdungeon.dto.TokenDTO;
import br.edu.senai.amethystdungeon.dto.UsuarioDTO;
import br.edu.senai.amethystdungeon.model.LogAcesso;
import br.edu.senai.amethystdungeon.model.Usuario;
import br.edu.senai.amethystdungeon.service.LogAcessoService;
import br.edu.senai.amethystdungeon.service.UsuarioService;

import java.util.Date;
import java.util.UUID;

@Path("login")
public class LoginController {
	
	UsuarioService service = new UsuarioService();
	LogAcessoService logService = new LogAcessoService();

	@POST
    @Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
    public Response login(Usuario usuario) {
		try {
            UsuarioDTO found = service.login(usuario);
            String id = UUID.randomUUID().toString();
            LogAcesso log = new LogAcesso(id, new Usuario(found.getId()), new Date());
            logService.salvar(log);
            String token = JwtUtil.getInstance().createToken(found);
            TokenDTO tokenDTO = TokenDTO.of(token);
            return Response.ok(tokenDTO).build();
		} catch (Exception e) {
            ErroDTO erro = new ErroDTO();
            erro.setMessage(e.getMessage());
            return Response.status(Status.INTERNAL_SERVER_ERROR)
                    .entity(erro)
                    .build();
		}		
	}
}
