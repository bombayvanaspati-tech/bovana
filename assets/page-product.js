document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const product = window.getProduct(slug);
  const root = document.getElementById("product-detail");
  if (!product) {
    root.innerHTML = `<div class="notfound"><div class="inner"><p class="eyebrow">Lost in the herbarium</p><h1>Product not found</h1><a class="btn btn-gold" href="shop.html" style="margin-top:2rem">Back to shop</a></div></div>`;
    return;
  }

  document.getElementById("page-title").textContent = `${product.name} — ${product.categoryLabel} | BOVANA`;
  document.getElementById("page-desc").setAttribute("content", product.description);

  let qty = 1;
  function html() {
    return `
      <div class="product-detail">
        <div class="reveal in">
          ${(() => { const imgs = (product.images && product.images.length) ? product.images : [product.image]; return `<div class="img gallery" id="gallery">
            ${imgs.map((src,i)=>`<img src="${src}" alt="${product.name} — image ${i+1}" width="1024" height="1024" class="${i===0?'active':''}" data-i="${i}">`).join("")}
            ${imgs.length>1?`<button class="nav-arrow prev" id="g-prev" aria-label="Previous image">&#10094;</button><button class="nav-arrow next" id="g-next" aria-label="Next image">&#10095;</button>`:""}
            ${imgs.length>1?`<div class="dots">${imgs.map((_,i)=>`<button class="dot${i===0?' active':''}" data-i="${i}" aria-label="Image ${i+1}"></button>`).join("")}</div>`:""}
          </div>`; })()}
        </div>
        <div class="reveal in">
          <p class="eyebrow">${product.categoryLabel}</p>
          <h1>${product.name}</h1>
          <p class="tagline">${product.tagline}</p>
          <span class="gold-divider"></span>
          <p class="desc">${product.description}</p>
          <div class="spec-grid">
            <div><p class="eyebrow">Aroma Profile</p><ul>${product.aroma.map(a => `<li>— ${a}</li>`).join("")}</ul></div>
            <div><p class="eyebrow">Ingredients</p><ul>${product.ingredients.map(a => `<li>— ${a}</li>`).join("")}</ul></div>
          </div>
          <div class="badges">
            ${["No Tobacco","No Nicotine","100% Herbal Blend"].map(b => `<span>✓ ${b}</span>`).join("")}
          </div>
          <div class="price-row">
            <div>
              <p class="eyebrow">Price</p>
              <p class="price">${fmt(product.price)}</p>
            </div>
            <div class="qty">
              <button id="q-minus" aria-label="Decrease">–</button>
              <span class="val" id="q-val">${qty}</span>
              <button id="q-plus" aria-label="Increase">+</button>
            </div>
          </div>
          <button class="add-cart" id="add-cart">Add to Cart · <span id="add-total">${fmt(product.price * qty)}</span></button>
          <p class="note">18+ only · For herbal use only · Not intended for medical purposes</p>
        </div>
      </div>`;
  }

  function bind() {
    const val = document.getElementById("q-val");
    const tot = document.getElementById("add-total");
    document.getElementById("q-minus").addEventListener("click", () => { qty = Math.max(1, qty - 1); val.textContent = qty; tot.textContent = fmt(product.price * qty); });
    document.getElementById("q-plus").addEventListener("click", () => { qty += 1; val.textContent = qty; tot.textContent = fmt(product.price * qty); });
    document.getElementById("add-cart").addEventListener("click", () => {
      Cart.add({ slug: product.slug, name: product.name, price: product.price, image: product.image }, qty);
      toast(`${product.name} added to cart`, { desc: `Quantity: ${qty}` });
    });
    // Auto image slider
    const gal = document.getElementById("gallery");
    if (gal) {
      const imgs = gal.querySelectorAll("img");
      const dots = gal.querySelectorAll(".dot");
      let idx = 0, paused = false, timer = null;
      const show = (n) => {
        idx = (n + imgs.length) % imgs.length;
        imgs.forEach((el,i)=>el.classList.toggle("active", i===idx));
        dots.forEach((el,i)=>el.classList.toggle("active", i===idx));
      };
      const start = () => { if (imgs.length<=1) return; stop(); timer = setInterval(()=>!paused && show(idx+1), 2000); };
      const stop = () => { if (timer) clearInterval(timer); };
      dots.forEach(d => d.addEventListener("click", () => { show(parseInt(d.dataset.i,10)); start(); }));
      const prevBtn = document.getElementById("g-prev");
      const nextBtn = document.getElementById("g-next");
      if (prevBtn) prevBtn.addEventListener("click", () => { show(idx-1); start(); });
      if (nextBtn) nextBtn.addEventListener("click", () => { show(idx+1); start(); });
      gal.addEventListener("mouseenter", () => paused = true);
      gal.addEventListener("mouseleave", () => paused = false);
      start();
    }
  }

  document.getElementById("product-detail").innerHTML = html();
  bind();

  const related = window.PRODUCTS.filter(p => p.slug !== product.slug && p.category === product.category && !p.comingSoon).slice(0, 3);
  if (related.length) {
    document.getElementById("related-section").style.display = "block";
    document.getElementById("related-grid").innerHTML = related.map(p => productCardHTML(p)).join("");
  }
});
