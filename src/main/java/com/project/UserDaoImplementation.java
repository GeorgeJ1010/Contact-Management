package com.project;

import java.util.Date;
import java.util.logging.Logger;

import org.json.JSONObject;

import com.google.appengine.api.datastore.*;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.repackaged.org.joda.time.DateTime;

public class UserDaoImplementation implements UserDao {
	private static final Logger log = Logger.getLogger(UserDaoImplementation.class.getName());

	@Override
	public boolean createUser(User user) {
		log.info(" inside createUser()");

		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

		Filter mailConstraint = new FilterPredicate("email", FilterOperator.EQUAL, user.getEmail());
		Query q = new Query("User").setFilter(mailConstraint);
		Entity entity = datastore.prepare(q).asSingleEntity();
		if (entity != null) {
			return false;
		} else {
			Entity e = new Entity("User", user.getUser_id());
			e.setProperty("email", user.getEmail());
			e.setProperty("active", user.isActive());
			e.setProperty("image", user.getImage());
			e.setProperty("password", user.getPassword());
			//e.setProperty("user_id", user.getUser_id());
			Date date = user.getCreatedDate();
			DateTime d = new DateTime(date);
			e.setProperty("created", d.getMillis());
			e.setProperty("updated", d.getMillis());

			datastore.put(e);
			return true;
		}

	}

	@Override
	public String getUserId(String email, String password) {

		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();

		Filter mailConstraint = new FilterPredicate("email", FilterOperator.EQUAL, email);
		Query q = new Query("User").setFilter(mailConstraint);

		Entity entity = ds.prepare(q).asSingleEntity();

		return entity.getKey().getName();

	}

	public JSONObject getUser(String userId) throws EntityNotFoundException {
		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();

		Key k = KeyFactory.createKey("User", userId);
		Entity entity = ds.get(k);
		if (entity != null) {

			JSONObject obj = new JSONObject();
			obj.put("email", entity.getProperty("email").toString());
			obj.put("image", entity.getProperty("image").toString());
			obj.put("active", (boolean) entity.getProperty("active"));
			obj.put("user_id", entity.getKey().getName());
			long d = Long.parseLong(entity.getProperty("created").toString());
			Date date = new Date(d);
			obj.put("date", date);
			return obj;

		} else {
			return null;
		}

	}

	public Boolean udpateImage( String userId, String name) throws EntityNotFoundException {

		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		System.out.println(userId);
		Key k = KeyFactory.createKey("User", userId);
		Entity entity = ds.get(k);
		System.out.println("i user image");
		if (entity != null) {
			entity.setProperty("image", name );
			ds.put(entity);
			return true;
		} else {
			return false;
		}
	}

	public boolean deleteUser(String userId) {

		DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		try {
			Key k = KeyFactory.createKey("User", userId);
			ds.delete(k);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

}
