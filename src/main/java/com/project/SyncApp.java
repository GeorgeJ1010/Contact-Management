package com.project;

import com.google.appengine.api.urlfetch.URLFetchService;
import com.google.appengine.api.urlfetch.URLFetchServiceFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.logging.Logger;

import com.google.appengine.api.urlfetch.HTTPRequest;
import com.google.appengine.api.urlfetch.HTTPResponse;
import org.json.JSONObject;
import org.mindrot.jbcrypt.BCrypt;

public class SyncApp {
	
	
		private static final Logger log = Logger.getLogger("logger");
	
	static URLFetchService fetcher = URLFetchServiceFactory.getURLFetchService();

	 static final String receiveKey = "9ac80b0c-d004-11eb-b8bc-0242ac130003";
     static final String sentKey = "0115daa6-d00a-11eb-b8bc-0242ac130003";
   
     

	 public static JSONObject sentRequest(HTTPRequest req) throws IOException
	 {
		JSONObject obj1=new JSONObject();
		int code = 500;
		int retryLimit=3;
		HTTPResponse res =null;
		int i=0;
		while(i<retryLimit)
		{
			log.info("registration attempt no : "+ i);
			res = fetcher.fetch(req);
			
            code= res.getResponseCode();
            log.info("code :"+code);
			if(code>=200 && code<300)
			{
				
				obj1.put("success", true);
				obj1.put("code",code);
				break;
			}
			else
			{
				i++;
			}
		}
		JSONObject json=new JSONObject(res);
		if(i>2)
		{
			obj1.put("message", json.get("message"));
			obj1.put("success", false);
			obj1.put("code",code);
		}
		return obj1;
	 }
	 
	 
     
     
     
     
     /*
     public static JSONObject sentRequest(URL url, JSONObject obj) throws IOException
	 {
         HMACAlgorithm hash=new HMACAlgorithm();

        //SyncApp sync=new SyncApp();
    	HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    	conn.setDoOutput(true);
    	conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("Authorization",   hash.calculateHMAC(SyncApp.sentKey,obj.toString()));
    	conn.setRequestMethod("POST");
    	conn.setReadTimeout(30000);
    	StringBuilder response =null;
		JSONObject obj1=new JSONObject();
		int code = 500;
		int retryLimit=3;
		int i=0;
		while(i<retryLimit)
		{
			log.info("registration attempt : "+ i);
			OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
			writer.write(obj.toString());
			writer.close();
            code = conn.getResponseCode(); 
            
            response = new StringBuilder();
            String line;
            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            
            while ((line = reader.readLine()) != null) {
            response.append(line);
            }

            reader.close();
            
            log.info("code :"+code);
			if(code>=200 && code<300)
			{
				
				obj1.put("success", true);
				obj1.put("code",code);
				break;
			}
			else
			{
				i++;
			}
		}

        JSONObject json=new JSONObject(response.toString());
        log.info("code :"+json.get("code").toString());
		if(i>2)
		{
			obj1.put("message", json.get("message"));
			obj1.put("success", false);
			obj1.put("code",code);
		}
		return obj1;
	 }
	 
	 */


}
