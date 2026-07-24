console.log(document.getElementById("loginForm"));
document
.getElementById("loginForm")
.addEventListener("submit",async function(e){


e.preventDefault();


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



console.log("Sending login request");
console.log(email,password);



let response =
await fetch(
"http://localhost:5000/login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:email,

password:password

})

});



let data =
await response.json();


console.log(data);


alert(data.message);



if(data.message==="Login successful")
{
    window.location.href="index.html";
}


});