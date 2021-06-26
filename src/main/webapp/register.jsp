<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="css/login.css">

</head>
<body>


<%

response.setHeader("Cache-Control","no-cache,no-store,must-revalidate");
if(session.getAttribute("user_id")!=null){
	
	session.invalidate();
		response.sendRedirect("/register");

}
	//session.invalidate();
	//response.sendRedirect("/register");



%>

<div class="container">
	<h4>Register</h4>
	<input type="email" placeholder="Email" id="email" name="email">
	<br>
	<input type="password" placeholder="Password" id="pwd" name="pwd">
	<br>
	<input type="button" value="register" onclick="register()" /><br>
	<a href="/loginpage">login</a>
</div>
	<script src="userjs.js"></script>

</body>
</html>