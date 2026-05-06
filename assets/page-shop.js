document.addEventListener("DOMContentLoaded", () => {
  let cat = "all";
  let sort = "popular";

  const catRow = document.getElementById("cat-row");
  catRow.innerHTML = window.CATEGORIES.map(c =>
    `<button class="cat-btn${c.slug === cat ? " active" : ""}" data-cat="${c.slug}">${c.label}</button>`
  ).join("");

  catRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;
    cat = btn.dataset.cat;
    catRow.querySelectorAll(".cat-btn").forEach(b => b.classList.toggle("active", b.dataset.cat === cat));
    render();
  });

  document.getElementById("sort").addEventListener("change", (e) => { sort = e.target.value; render(); });

  function render() {
    let list = cat === "all" ? window.PRODUCTS.slice() : window.PRODUCTS.filter(p => p.category === cat);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => Number(!!b.popular) - Number(!!a.popular));
    document.getElementById("shop-grid").innerHTML = list.map(p => productCardHTML(p)).join("");
  }
  render();
});
