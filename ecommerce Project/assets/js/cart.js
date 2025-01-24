// JavaScript for Dynamic Cart Functionality

// Array to store cart items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add item to cart
function addToCart(product) {
  // Check if product already exists in cart
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartInLocalStorage();
  updateCartCount();
}

// Function to update cart in localStorage
function updateCartInLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update cart count in navbar
function updateCartCount() {
  const cartIcon = document.getElementById("cart-icon");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.innerHTML = `<img src="./assets/products/cart3.svg" alt="">Cart (${totalItems})`;
}

// Function to render cart items dynamically on cart.html
function renderCart() {
  const cartContainer = document.querySelector(".cart-container");
  const orderSummary = document.querySelector(".order-summary");
  cartContainer.innerHTML = ""; // Clear previous items

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-message">
        <h1>Your Cart is Empty</h1>
        <a href="./products.html" class="continue-shopping-btn"><img src="./assets/products/arrow-left.svg" alt="arrowleft">Continue Shopping</a>
      </div>
    `;
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
      </div>
    `;
  });

  orderSummary.innerHTML = `
    <h3>Order Summary</h3>
    <p>Products (${cart.length})</p>
    <p>Shipping: $30</p>
    <h4>Total: $${(totalAmount + 30).toFixed(2)}</h4>
    <button onclick="checkout()">Go to Checkout</button>
  `;
}

// Function to increment quantity
function incrementQuantity(productId) {
  const product = cart.find(item => item.id === productId);
  product.quantity++;
  updateCartInLocalStorage();
  renderCart();
}

// Function to decrement quantity
function decrementQuantity(productId) {
  const product = cart.find(item => item.id === productId);
  if (product.quantity > 1) {
    product.quantity--;
  } else {
    cart = cart.filter(item => item.id !== productId);
  }
  updateCartInLocalStorage();
  renderCart();
}

// Function to checkout
function checkout() {
  alert("Checkout functionality coming soon!");
}

// Initialize cart count on page load
updateCartCount();

// If on cart.html, render cart
if (window.location.pathname.includes("cart.html")) {
  renderCart();
}
