// BOVANA static site — shared scripts
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  // ---------- Cart store (localStorage) ----------
  const CART_KEY = "bovana-cart";
  const Cart = {
    get() {
      try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
      catch { return []; }
    },
    set(items) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent("cart:change"));
    },
    count() { return this.get().reduce((n, i) => n + i.qty, 0); },
    total() { return this.get().reduce((n, i) => n + i.qty * i.price, 0); },
    add(item, qty = 1) {
      const items = this.get();
      const existing = items.find((i) => i.slug === item.slug);
      if (existing) existing.qty += qty;
      else items.push({ ...item, qty });
      this.set(items);
    },
    setQty(slug, qty) {
      let items = this.get();
      if (qty <= 0) items = items.filter((i) => i.slug !== slug);
      else items = items.map((i) => (i.slug === slug ? { ...i, qty } : i));
      this.set(items);
    },
    remove(slug) { this.set(this.get().filter((i) => i.slug !== slug)); },
    clear() { this.set([]); },
  };
  window.Cart = Cart;
  window.fmt = fmt;

  // ---------- Toast ----------
  function ensureToastContainer() {
    let c = $("#toast-container");
    if (!c) { c = document.createElement("div"); c.id = "toast-container"; document.body.appendChild(c); }
    return c;
  }
  window.toast = function (title, opts = {}) {
    const c = ensureToastContainer();
    const el = document.createElement("div");
    el.className = "toast" + (opts.error ? " error" : "");
    el.innerHTML = `<div class="title">${title}</div>${opts.desc ? `<div class="desc">${opts.desc}</div>` : ""}`;
    c.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; setTimeout(() => el.remove(), 300); }, 3200);
  };

  // ---------- Header ----------
  function renderHeader() {
    const header = $("#site-header");
    if (!header) return;
    const path = location.pathname.replace(/\/$/, "") || "/";
    const isActive = (href) => {
      const h = href.replace(/\/$/, "") || "/";
      if (h === "/" || h === "/index.html") return path === "/" || path.endsWith("/index.html") || path === "";
      return path.endsWith(h);
    };
    const NAV = [
      { href: "index.html", label: "Home" },
      { href: "shop.html", label: "Shop" },
      { href: "about.html", label: "About" },
      { href: "affiliate.html", label: "Affiliate" },
      { href: "contact.html", label: "Contact" },
    ];
    header.innerHTML = `
      <div class="container-x bar">
        <a href="index.html" class="brand">
          <span class="brand-name">BOVANA</span>
          <span class="brand-tag">Bombay Vanaspati</span>
        </a>
        <nav class="nav-main">
          ${NAV.map(n => `<a href="${n.href}" class="nav-link${isActive(n.href) ? " active" : ""}">${n.label}</a>`).join("")}
        </nav>
        <div class="header-actions">
          <a href="cart.html" class="cart-btn" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span class="cart-count hidden" id="cart-count">0</span>
          </a>
          <button class="menu-btn" id="menu-btn" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        <nav class="container-x">
          ${NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("")}
        </nav>
      </div>
    `;

    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    $("#menu-btn").addEventListener("click", () => $("#mobile-menu").classList.toggle("open"));
    updateCartCount();
    window.addEventListener("cart:change", updateCartCount);
    window.addEventListener("storage", (e) => { if (e.key === CART_KEY) updateCartCount(); });
  }

  function updateCartCount() {
    const el = $("#cart-count");
    if (!el) return;
    const c = Cart.count();
    el.textContent = c;
    el.classList.toggle("hidden", c === 0);
  }

  // ---------- Footer ----------
  function renderFooter() {
    const f = $("#site-footer");
    if (!f) return;
    const yr = new Date().getFullYear();
    const socialIcons = [
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    ];
    f.innerHTML = `
      <div class="container-x">
        <div class="grid">
          <div class="footer-brand">
            <h3>BOVANA</h3>
            <p class="eyebrow" style="margin-top:4px">Bombay Vanaspati · India</p>
            <p class="body">Premium herbal tea and 100% tobacco-free, nicotine-free herbal cigarettes. Hand-crafted in India, sourced ethically, composed for the modern ritual.</p>
            <div class="social">${socialIcons.map(i => `<a href="#" aria-label="social">${i}</a>`).join("")}</div>
          </div>
          <div class="footer-col">
            <p class="eyebrow label">Explore</p>
            <ul>
              <li><a href="shop.html">Shop All</a></li>
              <li><a href="about.html">Our Story</a></li>
              <li><a href="affiliate.html">Affiliate Program</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <p class="eyebrow label">Contact</p>
            <ul>
              <li>hello@bovana.in</li>
              <li>Bengaluru, India</li>
              <li style="color:var(--muted-foreground)">Mon–Sat · 10am–7pm IST</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="legal"><span class="gold">18+ only</span> · For herbal use only · Not intended for medical purposes</div>
          <p class="copy">© ${yr} BOVANA — Bombay Vanaspati. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  // ---------- Age gate ----------
  // function renderAgeGate() {
  //   if (localStorage.getItem("bovana-age-verified")) return;
  //   const el = document.createElement("div");
  //   el.className = "age-gate";
  //   el.innerHTML = `
  //     <div class="panel">
  //       <p class="eyebrow">Welcome</p>
  //       <h2>Are you <span class="gold-shimmer">18 or older?</span></h2>
  //       <span class="gold-divider"></span>
  //       <p>Our botanical products are crafted for adult use only. By entering, you confirm you meet the age requirement in your region.</p>
  //       <div class="actions">
  //         <button class="accept">Yes, I am 18+</button>
  //         <a class="exit" href="https://www.google.com">Exit</a>
  //       </div>
  //       <p class="micro">For herbal use only · Not intended for medical purposes</p>
  //     </div>`;
  //   document.body.appendChild(el);
  //   el.querySelector(".accept").addEventListener("click", () => {
  //     localStorage.setItem("bovana-age-verified", "1");
  //     el.remove();
  //   });
  // }

  // ---------- Reveal on scroll ----------
  function revealInit() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const d = parseFloat(e.target.dataset.delay || "0");
          setTimeout(() => e.target.classList.add("in"), d * 1000);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
  }

  // ---------- Product card HTML ----------
  window.productCardHTML = function (p) {
    const inner = `
      <div class="thumb">
        <img src="${p.image}" alt="${p.name}" loading="lazy" width="1024" height="1280">
        ${p.popular && !p.comingSoon ? '<span class="badge-popular">Popular</span>' : ""}
        ${p.comingSoon ? '<div class="coming-soon-overlay"><span>Coming Soon</span></div>' : ""}
      </div>
      <div class="meta">
        <p class="eyebrow">${p.categoryLabel}</p>
        <h3>${p.name}</h3>
        <p class="tagline">${p.tagline}</p>
        <div class="row">
          <span class="price">${p.comingSoon ? "—" : fmt(p.price)}</span>
          ${!p.comingSoon ? '<span class="view">View Details</span>' : ""}
        </div>
      </div>
    `;
    if (p.comingSoon) return `<div class="product-card disabled">${inner}</div>`;
    return `<a class="product-card" href="product.html?slug=${encodeURIComponent(p.slug)}">${inner}</a>`;
  };

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    // renderAgeGate();
    revealInit();
  });
})();
