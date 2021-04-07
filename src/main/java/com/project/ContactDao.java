package com.project;

import org.json.JSONArray;
import org.json.JSONObject;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;

public interface ContactDao  {
	
	
	
	public abstract String addContact(Contact c);
	public abstract JSONObject addContactWithDetails(JSONObject jsonobject);
    public abstract JSONObject updateContactWithDetails(JSONObject jsonObject,String contact_id);
	public abstract JSONObject displayContact(String pathInfo,boolean val);
	public abstract JSONObject deleteContact(String contact_id);
	
	
	

}