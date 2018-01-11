package controllers;

import com.google.gson.Gson;
import models.Point;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter("/*")
public class ControllerServlet extends HttpFilter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) req;
        String path = httpRequest.getRequestURI();
        if (path.contains("/resources") || path.contains("/laba2_war_exploded")) {
            chain.doFilter(httpRequest, res);
            return;
        } else if (path.contains("/AreaCheckServlet")) {
            if (httpRequest.getMethod() == "GET" || httpRequest.getMethod() == "POST") {
                if (checkParameters(httpRequest)) {
                    chain.doFilter(httpRequest, res);
                    return;
                }
            }
        }
        req.getRequestDispatcher("/laba2_war_exploded").forward(httpRequest, res);
    }

    public Boolean checkParameters(HttpServletRequest req) throws IOException {
        Gson requestJson = new Gson();
        StringBuilder sb = new StringBuilder();
        String line;
        while((line = req.getReader().readLine()) != null) {
            sb.append(line);
        }
        Point point = requestJson.fromJson(sb.toString(), Point.class);
        return point != null;
    }
}
