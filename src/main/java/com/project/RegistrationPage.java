package com.project;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.appengine.api.urlfetch.FetchOptions;
import com.google.appengine.api.urlfetch.HTTPHeader;
import com.google.appengine.api.urlfetch.HTTPMethod;
import com.google.appengine.api.urlfetch.HTTPRequest;


import org.json.JSONObject;
import org.mindrot.jbcrypt.BCrypt;

@WebServlet("/register")
public class RegistrationPage extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger("logger");

    public RegistrationPage() {
        super();
        // TODO Auto-generated constructor stub
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // TODO Auto-generated method stub

        request.getRequestDispatcher("register.jsp").forward(request, response);

    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*"); 
		HMACAlgorithm hash=new HMACAlgorithm();        
	    StringBuffer jb = new StringBuffer();
	    PrintWriter out=response.getWriter();
	    String line = null;
	    BufferedReader reader = request.getReader();
	    while ((line = reader.readLine()) != null)
	        jb.append(line);
	    String str=jb.toString();
        JSONObject json=new JSONObject(str.toString());
        UserDao userOp=new UserDaoImplementation();
        response.setContentType("application/json");

        try {
        	
	        	String Origin = request.getHeader("Origin");
		    	String email=json.get("email").toString();
				String pass=BCrypt.hashpw(json.get("password").toString(),BCrypt.gensalt(10));
				String inboundAppId=request.getHeader("X-Appengine-Inbound-Appid");
		    	UUID id=UUID.randomUUID();
		        User user=new User(email,pass);

				JSONObject resp=new JSONObject();
				
				if(inboundAppId!=null && inboundAppId.equals("georgefulltraining12")) 
				{
					
					String token=request.getHeader("Authorization");
					if(token.equals(hash.calculateHMAC(SyncApp.receiveKey, json.toString())))
					{
				    	String userId=json.get("user_id").toString();
						user.setUser_id(userId.toString());
						Boolean obj=userOp.createUser(user);
						
						if(obj!=false) 
						{			
							
							log.severe("User Registration succesful");
							resp.put("message", "User registered successfully");
							response.setStatus(200);
							resp.put("success", true);
							resp.put("code",200);
							
							}
						else
						{	
								log.severe("User already present");
								resp.put("message", "User already present");
								response.setStatus(400);
								resp.put("success", false);
								resp.put("code",400);
						}
					}
					else
					{
						response.sendError(401);
					}
			
				}
				else if(Origin!=null && Origin.equals("http://localhost:8080")||Origin.equals("https://malkarajtraining12.uc.r.appspot.com"))
				{
					user.setUser_id(id.toString());
					Boolean obj=userOp.createUser(user);
					if(obj!=false)
					{
							
						if(inboundAppId==null || !(inboundAppId.equals("malkarajtraining12")))
						{
				             //Creating Request and adding necessery headers
							  final String uri="https://georgefulltraining12.uc.r.appspot.com/register";
				              URL url=new URL(uri);
				              FetchOptions options = FetchOptions.Builder.withDefaults();
				              options.setDeadline(10d);
				              options.doNotFollowRedirects();
				   			  HTTPRequest req = new HTTPRequest(url, HTTPMethod.POST,options);
	                          JSONObject reqObj=new JSONObject();
							  reqObj.put("email", email);
							  reqObj.put("password", pass);
							  reqObj.put("user_id", id);
							  req.setPayload(reqObj.toString().getBytes());
							  req.addHeader(new HTTPHeader("Authorization", hash.calculateHMAC(SyncApp.sentKey, reqObj.toString())));
							  //
							  
							  resp=SyncApp.sentRequest(req);
							  if(resp.get("success").toString().equals("true"))
								{
									log.info("User succesfully registered in cross domain");
									resp.put("detail", email);
									response.setStatus(200);
								}
							  else
								{
									log.severe("User registration failed due to exceeding retry limit");
									response.setStatus(Integer.parseInt(resp.get("code").toString()));
								}						
						}							
						
					}
					else
					{	
							log.severe("User already present");
							resp.put("message", "User already present");
							response.setStatus(400);
							resp.put("success", false);
							resp.put("code",400);
					}
				}
				else
				{
					response.sendError(401);
<<<<<<< HEAD
=======

>>>>>>> 65bc13a584724109437b8693f40a371190ae85cb
				}
				out.println(resp);
        
		} 
       catch(SocketTimeoutException s)
       {
           JSONObject obj=new JSONObject();
           response.setStatus(500);
           obj.put("success", false);
           obj.put("code", 500);
           obj.put("message", "Socket Timeout");
           out.println(obj);   	
       }
       
       
       catch (Exception q) {
          JSONObject obj=new JSONObject();
          response.setStatus(400);
          obj.put("success", false);
          obj.put("code", 400);
          obj.put("message", "Invalid user");
          out.println(obj);
          q.printStackTrace();
	}
             
   }


    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException 
    { 
        // pre-flight request processing
        resp.setHeader("Access-Control-Allow-Origin", "https://georgefulltraining12.uc.r.appspot.com/");
        resp.setHeader("Access-Control-Allow-Methods", "POST");
        resp.setHeader("Access-Control-Allow-Headers", "*");
        System.out.println("in preflight");
    }

}

