/**
 * 
 *//**
 * 
 */




var getContactByCategory=()=>{
	
	
	var category=document.getElementById("catid").selectedOptions[0].value;


	var xhr=new XMLHttpRequest();
	
	
	url=`/contact/tag/${category}`;
	
	xhr.open("GET", url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
	xhr.onload = function() {
		
		var data = JSON.parse(this.responseText);
     	var obj= data["contact"][0]["detail"] ;
		document.getElementById("contact").innerHTML=" ";
		document.getElementById("detail").innerHTML=" ";
		addfirtslastname(data," ");
	 	addDetail( data["contact"][0]["contact_id"],obj,data["contact"][0]["address"]  );


	
	}
	
}
var showMessage=()=>{

	
	document.getElementById("contact").innerHTML="";
	document.getElementById("detail").innerHTML="";
	getContact(cache.get("cursor"))
	
	/*
	var inter=setInterval (()=>{
		document.getElementById("contact").innerHTML="";
	getContact()}, 2000);
	window.setTimeout(function () {
	console.log("done");
	
	      clearInterval(inter);
	
	  }, 8000);
	
	addContact*/

}





var deleteAll=()=>{

	//var check=document.getElementById("selection");
	
	
	/*var r=Cache.get("Contacts")
	var n=r["contact"].length
	var obj={}
	for(let i=0;i<=50 && i<n;i++)
	{            
	    if(r["contact"][i]!=null)
	    {
	        obj[i]=r["contact"][i]["contact_id"]
	    }
	}
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/enqueue",true);
	xhr.send(JSON.stringify(obj));
	xhr.onload=function (){
	if(cache.get("Contacts")["contact"].length>=50)
	{
	cache.get("Contacts")["contact"]=cache.get("Contacts")["contact"].splice(50,cache.get("Contacts")["contact"].length-1)
	deleteAll()
	}
	else
	{
	Cache.del("Contacts");
	}
	
	}
	*/
	//showMessage();


	
	//var check=document.getElementById("selection");
	var r=Cache.get("Contacts")
	var n=r["contact"].length
	var contacts={}
	var single={}
	var data=[]
	var details={}
	var cData=[]
	
	for(let i=0;i<=50 && i<n;i++)
	{
	single={}
	cData=[]
		if(r!=null)
		{
			single["contact_id"]=r["contact"][i]["contact_id"]
			var m=r["contact"][i]["detail"].length
			for(let j=0;j<m;j++)
			{
				details={}
				details["detail_id"]=r["contact"][i]["detail"][j]["detail_id"]
				cData.push(details)
			
		    }
		    single["detail"]=cData
		    data.push(single)            
	    }

	}
	contacts["contact"]=data
	//console.log(feeds)
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/enqueue",true);
	xhr.send(JSON.stringify(contacts));    
	xhr.onload=function (){
	    if(cache.get("Contacts")["contact"].length>=50)
        {
            cache.get("Contacts")["contact"]=cache.get("Contacts")["contact"].splice(50,cache.get("Contacts")["contact"].length-1)
            deleteAll()    
        }
        else
        {
            Cache.del("Contacts")

        }                
   }
}
/*
function deleteAll()
{
	console.log("deleteallll")
	var r=Cache.get("Contacts")
var n=r["contact"].length
var obj={}
for(let i=0;i<=50 && i<n;i++)
{
obj[i]=r["contact"][i]["contact_id"]
if((i!=0 && i%50==0 )||i==n-1)
{
var xhr = new XMLHttpRequest();
xhr.open("POST", "/enqueue",true);
xhr.send(JSON.stringify(obj));
xhr.onload=function (){
	
if(cache.get("Contacts")["contact"].length>=50)
{
cache.get("Contacts")["contact"]=cache.get("Contacts")["contact"].splice(50,cache.get("Contacts")["contact"].length)
document.getElementById("contact").innerHTML="";
deleteAll();
}
getContact();
}





}
}
	
}
*/
/*function deleteAll()
{
	
var xhr = new XMLHttpRequest();
xhr.open("POST", "/enqueue",true);


var jsonObject = {};  

cache.forEach((value, key) => {  
    jsonObject[key] = value  
});  

xhr.send(JSON.stringify(jsonObject));
xhr.onload=function (){
console.log("in deleted")
}


}
*/

function addfn()
{


	for(let i=0;i<1000;i++)
	{
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/contact", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	
   var obj={"contact":{"firstName":"firstName"+i,"lastName":"lastName","address":"address",
      "detail": [ {"contactType":"phone" ,"value":"7338937115"}]  }     };
       

	xhr.send(JSON.stringify(obj));
	
	

		}
		
	/*xhr.onload = function() {
	//cache.clear();
	console.log("heisfdsf");
	document.getElementById("contact").innerHTML="";
	 getContact();
   
	}*/
		document.getElementById("contact").innerHTML="";
		Cache.del("Contacts");
		getContact();

}



function togglePopup(){
console.log(togglePopup);
  document.getElementById("popup-1").classList.toggle("active");
}

function togglePopupMoreDetail(){
console.log(togglePopupMoreDetail);
  document.getElementById("popup-2").classList.toggle("active");
}

function removeDiv()
{
	 
	 console.log(removeDiv);
	var elem  = document.getElementsByClassName('demo');
	
	    
	        elem[elem.length-1].remove();
	
}	          	


function newaddMoreField(){
	
	//console.log(addMoreField);
	var txt=""
	

  var main=document.getElementById("container2");

	
	var div=document.createElement("div");
	         
	var sel = document.createElement("select");
	var opt1 = document.createElement("option");
	var opt2 = document.createElement("option");
	 			

    sel.setAttribute('class','ex');

	opt1.value = "phone";
	opt1.text = "phone";

	opt2.value = "email";
	opt2.text = "email";

	sel.add(opt1, null);
	sel.add(opt2, null);
	
	
	var inp=document.createElement("input");
	    inp.setAttribute('class','ex');
	 
    div.setAttribute('class','demo');
	div.appendChild(sel);
	div.appendChild(inp);
	main.appendChild(div);
	
	

}




function addMoreField(){
	
	//console.log(addMoreField);
	var txt=""
	

  var main=document.getElementById("container1");

	
	var div=document.createElement("div");
	         
	var sel = document.createElement("select");
	var opt1 = document.createElement("option");
	var opt2 = document.createElement("option");
	 			

    sel.setAttribute('class','ex');

	opt1.value = "phone";
	opt1.text = "phone";

	opt2.value = "email";
	opt2.text = "email";

	sel.add(opt1, null);
	sel.add(opt2, null);
	
	
	var inp=document.createElement("input");
	    inp.setAttribute('class','ex');
	 
    div.setAttribute('class','demo');
	div.appendChild(sel);
	div.appendChild(inp);
	main.appendChild(div);
	
	

}




function editContact(cid,data)
{
//console.log(editContact);
	var txt="";
	var contactid=cid;
	var atag=document.getElementById("AFL"+cid);
	//atag.onclick=null;
	
	var div=document.getElementById(contactid);
	var list=	div.getElementsByTagName('li');
	
	list[0].contentEditable=true;	
	
	var detailContainer=document.getElementById("detail");
	var element=document.getElementById("saveB");
	console.log(element);

 	if(  document.getElementById(cid).getElementsByTagName('li')[0].isContentEditable==true && element == null)
     {         
		txt1=`</br></br</br></br></br</br><input id="saveB" type="button" value="save"  onclick="updateContact('${cid}', ${JSON.stringify(data).split('"').join("&quot;")}        )" />`;
		detailContainer.innerHTML+=txt1;	
	
     }
	document.getElementById("A"+cid).contentEditable=true;
	for(let i=0;i<data.length;i++)
	{
			document.getElementById(data[i]["detail_id"]  ).contentEditable=true;
	   
	}
	
}


function addContact()
{

//console.log(addContact);	
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/contact", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	
	
	var firstName=document.getElementById("firstid").value;
	
	
	var lastName=document.getElementById("lastid").value;
	var address=document.getElementById("addressid").value;
//	var contactType=document.getElementById("selectid").selectedOptions[0].value;
	//   var value   =document.getElementById("inputid").value;
 	 var tag=document.getElementById("tagid").selectedOptions[0].value;     
    

       var x = document.getElementById("container1").querySelectorAll(".ex");
   
  var arr=new Array();
      for( let i=0;i<x.length;i+=2)
       {
	       var y={"contactType":x[i].value,"value":x[i+1].value};
		    arr.push(y);

	}
	
	
       
   

     var obj={"contact":{"firstName":firstName,"lastName":lastName,"tag":tag,"address":address,
"detail": arr}     };
       
//var obj=addcontactfield();
    console.log(JSON.stringify(obj));


	xhr.send(JSON.stringify(obj));
	
	
	xhr.onload = function() {
	cache.clear();
	document.getElementById("contact").innerHTML="";
	 getContact();
   
	}
	
	
}
	






function getContact(cursor="")
{
	
	console.log(cache);
	if(Cache.has("Contacts") && cursor=="")
	{
		console.log("in if")
		document.getElementById("contact").innerHTML="";
			console.log("frome cache");
		data=Cache.get("Contacts");
		
			var obj= data["contact"][0]["detail"] ;
 
 
       
   //toggleContact("delete");

	  addfirtslastname(data,cache.get("cursor"));

	  addDetail( data["contact"][0]["contact_id"],obj,data["contact"][0]["address"]  );
	

		
	}
	else
	{  
		
		
		
	    
	
console.log("from server")
	//console.log(getContact);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/contact?cursor="+cursor, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
	xhr.onload = function() {
	  var data = JSON.parse(this.responseText);
	 //console.log(data.contact["length"]);
	if(Cache.has("Contacts"))
	{
		console.log("in")
		var r=Cache.get("Contacts")
		for(let i=0;i<data.contact.length;i++)
		{
		r["contact"].push(data.contact[i])
		}
		Cache.set("cursor",data.cursor);
		Cache.set("Contacts",r);
	}
	else
	{
		console.log("in else")
		Cache.set("Contacts",data);
		Cache.set("cursor",data.cursor);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 //if(data.contact["length"]!=0){
     	var obj= data["contact"][0]["detail"] ;

 
       
   //toggleContact("delete");

	  addfirtslastname(data,data.cursor);

	  addDetail( data["contact"][0]["contact_id"],obj,data["contact"][0]["address"]  );

//}
	
	
}



}
}

function getDeletedContact()
{
//console.log(getDeletedContact());
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/contact/garbage", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
	xhr.onload = function() {
	  var data = JSON.parse(this.responseText);
	// console.log(data);
     	var obj= data["contact"][0]["detail"] ;

 
		toggleBin("delete");
    

	  appendDeletedData(data);

	  addDeletedDetail( data["contact"][0]["contact_id"],obj,data["contact"][0]["address"]  );

	}
	
}


function deleteDetail(cid,did)
{
	
	//console.log(deleteDetail);
	var str=`/contact/detail/delete/${cid}/${did}`;
	var xhr=new XMLHttpRequest();
	xhr.open("DELETE", str, true);
	xhr.setRequestHeader('Content-Type', 'application/json');	
	xhr.send();
	xhr.onload=function()
	{
		getContact();
	}
}









function deleteContact(id)
{
	
	console.log(deleteContact);
	var str=`/contact/${id}`;
	var xhr=new XMLHttpRequest();
	xhr.open("DELETE", str, true);
	xhr.setRequestHeader('Content-Type', 'application/json');	
	xhr.send();
	xhr.onload=function()
	{
		
		Cache.clear();
		document.getElementById("contact").innerHTML="";
		document.getElementById("detail").innerHTML="";
		getContact();
	}
}

/*function toggle(id)
{
	console.log("he");
	var div1=document.getElementById(id);
	if(div1.style["display"]=="none")
	{

		div1.style["display"]="block";
	}
	else
	{
		div1.style["display"]="none";
	}
}*/


/*{contact:{
	
	"contact_id",
	"detail":{
	
	}
}
*/

function addMoreDetail(cid)
{
//	console.log(addMoreDetail);
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/contact/detail", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	
	 
       var x = document.getElementById("container2").querySelectorAll(".ex");
   
  var arr=new Array();
      for( let i=0;i<x.length;i+=2)
       {
	       var y={"contactType":x[i].value,"value":x[i+1].value};
		    arr.push(y);

	}
	
	
       
   

     var obj={"contact":{"contact_id":cid,
      "detail": arr}     };
       

    console.log(JSON.stringify(obj));


	xhr.send(JSON.stringify(obj));
	
	
	xhr.onload = function() {
	 getContact();

	}

	
	
	
	
	
	
}


function addDetail(cid,data,address)
{
	
	//console.log(addDetail);
	var x=document.getElementsByClassName("fx");
	
	let check=0;
	
	
	
	
	for(let i=0;i<x.length;i++){ 
		
		
		if(x[i].getAttribute("id")!==cid){
		x[i].setAttribute("style","color:black;");
		var li= x[i].getElementsByTagName('li');
	       li[0].contentEditable=false;
		
		}
		else
		{
			x[i].setAttribute("style","color:red;");
			
		}
	
	 }

     


  
 
	
 
	
	
	var detailContainer = document.getElementById("detail");
	
		var txt1=`
<div class="popup" id="popup-2">

  <div class="overlay"></div>
  <div class="content">
    <div class="close-btn" onclick="togglePopupMoreDetail()">&times;</div>
    <h1>Title</h1>
    <form  >


<div id="container2">
contactType:   <select id="selectid" name="contactType" class="ex">
	<option value="phone">    phone 
 	<option value="email">    email     </option>
</select>

<input id="inputid" type="text" name="value"  class="ex"/> 
</div>

<input type="button" value="add" onclick="newaddMoreField()"/>
<input type="button" value="remove" onclick="removeDiv()"/>  <br/>

 <input type="button" value="submit" onclick="addMoreDetail('${cid}');" />
 
 


</form>
    
    
  </div>
</div>



`;
		
		
		
		
		
	
		 
		
		
	txt1+=`<li contenteditable=false id="A${cid}"  >  address:${address}   </li>  <input id="da${cid}"type="button" value="delete" 
	  onclick="deleteAddress('${cid}'  )"  />  `;
	
	for(let j=0;j<data.length;j++){
		
			
		
	txt1+=`<li contenteditable=false id="${data[j]["detail_id"]}" > ${data[j]["contactType"]}  ${data[j]["value"]}      </li>  <input
	id="de${data[j]["detail_id"]}"   type="button" value="delete"  
	onclick="deleteDetail('${data[j]["contact_id"]}',   '${data[j]["detail_id"]}' ) "/>`;
	 

	}
	txt1+=`<input type="button" value="addmore" onclick="togglePopupMoreDetail()"  /> `;
	
	
		
detailContainer.innerHTML=txt1;
	
	
	
	     if(document.getElementById(cid).getElementsByTagName('li')[0].isContentEditable==true)
      {

	          document.getElementById("A"+cid).contentEditable=true;
				
				
			
				for(let i=0;i<data.length;i++)
				{
					document.getElementById(data[i]["detail_id"]  ).contentEditable=true;
				   
				}
				
				
								
		}
		
		
		var element=document.getElementById("saveB");
		
		
 if(  document.getElementById(cid).getElementsByTagName('li')[0].isContentEditable==true && element == null)
     {         
txt1=`</br></br</br></br></br</br><input id="saveB" type="button" value="save"  onclick="updateContact('${cid}', ${JSON.stringify(data).split('"').join("&quot;")}        )" />`;
	detailContainer.innerHTML+=txt1;	
	
	}
		
	
		


}

function deleteAddress(cid)
{
   
	var str=`/contact/${cid}`;
	var xhr=new XMLHttpRequest();
	xhr.open("PUT", str, true);
	xhr.setRequestHeader('Content-Type', 'application/json');		
	var obj= { "contact" :
	{"address":" "} 
	};
	
xhr.send(JSON.stringify(obj));

	xhr.onload=function()
	{
		getContact();
	}
	

}



function updateContact(cid,data)
{
	
	var str=`/contact/${cid}`;
	var xhr=new XMLHttpRequest();
	xhr.open("PUT", str, true);
	xhr.setRequestHeader('Content-Type', 'application/json');		
	
	
	var firstlastName=document.getElementById(cid).getElementsByTagName('li')[0].innerHTML;
	 firstlastName=firstlastName.trim().split(" ");
	 
     var firstName="";
	 var lastName="";
     var address="";
     if(firstlastName.length==1)
     {
	     firstName=firstlastName[0];

		}
		else
		{
			firstName=firstlastName[0];
		   lastName=firstlastName[1];	
		}
		
		var address=document.getElementById("A"+cid).innerHTML.trim().split(":");
		if(address[1]!="")
		{
			address=address[1];
		}
		else
		{
			address=address[2];
		}
		
		var arr=[];
		
		
		var value="";
		for(let i=0;i<data.length;i++)
		{
			var contactTypePhone=document.getElementById(data[i]["detail_id"] ).innerHTML.trim().split(" ");
			if(contactTypePhone[1]!="")
			  {
				value=contactTypePhone[1].trim();
			}
			else
			{
				value=contactTypePhone[2].trim();
			}
			
			
			 var y={"contact_id":data[i]["contact_id"],"detail_id":data[i]["detail_id"] ,"contactType":contactTypePhone[0].trim(),"value":value};
		    arr.push(y);
			
		}
		
		
		
	/*	  for(let i=0;i<data.length;i++)
{
	
	var div=document.getElementById("de"+data[i]["detail_id"]);
	div.style["display"]="none";
	
}*/
		
		/*var addr=document.getElementById("da"+cid);
		addr.style["display"]="none";*/
		
		
 var obj={"contact":{"firstName":firstName,"lastName":lastName,"address":address,
      "detail": arr}     };
       


xhr.send(JSON.stringify(obj));


	xhr.onload=function()
	{
		cache.clear();
		document.getElementById("contact").innerHTML=" ";
		document.getElementById("detail").innserHTML=" ";
		getContact();
	}


       
	
}

function changeColor(id)
{
	var div=document.getElementById(id);
	div.style["color"]="red";
	
	console.log(div);
}
function logoutfn()
{

 

		

var xhr = new XMLHttpRequest();
	xhr.open("GET", "/logout", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
	xhr.onload = function() {
	  var data = JSON.parse(this.responseText);
	console.log(data);
	
	if(data["success"]==true)
	{
	  window.location.href="/loginpage";
	}

    
     
     
  

}


}


function appendDeletedData(data) {
		
		var txt="";
        var contactContainer = document.getElementById("contact");
        
      
        for (let i = 0; i < data.contact.length; i++) 
		{
			
			txt+=`<div class=contact   >`;
			
			var obj= data["contact"][i]["detail"] ;
			 
	
			txt+=`<a onclick="addDeletedDetail('${data["contact"][i]["contact_id"]}', ${JSON.stringify(obj).split('"').join("&quot;")},'${data["contact"][i]["address"]}'   )" > 
			
			 <div id="${data["contact"][i]["contact_id"]}" style="color:black;"  class="fx"   >
			<li contenteditable=false > ${data["contact"][i]["firstName"]} ${data["contact"][i]["lastName"]} </li>
		 
		
			</li> 
			</div>
			
			
			 </a>`;
		   
			
			
			
			//txt1+=`<div id= "${data["contact"][i]["contact_id"]}" style="display:none;"    class="contact">`; 
			
			//txt1+=`<h4 > address</br> ${data["contact"][i]["address"]} </h4>`; 
			
		//for(let j=0;j<data.contact[i].detail.length;j++){
				
			//txt1+=`<h4 id="${data["contact"][i]["detail"][j]["detail_id"]}">  ${data["contact"][i]["detail"][j]["contactType"]}  <br/> ${data["contact"][i]["detail"][j]["value"] } <br/>  </h4> `;
	 

		// }	
			txt+=`</div>`;
          //   txt1+=`</div>`;		

}


	contactContainer .innerHTML=txt;
	
	
}

function addDeletedDetail(cid,data,address)
{
	
	var x=document.getElementsByClassName("fx");
	
	let check=0;
	
	
	
	
	for(let i=0;i<x.length;i++){ 
		
		
		if(x[i].getAttribute("id")!==cid){
		x[i].setAttribute("style","color:black;");
		var li= x[i].getElementsByTagName('li');
	       li[0].contentEditable=false;
		
		}
		else
		{
			x[i].setAttribute("style","color:red;");
			
		}
	
	 }

     


  
 
	
 
	
	
	var detailContainer = document.getElementById("detail");
	
		var txt1="";
		 
		
		
	txt1+=`<li contenteditable=false id="A${cid}"  >  address:${address}   </li>  `;
	
	for(let j=0;j<data.length;j++){
		
			
		
	txt1+=`<li contenteditable=false id="${data[j]["detail_id"]}" > ${data[j]["contactType"]}  ${data[j]["value"]}      </li> `;
	 

	}
	
	detailContainer.innerHTML=txt1;	
	
	    
		

	


}


function addfirtslastname(data,cursor) {
		
		
		console.log(data);
		var txt="";
        var contactContainer = document.getElementById("contact");
        
      //${JSON.stringify(obj).split('"').join("&quot;")}
        for (let i = 0; i < data.contact.length; i++) 
		{
			
			txt+=`<div class=contact   >`;
			
			var obj= data["contact"][i]["detail"] ;
			// console.log("hi"+obj+'hi');
	
			txt+=`
			
			 <div id="${data["contact"][i]["contact_id"]}" style="color:black;"  class="fx"   >
		 <a  id="AFL${data["contact"][i]["contact_id"]}" onclick="addDetail('${data["contact"][i]["contact_id"]}', ${JSON.stringify(obj).split('"').join("&quot;")},'${data["contact"][i]["address"]}'   )" > 
			<li  contenteditable=false > ${data["contact"][i]["firstName"]} ${data["contact"][i]["lastName"]} </li>
			
			 </a> 
			   <li style="font-size:13px" contenteditable=false >

           ${data["contact"][i]["tag"]}       </li>
			
			</div>
			
			
			
		
			 
			<a onclick="deleteContact('${data["contact"][i]["contact_id"]}')" style="padding:8px;font-size:15px;"> delete</a>
			
			<a onclick="editContact('${data["contact"][i]["contact_id"]}' ,${JSON.stringify(obj).split('"').join("&quot;")} )" style="padding:8px;font-size:15px;">edit</a>
			
		`;
		
		
		
			txt+=`</div>`;
  	

}


txt+=`<input type="button" value="loadnext20"  onclick="getContact('${cursor}')" /> `


	contactContainer.innerHTML+=txt;
	
	
}

/*
var toggleContact=(id)=>{
var cont=document.getElementById(id);
cont.onclick=function(){getDeletedContact()};
cont.src="images/delete.png";
}
var toggleBin=(id)=>{
	
var bin=document.getElementById(id);
bin.onclick=function(){
	getContact()
	};
bin.src="images/contact.png"
console.log(bin);
}

*/

var toggleContact=(id)=>{
	
	var cont=document.getElementById(id);
	console.log(cont);
	document.getElementById("contact").innerHTML="";
	document.getElementById("detail").innerHTML="";
	cont.onclick=function(){
		
		toggleBin("delete");
		getDeletedContact()};
	cont.src="images/delete.png";
}

var toggleBin=(id)=>{
	
	var bin=document.getElementById(id);
	document.getElementById("contact").innerHTML="";
	document.getElementById("detail").innerHTML="";
	bin.onclick=function(){toggleContact("delete");getContact()};
	bin.src="images/contact.png"
}
