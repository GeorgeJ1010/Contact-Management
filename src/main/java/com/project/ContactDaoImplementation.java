package com.project;


import java.util.*;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.repackaged.org.joda.time.DateTime;

public class ContactDaoImplementation implements ContactDao,DetailDao {
	
	
	
	
	
	
	DatastoreService datastore=DatastoreServiceFactory.getDatastoreService();
	
	@Override
	public String addContact(Contact c) {
		
		
		
		Entity contactEntity=new Entity("Contact",c.getContact_id());
		
		contactEntity.setProperty("firstName",c.getFirstName() );
		contactEntity.setProperty("lastName",c.getLastName()); 
		contactEntity.setProperty("address", c.getAddress());
		contactEntity.setProperty("contact_id", c.getContact_id());
		Date date=c.getCreatedDate();
		DateTime d=new DateTime(date);
		contactEntity.setProperty("created",d.getMillis());
		contactEntity.setProperty("updated", d.getMillis());
		contactEntity.setProperty("isDeleted", c.isDeleted());
		
		
		datastore.put(contactEntity);
		
		return c.getContact_id().toString();
		
		
		 
		
	}

	@Override
	public String addDetail(Detail d,String contact_id) throws EntityNotFoundException {
		// TODO Auto-generated method stub
		Key key=KeyFactory.createKey("Contact",contact_id);
		 Entity contactEntity=datastore.get(key);
		 
		 
		Entity detailEntity=new Entity("Detail",d.getDetail_id(),contactEntity.getKey());
		
		
		detailEntity.setProperty("contactType",d.getContactType() );
		detailEntity.setProperty("value",d.getValue());
		detailEntity.setProperty("detail_id", d.getDetail_id());
		detailEntity.setProperty("contact_id", contact_id);
		Date date=d.getCreatedDate();
		DateTime dateTime=new DateTime(date);
		
		detailEntity.setProperty("created", dateTime.getMillis());
		detailEntity.setProperty("updated",dateTime.getMillis());
		detailEntity.setProperty("isDeleted", d.isDeleted());
		datastore.put(detailEntity);
		return d.getDetail_id();
	}

