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
  const PACKS = [
    { id: "20", label: "Pack of 20", price: 490 },
    { id: "10", label: "Pack of 10", price: 240 },
  ];
  let packId = "20";
  let qty = 1;
  const getPack = () => PACKS.find(p => p.id === packId);
  const unitPrice = () => isCig ? getPack().price : product.price;

  function html() {
    const packHTML = isCig ? `
      <div class="pack-select" style="margin-top:2rem">
        <p class="eyebrow">Pack Size</p>
        <div class="pack-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:.75rem">
          ${PACKS.map(p => `
            <button class="pack-opt${p.id===packId?' active':''}" data-pack="${p.id}" style="padding:.85rem 1rem;text-align:left;border:1px solid ${p.id===packId?'var(--gold)':'var(--border)'};background:${p.id===packId?'rgba(201,162,39,.1)':'transparent'};color:var(--cream);cursor:pointer;transition:all .2s">
              <span style="display:block;font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:var(--muted)">${p.label}</span>
              <span style="display:block;margin-top:.25rem;font-family:var(--font-display, serif);font-size:1.5rem">${fmt(p.price)}</span>
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
            ${["No Tobacco","No Nicotine","100% Herbal Blend"].map(b => `<span>✓ ${b}</span>`).join("")}
          </div>
          ${packHTML}
          <div class="price-row">
            <div>
              <p class="eyebrow">Price</p>
              <p class="price" id="unit-price">${fmt(unitPrice())}</p>
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
    if (up) up.textContent = fmt(unitPrice());
    if (tot) tot.textContent = fmt(unitPrice() * qty);
  }

  function bind() {
    const val = document.getElementById("q-val");
    document.getElementById("q-minus").addEventListener("click", () => { qty = Math.max(1, qty - 1); val.textContent = qty; refreshPrice(); });
    document.getElementById("q-plus").addEventListener("click", () => { qty += 1; val.textContent = qty; refreshPrice(); });
    document.getElementById("add-cart").addEventListener("click", () => {
      const p = isCig ? getPack() : null;
      const slugV = isCig ? `${product.slug}--pack${packId}` : product.slug;
      const nameV = isCig ? `${product.name} · ${p.label}` : product.name;
      Cart.add({ slug: slugV, name: nameV, price: unitPrice(), image: product.image }, qty);
      toast(`${nameV} added to cart`, { desc: `Quantity: ${qty}` });
    });

    if (isCig) {
      document.querySelectorAll(".pack-opt").forEach(btn => {
        btn.addEventListener("click", () => {
          packId = btn.dataset.pack;
          document.querySelectorAll(".pack-opt").forEach(b => {
            const active = b.dataset.pack === packId;
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
