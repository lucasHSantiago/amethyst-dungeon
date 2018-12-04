package br.edu.senai.amethystdungeon.repository;

import br.edu.senai.amethystdungeon.db.util.JpaUtil;
import br.edu.senai.amethystdungeon.dto.UsuarioDTO;
import br.edu.senai.amethystdungeon.model.Usuario;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.UUID;

public class UsuarioRepository {
    public void salvar(Usuario usuario) {
        EntityManager manager = JpaUtil.getEntityManager();
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            usuario.setId(UUID.randomUUID().toString());
            manager.persist(usuario);
            tx.commit();
        } catch (Exception e) {
            tx.rollback();
            throw new RuntimeException("Erro ao salvar novo usuário");
        } finally {
            manager.close();
        }
    }

    public Usuario login(Usuario usuario) {
        EntityManager em = JpaUtil.getEntityManager();
        try {
            TypedQuery<Usuario> query = em.createQuery("Select u from Usuario u where u.login = :login and u.senha = :senha", Usuario.class);
            query.setParameter("login", usuario.getLogin());
            query.setParameter("senha", usuario.getSenha());
            Usuario found = query.getSingleResult();
            return found;
        } catch (Exception e) {
            return null;
        } finally {
            em.close();
        }
    }

    public List<Usuario> listaUsuarios() {
        EntityManager manager = JpaUtil.getEntityManager();
        try {
            TypedQuery<Usuario> query = manager.createQuery("Select u from Usuario u", Usuario.class);
            return query.getResultList();
        } finally {
            manager.close();
        }
    }

    public Usuario findById(String id) {
        EntityManager manager = JpaUtil.getEntityManager();
        try {
            return manager.find(Usuario.class, id);
        } finally {
            manager.close();
        }
    }

    public Usuario findByLogin(String login) {
        EntityManager manager = JpaUtil.getEntityManager();
        try {
            TypedQuery<Usuario> query =
                    manager.createQuery("Select u from Usuario u where u.login = :login", Usuario.class);
            query.setParameter("login", login);
            return query.getSingleResult();
        } catch(Exception e) {
            return null;
        } finally {
            manager.close();
        }
    }

    public void atualizar(Usuario usuario) {
        EntityManager manager = JpaUtil.getEntityManager();
        EntityTransaction tx = manager.getTransaction();
        try {
            tx.begin();
            manager.merge(usuario);
            tx.commit();
        } catch(Exception e) {
            tx.rollback();
            e.printStackTrace();
            throw new RuntimeException("Erro ao atualizar usuário");
        } finally {
            manager.close();
        }
    }
}
