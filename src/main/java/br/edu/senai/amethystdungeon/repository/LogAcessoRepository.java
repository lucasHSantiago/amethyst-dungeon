package br.edu.senai.amethystdungeon.repository;

import br.edu.senai.amethystdungeon.db.util.JpaUtil;
import br.edu.senai.amethystdungeon.model.LogAcesso;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;
import java.util.List;

public class LogAcessoRepository {

    public void salvar(LogAcesso log) {
        EntityManager manager = JpaUtil.getEntityManager();
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            manager.persist(log);
            tx.commit();
        } catch (Exception e) {
            tx.rollback();
            throw new RuntimeException("Erro ao salvar novo log de acesso");
        } finally {
            manager.close();
        }
    }

    public List<LogAcesso> listaLog() {
        EntityManager manager = JpaUtil.getEntityManager();
        try {
            TypedQuery<LogAcesso> query =
                    manager.createQuery("Select l from LogAcesso l order by l.dataAcesso", LogAcesso.class);
            return query.getResultList();
        } finally {
            manager.close();
        }
    }
}
