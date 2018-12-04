package br.edu.senai.amethystdungeon.repository;

import br.edu.senai.amethystdungeon.db.util.JpaUtil;
import br.edu.senai.amethystdungeon.dto.ScoreDTO;
import br.edu.senai.amethystdungeon.model.Score;
import br.edu.senai.amethystdungeon.model.Usuario;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;
import javax.ws.rs.NotFoundException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class ScoreRepository {

    public void salvar(ScoreDTO dto) {
        EntityManager manager = JpaUtil.getEntityManager();
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            Score score = findByUsuario(dto.getUsuario().getId());
            if (score == null) {
                score = new Score();
                score.setDataScore(new Date());
                score.setId(UUID.randomUUID().toString());
                score.setScore(dto.getScore());
                score.setUsuario(new Usuario(dto.getUsuario().getId()));
                manager.persist(score);
            } else {
                if (dto.getScore() > score.getScore()) {
                    score.setScore(dto.getScore());
                    score.setDataScore(new Date());
                    manager.merge(score);
                }
            }
            tx.commit();
        } catch (Exception e) {
            tx.rollback();
            throw new RuntimeException("Erro ao salvar novo score");
        } finally {
            manager.close();
        }
    }

    public Score findByUsuario(String idUsuario) throws NotFoundException {
        EntityManager manager = JpaUtil.getEntityManager();
        try {
            TypedQuery<Score> query =
                    manager.createQuery("Select s from Score s where s.usuario.id = :idUsuario", Score.class);
            query.setParameter("idUsuario", idUsuario);
            return query.getSingleResult();
        } catch(Exception e) {
            return null;
        } finally {
            manager.close();
        }
    }

    public List<Score> listaScore() {
        EntityManager manager = JpaUtil.getEntityManager();
        try {
            TypedQuery<Score> query = manager.createQuery("Select s from Score s order by s.score desc, s.usuario.nome", Score.class);
            return query.getResultList();
        } finally {
            manager.close();
        }
    }
}
