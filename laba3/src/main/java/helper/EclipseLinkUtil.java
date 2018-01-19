package helper;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EclipseLinkUtil {
    private static EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("pointTable");

    public static EntityManager createEntityManager(){
        return emfactory.createEntityManager();
    }
}
