document
.getElementById("pay-btn")
.addEventListener("click", async function(){


let paymentMethod =
document.getElementById("payment-method").value;




// CASH ON DELIVERY

if(paymentMethod === "cod")
{

    alert("Order placed successfully! Payment will be collected on delivery.");


    // Clear cart
    localStorage.removeItem("cart");


    // Reset cart count
    let cartCount = document.getElementById("cart-count");

    if(cartCount)
    {
        cartCount.innerText = 0;
    }


    window.location.href="index.html";


    return;

}





// ONLINE PAYMENT USING RAZORPAY


let amount =
document.getElementById("checkout-total").innerText;



if(amount == 0)
{
    alert("Your cart is empty");
    return;
}





let response =
await fetch(
"https://shopmart-api.onrender.com/create-order",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

amount:amount

})

});





let order =
await response.json();




let options={


key:"rzp_test_THObgqGiG7P0ny",


amount:order.amount,


currency:"INR",


name:"SHOPMART",


description:"Shopping Payment",


order_id:order.id,



handler:function(response){


alert("Payment Successful! Order placed.");



    // Clear cart after successful payment
    localStorage.removeItem("cart");



    // Reset cart count
    let cartCount = document.getElementById("cart-count");

    if(cartCount)
    {
        cartCount.innerText = 0;
    }



    window.location.href="index.html";


},




prefill:{


name:"SHOPMART Customer",

email:"customer@gmail.com",

contact:"9999999999"


},



theme:{


color:"#000000"


}


};




let razorpay =
new Razorpay(options);



razorpay.open();



});
