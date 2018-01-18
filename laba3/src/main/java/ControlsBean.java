import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named
@SessionScoped
public class ControlsBean implements Serializable {
    private double yValue;
    private double rValue;

    public double getyValue() {
        return yValue;
    }

    public void setyValue(double yValue) {
        this.yValue = yValue;
    }

    public void doCreatePoint() {
        double tets1 = getyValue();
        double tets2 = getrValue();
    }

    public double getrValue() {
        return rValue;
    }

    public void setrValue(double rValue) {
        this.rValue = rValue;
    }
}
