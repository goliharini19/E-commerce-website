const products = [
  { id: 1, name: "T-Shirt", price: 25.99, image: "https://via.placeholder.com/200x150?text=T-Shirt" },
  { id: 2, name: "Shoes", price: 59.99, image: "https://via.placeholder.com/200x150?text=Shoes" },
  { id: 3, name: "Watch", price: 120.00, image: "https://via.placeholder.com/200x150?text=Watch" },
  { id: 4, name: "Backpack", price: 35.49, image: "https://via.placeholder.com/200x150?text=Backpack" },
  { id: 5, name: "Headphones", price: 89.00, image: "https://via.placeholder.com/200x150?text=Headphones" }
];

let cart = {};

const productSection = document.getElementById('productSection');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');

function renderProducts(productList) {
  productSection.innerHTML = '';
  productList.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productSection.appendChild(div);
  });
}

function addToCart(productId) {
  if (cart[productId]) {
    cart[productId].quantity++;
  } else {
    const product = products.find(p => p.id === productId);
    cart[productId] = { ...product, quantity: 1 };
  }
  renderCart();
}

function removeFromCart(productId) {
  if (cart[productId]) {
    cart[productId].quantity--;
    if (cart[productId].quantity <= 0) {
      delete cart[productId];
    }
    renderCart();
  }
}

function deleteFromCart(productId) {
  delete cart[productId];
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  Object.values(cart).forEach(item => {
    const li = document.createElement('li');
    total += item.price * item.quantity;

    li.innerHTML = `
      ${item.name} ($${item.price} × ${item.quantity})
      <div class="cart-controls">
        <button onclick="removeFromCart(${item.id})">-</button>
        <button onclick="addToCart(${item.id})">+</button>
        <button onclick="deleteFromCart(${item.id})">x</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// Initial render
renderProducts(products);
