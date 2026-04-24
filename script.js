const WHATSAPP = "249112550653";

// تحميل المنتجات
async function loadProducts(){
  const res = await fetch("products.json");
  const data = await res.json();

  const container = document.getElementById("products");

  if(container){
    data.forEach(p=>{
      container.innerHTML += `
        <div class="card">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <a href="product.html?id=${p.id}" class="btn">عرض التفاصيل</a>
        </div>
      `;
    });
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if(id){
    const product = data.find(p=>p.id === id);

    document.getElementById("title").innerText = product.title;
    document.getElementById("desc").innerText = product.desc;
    document.getElementById("price").innerText = "السعر: $" + product.price;

    const ul = document.getElementById("features");
    product.features.forEach(f=>{
      const li = document.createElement("li");
      li.innerText = f;
      ul.appendChild(li);
    });

    window.buy = function(){
      const msg = `أريد شراء ${product.title} بسعر ${product.price}$`;
      window.open(`https://wa.me/${WHATSAPP}?text=` + encodeURIComponent(msg));
    }
  }
}

loadProducts();
