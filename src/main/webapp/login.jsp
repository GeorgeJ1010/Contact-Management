<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta name="google-signin-client_id" content="354739725161-49gg1fnf7qhehejirguegte1ovlkaup2.apps.googleusercontent.com">



<title>Insert title here</title>
<link rel="stylesheet" href="css/login.css">
</head>
<body>

<%

response.setHeader("Cache-Control","no-cache,no-store,must-revalidate");
if(session.getAttribute("user_id")!=null)
{
	session.invalidate();
	response.sendRedirect("/loginpage");
	
	
	//response.sendRedirect("/");
}



%>



	<div class="container">
		  <h4>Login</h4>
		  <input type="email" placeholder="Email" id="email" name="email"><br>
		  <input type="password" placeholder="Passwrod" id="pwd" name="pwd" ><br>
		  <input type="button"   value="login"  onclick="login()"><br>
		  <div class="g-signin2" data-onsuccess="onSignIn"></div><br>
		  <a onclick="location.href='/register';">New user? register</a>
	 </div>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	
	<script src="userjs.js"></script>
		
	


	
	
	


</body>
</html>