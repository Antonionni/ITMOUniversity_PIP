package entity;

import javax.persistence.*;

@Entity
@Table (name = "points")
public class PointEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id", unique = true)
    private int id;

    @Column (name = "xvalue", nullable=false)
    private double xValue;

    @Column (name = "yvalue", nullable=false)
    private double yValue;

    @Column (name = "rvalue", nullable=false)
    private double rValue;

    @Column (name = "ishitting", nullable=false)
    private Boolean hitting;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getxValue() {
        return xValue;
    }

    public void setxValue(double xValue) {
        this.xValue = xValue;
    }

    public double getyValue() {
        return yValue;
    }

    public void setyValue(double yValue) {
        this.yValue = yValue;
    }

    public double getrValue() {
        return rValue;
    }

    public void setrValue(double rValue) {
        this.rValue = rValue;
    }

    public Boolean getHitting() {
        return hitting;
    }

    public void setHitting(Boolean hitting) {
        this.hitting = hitting;
    }
}
