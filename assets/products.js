// Product catalog
window.PRODUCTS = [
  {
    slug: "tulsi-masala-herbal-chai",
    name: "Tulsi Masala Chai",
    category: "herbal-tea",
    categoryLabel: "Herbal Tea",
    price: 199,
    image: "assets/tulsi-masala-chai.webp?v=20260512025353",
    images: ["assets/tulsi-masala-chai.webp?v=20260512025353"],
    tagline: "A floral evening cup — caffeine-free",
    aroma: ["Honeyed Chamomile", "Soft Rose", "Warm Hay"],
    ingredients: ["Egyptian Chamomile", "Damask Rose Petals", "Lemon Balm", "Liquorice Root"],
    description: "A delicate caffeine-free herbal tea blending Egyptian chamomile with hand-picked Damask rose petals. Brewed slow, it unfolds into a honeyed, floral cup — designed for the unhurried hour before sleep.",
    popular: true,
  },
  {
    slug: "tmasala-black-herbal-tea",
    name: "Masala Black Tea",
    category: "herbal-tea",
    categoryLabel: "Herbal Tea",
    price: 199,
    image: "assets/masala-black-tea.webp?v=20260512025353",
    images: ["assets/masala-black-tea.webp?v=20260512025353"],
    tagline: "Holy basil, ginger & green leaf — the morning cup",
    aroma: ["Peppery Tulsi", "Bright Ginger", "Grassy Green"],
    ingredients: ["Rama Tulsi", "Krishna Tulsi", "Sencha Green Tea", "Fresh Ginger Root", "Lemongrass"],
    description: "Three varieties of holy basil layered with stone-ground ginger and a soft Sencha base. A bright, peppery morning tea — clean, alert, and grounding all at once.",
    popular: true,
  },
  {
    slug: "bonava-supreme-leaf-herbal-cigarette",
    name: "BONAVA Supreme Leaf",
    category: "herbal-cigarettes",
    categoryLabel: "Herbal Cigarettes",
    price: 440,
    image: "assets/product-bonava-supreme-leaf.webp?v=20260512025353",
    images: ["assets/product-bonava-supreme-leaf.webp?v=20260512025353","assets/product-bonava-supreme-leaf-1.webp?v=20260512025353","assets/product-bonava-supreme-leaf-2.webp?v=20260512025353","assets/product-bonava-supreme-leaf-3.webp?v=20260512025353","assets/product-bonava-supreme-leaf-4.webp?v=20260512025353","assets/product-bonava-supreme-leaf-5.webp?v=20260512025353"],
    tagline: "Premium Mullein + Raspberry Leaf · Ultra-Premium Blend",
    aroma: ["Toasted Mullein", "Sweet Raspberry Leaf", "Soft Hay"],
    ingredients: ["Mullein Leaf", "Raspberry Leaf", "Damiana", "Marshmallow Leaf", "Rose Petal"],
    description: "BONAVA Supreme Leaf is our flagship tobacco-free, nicotine-free herbal infusion cigarette. A pale, ivory pack houses an ultra-premium blend of stone-cured mullein and hand-picked raspberry leaf — soft on the draw, naturally sweet on the finish, and rolled in unbleached paper.",
    popular: true,
  },
  {
    slug: "bonava-mint-sovereign-herbal-cigarette",
    name: "BONAVA Mint Sovereign",
    category: "herbal-cigarettes",
    categoryLabel: "Herbal Cigarettes",
    price: 440,
    image: "assets/product-bonava-mint-sovereign.webp?v=20260512025353",
    images: ["assets/product-bonava-mint-sovereign.webp?v=20260512025353","assets/product-bonava-mint-sovereign-1.webp?v=20260512025353","assets/product-bonava-mint-sovereign-2.webp?v=20260512025353","assets/product-bonava-mint-sovereign-3.webp?v=20260512025353","assets/product-bonava-mint-sovereign-4.webp?v=20260512025353","assets/product-bonava-mint-sovereign-5.webp?v=20260512025353"],
    tagline: "Premium Mint Herbal Infusion · Ultra-Premium Blend",
    aroma: ["Cool Peppermint", "Crisp Spearmint", "Soft Mullein"],
    ingredients: ["Peppermint", "Spearmint", "Mullein Leaf", "Damiana", "Lavender Bud"],
    description: "BONAVA Mint Sovereign delivers a cool, sovereign mint character in a deep navy pack finished with gold botanical detailing. A tobacco-free, nicotine-free herbal infusion cigarette built on twin mints and a smooth mullein base — clean, bright, and calmly composed.",
    popular: true,
  },
  {
    slug: "bonava-alpha-clove-herbal-cigarette",
    name: "BONAVA Alpha Clove",
    category: "herbal-cigarettes",
    categoryLabel: "Herbal Cigarettes",
    price: 440,
    image: "assets/product-bonava-alpha-clove.webp?v=20260512025353",
    images: ["assets/product-bonava-alpha-clove.webp?v=20260512025353","assets/product-bonava-alpha-clove-1.webp?v=20260512025353","assets/product-bonava-alpha-clove-2.webp?v=20260512025353","assets/product-bonava-alpha-clove-3.webp?v=20260512025353","assets/product-bonava-alpha-clove-4.webp?v=20260512025353","assets/product-bonava-alpha-clove-5.webp?v=20260512025353"],
    tagline: "Premium Clove & Mint Herbal Infusion · Royal Blend",
    aroma: ["Warm Clove", "Cool Mint", "Soft Mullein"],
    ingredients: ["Mullein Leaf", "Raspberry Leaf", "Clove", "Mint", "Damiana Leaf", "Guarana"],
    description: "A rich herbal clove blend balanced with fresh mint notes. Premium taste with a royal and commanding identity. Tobacco-free and nicotine-free, rolled in unbleached paper for a smooth, aromatic draw.",
    popular: true,
  },
  {
    slug: "herbal-cigar-herbal-cigarette",
    name: "Herbal Cigar",
    category: "cigar",
    categoryLabel: "Coming Soon",
    price: 0,
    image: "assets/product-botanical-box.webp?v=20260512025353",
    tagline: "Slow-crafted, all-botanical",
    aroma: ["—"],
    ingredients: ["—"],
    description: "Currently in development.",
    comingSoon: true,
  },
  {
    slug: "hookah-flavor-herbal-cigarette",
    name: "Hookah Herbal Flavor",
    category: "hookah",
    categoryLabel: "Coming Soon",
    price: 0,
    image: "assets/product-calm-jar.webp?v=20260512025353",
    tagline: "Aromatic shisha alternative",
    aroma: ["—"],
    ingredients: ["—"],
    description: "Currently in development.",
    comingSoon: true,
  },
];

window.CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "herbal-tea", label: "Herbal Tea" },
  { slug: "herbal-cigarettes", label: "Herbal Cigarettes" },
  { slug: "cigar", label: "Cigar" },
  { slug: "hookah", label: "Hookah" },
];

window.getProduct = function (slug) {
  if (!slug) return;
  const base = slug.replace(/--(?:pack\d+|g\d+)$/, "");
  let product = window.PRODUCTS.find((p) => p.slug === base);
  if (!product && !base.endsWith("-herbal-cigarette")) {
    product = window.PRODUCTS.find((p) => p.slug === `${base}-herbal-cigarette`);
  }
  if (!product && !base.endsWith("-herbal-tea")) {
    product = window.PRODUCTS.find((p) => p.slug === `${base}-herbal-tea`);
  }
  return product;
};
