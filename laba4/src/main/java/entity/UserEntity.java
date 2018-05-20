package entity;

import javax.persistence.*;

@Entity
@Table (name = "users")
public class UserEntity {
    @Id
    @Column(name = "login")
    private String login;

    @Column(name = "password", nullable = false)
    private String password;

    public UserEntity() {}

    public UserEntity(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