	@Override
	public JSONObject addContactWithDetails(JSONObject  jsonobject)
	{
		
		
		  
	      
		  JSONObject jsoncontact=jsonobject.getJSONObject("contact");
		              
		  
		  if(jsoncontact.length()!=4)
		  {

			 
 	 		JSONObject obj=new JSONObject();
	    		obj.put("status", false);
	    		obj.put("code", 400);
	    		obj.put("message", "some attribute values missing" );
	    	
	    		return obj;
			  
		  }
		  
		  
		  String firstName=jsoncontact.getString("firstName");
		  String lastName=jsoncontact.getString("lastName");
		  String contactType;
		  String value;
		  boolean isValidEmail=false;
		  boolean isValidPhone=false;
		  JSONArray jsonArray;
		  JSONObject createJson=new JSONObject();
		  
		  createJson.put("firstName",firstName);
		  createJson.put("lastName", lastName);
		  
		  
		  boolean check=true;
		  int count=0;
		  if(jsoncontact.has("detail"))
		  {
			  jsonArray=jsoncontact.getJSONArray("detail");
			  

            for(int i=0;i<jsonArray.length();i++)
            {
          	  
          	  if(Validation.isValidType(jsonArray.getJSONObject(i).getString("contactType"))==false)
          	  {
          		  count=i+1;
          		  check=false;
          		  break;
          		  
          	  }
          	  if(jsonArray.getJSONObject(i).getString("contactType").equals("email")==true && Validation.isValidEmail(jsonArray.getJSONObject(i).getString("value"))==false)
          	  {
          		  count=i+1;
          		  check=false;
          		  break;
          	  }
          	  else
          		  if(jsonArray.getJSONObject(i).getString("contactType").equals("phone")==true && Validation.isValidNumber(jsonArray.getJSONObject(i).getString("value"))==false)
          		  {
          			  count=i+1;
          			  check=false;
          			  break;
          		  }
 	  
            }
			  
		  }
		  
		  
		  if(check==false)
		  {
			 
 	 		JSONObject obj=new JSONObject();
	    		obj.put("status", false);
	    		obj.put("code", 400);
	    		obj.put("message", count+"th "+"detail"+" has improper format of email/phone" );
	    		//response.getWriter().print(obj);
	    		return obj;
			  
		  }
		  
		  
		  
		  
		  if(Validation.isFirstNameExist(firstName)   && Validation.isLastNameExist("lastName") )
		{
			  
			   String address=jsoncontact.getString("address");
			  
			   
			    if(Validation.isValidAddress(address))
			    {
			    	createJson.put("address", address);
			    	 jsonArray=jsoncontact.getJSONArray("detail");
			    	
			    	
			    	Contact contact=new Contact(firstName,lastName,address);
			        createJson.put("contact_id",contact.getContact_id());    	
			    	createJson.put("created",contact.getCreatedDate());
			    	
		            
			    	 for(int i=0;i<jsonArray.length();i++)
			         {
			    		 	contactType= jsonArray.getJSONObject(i).getString("contactType");
			    		 	
			    		      
			    		   	value= jsonArray.getJSONObject(i).getString("value");
			    		   	
			    		 	     if(Validation.isValidType(contactType)==true)
			    		 	     {
			    		 		  
			    		 	         isValidEmail=false;
			    		 	         isValidPhone=false;
			    		 	    	if(contactType.equals("email"))
			    		 	    	{
			    		 	    	 		isValidEmail=  Validation.isValidEmail(value);
			            	        }
			    		 	    	if(contactType.equals("phone")) 
			    		 	    	{
			    		 	    	 		isValidPhone=Validation.isValidNumber(value);
			    		 	    	}
			    		 	    	
			    		 	    	
			    		 	    	 	if(isValidEmail==true || isValidPhone==true) 
			    		 	    	 	{
			    		
			    		 	    	    	Detail detail= new Detail(contactType,value);
			    		 	    	    	jsonArray.getJSONObject(i).put("contact_id",contact.getContact_id());
			    		 	    	    	jsonArray.getJSONObject(i).put("detail_id",detail.getDetail_id());
			    		 	    	    	jsonArray.getJSONObject(i).put("created", detail.getCreatedDate());
			    		 	    	    	ContactDaoImplementation c=new ContactDaoImplementation();
			    		 	    	    	c.addContact(contact);
			    		 	    	    	try {
			    		 	    	    		c.addDetail(detail, contact.getContact_id());
			    		 	    	    	} catch (EntityNotFoundException e) {
			    		 	    	    		JSONObject obj=new JSONObject();
			    		 	    	    		// response.setStatus(400);
			    		 	    	    		obj.put("status", "failed");
			    		 	    	    		obj.put("code", 400);
			    		 	    	    		obj.put("message", "entity not found");
			    		 	    	    		//response.getWriter().print(obj);
			    		 	    	    		return obj;
			    		 	    	    		}
			    		 	    
			    		 	    	    }
			    		 	    	 	else
			    		 	    	 	{ //response.setStatus(400);
			    		 	    	 		JSONObject obj=new JSONObject();
		    		 	    	    		obj.put("status", false);
		    		 	    	    		obj.put("code", 400);
		    		 	    	    		obj.put("message", i+1+"th "+"detail"+" didnt get added due to improper format of email/phone" );
		    		 	    	    		//response.getWriter().print(obj);
		    		 	    	    		return obj;
			    		 	    	 		
			    		 	    	 		
			    		 	    	 	}
			    		 	    	    	
			    		 	    	    	
	          			
	          			
			    		 
			    		 
			         	}else
			         	{ //response.setStatus(400);
			         		JSONObject obj=new JSONObject();
			         		obj.put("status", false);
			         		obj.put("code", 400);
			         		obj.put("message", i+1+"th "+"detail"+"didnt get added due to improper contactType it must be either email/phone" );
			         		//response.getWriter().print(obj);
	    	    			return obj;
			         		
			         	}
			         
			    	
			    	
			    
			         } 
			  
			  
                			  
					}else
					{   //response.setStatus(400);
						JSONObject obj=new JSONObject();
		         		obj.put("status", false);
		         		obj.put("code", 400);
		         		obj.put("message","improper address format,it must be alphanumeric");
		         		//response.getWriter().print(obj);
	    	    			return obj;
				    }
			    
		}else
			{ //response.setStatus(400);
				JSONObject obj=new JSONObject();
     		obj.put("status", false);
     		obj.put("code", 400);
     		obj.put("message","firstName/lastName is not in proper format");
     		//response.getWriter().print(obj);
	    			return obj;
		    }
		  
		  createJson.put("detail",jsonArray );
		//  response.setStatus(200);
		  JSONObject obj=new JSONObject();
   		obj.put("status", true);
   		obj.put("code", 200);
   		obj.put("message","added");
   		obj.put("contact",createJson);
   		//response.getWriter().print(obj);
		  return obj;
		  
		  
}

	

	
	public long updatedDate()
	{
		 DateTime now = new DateTime();
	        
	return now.getMillis();
	}
	public void changeFirstName(Entity contact,String firstName)
	{
	    contact.setProperty("updated", updatedDate());	
		contact.setProperty("firstName", firstName);
		datastore.put(contact);
	
	}
	public void changeLastName(Entity contact,String lastName)
	{
		contact.setProperty("updated", updatedDate());	
		contact.setProperty("lastName", lastName);
		datastore.put(contact);
		
	}
	public void changeAddress(Entity contact,String address)
	{
		contact.setProperty("updated", updatedDate());
		contact.setProperty("address", address);
		datastore.put(contact);	
		
	}
	public void changeContactType(Entity detail,Entity contact,String contactType)
	{
		long date=updatedDate();
		contact.setProperty("updated", date);
		detail.setProperty("updated",date);
		detail.setProperty("contactType", contactType);
		datastore.put(detail);	
		
	}
	public void changeValue(Entity detail,Entity contact,String email)
	{
		long date=updatedDate();
		contact.setProperty("updated", date);
		detail.setProperty("updated", date);
		detail.setProperty("value", email);
		datastore.put(detail);	
		
	}

