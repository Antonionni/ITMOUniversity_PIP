import com.sun.org.apache.xpath.internal.operations.Bool;
import entity.RowEntity;
import helper.ORMImpl;

import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.abs;
import static java.lang.Math.pow;

@Named
@SessionScoped
public class ControlsBean implements Serializable {
    private double yValue;
    private double rValue;
    private String[] xValue;

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

    public void doCreatePoint() {
        String[] xValueArray = getxValue();
        if (xValueArray.length == 0) {
            return;
        }
        double currentXValue = Double.parseDouble(xValueArray[0]);
        double currentYValue = getyValue();
        double currentRValue = getrValue();
        Boolean result = checkHitting(currentXValue, currentYValue, currentRValue);

        RowEntity entity = new RowEntity();
        entity.setrValue(currentRValue);
        entity.setxValue(currentXValue);
        entity.setyValue(currentYValue);
        entity.setHitting(result);

        ORMImpl.insert(entity);
    }
    private Boolean checkHitting(double xValue, double yValue, double rValue) {
        Boolean result = false;
        if (xValue > 0 && yValue > 0) {
            result = false;
        } else if (xValue >= 0 && yValue <= 0) {
            result = pow(xValue, 2) + pow(yValue, 2) <= pow(rValue, 2);
        } else if (xValue < 0 && yValue < 0) {
            result = (abs(xValue) <= rValue) && (abs(yValue) <= rValue);
        } else if (xValue < 0 && yValue > 0) {
            double value = ((-rValue * xValue) - (rValue * yValue) + pow(rValue, 2));
            result = (value >= 0);
        }
        return result;
    }

    public String[] getxValue() {
        return xValue;
    }

    public void setxValue(String[] xValue) {
        this.xValue = xValue;
    }
}
