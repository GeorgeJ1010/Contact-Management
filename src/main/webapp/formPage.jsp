<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
    
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>

<%
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService(); 
%>

    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta name="google-signin-client_id" content="354739725161-49gg1fnf7qhehejirguegte1ovlkaup2.apps.googleusercontent.com">




<title>Contact-Management</title>
<link rel="stylesheet" href="css/main2.css">








</head>



<style>
li{
list-style-type:none;

}

</style>


<body onload="getContact()">









	
	<div class="headerContainer">
		<h3>Contact Manager</h3>
	</div>
	
	<div class=sideBar>
	  	<div class="imageHover" id="profileButton">
			<img src="images/profile.png" height="50px" width="50px" onclick="getProfile();setActive('profileButton');toggleProfile();" />
		</div>
		<div class="imageHover active" id="feedButton">
			<img src="images/feed.png" height="50px" width="50px" onclick="getContact();setActive('feedButton');toggleToFeed();"/>
		</div>
  </div>




	<div id="myProfile" >

			<div class="email">
			<div class="profilePic" id="profilePic">
				<img id="proPic"  onclick="clicker()" width="250" height="250" >
				<form  action="<%=blobstoreService.createUploadUrl("/upload") %>" id="myForm" method="POST" enctype="multipart/form-data">
  		   			<input type="file" id="img" name="img" onchange="preview()" accept="image/*"  style="display:none;"    ><br><br>
					<input type="submit" id="subButton"   style="display:none;">
				</form>
			</div>
			<div class="data">
				<h4>Email:</h4>
				
				<ul>
             <li id="emailHolder"></li></ul>
			</div>		  
 		  </div>


</div>

<!-- 
<div   id="container" class="flex-container">

  <div id="contact" class="flex-item-left"> </div>
  <div id="detail" class="flex-item-right"> </div>
 
</div>  -->
<div id="data">
</div>


<div class="popup" id="popup-1">

  <div class="overlay"></div>
  <div class="content">
    <div class="close-btn" onclick="togglePopup()">&times;</div>
    <h1>Title</h1>
    <form>
		
		firstName:     <input id="firstid"  name="firstName" required /><br/>
		lastName:             <input id="lastid" type="text" name="lastName"/><br/>
		address:   <input id="addressid" type="text" name="address"/><br/>
		tag:   <select id="tagid" name="tag" class="ex">
			<option value="important">    important 
		 	<option value="personal">    personal     
		 	<option value="spam"> spam
		 	<option value="official"> official
 	
			</select><br/>

		<div id="container1">
		contactType:   <select id="selectid" name="contactType" class="ex">
			<option value="phone">    phone 
		 	<option value="email">    email     </option>
		</select>
		
		<input id="inputid" type="text" name="value"  class="ex"/> 
		</div>
		
		
		
		
		<input type="button" value="add" onclick="addMoreField()"/>
		<input type="button" value="remove" onclick="removeDiv()"/>  <br/>
		
		 <input type="button" value="submit" onclick="addContact();" />
		 
		 
 

 
 


</form>


</div>

<div class="modal">

    <div class="modal-box">

        <span class="close-btn" onclick="toggleModal()">X</span>

	
		firstName: <input id="Ufirstid"  name="firstName" required /><br/>
		lastName:  <input id="Ulastid" type="text" name="lastName"/><br/>
		address:   <input id="Uaddressid" type="text" name="address"/><br/>
			tag:    <select id="Utagid" name="tag" class="ex">
						<option value="important">    important 
					 	<option value="personal">    personal     
					 	<option value="spam"> spam
					 	<option value="official"> official	
					</select><br/>

					<div id="container2">

					</div>
		
		 <input type="button" value="submit" id="updater"/>
		 
    </div>
</div>





 <br/>
 
 <div id="buttons">
 
  <select id="catid" name="category" class="ex">
	<option value="important">important     </option>
 	<option value="spam">spam         </option>
 	<option value="official">    official     </option>
 	<option value="personal">    personal     </option>
  </select>
  
  <input type="button" value="category" onclick="getContactByCategory()"/>
  
	<input type="button" value="Add contact" onclick="togglePopup()" width="40" height="40"> 

	<input type="button" value="Deleted Contacts" id="delete" src= "images/delete.png" onclick="getDeletedContact()" width="40" height="40"> 
 	<input type="button" value="logout" onclick="logoutfn()"/>
	<input type="button" value="addcontact" onclick="addfn()"/>
 	<input type="button" value="deleteall" onclick="showMessage(),deleteAll()"/>
 

</div>




<script>

    function signOut() {
      
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    logoutfn();
  }
  
function onLoad() {
gapi.load('auth2', function() {
gapi.auth2.init();
});
}

</script>

  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  

<script type="text/babel" src="js/file2.js"></script>


<script type="text/javascript" src="js/cachejs.js">
</script>

<script type="text/javascript" src="js/profilejs.js">
</script>

<script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>






</body>
</html>