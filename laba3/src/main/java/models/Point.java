package models;

public class Point {
    private double xValue;
    private double yValue;
    private double rValue;

    public Point(double xValue, double yValue, double rValue) {
        this.xValue = xValue;
        this.yValue = yValue;
        this.rValue = rValue;
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
}
