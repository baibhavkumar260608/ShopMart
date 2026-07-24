function addToCart(id, name, price, image)
{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    let existing = cart.find(product => product.name === name);

    if(existing)
    {
        existing.quantity++;
    }
    else
    {
        cart.push({
    id: id,
    name: name,
    price: price,
    image: image,
    quantity: 1
});
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateProductButtons();
}


function displayCart()
{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cart-items");

    if(cartItems == null)
        return;

    cartItems.innerHTML = "";

    let totalPrice = 0;
    let totalItems = 0;

    if(cart.length == 0)
    {
        cartItems.innerHTML =
        `
        <div class="empty-cart">
            <h2>Your cart is empty.</h2>
        </div>
        `;

        document.getElementById("total-price").innerHTML = 0;
        document.getElementById("total-items").innerHTML = 0;

        return;
    }

    cart.forEach((product,index)=>
    {
        totalPrice += product.price * product.quantity;

        totalItems += product.quantity;

        cartItems.innerHTML +=
        `
        <div class="cart-item">

            <img src="${product.image}" alt="${product.name}">

            <div class="cart-details">

                <h3>${product.name}</h3>

                <p>Price : ₹${product.price}</p>

                <p>Quantity : ${product.quantity}</p>

            </div>

            <button class="remove-btn"
            onclick="removeItem(${index})">

                Remove

            </button>

        </div>
        `;
    });

    document.getElementById("total-price").innerHTML = totalPrice;

    document.getElementById("total-items").innerHTML = totalItems;
}



function removeItem(index)
{
    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();
    updateProductButtons();
}
function updateProductButtons()
{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(product =>
    {
        let controls = document.getElementById(product.id + "-controls");

        if(controls)
        {
            controls.innerHTML =
            `
            <div class="quantity-box">

                <button onclick="decreaseQuantity('${product.id}')">-</button>

                <span>${product.quantity}</span>

                <button onclick="increaseQuantity('${product.id}')">+</button>

            </div>
            `;
        }
    });
}
function increaseQuantity(id)
{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = cart.find(item => item.id === id);

    product.quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    updateProductButtons();

    displayCart();
}
function decreaseQuantity(id)
{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let index = cart.findIndex(item => item.id === id);

    if(index === -1) return;

    if(cart[index].quantity > 1)
    {
        cart[index].quantity--;
    }
    else
    {
        cart.splice(index,1);

        let controls = document.getElementById(id + "-controls");

        if(controls)
        {
            let name = controls.dataset.name;
            let price = controls.dataset.price;
            let image = controls.dataset.image;

            controls.innerHTML =
            `
            <button onclick="addToCart(
            '${id}',
            '${name}',
            ${price},
            '${image}'
            )">
                Add to Cart
            </button>
            `;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateProductButtons();

    displayCart();
}

function displayCheckout()
{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let checkoutItems = document.getElementById("checkout-items");
    let checkoutTotal = document.getElementById("checkout-total");


    if(checkoutItems == null)
        return;


    checkoutItems.innerHTML = "";

    let total = 0;


    if(cart.length == 0)
    {
        checkoutItems.innerHTML =
        `
        <p>Your cart is empty.</p>
        `;

        checkoutTotal.innerHTML = 0;

        return;
    }


    cart.forEach(product =>
    {

        total += product.price * product.quantity;


        checkoutItems.innerHTML +=
        `
        <div class="cart-item">

            <img src="${product.image}" alt="${product.name}">

            <div class="cart-details">

                <h3>${product.name}</h3>

                <p>Quantity: ${product.quantity}</p>

                <p>Price: ₹${product.price * product.quantity}</p>

            </div>

        </div>
        `;

    });


    checkoutTotal.innerHTML = total;

}

displayCart();

updateProductButtons();

displayCheckout();