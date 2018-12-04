package br.edu.senai.amethystdungeon.service;

import br.edu.senai.amethystdungeon.dto.ScoreDTO;
import br.edu.senai.amethystdungeon.dto.UsuarioDTO;
import br.edu.senai.amethystdungeon.model.Score;
import br.edu.senai.amethystdungeon.repository.ScoreRepository;

import java.util.ArrayList;
import java.util.List;

public class ScoreService {

    ScoreRepository repository = new ScoreRepository();

    public void salvar (ScoreDTO dto) {
        repository.salvar(dto);
    }

    public List<ScoreDTO> listaScore() {
        List<Score> scores = repository.listaScore();
        List<ScoreDTO> dtos = new ArrayList<>();
        int posicao = 1;
        for (Score score : scores) {
            ScoreDTO dto = new ScoreDTO();
            dto.setId(score.getId());
            dto.setColocacao(posicao);
            dto.setScore(score.getScore());
            dto.setDataScore(score.getDataScore());
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setNome(score.getUsuario().getNome());
            usuarioDTO.setId(score.getUsuario().getId());
            dto.setUsuario(usuarioDTO);
            dtos.add(dto);
            posicao++;
        }
        return dtos;
    }
}
