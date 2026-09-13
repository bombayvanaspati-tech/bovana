// Home page
document.addEventListener("DOMContentLoaded", () => {
  const featured = document.getElementById("featured-grid");
  if (featured && window.PRODUCTS) {
    const list = PRODUCTS.filter(p => p.category === "rolling-blend").slice(0, 3);
    featured.innerHTML = list.map((p, i) =>
      `<div class="reveal" data-delay="${i * 0.08}">${productCardHTML(p)}</div>`
    ).join("");
  }

  const FAQ = [
    { q: "What is BOVANA?", a: "BOVANA (Bombay Vanaspati) is an Indian herbal lifestyle brand crafting 100% tobacco-free, nicotine-free rolling blends and ritual herb blends." },
    { q: "Are BOVANA rolling blends tobacco-free and nicotine-free?", a: "Yes. Every BOVANA rolling blend is made from a 100% botanical blend — mullein, damiana, peppermint, lavender and marshmallow leaf. There is no tobacco and no nicotine." },
    { q: "Where does BOVANA ship from?", a: "All orders are hand-packed at our Mumbai atelier and shipped across India." },
    { q: "Is BOVANA only for adults?", a: "Yes. BOVANA products are intended for adults 18 years and older only. Our site enforces age verification at entry." },
  ];
  const faqEl = document.getElementById("home-faq");
  if (faqEl) {
    faqEl.innerHTML = FAQ.map((f, i) => `
      <details class="reveal" data-delay="${i * 0.05}">
        <summary><h3>${f.q}</h3><span class="toggle">+</span></summary>
        <p>${f.a}</p>
      </details>`).join("");
  }

  // re-observe newly added .reveal elements
  document.querySelectorAll(".reveal:not(.in)").forEach(el => {
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const d = parseFloat(e.target.dataset.delay || "0");
          setTimeout(() => e.target.classList.add("in"), d * 1000);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    io.observe(el);
  });
});
