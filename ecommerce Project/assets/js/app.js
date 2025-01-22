// Select all menu items
const menuItems = document.querySelectorAll('nav ul li a');

// Function to handle the active state on click
menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
        // Remove the active class from all links
        menuItems.forEach(link => link.classList.remove('active'));

        // Add the active class to the clicked link
        this.classList.add('active');

        // Save the active menu option in localStorage
        localStorage.setItem('activeMenu', this.getAttribute('href'));
    });
});

// Function to set the active menu based on localStorage or URL
function setActiveMenu() {
    // Get the current active menu from localStorage
    const activeMenu = localStorage.getItem('activeMenu') || window.location.pathname;

    // Loop through the menu items and match the href
    menuItems.forEach(item => {
        // Ensure the active class is applied to the link matching the URL
        if (item.getAttribute('href').includes(activeMenu)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Set the active menu on page load
setActiveMenu();

let cartCount = 0;
let cartTotal = 0;

// Fetching data from the API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    let filteredProducts = products;
    // Display products in grid
    displayProducts(filteredProducts);

    // Category Filter
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        if (category === 'all') {
          filteredProducts = products;
        } else {
          filteredProducts = products.filter(product => product.category === category);
        }
        displayProducts(filteredProducts);
      });
    });
  })
  .catch(error => console.error('Error fetching products:', error));

// Function to display products
function displayProducts(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = ''; // Clear previous products

  // Create product cards
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
    <div class="product-info">
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title.slice(0, 12)}...</h3>
      <p>${product.description.slice(0, 90)}...</p>
    </div>
    <hr>
    <div class="price-box">
      <div class="price">$${product.price.toFixed(2)}</div>
    </div>
    <hr>
    <div class="button-box">
      <button class="details-btn">Details</button>
      <button class="cart-btn" data-price="${product.price}" data-title="${product.title}">Add to Cart</button>
    </div>
    `;
    grid.appendChild(productCard);
  });

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const price = parseFloat(e.target.dataset.price);
      cartCount++;
      cartTotal += price * 2; // Doubling the price
      document.getElementById('cart-icon').textContent = `Cart (${cartCount})`;
    });
  });
}

