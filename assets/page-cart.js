document.addEventListener("DOMContentLoaded", () => {
  let step = "cart";
  let info = { name: "", email: "", address: "", city: "", pin: "" };
  const root = document.getElementById("cart-root");

  function render() {
    const items = Cart.get();
    const total = Cart.total();

    if (step === "done") {
      root.innerHTML = `
        <div style="text-align:center;max-width:32rem;margin-inline:auto;padding-block:8rem">
          <p class="eyebrow">Order Placed</p>
          <h1 style="font-size:3rem;color:var(--cream);margin-top:1rem">Thank you.</h1>
          <span class="gold-divider"></span>
          <p style="margin-top:1.5rem;color:color-mix(in oklab, var(--cream) 80%, transparent)">Your ritual is on its way. A confirmation has been sent to your email.</p>
          <a class="btn btn-gold" href="shop.html" style="margin-top:2.5rem">Continue Shopping →</a>
        </div>`;
      return;
    }

    let body;
    if (items.length === 0) {
      body = `
        <p class="eyebrow">Your Cart</p>
        <h1 style="font-size:3rem;color:var(--cream);margin-top:.75rem">Cart</h1>
        <span class="gold-divider"></span>
        <div class="empty"><p>Your cart is empty.</p><a class="view-all" style="margin-top:1rem;display:inline-block" href="shop.html">Browse the shop</a></div>`;
    } else {
      const itemsHtml = items.map(i => `
        <div class="cart-row" data-slug="${i.slug}">
          <div class="thumb"><img src="${i.image}" alt="${i.name}"></div>
          <div class="info"><h3>${i.name}</h3><p class="unit">${fmt(i.price)}</p></div>
          <div class="qty">
            <button data-act="dec" aria-label="Decrease">–</button>
            <span class="val">${i.qty}</span>
            <button data-act="inc" aria-label="Increase">+</button>
          </div>
          <p class="total">${fmt(i.price * i.qty)}</p>
          <button class="remove" data-act="rm" aria-label="Remove">✕</button>
        </div>`).join("");

      const checkoutForm = `
        <form id="checkout-form" class="form">
          <div class="field"><label class="eyebrow">Full Name</label><input name="name" value="${info.name}"></div>
          <div class="field"><label class="eyebrow">Email</label><input type="email" name="email" value="${info.email}"></div>
          <div class="field"><label class="eyebrow">Address</label><input name="address" value="${info.address}"></div>
          <div class="row2">
            <div class="field"><label class="eyebrow">City</label><input name="city" value="${info.city}"></div>
            <div class="field"><label class="eyebrow">PIN</label><input name="pin" value="${info.pin}"></div>
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%;margin-top:1rem">Place Order</button>
          <p class="note">Demo checkout · No payment required</p>
        </form>`;

      const summaryBtn = step === "cart"
        ? `<button class="btn btn-gold btn-block" id="go-checkout">Checkout</button>`
        : `<button class="btn btn-ghost btn-block" id="go-back">Back to Cart</button>`;

      body = `
        <p class="eyebrow">${step === "cart" ? "Your Cart" : "Checkout"}</p>
        <h1 style="font-size:3rem;color:var(--cream);margin-top:.75rem">${step === "cart" ? "Cart" : "Almost there."}</h1>
        <span class="gold-divider"></span>
        <div class="cart-grid">
          ${step === "cart" ? `<div class="cart-items">${itemsHtml}</div>` : checkoutForm}
          <aside class="summary">
            <p class="eyebrow">Order Summary</p>
            <div style="margin-top:1.5rem;display:grid;gap:.75rem;font-size:.875rem">
              <div class="row"><span>Subtotal</span><span>${fmt(total)}</span></div>
              <div class="row"><span>Shipping</span><span class="gold">Complimentary</span></div>
              <div class="row total"><span>Total</span><span>${fmt(total)}</span></div>
            </div>
            ${summaryBtn}
            <p class="note">18+ only · For herbal use only</p>
          </aside>
        </div>`;
    }
    root.innerHTML = body;
    bind();
  }

  function bind() {
    root.querySelectorAll(".cart-row").forEach(row => {
      const slug = row.dataset.slug;
      row.querySelectorAll("button").forEach(b => {
        b.addEventListener("click", () => {
          const items = Cart.get();
          const it = items.find(x => x.slug === slug);
          if (!it) return;
          if (b.dataset.act === "inc") Cart.setQty(slug, it.qty + 1);
          else if (b.dataset.act === "dec") Cart.setQty(slug, it.qty - 1);
          else if (b.dataset.act === "rm") Cart.remove(slug);
          render();
        });
      });
    });
    const go = document.getElementById("go-checkout");
    if (go) go.addEventListener("click", () => { step = "checkout"; render(); });
    const back = document.getElementById("go-back");
    if (back) back.addEventListener("click", () => { step = "cart"; render(); });

    const form = document.getElementById("checkout-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        info = Object.fromEntries(fd.entries());
        if (!info.name || !info.email || !info.address || !info.city || !info.pin) {
          toast("Please complete all fields", { error: true });
          return;
        }
        Cart.clear();
        step = "done";
        render();
      });
    }
  }

  render();
});