	@Override
	public JSONObject updateContactWithDetails(JSONObject jsonObject,String contact_id) {

			JSONObject createJson=new JSONObject();
			
			
			Entity contactEntity = null;
			Entity detailEntity=null;
			JSONObject jsonContact=jsonObject.getJSONObject("contact");
			//String contact_id=jsonContact.getString("contact_id");
			createJson.put("contact_id",contact_id);
        
			Key key=KeyFactory.createKey("Contact",contact_id);
			try {
				 contactEntity= datastore.get(key);
				 if(contactEntity.getProperty("isDeleted").equals(true))
				 {
					 JSONObject obj=new JSONObject();

					 	obj.put("status", "failed");
			    		obj.put("code", 400);
			    		obj.put("message", "contact doesnt exist/ deleted");
			    		return obj;
				 }
				 
			} catch (EntityNotFoundException e) {
				JSONObject obj=new JSONObject();
			  //  response.setStatus(400);
	    		obj.put("status", "failed");
	    		obj.put("code", 400);
	    		obj.put("message", "entity not found");
	    		//response.getWriter().print(obj);
	    		return obj;
			}

         if(jsonContact.has("firstName")==true)
         {
        	 String firstName=jsonContact.getString("firstName");
          	
        	
        	 if(Validation.isFirstNameExist(firstName)) {
        		 changeFirstName(contactEntity,firstName);
        		 long d= Long.parseLong(contactEntity.getProperty("updated").toString());
   	 	      		Date date = new Date(d);
        		 createJson.put("updated",date);
            	 createJson.put("firstName",firstName);
        	 }
        	 else
        	 {  JSONObject obj=new JSONObject();
        	 //   response.setStatus(400);
        		obj.put("status", false);
           		obj.put("code", 400);
           		obj.put("message","firstName is not in proper format");
           		//response.getWriter().print(obj);
    	    			return obj;
        	 }
        	 

       
        		  
         }
          if(jsonContact.has("lastName")==true)
          {
        	  	 String lastName=jsonContact.getString("lastName");
        	  	 
        	   if(Validation.isLastNameExist(lastName)) {
            		 	changeLastName(contactEntity,lastName);
            		 	long d= Long.parseLong(contactEntity.getProperty("updated").toString());
       	 	      		Date date = new Date(d);
            			createJson.put("updated",date);
	                	createJson.put("lastName",lastName);
	                	
        	   }
            	 else
            	 {
            	    //response.setStatus(400);
            		JSONObject obj=new JSONObject();
            		obj.put("status", false);
               		obj.put("code", 400);
               		obj.put("message","lastName is not in proper format");
               	//	response.getWriter().print(obj);
        	    			return obj;
            	 
            	 }
            }
            if(jsonContact.has("address")==true)
            {
            	String address=jsonContact.getString("address");
            	
            	
            	if(Validation.isValidAddress(address)) {
            		changeAddress(contactEntity,address);
            		long d= Long.parseLong(contactEntity.getProperty("updated").toString());
   	 	      		Date date = new Date(d);
            		createJson.put("updated",date);
                	createJson.put("address",address);
            	}
            	else
            	{   //response.setStatus(400);
            		JSONObject obj=new JSONObject();
	         		obj.put("status", false);
	         		obj.put("code", 400);
	         		obj.put("message","improper address format,it must be alphanumeric");
	         		//response.getWriter().print(obj);
	    			return obj;
    	    	}
            	
            	
            }
            if(jsonContact.has("detail")==true) {   
            
            	
            	JSONArray arr=jsonContact.getJSONArray("detail");
            	
            	  
            	for(int i=0;i<arr.length();i++)
            	{
            		
            		createJson.put("detail",arr);
            		
            		String detailContact_id=arr.getJSONObject(i).getString("contact_id");
            		
            		String detail_id =arr.getJSONObject(i).getString("detail_id");
            		Key k=new KeyFactory.Builder("Contact", detailContact_id)
    				        .addChild("Detail",detail_id)
    				        .getKey();
            	   
					try {
						detailEntity = datastore.get(k);
						//response.getWriter().print("successful");
						
					} catch (EntityNotFoundException e) {
						JSONObject obj=new JSONObject();
						// response.setStatus(400);
 	    	    		obj.put("status", "failed");
 	    	    		obj.put("code", 400);
 	    	    		obj.put("message", "entity not found");
 	    	    	//	response.getWriter().print(obj);
 	    	    		return obj;
					}
				  if(arr.getJSONObject(i).has("contactType")==false)
					  {
						  String contactType=detailEntity.getProperty("contactType").toString();
						  String s=arr.getJSONObject(i).getString("value");
						  if( (contactType.equals("email")==true &&  Validation.isValidEmail(s) )
								  || (contactType.equals("phone")==true &&  Validation.isValidNumber(s) ) )
						  {
							  changeValue(detailEntity,contactEntity,s);
								long d= Long.parseLong(contactEntity.getProperty("updated").toString());
	           	 	      		Date date = new Date(d);
	           	 	      		createJson.put("updated",date);
	           	 	      		arr.getJSONObject(i).put("updated", date);      		
	           	 	      		
						  }
						    else
							  {JSONObject obj=new JSONObject();
				              // response.setStatus(400);
				               obj.put("status", false);
				               obj.put("code", 400);
				               obj.put("message","phonenumber/email type mismatched");
				              // response.getWriter().print(obj);
				               return obj;  
								  
							  }
						  
						  
					  }
				  else {
            	    String contactType=arr.getJSONObject(i).getString("contactType");
            	    String value=arr.getJSONObject(i).getString("value");
            	    
            	    
            	    if(Validation.isValidType(contactType)==true)
            	     {
            	    	  if( (contactType.equals("email")&& Validation.isValidEmail(value) )
            	    			 || (contactType.equals("phone")&& Validation.isValidNumber(value)) )
            	    	  {
            	    		  changeValue(detailEntity,contactEntity,value);
            	    		  changeContactType(detailEntity,contactEntity,contactType);
            	    		  long d= Long.parseLong(contactEntity.getProperty("updated").toString());
	           	 	      		Date date = new Date(d);
	           	 	      		createJson.put("updated",date);
	           	 	      		arr.getJSONObject(i).put("updated", date);      
            	    	  }
            	    	    else
            	    		  {//response.setStatus(400);
            	    		  JSONObject obj=new JSONObject();
            	        	  obj.put("status", false);
            	        	  obj.put("code", 400);
            	        	  obj.put("message", "phonenumber/email is not in proper format!");
            	        	 // response.getWriter().print(obj);
            	        	  return obj;
            	    		  }
            	    	  
            	      }else
            	      	{
            	    	 // response.setStatus(400);
            	    	  JSONObject obj=new JSONObject();
            	    	  obj.put("status", false);
            	    	  obj.put("code", 400);
            	    	  obj.put("message", "contacttype is not in proper format!");
            	    	 // response.getWriter().print(obj);
            	    	  return obj;
            	      		
            	      	}
            	    
            	    
            	   
				  }
                	datastore.put(contactEntity);
	                   datastore.put( detailEntity);
               
            	   
            	}
            	
            	
            
            	
            }
        
           // response.setStatus(200);
            JSONObject obj=new JSONObject();
	    	    obj.put("status", true);
	    	    obj.put("code", 200);
	    	    obj.put("contact",createJson);
	    	    obj.put("message", "updated");
	    	  //  response.getWriter().print(obj);

		return obj;
		
		
		
	}
		
