const products = [
  { id: 1, name: "Tas Kulit Premium", price: 450000, image: "tas.jpg.jpg" },
  { id: 2, name: "Jam Tangan Classic", price: 850000, image: "jam tangan.jpg.jpg" },
  { id: 3, name: "Parfum Rose Luxe", price: 275000, image: "parfum.jpg.jpg" },
  { id: 4, name: "Buku Catatan Kulit", price: 95000, image: "buku catatan.jpg.jpg" },
  { id: 5, name: "Sepatu Sneakers", price: 650000, image: "sepatu.jpg.jpg" },
  { id: 6, name: "Cincin Perak Elegant", price: 320000, image: "cincin.jpg.jpg" },
  { id: 7, name: "Baju Elegant", price: 100000, image: "baju.jpg.jpg" },
];

let cart = [];

const productList = document.getElementById("product-list");
products.forEach(product => {
  const col = document.createElement("div");
  col.className = "col-md-4 col-lg-3 mb-4";
  col.innerHTML = `
    <div class="card h-100 shadow-lg border-0 text-light">
      <img src="${product.image}" class="card-img-top" alt="${product.name}">
      <div class="card-body text-center">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">Rp ${product.price.toLocaleString()}</p>
        <div class="d-flex justify-content-center gap-2">
          <input type="number" min="1" value="1" id="qty-${product.id}" class="form-control w-25 text-center">
          <button class="btn btn-gold fw-semibold" onclick="addToCart(${product.id})">
            <i class="fas fa-cart-plus"></i> Tambah
          </button>
        </div>
      </div>
    </div>
  `;
  productList.appendChild(col);
});

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const qty = parseInt(document.getElementById(`qty-${id}`).value) || 1;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ ...product, qty });
  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById("cart");
  cartEl.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <div class="fw-semibold">${item.name}</div>
        <small class="text-muted">Rp ${item.price.toLocaleString()} x ${item.qty}</small>
      </div>
      <div>
        <span class="me-3 fw-bold text-warning">Rp ${(item.price * item.qty).toLocaleString()}</span>
        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${idx})">Hapus</button>
      </div>
    `;
    cartEl.appendChild(li);
    total += item.price * item.qty;
  });
  document.getElementById("total-price").textContent = `Total: Rp ${total.toLocaleString()}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }
  alert(`Terima kasih telah berbelanja di Toyybh Novynti Store!\n${document.getElementById("total-price").textContent}`);
  cart = [];
  renderCart();
});
