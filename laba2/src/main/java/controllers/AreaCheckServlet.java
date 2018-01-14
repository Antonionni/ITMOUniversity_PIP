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
import java.util.ArrayList;

import static java.lang.Math.abs;

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
            response.getWriter().println(new Gson().toJson(new ResponseInfo(false, point.xValue, point.yValue, point.rValue)));
            return;
        }

        Boolean result = false;
        if (point.xValue >= 0 && point.yValue >= 0) {
            result = (Math.pow(point.xValue, 2) + Math.pow(point.yValue, 2)) <= Math.pow(point.rValue / 2, 2);
        } else if (point.xValue > 0 && point.yValue < 0) {
            double value = (- point.rValue / 2) * point.xValue + point.rValue * point.yValue + Math.pow(point.rValue, 2) / 2;
            result = (value >= 0);
        } else if (point.xValue < 0 && point.yValue < 0) {
            result = (abs(point.xValue) <= point.rValue) && (abs(point.yValue) <= point.rValue / 2);
        } else if (point.xValue < 0 && point.yValue > 0) {
            // just false
        }

        ResponseInfo resultResponse = new ResponseInfo(result, point.xValue, point.yValue, point.rValue);

        ArrayList<ResponseInfo> resultArray = (ArrayList<ResponseInfo>) request.getSession().getAttribute("resultArray");

        if (resultArray == null) {
            resultArray = new ArrayList<ResponseInfo>();
        }
        resultArray.add(resultResponse);
        request.getSession().setAttribute("resultArray", resultArray);

        response.getWriter().println(new Gson().toJson(resultResponse));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<ResponseInfo> resultArray = (ArrayList<ResponseInfo>)request.getSession().getAttribute("resultArray");
        if (resultArray == null) {
            resultArray = new ArrayList<ResponseInfo>();
        }
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");

        String resultContent = "<html><head><title>Лабараторная №2</title>";
        resultContent += " <link rel=\"stylesheet\" type=\"text/css\" href=\"resources/css/main.css\">";
        resultContent += "</head>";
        resultContent += "<body>";
        resultContent += "<div class=\"return-button\"><a href=\"/laba2_war_exploded\">Вернутся</a></div>";
        resultContent += "<div class=\"result_list\">";
        resultContent += "<div class=\"result_list_header\">\n" +
                "<div class=\"result_list_cell\">Координата X</div>\n" +
                "<div class=\"result_list_cell\">Координата Y</div>\n" +
                "<div class=\"result_list_cell\">Значение R</div>\n" +
                "<div class=\"result_list_cell\">Попадание</div>\n" +
                "</div>";
        resultContent += "<div class=\"result_list_content\">";
        for (ResponseInfo result : resultArray) {
            String isHitting = result.isHitting ? "Попал" : "Непопал";
            resultContent += "<div class=\"result_list_row\">";
            resultContent += "<div class=\"result_list_cell\">" + String.format("%.2f",result.xValue) + "</div>";
            resultContent += "<div class=\"result_list_cell\">" + String.format("%.2f",result.yValue) + "</div>";
            resultContent += "<div class=\"result_list_cell\">" + result.rValue + "</div>";
            resultContent += "<div class=\"result_list_cell\">" + isHitting + "</div>";
            resultContent += "</div>";
        }
        resultContent += "</div></div>";

        resultContent += "</body></html>";
        response.getWriter().println(resultContent);
    }

    private Boolean isValid(Point poin) {
        return poin.xValue >= -5 && poin.xValue <= 3 && poin.yValue >= -5 && poin.yValue <= 3 && poin.rValue >= 1 && poin.rValue <= 5;
    }
}
