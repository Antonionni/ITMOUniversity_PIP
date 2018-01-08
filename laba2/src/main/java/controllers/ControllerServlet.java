package controllers;

import com.google.gson.Gson;
import com.sun.istack.internal.logging.Logger;
import models.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ControllerServlet")
public class ControllerServlet extends HttpServlet {
    private static final Logger log = Logger.getLogger(ControllerServlet.class);
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Gson requestJson = new Gson();

        StringBuilder sb = new StringBuilder();
        String line;
        while((line = request.getReader().readLine()) != null) {
            sb.append(line);
        }
        Point point = requestJson.fromJson(sb.toString(), Point.class);

        Gson responseJson = new Gson();
        ResponseInfo[] responseArray;
        for (int i = 0; i < point.rValues.length; i++) {
            int currentRValue = point.rValues[i];
            Boolean result;
            if (point.xValue >= 0 && point.yValue >= 0) {
                result = (Math.pow(point.xValue, 2) + Math.pow(point.yValue, 2)) < currentRValue;
            } else if (point.xValue > 0 && point.yValue < 0) {

            } else if (point.xValue < 0 && point.yValue < 0) {

            } else if (point.xValue < 0 && point.yValue > 0) {

            } else {
                // TODO undefined behavior
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {}
}
