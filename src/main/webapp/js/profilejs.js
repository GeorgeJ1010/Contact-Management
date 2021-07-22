var getProfile=()=>{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/user", true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send();
		xhr.onload = function() 
		{
			var data=JSON.parse(this.responseText);
			Cache.set("user",data.user)
			appendProfile(data)
		}
}



var appendProfile=(data)=>{
	
document.getElementById("proPic").src="/serve?blob-key="+data.user.image
document.getElementById("emailHolder").innerHTML=data.user.email

}




/*var appendProfile=(data)=>{
	console.log("appendprofile")
	var element=document.getElementById("myProfile")

	txt=`<h2>Profile</h2>`
	txt1=`<div class="email">
			<div class="profilePic" id="profilePic">
				<img id="proPic" src="/profile_pics/${data.user.image}" onclick="clicker()" width="250" height="250" >
				<form id="myForm" method="POST" enctype="multipart/form-data">
  		    		<input type="file" id="img" name="img" onchange="preview()" accept="image/*"  style="display:none;"    ><br><br>
					<input type="button" id="subButton" onclick="uploadProfile('${data.user.email}','${data.user.user_id}','${data.user.image}')" value="submit"  style="display:none;">
					<input type="text" name="email"  style="display:none;" >
					<input type="text" name="userId"  style="display:none;">
				<form>
			</div>
			<div class="data">
				<h4>Email:</h4>${data.user.email}
			</div>		  
 		  </div>`

			


	element.innerHTML=txt1
}*/
var clicker=()=>{
		document.getElementById("img").click()
		}

var preview=()=>{
				if(document.getElementById("img").files[0]!=null)
				{
					var oFReader = new FileReader();
	        		oFReader.readAsDataURL(document.getElementById("img").files[0]);
			        oFReader.onload = function (oFREvent) {
			            document.getElementById("proPic").src = oFREvent.target.result;
			        };
					var image=document.getElementById("img")
					//txt=If you want to save &nbsp<input type="button" onclick="uploadProfile('${image.files[0].name}');" value="Click here">
					document.getElementById("subButton").style.display="block";				
				}


				
		}
	


uploadProfile=(email,userId,previousImage)=>{
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/user", true);
		Cache.del("user")
		let myForm = document.getElementById('myForm');
		var formData = new FormData(myForm); // Currently empty
		formData.append("email",email)
		formData.append("userId",userId)
		formData.append("previousImage",previousImage)

		xhr.send(formData);
		xhr.onload = function() 
		{
			var data=JSON.parse(this.responseText);
			if(data.success==true)
			{
			getProfile()
	
			}
		}
		console.log("uploaded")
}		
		

var setActive=(ele)=>{
	var element=document.getElementById(ele);
	document.getElementById("feedButton").classList.remove("active")
	document.getElementById("profileButton").classList.remove("active")
	element.classList.toggle("active")
}



var toggleProfile=()=>{
	var myData=document.getElementById("container");
	
	var myProfile=document.getElementById("myProfile");
	
	
	var buttons=document.getElementById("buttons");
	
	
	buttons.style.display="none";
	
	
	
	myData.style.display="none";
	
	myProfile.style.display="block";

}


var toggleToFeed=()=>{
	var myProfile=document.getElementById("myProfile");
	
	
	
	var buttons=document.getElementById("buttons");
	
	
	buttons.style.display="block";
	
	
	
	
	
	
		var myData=document.getElementById("container");

	
	myProfile.style.display="none";
	
	myData.style.display="flex";
	
}