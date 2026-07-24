const Razorpay = require("razorpay");

const express=require("express");

const bcrypt=require("bcrypt");

const cors=require("cors");

const db=require("./database");


const app=express();

const razorpay = new Razorpay({

    key_id:"rzp_test_THObgqGiG7P0ny",

    key_secret:"Sd5pGAM4GXRQPOIK1Uq4Q24B"

});


app.use(cors());

app.use(express.json());



// SIGNUP API

app.post("/signup",(req,res)=>{


let {
fullname,
email,
password,
phone
}=req.body;



bcrypt.hash(password,10,(err,hash)=>{


let sql=
"INSERT INTO users(fullname,email,password,phone) VALUES(?,?,?,?)";


db.query(sql,
[
fullname,
email,
hash,
phone
],
(err,result)=>{


if(err)
{
return res.json({
message:"Email already exists"
});
}



res.json({
message:"Account created successfully"
});


});


});


});





// LOGIN API

app.post("/login",(req,res)=>{


let {
email,
password
}=req.body;



db.query(

"SELECT * FROM users WHERE email=?",

[email],

(err,result)=>{


if(result.length===0)
{

return res.json({
message:"User not found"
});

}



let user=result[0];



bcrypt.compare(

password,

user.password,

(err,match)=>{


if(match)
{

res.json({

message:"Login successful",

user:user.fullname

});


}

else
{

res.json({

message:"Wrong password"

});

}


});


});


});




// CREATE RAZORPAY ORDER

app.post("/create-order", async(req,res)=>{


try{


let options={

    amount:req.body.amount * 100,

    currency:"INR",

    receipt:"shopmart_order_"+Date.now()

};



let order = await razorpay.orders.create(options);



res.json(order);



}

catch(error){


console.log(error);


res.status(500).json({

message:"Payment order creation failed",

error:error.message

});


}


});
app.listen(5000,()=>{

console.log("Server running on port 5000");

});

app.post("/create-order", async(req,res)=>{


try{


let options={

amount:req.body.amount*100,

currency:"INR",

receipt:"shopmart_"+Date.now()

};


let order=await razorpay.orders.create(options);


res.json(order);


}

catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}


});



app.listen(5000,()=>{

console.log("Server running on port 5000");

});
