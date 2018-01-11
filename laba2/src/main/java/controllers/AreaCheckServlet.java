package controllers;

import com.google.gson.Gson;
import models.Point;
import models.ResponseInfo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws  IOException {
        response.setContentType("application/json");

        Gson requestJson = new Gson();
        StringBuilder sb = new StringBuilder();
        String line;
        while((line = request.getReader().readLine()) != null) {
            sb.append(line);
        }
        Point point = requestJson.fromJson(sb.toString(), Point.class);


        if (!isValid(point)) {
            response.getWriter().println(new Gson().toJson(new ResponseInfo(false)));
            return;
        }

        Boolean result = false;
        if (point.xValue >= 0 && point.yValue >= 0) {
            result = (Math.pow(point.xValue, 2) + Math.pow(point.yValue, 2)) <= Math.pow(point.rValue, 2);
        } else if (point.xValue > 0 && point.yValue < 0) {
            // TODO mock
        } else if (point.xValue < 0 && point.yValue < 0) {
            result = (point.xValue >= point.rValue) && (point.yValue >= point.rValue / 2);
        } else if (point.xValue < 0 && point.yValue > 0) {
            // just false
        }

        response.getWriter().println(new Gson().toJson(new ResponseInfo(result)));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    private Boolean isValid(Point poin) {
        return poin.xValue >= -5 && poin.xValue <= 3 && poin.yValue >= -5 && poin.yValue <= 3 && poin.rValue >= 1 && poin.rValue <= 5;
    }
}
