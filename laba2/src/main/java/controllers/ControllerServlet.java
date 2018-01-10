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
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

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


        List<ResponseInfo> responseArray = new ArrayList<ResponseInfo>();

        for (int i = 0; i < point.rValues.length; i++) {
            double currentRValue = point.rValues[i];
            Boolean result = false;
            if (point.xValue >= 0 && point.yValue >= 0) {
                result = (Math.pow(point.xValue, 2) + Math.pow(point.yValue, 2)) <= Math.pow(currentRValue, 2);
            } else if (point.xValue > 0 && point.yValue < 0) {
                // TODO mock
            } else if (point.xValue < 0 && point.yValue < 0) {
                result = (point.xValue >= currentRValue) && (point.yValue >= currentRValue / 2);
            } else if (point.xValue < 0 && point.yValue > 0) {
                // just false
            }
            responseArray.add(new ResponseInfo(currentRValue, result));
        }

        String result = responseJson.toJson(responseArray);

        response.setContentType("application/json");
        PrintWriter writer = response.getWriter();
        writer.println(result);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {}
}
