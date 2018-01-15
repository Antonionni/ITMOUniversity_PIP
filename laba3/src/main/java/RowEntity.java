import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class RowEntity {
    @Id
    @Column (name = "id", unique = true)
    private int id;

    @Column (name = "xvalue")
    private double xValue;

    @Column (name = "yvalue")
    private double yValue;

    @Column (name = "rvalue")
    private double rValue;

    @Column (name = "hitting")
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
