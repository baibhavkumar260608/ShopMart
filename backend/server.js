const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const Razorpay = require("razorpay");

const db = require("./database");

const app = express();


// Middleware

app.use(cors({
    origin: "https://shop-mart-theta-lac.vercel.app"
}));

app.use(express.json());



// Razorpay

const razorpay = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET

});



// =======================
// SIGNUP API
// =======================

app.post("/signup", async (req,res)=>{

    const {
        fullname,
        email,
        password,
        phone
    } = req.body;


    if(!fullname || !email || !password || !phone)
    {
        return res.json({
            message:"All fields are required"
        });
    }


    try
    {

        // Check existing email

        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async(err,result)=>{


                if(err)
                {
                    console.log("MYSQL ERROR:", err);
                
                    return res.json({
                        message: err.message
                    });
                }


                if(result.length > 0)
                {
                    return res.json({
                        message:"Email already exists"
                    });
                }



                // Hash password

                let hash = await bcrypt.hash(password,10);



                // Insert user

                db.query(

                    "INSERT INTO users(fullname,email,password,phone) VALUES(?,?,?,?)",

                    [
                        fullname,
                        email,
                        hash,
                        phone
                    ],

                    (err,result)=>{


                        if(err)
                        {
                            console.log("INSERT ERROR:",err);

                            return res.json({
                                message:err.message
                            });
                        }


                        res.json({
                            message:"Account created successfully"
                        });


                    }

                );


            }
        );


    }
    catch(error)
    {
        console.log(error);

        res.json({
            message:"Server error"
        });
    }


});




// =======================
// LOGIN API
// =======================


app.post("/login",(req,res)=>{


    const {
        email,
        password
    } = req.body;



    db.query(

        "SELECT * FROM users WHERE email=?",

        [email],

        (err,result)=>{


            if(err)
            {
                console.log(err);

                return res.json({
                    message:"Database error"
                });
            }



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


                }

            );


        }

    );


});




// =======================
// CREATE RAZORPAY ORDER
// =======================


app.post("/create-order", async(req,res)=>{


    try
    {


        let options={

            amount:req.body.amount * 100,

            currency:"INR",

            receipt:"shopmart_"+Date.now()

        };


        let order = await razorpay.orders.create(options);


        res.json(order);


    }
    catch(error)
    {

        console.log(error);


        res.status(500).json({

            message:"Payment order creation failed"

        });

    }


});




// SERVER START

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});
