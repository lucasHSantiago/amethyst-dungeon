package br.edu.senai.amethystdungeon.service;

import br.edu.senai.amethystdungeon.dto.LogAcessoDTO;
import br.edu.senai.amethystdungeon.dto.UsuarioDTO;
import br.edu.senai.amethystdungeon.model.LogAcesso;
import br.edu.senai.amethystdungeon.repository.LogAcessoRepository;

import java.util.ArrayList;
import java.util.List;

public class LogAcessoService {

    LogAcessoRepository repository = new LogAcessoRepository();

    public void salvar(LogAcesso log) {
        repository.salvar(log);
    }

    public List<LogAcessoDTO> listaLogs() {
        List<LogAcesso> logs = repository.listaLog();
        List<LogAcessoDTO> dtos = new ArrayList<>();
        for (LogAcesso log : logs) {
            LogAcessoDTO dto = new LogAcessoDTO();
            dto.setAcesso(log.getDataAcesso());
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setNome(log.getUsuario().getNome());
            usuarioDTO.setId(log.getUsuario().getId());
            dto.setUsuario(usuarioDTO);
            dtos.add(dto);
        }
        return dtos;
    }
}