	public JSONArray displayQuery(Query q,boolean val) {
		
		JSONArray contactList=new JSONArray();
		
		
		  long d;
		  Date date;
		 for (Entity contactEntity : datastore.prepare(q).asIterable()) {
				
			 JSONObject contact=new JSONObject();
			 contact.put("firstName", contactEntity.getProperty("firstName").toString());
			 contact.put("lastName", contactEntity.getProperty("lastName"));
			 contact.put("address", contactEntity.getProperty("address"));
			 contact.put("contact_id",contactEntity.getProperty("contact_id"));
			 
			 d= Long.parseLong(contactEntity.getProperty("created").toString());
	 	      date = new Date(d);
	 	      contact.put("created",date);
			 d= Long.parseLong(contactEntity.getProperty("updated").toString());
			 	      date = new Date(d);
			 	      contact.put("updated",date);
			
			 JSONArray detailList=new JSONArray();
			 Filter propertyFilter =
				        new FilterPredicate("isDeleted", FilterOperator.EQUAL,val );
			  
 Query qp= new Query("Detail").setAncestor(contactEntity.getKey()).addSort("updated", SortDirection.DESCENDING).setFilter(propertyFilter);
			 for(Entity  detailEntity: datastore.prepare(qp).asIterable())
			 {
				 	 JSONObject detail=new JSONObject();
				 	 
				 	d= Long.parseLong(detailEntity.getProperty("created").toString());
			 	      date = new Date(d);
			 	      detail.put("created",date);
		 
		
					 d= Long.parseLong(detailEntity.getProperty("updated").toString());
					 	      date = new Date(d);
					 	      detail.put("updated",date);
				 
				 detail.put("contactType",detailEntity.getProperty("contactType"));
			     detail.put("value", detailEntity.getProperty("value"));
			     detail.put("detail_id",detailEntity.getProperty("detail_id"));
			     detail.put("contact_id",detailEntity.getProperty("contact_id"));
			     
				 detailList.put(detail);
			 }
			 contact.put("detail",detailList);
			 contactList.put(contact);
			 
			      
		 }
		return contactList;
		
		
	}

