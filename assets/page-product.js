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

  const isCig = product.category === "herbal-cigarettes";
  const isTea = product.category === "herbal-tea";
  const SIZE_OPTIONS = isCig
    ? { suffix: "pack", label: "Pack Size", defaultId: "20", options: [
      { id: "5", label: "Pack of 5", price: 125, discount: 0 },  
      { id: "10", label: "Pack of 10", price: 240, discount: 15, bestSeller: true },
      { id: "20", label: "Pack of 20", price: 440, discount: 18 },

      ]}
    : isTea
    ? { suffix: "g", label: "Weight", defaultId: "100", options: [
        { id: "50", label: "50g", price: 100, discount: 0 },
        { id: "100", label: "100g", price: 199, discount: 15, bestSeller: true },
        { id: "200", label: "200g", price: 399, discount: 18 },
      ]}
    : null;
  let sizeId = SIZE_OPTIONS?.defaultId;
  let qty = 1;
  const getSize = () => SIZE_OPTIONS?.options.find((o) => o.id === sizeId);
  const unitPrice = () => (SIZE_OPTIONS ? getSize().price : product.price);
  const originalPrice = (price, discount) =>
    discount ? Math.round(price / (1 - discount / 100)) : null;
  const sizePriceHTML = (o) => {
    const orig = originalPrice(o.price, o.discount);
    return `
      <div class="pack-prices">
        ${o.discount ? `<span class="pack-discount-tag">${o.discount}% OFF</span>` : ""}
        <span class="pack-price-sale">${fmt(o.price)}</span>
        ${orig ? `<span class="pack-price-original">${fmt(orig)}</span>` : ""}
      </div>`;
  };
  const unitPriceHTML = (o) => {
    if (!o) return `<span class="price">${fmt(product.price)}</span>`;
    const orig = originalPrice(o.price, o.discount);
    if (!o.discount) return `<span class="price">${fmt(o.price)}</span>`;
    return `
      <span class="pack-discount-tag">${o.discount}% OFF</span>
      <span class="price">${fmt(o.price)}</span>
      <span class="pack-price-original">${fmt(orig)}</span>`;
  };

  function html() {
    const sizeHTML = SIZE_OPTIONS ? `
      <div class="pack-select" style="margin-top:2rem">
        <p class="eyebrow">${SIZE_OPTIONS.label}</p>
        <div class="pack-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-top:.75rem">
          ${SIZE_OPTIONS.options.map((o) => `
            <button class="pack-opt${o.id === sizeId ? " active" : ""}" data-size="${o.id}" style="position:relative;padding:.85rem 1rem;text-align:left;border:1px solid ${o.id === sizeId ? "var(--gold)" : "var(--border)"};background:${o.id === sizeId ? "rgba(201,162,39,.1)" : "transparent"};color:var(--cream);cursor:pointer;transition:all .2s">
              ${o.bestSeller ? '<span class="pack-best-seller">Best Seller</span>' : ""}
              <span style="display:block;font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:var(--gold)">${o.label}</span>
              ${sizePriceHTML(o)}
            </button>
          `).join("")}
        </div>
      </div>` : "";

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
          ${product.badges.map(b => `<span>✓ ${b}</span>`).join("")}
          </div>
          ${sizeHTML}
          <div class="price-row">
            <div>
              <p class="eyebrow">Price</p>
              <div class="unit-price-block" id="unit-price">${unitPriceHTML(getSize())}</div>
            </div>
            <div class="qty">
              <button id="q-minus" aria-label="Decrease">–</button>
              <span class="val" id="q-val">${qty}</span>
              <button id="q-plus" aria-label="Increase">+</button>
            </div>
          </div>
          <button class="add-cart" id="add-cart">Add to Cart · <span id="add-total">${fmt(unitPrice() * qty)}</span></button>
          <p class="note">18+ only · For herbal use only · Not intended for medical purposes</p>
        </div>
      </div>`;
  }

  function refreshPrice() {
    const up = document.getElementById("unit-price");
    const tot = document.getElementById("add-total");
    if (up) up.innerHTML = SIZE_OPTIONS ? unitPriceHTML(getSize()) : `<span class="price">${fmt(unitPrice())}</span>`;
    if (tot) tot.textContent = fmt(unitPrice() * qty);
  }

  function bind() {
    const val = document.getElementById("q-val");
    document.getElementById("q-minus").addEventListener("click", () => { qty = Math.max(1, qty - 1); val.textContent = qty; refreshPrice(); });
    document.getElementById("q-plus").addEventListener("click", () => { qty += 1; val.textContent = qty; refreshPrice(); });
    document.getElementById("add-cart").addEventListener("click", () => {
      const s = SIZE_OPTIONS ? getSize() : null;
      const slugV = SIZE_OPTIONS ? `${product.slug}--${SIZE_OPTIONS.suffix}${sizeId}` : product.slug;
      const nameV = SIZE_OPTIONS ? `${product.name} · ${s.label}` : product.name;
      Cart.add({ slug: slugV, name: nameV, price: unitPrice(), image: product.image }, qty);
      toast(`${nameV} added to cart`, { desc: `Quantity: ${qty}` });
    });

    if (SIZE_OPTIONS) {
      document.querySelectorAll(".pack-opt").forEach(btn => {
        btn.addEventListener("click", () => {
          sizeId = btn.dataset.size;
          document.querySelectorAll(".pack-opt").forEach(b => {
            const active = b.dataset.size === sizeId;
            b.classList.toggle("active", active);
            b.style.borderColor = active ? "var(--gold)" : "var(--border)";
            b.style.background = active ? "rgba(201,162,39,.1)" : "transparent";
          });
          refreshPrice();
        });
      });
    }

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
