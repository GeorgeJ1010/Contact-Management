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



function addfn()
{


	for(let i=0;i<1000;i++)
	{
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/contact", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	
   var obj={"contact":{"tag":"important","firstName":"firstName"+i,"lastName":"lastName","address":"address",
      "detail": [ {"contactType":"phone" ,"value":"7338937115"}]  }     };
       

	xhr.send(JSON.stringify(obj));
	
	

		}

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


function removeDiv2()
{
	 
	 console.log(removeDiv);
	var elem  = document.getElementsByClassName('demo1');
	
	    
	        elem[elem.length-1].remove();
	
}	          	



function addMoreField2(){
	
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
	 
    div.setAttribute('class','demo1');
	div.appendChild(sel);
	div.appendChild(inp);
	main.appendChild(div);
	
	

}

function addMoreField(){
	
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




function editContact(data)
{
	/*var txt="";
	var contactid=data.contact_id;

	var div=document.getElementById(contactid);
	var list=	div.getElementsByTagName('li');
	
	list[0].contentEditable=true;	
	list[1].contentEditable=true;
	var detailContainer=document.getElementById("detail");
	var element=document.getElementById("saveB");
	console.log(element);


	document.getElementById("A"+contactid).contentEditable=true;
	console.log("detail_id"+data.detail[0].detail_id)

	if(  document.getElementById(contactid).getElementsByTagName('li')[0].isContentEditable==true && element == null)
     {         
		var txt1=`</br></br</br></br></br</br><input id="saveB" type="button" value="save"  onclick="updateContact('${contactid}', '${JSON.stringify(data).split('"').join("&quot;") }'  )" />`;
		detailContainer.innerHTML+=txt1;	
	
     }
	for(let i=0;i<data.detail.length;i++)
	{
			var div1=document.getElementById(data.detail[i].detail_id);
			var list1=	div1.getElementsByTagName('li');
			list1[0].contentEditable=true;
			list1[1].contentEditable=true;
	   
	}
	*/
	var txt=`<div id="existing_data">`
	var doc=document.getElementById("container2")
	var contactid=data.contact_id;
	for(let i=0;i<data.detail.length;i++)
	{
		txt+=`	contactType:   <select  name="contactType" class="ex" >`
				if(data.detail[i].contactType=="phone")
				{
					txt+=`			
							<option selected value="phone">    phone 
			 				<option value="email">    email     </option>
					
						`
				}
				else
				{
					txt+=`			
							<option  value="phone">    phone 
			 				<option selected value="email">    email     </option>
					
						`
				}
		
				txt+=		
				`</select>
					
				<input  type="text" name="value"  value=${data.detail[i].value} class="ex"/> `
	}
	txt+=`</div>`
	doc.innerHTML=txt;
	document.getElementById("Ufirstid").value=data.firstName
	document.getElementById("Ulastid").value=data.lastName
	document.getElementById("Uaddressid").value=data.address
	document.getElementById("updater").onclick=()=>{updateContact(data)}	
	toggleModal()


	

	
}
function toggleModal() {
	let modal = document.querySelector(".modal");

		    modal.classList.toggle("show-modal");
	
}

const addContact=()=>
{
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/contact", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	
	
	var firstName=document.getElementById("firstid").value;
	
	
	var lastName=document.getElementById("lastid").value;
	var address=document.getElementById("addressid").value;
 	var tag=document.getElementById("tagid").selectedOptions[0].value;     
    var x = document.getElementById("container1").querySelectorAll(".ex");
   
  var arr=new Array();
      for( let i=0;i<x.length;i+=2)
       {
	       var y={"contactType":x[i].value,"value":x[i+1].value};
		    arr.push(y);

	}
     var obj={"contact":{"firstName":firstName,"lastName":lastName,"tag":tag,"address":address,"detail": arr}     };     
	xhr.send(JSON.stringify(obj));
	xhr.onload = function() {
		cache.clear();
		togglePopup()
		getContact();
   
	}
	
	
}
	






function getContact(cursor="")
{
	console.log9
	console.log(cache);
	if(Cache.has("Contacts") && cursor=="")
	{
		console.log("in if")
			console.log("frome cache");
		var data=Cache.get("Contacts");
		var done=false;
		var obj=document.getElementById("contact")
		console.log(obj.scrollTop+" "+obj.scrollHeight+" "+obj.offsetHeight)
		obj.onscroll = ()=> {
		    if (done==false && (obj.scrollHeight - obj.offsetHeight - obj.scrollTop < 1)) {
		         console.log("Bottom of page");
				 done=true;
				 getContact(Cache.get("cursor"))
				
		     }
		}
		ReactDOM.render(<RenderContact key="9873985739847593847593845" data={data.contact}/> ,document.getElementById("data"))	
		
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


				var done=false;

				var data = JSON.parse(this.responseText);
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
				
				ReactDOM.render(<RenderContact key="9873985739847593847593845" data={Cache.get("Contacts").contact}/> ,document.getElementById("data"))	
				var obj=document.getElementById("contact")
				console.log(obj.scrollTop+" "+obj.scrollHeight+" "+obj.offsetHeight)
					obj.onscroll = ()=> {
				    if (done==false &&(obj.scrollHeight - obj.offsetHeight - obj.scrollTop < 1)) {
				         console.log("Bottom of page");
						 done=true;
						 getContact(Cache.get("cursor"))
							
					     }
					}
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
    

	ReactDOM.render(<RenderDeletedContact key="389459348759384759348759348" data={data.contact}/> ,document.getElementById("data"))	


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

		getContact();
	}
}



function addMoreDetail(cid)
{
	
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



function updateContact(data)
{

	
		var str=`/contact/${data.contact_id}`;
		
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", str, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	
	
	var firstName=document.getElementById("Ufirstid").value;
	
	
	var lastName=document.getElementById("Ulastid").value;
	var address=document.getElementById("Uaddressid").value;
 	var tag=document.getElementById("Utagid").selectedOptions[0].value;     
    var x = document.getElementById("container2").querySelectorAll(".ex");
   
  var arr=new Array();
      for( let i=0;i<x.length;i+=2)
       {
	       var y={"contact_id":data.contact_id,"detail_id":data.detail[i].detail_id,"contactType":x[i].value,"value":x[i+1].value};
		    arr.push(y);

	}
     var obj={"contact":{"firstName":firstName,"lastName":lastName,"tag":tag,"address":address,"detail": arr}     };     
	xhr.send(JSON.stringify(obj));
	xhr.onload = function() {
		cache.clear();
		document.getElementById("existing_data").remove()
		toggleModal()
		getContact();
   
	}
	
       
	
}


function logoutfn()
{

 

		
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/logout", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
	xhr.onload = function() 
		{
			  var data = JSON.parse(this.responseText);
			console.log(data);
			
			if(data["success"]==true)
			{
			  window.location.href="/loginpage";
			}
		
		    
		     
		     
		  
		
		}


}


function RenderDeletedContact(data) {
		
		
	    const { useState, useEffect } = React
		const [contact,setContact]=useState([])
		const [det,setDetail]=useState([])
		const [address,setAddress]=useState([])
		const [current,setCurrent]=useState([])
		const [d,setData]=useState([])
			
		const changeDetail=(d)=>{
			if(current.length!=0)
			{
				document.getElementById(current).style.backgroundColor="#e4ffe8"

			}
			document.getElementById(d.contact_id).style.backgroundColor="#c8f0ce"
			setCurrent(d.contact_id)
			setData(d)
			setDetail(d.detail)
			setAddress(d.address)
		
		}
		useEffect(()=>{
			setContact(data.data)
			setCurrent(data.data[0].contact_id)
			console.log(current)

			
			
	

		},[data])

		return(				
			 <div className="flex-container container" id="container">
						<div className="contact flex-item-left" id="contact">

						{
							contact.map(result =>(
							<div id={result.contact_id} className="con">
							<ul>
								<a onClick={()=>changeDetail(result)}><li contentEditable={false} >{result.firstName}</li></a>
								<li contentEditable={false} >{result.lastName}</li>
							</ul>

							</div>
							))
							
											

						}
						</div>
						
						
						<div className="detail flex-item-right" id="detail">
							<h4>Address</h4>
								<li contentEditable={false} id={"A"+current} >{address}</li>
							<h4>Information</h4>
							{
								
								det.map(result =>(
			
								<div id={result.detail_id}>
								<ul>
									<li>{result.contactType}</li>:<li>{result.value}</li>
								</ul>
								</div>
								
				
								
								))					
							}
						</div>
			
					</div> )
	
	
}


const RenderContact=(data)=>{
	
	
	    console.log(data)
	    const { useState, useEffect } = React
		const [contact,setContact]=useState([])
		const [det,setDetail]=useState([])
		const [address,setAddress]=useState([])
		const [current,setCurrent]=useState([])
		const [d,setData]=useState([])
			
		const changeDetail=(val)=>{
			console.log(val)
			if(current.length!=0)
			{
				document.getElementById(current).style.backgroundColor="#e4ffe8"

			}
			document.getElementById(val.contact_id).style.backgroundColor="#c8f0ce"
			setCurrent(val.contact_id)
			setData(val)
			setDetail(val.detail)
			setAddress(val.address)
			console.log(detail)
		
		}
		useEffect(()=>{
			console.log("in")
		if(current.length!=0)
			{
				document.getElementById(current).style.backgroundColor="#e4ffe8"

			}
			setContact(data.data)
		},[data])

		const styleObj2 = {padding:'8px' ,fontSize:'15px' } 
		const font = { color: '#c92a2a', fontSize:'12px' } 
		return(				 
			 <div className="flex-container container" id="container">
						<div className="contact flex-item-left" id="contact">

						{
							contact.map(result =>(
							<div id={result.contact_id} className="con">
							<ul>
								<a onClick={()=>changeDetail(result)}><li contentEditable={false} >{result.firstName}</li></a>
								<li contentEditable={false} >{result.lastName}</li>
								<li style={font}>{result.tag}</li>
							</ul>

							</div>
							))
							
											

						}
						</div>
						
						{current.length!=0?

						<div className="detail flex-item-right" id="detail">
							<h4>Address</h4>
								<li contentEditable={false} id={"A"+current} >{address}</li>
							<h4>Information</h4>
							
								{
								det.map(result =>(
			
								<div id={result.detail_id}>
								<ul>
									<li>{result.contactType}</li>:<li>{result.value}</li>
								</ul>
								</div>
								
				
								
								))	}				
							
							
								
									<div className="opBar" id={"opBar"+current}>
										<a onClick={()=>{deleteContact(current)}} style={styleObj2}> delete</a>
										
										<a onClick={()=>{editContact(d)}} style={styleObj2}>edit</a>
									</div>		
							
							
							
							
						</div>:<p></p>}
			
					</div> 
					)
		
}




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