	@Override
	public JSONObject displayContact(String pathInfo,boolean val) {
		// TODO Auto-generated method stub
		JSONArray contactList=new JSONArray();
	     long d;
		  Date date;
		  JSONObject contact=new JSONObject();
		  JSONObject demo=new JSONObject();


			String path[] = null;
			if(     pathInfo!=null && pathInfo.contains("garbage")==false) {
			
		path=pathInfo.split("/");
		  
		  String contact_id=path[1];
		 Entity contactEntity=null;
		 Key key=KeyFactory.createKey("Contact", contact_id );
		  try {
			 contactEntity=datastore.get(key);
		} catch (EntityNotFoundException e) {
			// TODO Auto-generated catch block
			 
			e.printStackTrace();
		}
		  
		  if(contactEntity.getProperty("isDeleted").equals(true))
		  {
			  
			  //response.setStatus(200);
		      JSONObject obj=new JSONObject();
			    obj.put("status", false);
			    obj.put("code", 400);
			    obj.put("message", "contact already deleted");
			//    response.getWriter().print(obj);
			    return obj;
			  
		  }
		  
		   Filter propertyFilter =
			        new FilterPredicate("isDeleted", FilterOperator.EQUAL,val );
		  
		 	Query q=new Query("Detail").setAncestor(contactEntity.getKey()).addSort("updated", SortDirection.DESCENDING).setFilter(propertyFilter);
		 	JSONArray detailList=new JSONArray();
		 	
		 	for(Entity  detailEntity: datastore.prepare(q).asIterable())
			 {
				 	 JSONObject detail=new JSONObject();
				 	 
				 	d= Long.parseLong(detailEntity.getProperty("created").toString());
			 	      date = new Date(d);
			 	      detail.put("created",date);
		 
		
					 d= Long.parseLong(detailEntity.getProperty("updated").toString());
					 	      date = new Date(d);
					 	      detail.put("updated",date);
				 
				 detail.put("contactType",detailEntity.getProperty("contactType"));
			     detail.put("value", detailEntity.getProperty("value"));
			     detail.put("detail_id",detailEntity.getProperty("detail_id"));
			     detail.put("contact_id",detailEntity.getProperty("contact_id"));
			     
				 detailList.put(detail);
			 
			 }
		 	contact.put("firstName", contactEntity.getProperty("firstName"));
		 	contact.put("lastName",  contactEntity.getProperty("lastName"));
		 	contact.put("contact_id", contactEntity.getProperty("contact_id"));
		 	 d= Long.parseLong(contactEntity.getProperty("created").toString());
		      date = new Date(d);
		      contact.put("created",date);
			 d= Long.parseLong(contactEntity.getProperty("updated").toString());
			 	      date = new Date(d);
			 	      contact.put("updated",date);
		 	contact.put("detail",detailList);
		 	
		 	// response.setStatus(200);
		      JSONObject obj=new JSONObject();
			    obj.put("status", true);
			    obj.put("code", 200);
			    obj.put("contact",contact);
			    obj.put("message", "contact displayed");
			//    response.getWriter().print(obj);
			    return obj;
		
	}
			else
			{
				 Filter propertyFilter =
					        new FilterPredicate("isDeleted", FilterOperator.EQUAL,val);
				Query q=new Query("Contact").addSort("updated",SortDirection.DESCENDING).setFilter(propertyFilter);
				  contactList=displayQuery(q,val);

					 //response.setStatus(200);
			      JSONObject obj=new JSONObject();
				    obj.put("status", true);
				    obj.put("code", 200);
				    obj.put("contact",contactList);
				    obj.put("message", "display contact by modified date");
				    //response.getWriter().print(obj);
				    return obj;
			}
	
}
	
	

