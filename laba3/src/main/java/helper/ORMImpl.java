package helper;

import entity.RowEntity;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class ORMImpl {
    public static EntityManager em;

    public static void insert(RowEntity row) {
        em = EclipseLinkUtil.createEntityManager();
        em.getTransaction().begin();
        em.persist(row);
        em.getTransaction().commit();
        em.close();
    }

    public static List<RowEntity> select() {
        em = EclipseLinkUtil.createEntityManager();
        em.getTransaction().begin();
        TypedQuery<RowEntity> query = em.createQuery("SELECT c FROM RowEntity c", RowEntity.class);
        List<RowEntity> result = query.getResultList();
        em.getTransaction().commit();
        em.close();
        return result;
    }

    public static void clean() {
        em = EclipseLinkUtil.createEntityManager();
        em.getTransaction().begin();
        em.createQuery("delete FROM RowEntity c", RowEntity.class).executeUpdate();
        em.getTransaction().commit();
        em.close();
    }
}
