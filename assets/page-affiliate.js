document.addEventListener("DOMContentLoaded", () => {
  const ideals = ["Wellness & Ayurveda creators","Yoga, meditation & breathwork teachers","Lifestyle, luxury & slow-living bloggers","Podcast hosts & substack publishers","Independent boutiques & wellness retailers","Cafés, studios & hospitality concepts"];
  const il = document.getElementById("ideal-list");
  if (il) il.innerHTML = ideals.map(x => `<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="20 6 9 17 4 12"/></svg><span>${x}</span></li>`).join("");
  const form = document.getElementById("aff-form");
  const btn = document.getElementById("aff-btn");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());
    if (!d.name || !d.email || !d.channel) { toast("Please fill name, email, and channel", { error: true }); return; }
    btn.disabled = true; btn.textContent = "Submitting...";
    setTimeout(() => {
      btn.disabled = false; btn.textContent = "Submit Application";
      form.reset();
      toast("Application received", { desc: "Our partnerships team will respond within 3 business days." });
    }, 800);
  });

  const FAQS = [
    { q: "What is the BOVANA Affiliate Partner Program?", a: "The BOVANA Affiliate Partner Program lets creators, wellness practitioners, lifestyle bloggers, and retailers earn commission by recommending BOVANA's premium herbal teas and 100% tobacco-free, nicotine-free herbal cigarettes from Bombay Vanaspati. Partners receive a unique referral link, marketing assets, and monthly payouts." },
    { q: "How much commission do BOVANA affiliates earn?", a: "BOVANA affiliates earn 15% base commission on every qualifying sale, with tiered upgrades up to 25% for top performers. Cookie window is 45 days and there is no cap on monthly earnings." },
    { q: "Who can join the BOVANA affiliate program?", a: "Wellness creators, yoga and Ayurveda practitioners, lifestyle and luxury bloggers, podcasters, mindful-living publications, and independent retailers in India and globally are welcome to apply. Applicants are reviewed for brand alignment within 3 business days." },
    { q: "When and how are affiliate payouts made?", a: "Payouts are processed monthly in INR via UPI or bank transfer for Indian partners, and in USD via PayPal or Wise for international partners. Minimum payout threshold is ₹2,000." },
    { q: "Is BOVANA a tobacco company?", a: "No. BOVANA (Bombay Vanaspati) is a herbal lifestyle brand. All products — including our herbal cigarettes — are 100% tobacco-free and nicotine-free, crafted from botanical ingredients like tulsi, mint, clove, and rose." },
  ];
  const faqEl = document.getElementById("aff-faq");
  faqEl.style.borderTop = "1px solid var(--border)";
  faqEl.style.borderBottom = "1px solid var(--border)";
  faqEl.innerHTML = FAQS.map(f => `<details><summary><h3>${f.q}</h3><span class="toggle">+</span></summary><p>${f.a}</p></details>`).join("");
});
