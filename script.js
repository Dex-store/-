let cart = [];
const WHATSAPP = "249112550653";

async function loadProducts(){
  const res = await fetch("products.json");
  const products = await res.json();

  const container = document.getElementById("products");

  products.forEach(p=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <h4>$${p.price}</h4>
        <button class="btn" onclick="addToCart('${p.id}')">أضف للسلة</button>
      </div>
    `;
  });

  window.products = products;
}

function addToCart(id){
  const product = products.find(p=>p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").innerText = cart.length;

  let html = "";
  let total = 0;

  cart.forEach(item=>{
    total += item.price;
    html += `<p>${item.title} - $${item.price}</p>`;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = "المجموع: $" + total;
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("active");
}

function checkout(){
  let msg = "طلب شراء:%0A";

  cart.forEach(item=>{
    msg += `${item.title} - $${item.price}%0A`;
  });

  window.open(`https://wa.me/${WHATSAPP}?text=${msg}`);
}

loadProducts();
