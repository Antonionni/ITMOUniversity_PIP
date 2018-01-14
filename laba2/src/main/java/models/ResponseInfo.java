package models;

public class ResponseInfo {
    public ResponseInfo(Boolean _isHitting, double _xValue, double _yValue, double _rValue) {
        isHitting = _isHitting;
        xValue = _xValue;
        yValue = _yValue;
        rValue = _rValue;
    }
    public Boolean isHitting;
    public double xValue;
    public double yValue;
    public double rValue;
}
