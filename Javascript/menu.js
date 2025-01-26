// Persistent cart object
const cart = {};

// Function to toggle dark mode
function handleClick() {
    let element = document.body;
    element.classList.toggle('dark');
}

// Function to add items to the cart
function addToCart(menuProduct, price) {
    // Check if the item already exists in the cart
    if (cart[menuProduct]) {
        cart[menuProduct].quantity += 1; // Increment quantity
        cart[menuProduct].totalPrice += price; // Update total price
    } else {
        // Add a new item to the cart
        cart[menuProduct] = {
            quantity: 1,
            totalPrice: price,
        };
    }

    // Update the cart display after adding an item
    updateCartDisplay();
}

// Function to update the cart section in the UI
function updateCartDisplay() {
    const cartList = document.getElementById('cart-items'); // Get the cart items container
    const totalPriceElement = document.getElementById('total-price'); // Get the total price element

    // Clear the current cart items in the UI
    cartList.innerHTML = '';

    let total = 0; // Variable to calculate the total cart price

    // Loop through the cart and create list items for each product
    for (let item in cart) {
        const itemData = cart[item];
        const itemList = document.createElement('li');
        itemList.innerText = `${item} x${itemData.quantity} - $${itemData.totalPrice.toFixed(2)}`;
        cartList.appendChild(itemList);

        // Add the item's total price to the overall total
        total += itemData.totalPrice;
    }

    // If the cart is empty, display "No items in the cart"
    if (Object.keys(cart).length === 0) {
        cartList.innerHTML = '<li>No items in the cart.</li>';
    }

    // Update the total price in the UI
    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
}


document.getElementById('paymentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const paymentDetails = {
        cardName: document.getElementById('card-name').value,
        cardNumber: document.getElementById('card-number').value,
        cardExpiration: document.getElementById('card-expiration').value,
        cardCvv: document.getElementById('card-cvv').value,
    };

    // Send the payment details to the server

    try{
        const response = await fetch('http://localhost:3000/payment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(paymentDetails),
        })
    }catch(error){
        console.error('Error:', error);
        alert('Payment failed. Please Try again!');
    }
})
