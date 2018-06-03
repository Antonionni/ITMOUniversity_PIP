package controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/")
public class PointsController {
    @GET
    @Path("/hello")
    public String hello() {
        return "Hello World!";
    }
}
