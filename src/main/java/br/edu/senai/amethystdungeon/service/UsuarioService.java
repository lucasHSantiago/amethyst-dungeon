package br.edu.senai.amethystdungeon.service;

import br.edu.senai.amethystdungeon.db.util.PasswordUtil;
import br.edu.senai.amethystdungeon.dto.UsuarioDTO;
import br.edu.senai.amethystdungeon.model.Usuario;
import br.edu.senai.amethystdungeon.repository.UsuarioRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

import javax.ws.rs.NotFoundException;
import java.util.ArrayList;
import java.util.List;

public class UsuarioService {
    UsuarioRepository usuarioRepository = new UsuarioRepository();

    public void salvar(Usuario usuario) {
        if (usuario.getEmail() == null) {
            throw new RuntimeException("Informar email");
        } else if (usuario.getLogin() == null) {
            throw new RuntimeException("Informar o login");
        } else if (usuario.getNascimento() == null) {
            throw new RuntimeException("Informar a data de nascimento");
        } else if (usuario.getNome() == null) {
            throw new RuntimeException("Informar o nome");
        } else if (usuario.getSenha() == null) {
            throw new RuntimeException("Informar a senha");
        }
        usuario.setSenha(PasswordUtil.criptografaSenha(usuario.getSenha()));
        if (usuario.getLogin().equals("admin")) {
            usuario.setAdmin(Boolean.TRUE);
        }
        usuarioRepository.salvar(usuario);
    }

    public UsuarioDTO login(Usuario usuario) throws NotFoundException {
        if (usuario.getLogin() == null || usuario.getSenha() == null) {
            throw new RuntimeException("Informar login e senha");
        }
        Usuario found = usuarioRepository.findByLogin(usuario.getLogin());
        if (found == null || !PasswordUtil.autentica(found.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Usuário ou Senha Inválidos");
        }

        UsuarioDTO dto = new UsuarioDTO();
        dto.setEmail(found.getEmail());
        dto.setId(found.getId());
        dto.setLogin(found.getLogin());
        dto.setNome(found.getNome());
        dto.setAdmin(found.getAdmin());
        return dto;
    }

    public List<UsuarioDTO> ListaUsuarios() {
        List<Usuario> usuarios = usuarioRepository.listaUsuarios();
        List<UsuarioDTO> dtos = new ArrayList();
        for (Usuario user : usuarios) {
            UsuarioDTO dto = new UsuarioDTO();
            dto.setEmail(user.getEmail());
            dto.setId(user.getId());
            dto.setLogin(user.getLogin());
            dto.setNome(user.getNome());
            dto.setNascimento(user.getNascimento());
            dtos.add(dto);
        }
        return dtos;
    }

    public UsuarioDTO buscaUsuario(String id) {
        Usuario found = usuarioRepository.findById(id);
        if (found == null) {
            return null;
        }
        UsuarioDTO dto = new UsuarioDTO();
        dto.setEmail(found.getEmail());
        dto.setId(found.getId());
        dto.setLogin(found.getLogin());
        dto.setNome(found.getNome());
        dto.setNascimento(found.getNascimento());
        return dto;
    }

    public String gerarNovaSenha() {
        int length = 10;
        boolean useLetters = true;
        boolean useNumbers = false;
        String generatedString = RandomStringUtils.random(length, useLetters, useNumbers);
        return generatedString;
    }

    public UsuarioDTO buscaUsuarioPorLogin(String login) {
        Usuario found = usuarioRepository.findByLogin(login);
        if (found == null) {
            return null;
        }
        UsuarioDTO dto = new UsuarioDTO();
        dto.setEmail(found.getEmail());
        dto.setId(found.getId());
        dto.setLogin(found.getLogin());
        dto.setNome(found.getNome());
        dto.setNascimento(found.getNascimento());
        return dto;
    }

    public void atualizaUsuario(UsuarioDTO dto) {
        Usuario found = usuarioRepository.findByLogin(dto.getLogin());
        found.setNome(dto.getNome());
        found.setEmail(dto.getEmail());
        found.setNascimento(dto.getNascimento());
        if (dto.getSenha() != null && dto.getSenha().trim() != "") {
            found.setSenha(PasswordUtil.criptografaSenha(dto.getSenha()));
        }
        usuarioRepository.atualizar(found);
    }

    public void enviarEmail(String mailAddress, String novaSenha) throws EmailException {
        HtmlEmail email = new HtmlEmail();
        email.setHostName("smtp.gmail.com");
        email.setSmtpPort(465);
        email.setAuthenticator(new DefaultAuthenticator("amethystdungeon@gmail.com",
                "senaichallenge2018"));
        email.setSSLOnConnect(true);
        email.setFrom("amethystdungeon@gmail.com");
        email.addTo(mailAddress, "Amethyst Dungeon");
        email.setSubject("Alteração de senha do jogo Amethyst Dungeon");
        email.setHtmlMsg("<html><h1>Alteração de Senha</h1>");
        email.setHtmlMsg("<h3>Nova Senha:</h3>" + novaSenha + "</html>");
        email.send();
    }

    public void attSenha(String login) throws EmailException {
        String novaSenha = gerarNovaSenha();
        System.out.println(novaSenha);
        Usuario usuario = usuarioRepository.findByLogin(login);
        usuario.setSenha(PasswordUtil.criptografaSenha(novaSenha));
        usuarioRepository.atualizar(usuario);
        enviarEmail(usuario.getEmail(), novaSenha);
    }
}
