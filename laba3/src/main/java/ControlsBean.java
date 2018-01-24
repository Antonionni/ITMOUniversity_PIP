import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import entity.RowEntity;
import helper.ORMImpl;
import models.Point;

import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.lang.reflect.Type;

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

    public String[] getxValue() {
        return xValue;
    }

    public void setxValue(String[] xValue) {
        this.xValue = xValue;
    }

    public void changeRValue() {
        String hiddenInputValue = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get("hidden1");

        Type itemsArrType = new TypeToken<Point[]>() {}.getType();
        Point[] values = new Gson().fromJson(hiddenInputValue, itemsArrType);
        if (values != null) {
            // clean database
            ORMImpl.clean();

            // setNewValues
            for (Point item : values) {
                double currentXValue = item.getxValue();
                double currentYValue = item.getyValue();
                double currentRValue = item.getrValue();
                Boolean result = checkHitting(currentXValue, currentYValue, currentRValue);

                RowEntity entity = new RowEntity();
                entity.setrValue(currentRValue);
                entity.setxValue(currentXValue);
                entity.setyValue(currentYValue);
                entity.setHitting(result);

                ORMImpl.insert(entity);
            }
        }
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
            result = (abs(xValue) <= rValue) && (abs(yValue) <= rValue / 2);
        } else if (xValue >= 0 && yValue <= 0) {
            double value = (rValue * xValue) - ((rValue / 2) * yValue) - (pow(rValue, 2) / 2);
            result = (value <= 0);
        } else if (xValue < 0 && yValue < 0) {
            result = false;
        } else if (xValue < 0 && yValue > 0) {

            result = pow(xValue, 2) + pow(yValue, 2) <= pow(rValue, 2);
        }
        return result;
    }

}
