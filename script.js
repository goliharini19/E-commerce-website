const products = [
  { id: 1, name: "T-Shirt", price: 29.99, image: "https://images.app.goo.gl/xdWQBU1J1bec87Hp9" },
  { id: 2, name: "Sneakers", price: 59.99, image: "https://images.app.goo.gl/HzCkMmNYfhdtHu148" },
  { id: 3, name: "Backpack", price: 45.00, image: "https://images.app.goo.gl/ytRqED9SaNWpJiGU8" },
  { id: 4, name: "Watch", price: 89.99, image: "https://images.app.goo.gl/68N5XLJms2ZYhiU97" }
];

let cart = {};

const productList = document.getElementById('productList');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

function renderProducts() {
  if (!productList) return;
  productList.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (!cart[id]) {
    cart[id] = { ...product, quantity: 1 };
  } else {
    cart[id].quantity++;
  }

  updateCartUI();
}

function updateCartUI() {
  if (!cartItems || !cartCount || !cartTotal) return;

  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  Object.values(cart).forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} × ${item.quantity}
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    cartItems.appendChild(li);

    total += item.price * item.quantity;
    count += item.quantity;
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}

renderProducts();
