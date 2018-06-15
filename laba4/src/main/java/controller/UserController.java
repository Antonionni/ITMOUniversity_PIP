package controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Path("/user")
public class UserController {
    private static final Pattern pattern = Pattern.compile("(?=.*[a-zA-Z])[a-zA-Z0-9]{3,}");


    enum SignUpErrors {
        LOGIN_LENGTH,
        USER_EXISTS,
        PASSWORD_NOT_EQUAL,
        PASSWORD_LENGTH,
        UNDEFINED_ERROR
    }

    @POST
    @Path("/signin")
    public void signIn(@FormParam("login") String login,
                       @FormParam("password") String password,
                       @Context HttpServletRequest httpServletRequest,
                       @Context HttpServletResponse httpServletResponse) throws IOException {
        try {
            // boolean isTrueData = userEJB.signIn(login, password);
            boolean isTrueData = true;
            if(isTrueData){
                httpServletRequest.getSession().setAttribute("login", login);
                httpServletRequest.getSession().setAttribute("points", new ArrayList<Point>());
                return;
            }
            else {
                System.err.println("login exists or data is incorrect");
                httpServletResponse.sendError(500);
            }
        }
        catch (Exception e) {
            System.err.println("Signin error!");
            httpServletResponse.sendError(500);
        }
    }

    @POST
    @Path("/signup")
    public void signUp(@FormParam("login") String login,
                       @FormParam("password") String password,
                       @FormParam("repeatPassword") String repeatPassword,
                       @Context HttpServletRequest httpServletRequest,
                       @Context HttpServletResponse httpServletResponse) throws IOException {
        try{
            Matcher matcher = pattern.matcher(login);
            if (!matcher.find() || login.length() < 3){
                httpServletResponse.sendError(500, SignUpErrors.LOGIN_LENGTH.toString());
                return;
            }
            /*if(!userEJB.findUserById(login).isEmpty()){
                httpServletResponse.sendError(500, SignUpErrors.USER_EXISTS.toString());
                return;
            }*/
            if(!password.equals(repeatPassword)){
                httpServletResponse.sendError(500, SignUpErrors.PASSWORD_NOT_EQUAL.toString());
                return;
            }
            if(password.length() < 5){
                httpServletResponse.sendError(500, SignUpErrors.PASSWORD_LENGTH.toString());
                return;
            }
            // userEJB.createUser(login, password);
            httpServletResponse.setStatus(200);
        }
        catch (Exception e)
        {
            System.err.println("Signup error!");
            e.printStackTrace();
            httpServletResponse.sendError(500, SignUpErrors.UNDEFINED_ERROR.toString());
        }
    }

    @POST
    @Path("/logout")
    public void logOut(@Context HttpServletRequest httpServletRequest,
                       @Context HttpServletResponse httpServletResponse) {
        try {
            httpServletRequest.getSession().invalidate();
            return;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