	@Override
	public JSONObject deleteContact(String contact_id) {

		  long d;
		  Date date;
		Key key=KeyFactory.createKey("Contact", contact_id);
		
  
  	
			        Entity contactEntity=null;
				try {
					contactEntity = datastore.get(key);
				} catch (EntityNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			
				
		   
		     JSONObject jsonObject=new JSONObject();
		     Query q=new Query("Detail").setAncestor(contactEntity.getKey());
		     JSONArray detailList=new JSONArray();
		        JSONObject contact=new JSONObject();
		     
		        //demo.put("firstName",contactEntity.getProperty("firstName"));
			     
		       for(Entity detailEntity:datastore.prepare(q).asIterable())
		        {
		        	

				 	 JSONObject detail=new JSONObject();
				 	 
				 	d= Long.parseLong(detailEntity.getProperty("created").toString());
			 	      date = new Date(d);
			 	      detail.put("created",date);
		 
		
					 d= Long.parseLong(detailEntity.getProperty("updated").toString());
					 	      date = new Date(d);
					 	      detail.put("updated",date);
				 
				 detail.put("contactType",detailEntity.getProperty("contactType"));
			     detail.put("value", detailEntity.getProperty("value"));
			     detail.put("detail_id",detailEntity.getProperty("detail_id"));
			     detail.put("contact_id",detailEntity.getProperty("contact_id"));
			     
				 detailList.put(detail);
		        	detailEntity.setProperty("isDeleted", true);
		        	datastore.put(detailEntity);
		        	
		        }
		        
		        contactEntity.setProperty("isDeleted", true);
		        datastore.put(contactEntity);
		        
		        contact.put("firstName", contactEntity.getProperty("firstName"));
			 	contact.put("lastName",  contactEntity.getProperty("lastName"));
			 	contact.put("contact_id", contactEntity.getProperty("contact_id"));
			 	 d= Long.parseLong(contactEntity.getProperty("created").toString());
			      date = new Date(d);
			      contact.put("created",date);
				 d= Long.parseLong(contactEntity.getProperty("updated").toString());
				 	      date = new Date(d);
				 	      contact.put("updated",date);
			 	contact.put("detail",detailList);
			 	
			 	// response.setStatus(200);
			      JSONObject obj=new JSONObject();
				    obj.put("status", true);
				    obj.put("code", 200);
				    obj.put("contact",contact);
				    obj.put("message", "contact deleted");
				//    response.getWriter().print(obj);
				    return obj;
				//return demo;
		        
		      
		        
		
	}
	
	
}