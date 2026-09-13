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
    aroma: ["Enhances mood and energy", "Reduces inflammation", " Improves metabolism and digestion", "Boosts immunity against coughs and colds"],
    badges: ["100% Herbal Blend"],
    ingredients: ["Cinnamon", "Ginger", "Cardamom", "Black Pepper", "Clove", "Mace", "Nutmeg", "Assam Tea", "Krishna Tulsi", ],
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
    aroma: ["Refreshing and relaxing", "Rich in Antioxidants"],
    badges: ["100% Herbal Blend"],
    ingredients: ["Black CTC (Camellia sinensis", "Ginger (Zingiber officinale", "Cardamom (Elettaria cardamomum)", "Black Pepper (Piper Nigrum)", ""],
    description: "Three varieties of holy basil layered with stone-ground ginger and a soft Sencha base. A bright, peppery morning tea — clean, alert, and grounding all at once.",
    popular: true,
  },
  {
    slug: "bonava-supreme-leaf-rolling-blend",
    name: "BONAVA Supreme Leaf",
    category: "rolling-blend",
    categoryLabel: "Rolling Blend",
    price: 440,
    image: "assets/product-bonava-supreme-leaf.webp?v=20260512025353",
    images: ["assets/product-bonava-supreme-leaf.webp?v=20260512025353","assets/product-bonava-supreme-leaf-1.webp?v=20260512025353","assets/product-bonava-supreme-leaf-2.webp?v=20260512025353","assets/product-bonava-supreme-leaf-3.webp?v=20260512025353","assets/product-bonava-supreme-leaf-4.webp?v=20260512025353","assets/product-bonava-supreme-leaf-5.webp?v=20260512025353"],
    tagline: "Premium Mullein + Raspberry Leaf · Ultra-Premium Blend",
    aroma: ["Toasted Mullein", "Sweet Raspberry Leaf", "Soft Hay"],
    badges: ["No Tobacco","No Nicotine","100% Herbal Blend"],
    ingredients: ["Mullein Leaf", "Raspberry Leaf", "Damiana", "Marshmallow Leaf", "Rose Petal"],
    description: "BONAVA Supreme Leaf is our flagship tobacco-free, nicotine-free herbal infusion rolling blend. A pale, ivory pack houses an ultra-premium blend of stone-cured mullein and hand-picked raspberry leaf — soft on the draw, naturally sweet on the finish, and rolled in unbleached paper.",
    popular: true,
  },
  {
    slug: "bonava-mint-sovereign-rolling-blend",
    name: "BONAVA Mint Sovereign",
    category: "rolling-blend",
    categoryLabel: "Rolling Blend",
    price: 440,
    image: "assets/product-bonava-mint-sovereign.webp?v=20260512025353",
    images: ["assets/product-bonava-mint-sovereign.webp?v=20260512025353","assets/product-bonava-mint-sovereign-1.webp?v=20260512025353","assets/product-bonava-mint-sovereign-2.webp?v=20260512025353","assets/product-bonava-mint-sovereign-3.webp?v=20260512025353","assets/product-bonava-mint-sovereign-4.webp?v=20260512025353","assets/product-bonava-mint-sovereign-5.webp?v=20260512025353"],
    tagline: "Premium Mint Herbal Infusion · Ultra-Premium Blend",
    aroma: ["Cool Peppermint", "Crisp Spearmint", "Soft Mullein"],
    badges: ["No Tobacco","No Nicotine","100% Herbal Blend"],
    ingredients: ["Peppermint", "Spearmint", "Mullein Leaf", "Damiana", "Lavender Bud"],
    description: "BONAVA Mint Sovereign delivers a cool, sovereign mint character in a deep navy pack finished with gold botanical detailing. A tobacco-free, nicotine-free herbal infusion rolling blend built on twin mints and a smooth mullein base — clean, bright, and calmly composed.",
    popular: true,
  },
  {
    slug: "bonava-alpha-clove-rolling-blend",
    name: "BONAVA Alpha Clove",
    category: "rolling-blend",
    categoryLabel: "Rolling Blend",
    price: 440,
    image: "assets/product-bonava-alpha-clove.webp?v=20260512025353",
    images: ["assets/product-bonava-alpha-clove.webp?v=20260512025353","assets/product-bonava-alpha-clove-1.webp?v=20260512025353","assets/product-bonava-alpha-clove-2.webp?v=20260512025353","assets/product-bonava-alpha-clove-3.webp?v=20260512025353","assets/product-bonava-alpha-clove-4.webp?v=20260512025353","assets/product-bonava-alpha-clove-5.webp?v=20260512025353"],
    tagline: "Premium Clove & Mint Herbal Infusion · Royal Blend",
    aroma: ["Warm Clove", "Cool Mint", "Soft Mullein"],
    badges: ["No Tobacco","No Nicotine","100% Herbal Blend"],
    ingredients: ["Mullein Leaf", "Raspberry Leaf", "Clove", "Mint", "Damiana Leaf", "Guarana"],
    description: "A rich herbal clove blend balanced with fresh mint notes. Premium taste with a royal and commanding identity. Tobacco-free and nicotine-free, rolled in unbleached paper for a smooth, aromatic draw.",
    popular: true,
  },
];

window.CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "herbal-tea", label: "Herbal Tea" },
  { slug: "rolling-blend", label: "Rolling Blend" },
];

window.getProduct = function (slug) {
  if (!slug) return;
  const base = slug.replace(/--(?:pack\d+|g\d+)$/, "");
  let product = window.PRODUCTS.find((p) => p.slug === base);
  if (!product && !base.endsWith("-rolling-blend")) {
    product = window.PRODUCTS.find((p) => p.slug === `${base}-rolling-blend`);
  }
  if (!product && !base.endsWith("-herbal-tea")) {
    product = window.PRODUCTS.find((p) => p.slug === `${base}-herbal-tea`);
  }
  return product;
};
