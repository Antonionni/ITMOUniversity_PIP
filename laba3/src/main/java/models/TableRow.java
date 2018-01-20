package models;

public class TableRow {
    public TableRow(double _xValue, double _yValue, double _rValue, Boolean _hitting) {
        xValue = _xValue;
        yValue = _yValue;
        rValue = _rValue;
        hitting = _hitting;
    }
    private double xValue;
    private double yValue;
    private double rValue;
    private Boolean hitting;

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
