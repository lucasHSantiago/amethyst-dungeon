package br.edu.senai.amethystdungeon.filter;

import br.edu.senai.amethystdungeon.db.util.JwtUtil;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.util.Map;

@Provider
@PreMatching
public class RequestFilter implements ContainerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    @Context
    private HttpServletRequest servletRequest;

    @Override
    public void filter(ContainerRequestContext requestCtx) {

        String path = requestCtx.getUriInfo().getPath();
        if (requestCtx.getRequest().getMethod().equals("OPTIONS")) {
            requestCtx.abortWith(Response.ok().build());
            return;
        }
        if (path.startsWith("/login")
                || path.startsWith("/usuario/cadastrar")
                || path.startsWith("/usuario/novaSenha")
                || path.startsWith("/score/listar")) {
            return;
        } else {
            String authToken = requestCtx.getHeaderString(AUTHORIZATION_HEADER);
            try {
                Map<String, Object> map = JwtUtil.getInstance().decode(authToken);
                if (path.startsWith("/log")) {
                    if (!(Boolean) map.get("admin")) {
                        requestCtx.abortWith(Response.status(Response.Status.FORBIDDEN).build());
                    }
                }
            } catch (Exception e) {
                requestCtx.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
            }
        }
    }
}
