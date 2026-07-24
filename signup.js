document
.getElementById("signupForm")
.addEventListener("submit", async function(e){


e.preventDefault();



let firstname =
document.getElementById("firstname").value;


let lastname =
document.getElementById("lastname").value;


let fullname = firstname + " " + lastname;



let email =
document.getElementById("email").value;


let phone =
document.getElementById("phone").value;


let password =
document.getElementById("password").value;


let confirmPassword =
document.getElementById("confirmPassword").value;



if(password !== confirmPassword)
{
    alert("Passwords do not match");
    return;
}



let response = await fetch(
"https://shopmart-hiay.onrender.com/signup",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

fullname:fullname,

email:email,

phone:phone,

password:password

})

});


let data = await response.json();


console.log(data);


alert(data.message);



if(data.message.includes("successfully"))
{
    window.location.href="login.html";
}


});
