function onSignIn(googleUser) {
	  var profile = googleUser.getBasicProfile();
				  
	  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	  console.log('Name: ' + profile.getName());
	  console.log('Image URL: ' + profile.getImageUrl());
	  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	}
	
	
	  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  
  

    function onSignIn(googleUser){

/*	var profile = googleUser.getBasicProfile()
	console.log('ID: ' + profile.getId())
	console.log('Name: ' + profile.getName())
	console.log('Image URL: ' + profile.getImageUrl())
  	console.log('Email: ' + profile.getEmail())
*/
  console.log("inside onSignIn");
	var id_token = googleUser.getAuthResponse().id_token
	var xhr = new XMLHttpRequest()
	xhr.open("POST", "/google", true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    
    var data={"idtoken":id_token};
    xhr.send(JSON.stringify(data));
    
  
	xhr.onload = function() {
	  var data = JSON.parse(this.responseText)
	  if(data["success"]==true)
		{
            console.log("success +/")
			window.location.href = "/"
		}
	  else
		{
            console.log("failed +/loginpage")
            
			window.location.href = "/loginpage"
		}
	 
	}
	
}

  
 function login()
{

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/loginpage", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
      	

	
	var email=document.getElementById("email").value;
	
	
	var password=document.getElementById("pwd").value;
	

     var obj={"email":email,"password":password};

    console.log(JSON.stringify(obj));
    
    


	xhr.send(JSON.stringify(obj));
	
	
	xhr.onload=function()
	{
		var data=  JSON.parse(this.responseText);
		
		if(data["success"]==true)
		{
		window.location.href = "/";

		}
		else
			{
			alert("invalid username and password");
			}
		
		
		//console.log(data);
		
	}
	
	
	}
	
	
	function register()
{

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/register", true);
		xhr.setRequestHeader('Content-Type', 'application/json');
          	

		
		var email=document.getElementById("email").value;
		
		
		var password=document.getElementById("pwd").value;
		
	
	     var obj={"email":email,"password":password};
	
	    console.log(JSON.stringify(obj));


		xhr.send(JSON.stringify(obj));
		
		xhr.onload = function() {

			
			console.log("response text:"+this.responseText);
			var data=  JSON.parse(this.responseText);
           console.log("data:"+data);
            


			if(data["success"]==true)
				{
				
				alert("user created successfully!!");
				}
			else
				{
				alert("user already exist!!");
				
				}
			
			
			
            }
/*     fetch("https://georgefulltraining12.uc.r.appspot.com/register",{

        method:"POST",

        body:JSON.stringify({
            "email":email,
            "password":password,

        }),
         




     })
     .then(resonse=> response.json())
     .then(json=>console.log(json));

     
	
	
*/
}
	
