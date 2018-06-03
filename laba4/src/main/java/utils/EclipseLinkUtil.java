package utils;

import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class EclipseLinkUtil {
    private static EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("laba4");

    public static EntityTransaction createEntityTransaction() {
        return emfactory.createEntityManager().getTransaction();
    }
}