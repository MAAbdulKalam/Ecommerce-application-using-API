// cart.js
const productContainer = document.getElementById("productContainer");

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    productContainer.innerHTML = cart
        .map(
            (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div>
                <h3>${item.name}</h3>
                <p class="price">$${item.price.toFixed(2)}</p>
                <div class="quantity-control">
                    <button class="decrement" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increment" data-id="${item.id}">+</button>
                </div>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    `
        )
        .join("");
        
    updateOrderSummary(cart);

    // Add event listeners for increment/decrement buttons
    document.querySelectorAll(".increment").forEach((button) => {
        button.addEventListener("click", (e) => updateQuantity(e, 1));
    });
    document.querySelectorAll(".decrement").forEach((button) => {
        button.addEventListener("click", (e) => updateQuantity(e, -1));
    });
}

function updateQuantity(event, change) {
    const button = event.target;
    const productId = button.getAttribute("data-id");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find((item) => item.id === productId);

    if (product) {
        product.quantity += change;

        if (product.quantity <= 0) {
            cart = cart.filter((item) => item.id !== productId);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
}

function updateOrderSummary(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const summary = `
        <div class="order-summary">
            <p>Total Items: ${totalItems}</p>
            <p>Shipping: $5.00</p>
            <p><strong>Total: $${(totalAmount + 5).toFixed(2)}</strong></p>
            <button class="checkout">Go to Checkout</button>
        </div>
    `;
    productContainer.insertAdjacentHTML("beforeend", summary);
}

loadCart();
