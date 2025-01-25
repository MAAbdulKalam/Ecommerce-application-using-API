// Add product to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.getElementById("cart-icon");
    cartIcon.innerHTML = `<img src="./assets/products/cart3.svg" alt="">Cart (${totalItems})`;
}

// Render cart items dynamically on cart.html
function renderCart() {
    const cartContainer = document.querySelector(".cart-container");
    const orderSummary = document.querySelector(".order-summary");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        cartContainer.innerHTML = `
        <div class="empty-cart-message">
          <h1>Your Cart is Empty</h1>
          <a href="./products.html" class="continue-shopping-btn">
            <img src="./assets/products/arrow-left.svg" alt="arrowleft">Continue Shopping
          </a>
        </div>`;
        orderSummary.style.display = "none";
        return;
    }

    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
        cartContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p>Price: $${item.price}</p>
          </div>
          <div class="cart-item-quantity">
            <button onclick="decrementQuantity(${item.id})">-</button>
            <span>${item.quantity}</span>
            <button onclick="incrementQuantity(${item.id})">+</button>
          </div>
          <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>`;
    });

    orderSummary.innerHTML = `
      <h3>Order Summary</h3>
      <p>Products (${cart.length})</p>
      <p>Shipping: $30</p>
      <h4>Total: $${(totalAmount + 30).toFixed(2)}</h4>
      <button onclick="checkout()">Go to Checkout</button>`;
}

// Increment quantity
function incrementQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === productId);
    product.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Decrement quantity
function decrementQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === productId);
    if (product.quantity > 1) {
        product.quantity--;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Initialize cart count
updateCartCount();

// If on cart.html, render the cart
if (window.location.pathname.includes("cart.html")) {
    renderCart();
}
