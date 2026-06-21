/* ============================================================
   MAHA COLLECTION — APPLICATION LOGIC
   Vanilla JS SPA — hash routing, in-memory state (no localStorage
   per artifact constraints; state persists for the session).
   ============================================================ */

/* ---------------- CONFIG / PLACEHOLDERS ---------------- */
const CONFIG = {
  whatsappNumber: "213555123456", // placeholder — replace with real WhatsApp number (no + or spaces)
  instagram: "https://instagram.com/mahacollection",
  facebook: "https://facebook.com/mahacollection",
  email: "hello@mahacollection.com",
  currency: "DA",
  freeShippingThreshold: 8000,
  shippingFlat: 500
};

/* ---------------- CATEGORIES ---------------- */
const CATEGORIES = ["Robes", "Jupes", "Chemises", "Ensembles"];

/* ---------------- IMAGE LIBRARY (curated, modest-fashion-appropriate, colorful) ---------------- */
const IMG = {
  hero: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop",
  story: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  about1: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400&auto=format&fit=crop",
  catRobes: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=900&auto=format&fit=crop",
  catJupes: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop",
  catChemises: "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=900&auto=format&fit=crop",
  catEnsembles: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=900&auto=format&fit=crop",
  insta: [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500&auto=format&fit=crop"
  ]
};

/* ---------------- PRODUCT CATALOG ---------------- */
/* Categories: Robes (dresses), Jupes (skirts), Chemises (blouses/shirts), Ensembles (sets) */
const PRODUCTS = [
  {
    id: "p1", name: "Robe Amal Soie", category: "Robes", price: 12500, oldPrice: 15000,
    tag: "Sale", badge:"Best Seller",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Rose", hex:"#C46B7A"},{name:"Brun Doux", hex:"#8D7765"},{name:"Blanc Chaud", hex:"#FDF9F4"}],
    sizes: ["S","M","L","XL"],
    description: "Une robe longue fluide en mélange de soie, avec une coupe ample et des manches longues, finie de délicats boutons dorés au poignet. Pensée pour une élégance pudique sans sacrifier le confort. Entièrement doublée, légère et respirante pour toute la journée.",
    rating: 4.8, reviews: 36
  },
  {
    id: "p2", name: "Jupe Noor Plissée", category: "Jupes", price: 9800, oldPrice: null,
    tag: "New", badge:"New Arrival",
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Brun Doux", hex:"#8D7765"},{name:"Taupe", hex:"#BFA999"},{name:"Teal", hex:"#5BA39E"}],
    sizes: ["S","M","L","XL"],
    description: "Une jupe longue plissée en crêpe doux, taille haute, qui virevolte avec grâce à chaque pas. Une pièce intemporelle facile à associer avec nos chemises pour un look raffiné au quotidien.",
    rating: 4.9, reviews: 51
  },
  {
    id: "p3", name: "Ensemble Layla", category: "Ensembles", price: 13900, oldPrice: null,
    tag: "Best Seller", badge:"Best Seller",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Pêche", hex:"#EFB295"},{name:"Rose Pâle", hex:"#F4DCE0"}],
    sizes: ["S","M","L","XL"],
    description: "Un ensemble deux pièces coordonné avec une tunique ample et un pantalon large assorti, dans un tissage doux et structuré. Élégant sans effort, pour le jour comme pour le soir.",
    rating: 4.7, reviews: 28
  },
  {
    id: "p4", name: "Chemise Yasmine", category: "Chemises", price: 7200, oldPrice: 8500,
    tag: "Sale", badge:null,
    images: [
      "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Teal", hex:"#5BA39E"},{name:"Blanc Chaud", hex:"#FDF9F4"}],
    sizes: ["S","M","L","XL"],
    description: "Une chemise raffinée en satin léger, à manches longues boutonnées et col fluide. Une base intemporelle qui se marie aussi bien avec une jupe qu'un pantalon.",
    rating: 4.6, reviews: 19
  },
  {
    id: "p5", name: "Robe Dania Satin", category: "Robes", price: 19500, oldPrice: null,
    tag: "New", badge:"New Arrival",
    images: [
      "https://images.unsplash.com/photo-1583846552749-368067a1d44e?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Rose Profond", hex:"#A14F5E"},{name:"Or", hex:"#C9A063"}],
    sizes: ["S","M","L","XL"],
    description: "Une robe de soirée affirmée en satin liquide, taillée pour un tombé flatteur de l'épaule à l'ourlet. La ceinture dorée discrète souligne la taille pour une finition gracieuse lors d'occasions spéciales.",
    rating: 5.0, reviews: 14
  },
  {
    id: "p6", name: "Jupe Rania Évasée", category: "Jupes", price: 8400, oldPrice: null,
    tag: null, badge:null,
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Rose", hex:"#C46B7A"},{name:"Pêche Pâle", hex:"#FBE5D6"}],
    sizes: ["S","M","L","XL"],
    description: "Une jupe midi évasée et romantique, en coton mélangé respirant, dans un ton rosé délicat. Parfaite pour une élégance de jour avec un minimum d'effort de style.",
    rating: 4.5, reviews: 22
  },
  {
    id: "p7", name: "Ensemble Sana Pantalon Large", category: "Ensembles", price: 15800, oldPrice: null,
    tag: "Best Seller", badge:"Best Seller",
    images: [
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Brun Doux", hex:"#8D7765"},{name:"Blanc Chaud", hex:"#FDF9F4"}],
    sizes: ["S","M","L","XL"],
    description: "Un ensemble une-pièce avec haut ajusté et pantalon large fluide, offrant une couverture complète avec une finition moderne et structurée. Le choix facile pour celles qui aiment la simplicité d'une seule tenue.",
    rating: 4.7, reviews: 33
  },
  {
    id: "p8", name: "Chemise Hala Manches Bouffantes", category: "Chemises", price: 7900, oldPrice: 9200,
    tag: "Sale", badge:null,
    images: [
      "https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Taupe", hex:"#BFA999"},{name:"Brun Doux", hex:"#8D7765"}],
    sizes: ["S","M","L","XL"],
    description: "Une chemise élégante à manches bouffantes et col noué, dans un tissu fluide qui apporte du mouvement à toute tenue. Une pièce polyvalente pour le bureau comme pour les sorties.",
    rating: 4.8, reviews: 17
  },
  {
    id: "p9", name: "Robe Farah Portefeuille", category: "Robes", price: 10800, oldPrice: null,
    tag: "New", badge:"New Arrival",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Pêche", hex:"#EFB295"},{name:"Rose Pâle", hex:"#F4DCE0"}],
    sizes: ["S","M","L","XL"],
    description: "Une robe portefeuille midi intemporelle en viscose douce, avec ceinture auto-nouée et manches trois-quarts. Facile à habiller selon l'occasion — une pièce essentielle pour toute garde-robe pudique.",
    rating: 4.6, reviews: 25
  },
  {
    id: "p10", name: "Ensemble Imane Texturé", category: "Ensembles", price: 13200, oldPrice: null,
    tag: null, badge:null,
    images: [
      "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Blanc Chaud", hex:"#FDF9F4"},{name:"Taupe", hex:"#BFA999"}],
    sizes: ["S","M","L","XL"],
    description: "Un ensemble texturé matelassé avec haut ample et pantalon resserré. Une dimension subtile apporte un intérêt discret à une palette neutre raffinée, idéale pour les saisons plus fraîches.",
    rating: 4.4, reviews: 11
  },
  {
    id: "p11", name: "Robe Salma Mousseline", category: "Robes", price: 13700, oldPrice: null,
    tag: "Best Seller", badge:"Best Seller",
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Rose", hex:"#C46B7A"},{name:"Or", hex:"#C9A063"}],
    sizes: ["S","M","L","XL"],
    description: "Une robe à double épaisseur de mousseline avec doublure opaque et surcouche fluide transparente, pensée pour un mouvement gracieux tout en préservant une pudeur totale. Un choix élégant pour les soirées et célébrations.",
    rating: 4.9, reviews: 40
  },
  {
    id: "p12", name: "Jupe Warda Classique", category: "Jupes", price: 7600, oldPrice: null,
    tag: null, badge:null,
    images: [
      "https://images.unsplash.com/photo-1583846552749-368067a1d44e?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611042553365-9b101441c135?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Brun Doux", hex:"#8D7765"},{name:"Taupe", hex:"#BFA999"},{name:"Blanc Chaud", hex:"#FDF9F4"}],
    sizes: ["S","M","L","XL"],
    description: "Notre jupe signature du quotidien en crêpe mat avec une silhouette nette et structurée. Des détails minimalistes laissent parler la qualité du tombé — un essentiel incontournable de la garde-robe.",
    rating: 4.7, reviews: 64
  },
  {
    id: "p13", name: "Chemise Warda Col Noué", category: "Chemises", price: 6800, oldPrice: null,
    tag: "New", badge:"New Arrival",
    images: [
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Rose Pâle", hex:"#F4DCE0"},{name:"Teal", hex:"#5BA39E"}],
    sizes: ["S","M","L","XL"],
    description: "Une chemise légère à col noué et coupe ajustée-relâchée, parfaite en toute saison. Sa palette douce se marie avec toutes les pièces de la collection.",
    rating: 4.5, reviews: 9
  },
  {
    id: "p14", name: "Ensemble Dania Soirée", category: "Ensembles", price: 17400, oldPrice: 19900,
    tag: "Sale", badge:null,
    images: [
      "https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583846552749-368067a1d44e?q=80&w=900&auto=format&fit=crop"
    ],
    colors: [{name:"Rose Profond", hex:"#A14F5E"},{name:"Or", hex:"#C9A063"}],
    sizes: ["S","M","L","XL"],
    description: "Un ensemble de soirée raffiné mêlant cape fluide et robe intérieure simple, pensé pour les occasions qui demandent une présence élevée. Le panneau cape ajoute du mouvement tout en conservant une couverture pudique complète.",
    rating: 4.8, reviews: 17
  }
];

function getProduct(id){ return PRODUCTS.find(p => p.id === id); }
function relatedProducts(product, count=4){
  return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, count);
}
function money(n){
  return n.toLocaleString('en-US') + ' ' + CONFIG.currency;
}

/* ---------------- STATE (in-memory; session only) ---------------- */
const STATE = {
  cart: [],        // {productId, size, color, qty}
  wishlist: [],     // [productId]
  account: null,    // {name, email, phone} once "logged in"
  orders: [],       // mock order history
  currentUser: { isLoggedIn: false }
};

// Seed a couple of demo orders so the account page isn't empty
STATE.orders = [
  { id: "MC-10231", date: "2 juin 2026", status: "delivered", total: 22300, items: [
    {name:"Robe Amal Soie", size:"M", qty:1, price:12500},
    {name:"Jupe Rania Évasée", size:"S", qty:1, price:8400}
  ]},
  { id: "MC-10298", date: "14 juin 2026", status: "shipped", total: 13900, items: [
    {name:"Ensemble Layla", size:"L", qty:1, price:13900}
  ]}
];

function cartCount(){ return STATE.cart.reduce((sum,i) => sum + i.qty, 0); }
function cartTotal(){
  return STATE.cart.reduce((sum,i) => {
    const p = getProduct(i.productId);
    return sum + (p.price * i.qty);
  }, 0);
}
function updateBadges(){
  const cb = document.getElementById('cartBadge');
  const wb = document.getElementById('wishlistBadge');
  const cc = cartCount();
  const wc = STATE.wishlist.length;
  cb.textContent = cc; cb.classList.toggle('hidden', cc === 0);
  wb.textContent = wc; wb.classList.toggle('hidden', wc === 0);
}

function addToCart(productId, size, color, qty=1){
  const existing = STATE.cart.find(i => i.productId===productId && i.size===size && i.color===color);
  if(existing){ existing.qty += qty; }
  else { STATE.cart.push({productId, size, color, qty}); }
  updateBadges();
  showToast(`Ajouté au panier — ${getProduct(productId).name}`);
}
function removeFromCart(index){
  STATE.cart.splice(index,1);
  updateBadges();
  render();
}
function updateCartQty(index, delta){
  STATE.cart[index].qty = Math.max(1, STATE.cart[index].qty + delta);
  updateBadges();
  render();
}
function toggleWishlist(productId){
  const idx = STATE.wishlist.indexOf(productId);
  if(idx > -1){ STATE.wishlist.splice(idx,1); showToast('Retiré des favoris'); }
  else { STATE.wishlist.push(productId); showToast('Ajouté aux favoris'); }
  updateBadges();
  document.querySelectorAll(`[data-wishlist-id="${productId}"]`).forEach(el=>{
    el.classList.toggle('active', STATE.wishlist.includes(productId));
  });
}

let toastTimer;
function showToast(msg){
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('show'), 2600);
}

function subscribeNewsletter(inputId){
  const input = document.getElementById(inputId);
  if(input && input.value.trim().includes('@')){
    showToast('Merci pour votre inscription ♡');
    input.value = '';
  } else {
    showToast('Veuillez entrer une adresse email valide');
  }
}

/* ---------------- ROUTER ---------------- */
const routes = {};
function registerRoute(path, renderFn){ routes[path] = renderFn; }

function parseHash(){
  let hash = window.location.hash.slice(1) || '/';
  const [path, queryStr] = hash.split('?');
  const params = new URLSearchParams(queryStr || '');
  return { path: path || '/', params };
}

function navigateTo(hash){
  window.location.hash = hash;
}

async function render(){
  const { path, params } = parseHash();
  const app = document.getElementById('app');
  window.scrollTo(0,0);

  // highlight nav active state
  document.querySelectorAll('.main-nav a').forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === '#'+path);
  });

  let matched = routes[path];
  let html = '';
  if(matched){
    html = matched(params);
  } else if(path.startsWith('/product/')){
    const id = path.split('/product/')[1];
    html = renderProductPage(id);
  } else {
    html = render404();
  }
  app.innerHTML = `<div class="page">${html}</div>`;
  updateBadges();
  afterRender(path, params);
  closeMobileDrawer();
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', ()=>{
  if(!window.location.hash) window.location.hash = '#/';
  render();
});

function render404(){
  return `<div class="container section text-center">
    <h1 style="font-size:64px; font-style:italic;">404</h1>
    <p class="muted mt-16">Cette page est introuvable.</p>
    <a href="#/" class="btn btn-fill mt-24" data-link><span>Retour à l'accueil</span></a>
  </div>`;
}

/* ============================================================
   COMPONENT: PRODUCT CARD
   ============================================================ */
function productCard(p){
  const wished = STATE.wishlist.includes(p.id);
  return `
  <div class="product-card">
    <div class="product-media" onclick="navigateTo('#/product/${p.id}')">
      ${p.tag ? `<span class="product-tag ${p.tag==='Sale'?'sale':''} ${p.tag==='New'?'new':''}">${p.tag === 'Sale' ? 'Promo' : p.tag === 'New' ? 'Nouveau' : p.tag}</span>` : ''}
      <button class="wishlist-toggle ${wished?'active':''}" data-wishlist-id="${p.id}" onclick="event.stopPropagation(); toggleWishlist('${p.id}')" aria-label="Ajouter aux favoris">
        <svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 7.9 2.3 4.5 5.7 4c2-.3 3.7.7 4.8 2.2.5.7.8 1.1 1.5 1.1s1-.4 1.5-1.1C14.6 4.7 16.3 3.7 18.3 4c3.4.5 5.1 3.9 3.5 7.4C19.5 15.9 12 20.5 12 20.5z" stroke-width="1.4"/></svg>
      </button>
      <img class="main-img" src="${p.images[0]}" alt="${p.name}" loading="lazy">
      ${p.images[1] ? `<img class="alt-img" src="${p.images[1]}" alt="${p.name} vue alternative" loading="lazy">` : ''}
      <button class="quick-view-btn" onclick="event.stopPropagation(); openQuickView('${p.id}')">Aperçu Rapide</button>
    </div>
    <div class="product-info">
      <a href="#/product/${p.id}" data-link><div class="pname">${p.name}</div></a>
      <div class="pcat">${p.category}</div>
      <div class="pprice">
        ${p.oldPrice ? `<span class="old">${money(p.oldPrice)}</span>` : ''}
        <span>${money(p.price)}</span>
      </div>
      <div class="swatches">
        ${p.colors.map(c=>`<span class="swatch" style="background:${c.hex}" title="${c.name}"></span>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function renderHome(){
  const bestSellers = PRODUCTS.filter(p => p.badge === 'Best Seller').slice(0,4);
  const newArrivals = PRODUCTS.filter(p => p.badge === 'New Arrival').slice(0,4);

  return `
  <section class="hero">
    <img class="hero-bg" src="${IMG.hero}" alt="MAHA Collection — mode élégante et pudique">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <img src="assets/logo_medium.png" alt="MAHA Collection" class="hero-logo">
      <div class="hero-eyebrow">Élégance Arabe Moderne</div>
      <h1>Une élégance intemporelle,<br>pour chaque femme.</h1>
      <p class="tagline">Une mode pudique conçue avec grâce — silhouettes douces, tissus premium et luxe discret pour la femme confiante et contemporaine.</p>
      <div class="hairline hairline-draw"></div>
      <div class="hero-actions">
        <a href="#/shop" class="btn btn-fill" data-link><span>Découvrir</span></a>
        <a href="#/shop?cat=New" class="btn" style="border-color:rgba(253,249,244,0.6); color:var(--warm-white);" data-link><span>Nouveautés</span></a>
      </div>
    </div>
  </section>

  <section class="section-tight">
    <div class="container">
      <div class="section-head center">
        <p class="eyebrow">Shop By Category</p>
        <h2 style="font-size:clamp(28px,4vw,38px); font-style:italic; margin-top:10px;">Trouvez Votre Silhouette</h2>
        <div class="hairline center"></div>
      </div>
    </div>
    <div class="cat-grid">
      <a class="cat-card" href="#/shop?cat=Robes" data-link>
        <img src="${IMG.catRobes}" alt="Collection Robes" loading="lazy">
        <div class="cat-label"><span>Robes</span><small>Élégance Pudique</small></div>
      </a>
      <a class="cat-card" href="#/shop?cat=Jupes" data-link>
        <img src="${IMG.catJupes}" alt="Collection Jupes" loading="lazy">
        <div class="cat-label"><span>Jupes</span><small>Tombé Raffiné</small></div>
      </a>
      <a class="cat-card" href="#/shop?cat=Chemises" data-link>
        <img src="${IMG.catChemises}" alt="Collection Chemises" loading="lazy">
        <div class="cat-label"><span>Chemises</span><small>Essentiels Doux</small></div>
      </a>
      <a class="cat-card" href="#/shop?cat=Ensembles" data-link>
        <img src="${IMG.catEnsembles}" alt="Collection Ensembles" loading="lazy">
        <div class="cat-label"><span>Ensembles</span><small>Coordonnés</small></div>
      </a>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head flex-between" style="align-items:flex-end;">
        <div>
          <p class="eyebrow">Les Plus Aimées</p>
          <h2 style="font-size:clamp(28px,4vw,38px); font-style:italic; margin-top:10px;">Meilleures Ventes</h2>
        </div>
        <a href="#/shop?cat=Best" class="link-underline" data-link style="font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">Voir Tout</a>
      </div>
      <div class="product-grid">
        ${bestSellers.map(productCard).join('')}
      </div>
    </div>
  </section>

  <section class="story">
    <div class="story-img"><img src="${IMG.story}" alt="L'histoire de MAHA Collection"></div>
    <div class="story-text">
      <p class="eyebrow">Notre Histoire</p>
      <h2>La grâce dans chaque fil.</h2>
      <p>MAHA Collection célèbre l'élégance féminine à travers une mode pudique et intemporelle. Chaque pièce est conçue pour faire sentir les femmes belles, confiantes et gracieuses — puisant dans l'esprit raffiné de l'élégance arabe moderne, réinventée pour la femme contemporaine.</p>
      <p>De la sélection des tissus premium jusqu'à la dernière couture, nous tenons chaque détail à la hauteur de ce que vous méritez de ressentir : gracieuse, ancrée, et discrètement puissante.</p>
      <a href="#/about" class="btn btn-gold" data-link><span>Découvrir Notre Histoire</span></a>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head flex-between" style="align-items:flex-end;">
        <div>
          <p class="eyebrow">Tout Juste Arrivées</p>
          <h2 style="font-size:clamp(28px,4vw,38px); font-style:italic; margin-top:10px;">Nouveautés</h2>
        </div>
        <a href="#/shop?cat=New" class="link-underline" data-link style="font-size:12px; letter-spacing:0.1em; text-transform:uppercase;">Voir Tout</a>
      </div>
      <div class="product-grid">
        ${newArrivals.map(productCard).join('')}
      </div>
    </div>
  </section>

  <section class="testi-wrap">
    <div class="container">
      <div class="section-head center">
        <p class="eyebrow" style="color:var(--gold-soft);">Avis Clientes</p>
        <h2 style="font-size:clamp(26px,4vw,34px); font-style:italic; margin-top:10px; color:var(--warm-white);">Ce Que Disent Nos Clientes</h2>
      </div>
      <div class="testi-grid">
        <div class="testi-card">
          <div class="testi-stars">★★★★★</div>
          <p>"La qualité du tissu est incomparable. Je me suis sentie élégante et à l'aise toute la journée dans ma robe Amal — elle est devenue mon premier choix pour toute occasion."</p>
          <div class="testi-name">— Yasmine B., Alger</div>
        </div>
        <div class="testi-card">
          <div class="testi-stars">★★★★★</div>
          <p>"Enfin une marque qui comprend que la mode pudique peut être luxueuse. La jupe Noor est tout simplement magnifique, le tombé est parfait."</p>
          <div class="testi-name">— Sarah K., Oran</div>
        </div>
        <div class="testi-card">
          <div class="testi-stars">★★★★★</div>
          <p>"La commande a été simple et la livraison rapide. MAHA Collection a gagné une cliente fidèle — j'ai déjà trois autres pièces en tête."</p>
          <div class="testi-name">— Imane T., Constantine</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-tight">
    <div class="container">
      <div class="section-head center">
        <p class="eyebrow">@mahacollection</p>
        <h2 style="font-size:clamp(26px,4vw,34px); font-style:italic; margin-top:10px;">Suivez Notre Aventure</h2>
      </div>
    </div>
    <div class="insta-grid">
      ${IMG.insta.map(src => `
        <a class="insta-item" href="${CONFIG.instagram}" target="_blank">
          <img src="${src}" alt="MAHA Collection sur Instagram" loading="lazy">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="5" stroke-width="1.3"/><circle cx="12" cy="12" r="4" stroke-width="1.3"/></svg>
        </a>`).join('')}
    </div>
  </section>

  <section class="newsletter">
    <div class="container">
      <p class="eyebrow">Rejoignez Le Cercle MAHA</p>
      <h2>Soyez la première informée.</h2>
      <p>Abonnez-vous pour un accès anticipé aux nouveautés, offres privées et conseils de style.</p>
      <div class="newsletter-form">
        <input type="email" placeholder="Entrez votre adresse email" id="homeEmail">
        <button onclick="subscribeNewsletter('homeEmail')">S'abonner</button>
      </div>
    </div>
  </section>
  `;
}
registerRoute('/', renderHome);

/* ============================================================
   SHOP PAGE
   ============================================================ */
let shopFilters = { category: 'All', colors: [], sizes: [], sort: 'featured', search: '' };

function renderShop(params){
  const catParam = params.get('cat');
  if(catParam === 'New'){ shopFilters.category = 'New'; }
  else if(catParam === 'Best'){ shopFilters.category = 'Best'; }
  else if(catParam){ shopFilters.category = catParam; }
  else if(!catParam && params.toString()===''){ /* keep existing if navigating via filter UI */ }

  let list = [...PRODUCTS];
  if(shopFilters.category === 'New') list = list.filter(p=>p.badge==='New Arrival');
  else if(shopFilters.category === 'Best') list = list.filter(p=>p.badge==='Best Seller');
  else if(shopFilters.category !== 'All') list = list.filter(p=>p.category===shopFilters.category);

  if(shopFilters.colors.length){
    list = list.filter(p => p.colors.some(c => shopFilters.colors.includes(c.name)));
  }
  if(shopFilters.sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
  if(shopFilters.sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
  if(shopFilters.sort === 'rating') list.sort((a,b)=>b.rating-a.rating);

  const allColors = [...new Map(PRODUCTS.flatMap(p=>p.colors).map(c=>[c.name,c])).values()];
  const categories = ['All', ...CATEGORIES];
  const catLabel = (c) => c === 'All' ? 'Tout' : c;

  const heading = shopFilters.category === 'All' ? 'Toute la Collection' : shopFilters.category === 'New' ? 'Nouveautés' : shopFilters.category === 'Best' ? 'Meilleures Ventes' : shopFilters.category;

  return `
  <div class="page-hero">
    <p class="eyebrow">La Collection</p>
    <h1>${heading}</h1>
    <p>Des pièces pudiques et élégantes, conçues pour la femme qui valorise à la fois qualité et grâce.</p>
  </div>
  <div class="container section-tight">
    <button class="btn btn-ghost btn-sm mobile-filter-btn" onclick="document.getElementById('filterSidebar').classList.toggle('open')" style="margin-bottom:20px;"><span>Filtrer &amp; Trier</span></button>
    <div class="shop-layout">
      <aside class="filter-sidebar" id="filterSidebar">
        <div class="filter-block">
          <h4>Catégorie</h4>
          ${categories.map(c=>`
            <label class="filter-opt">
              <input type="radio" name="cat" ${shopFilters.category===c?'checked':''} onchange="shopFilters.category='${c}'; renderShopOnly();">
              ${catLabel(c)}
            </label>`).join('')}
        </div>
        <div class="filter-block">
          <h4>Couleur</h4>
          <div class="color-filter-row">
            ${allColors.map(c=>`
              <span class="color-dot ${shopFilters.colors.includes(c.name)?'selected':''}" style="background:${c.hex}" title="${c.name}" onclick="toggleColorFilter('${c.name}')"></span>`).join('')}
          </div>
        </div>
        <div class="filter-block">
          <h4>Taille</h4>
          ${['S','M','L','XL'].map(s=>`
            <label class="filter-opt">
              <input type="checkbox" ${shopFilters.sizes.includes(s)?'checked':''} onchange="toggleSizeFilter('${s}')"> ${s}
            </label>`).join('')}
        </div>
        <button class="btn btn-ghost btn-sm btn-block" onclick="resetShopFilters()"><span>Réinitialiser</span></button>
      </aside>
      <div>
        <div class="shop-toolbar">
          <span class="count">${list.length} pièce${list.length!==1?'s':''}</span>
          <select class="sort-select" onchange="shopFilters.sort=this.value; renderShopOnly();">
            <option value="featured" ${shopFilters.sort==='featured'?'selected':''}>En Vedette</option>
            <option value="price-asc" ${shopFilters.sort==='price-asc'?'selected':''}>Prix Croissant</option>
            <option value="price-desc" ${shopFilters.sort==='price-desc'?'selected':''}>Prix Décroissant</option>
            <option value="rating" ${shopFilters.sort==='rating'?'selected':''}>Mieux Notées</option>
          </select>
        </div>
        <div class="product-grid" id="shopGrid">
          ${list.length ? list.map(productCard).join('') : `<p class="muted" style="grid-column:1/-1; text-align:center; padding:60px 0;">Aucune pièce ne correspond à vos filtres. Essayez de les réinitialiser.</p>`}
        </div>
      </div>
    </div>
  </div>`;
}
registerRoute('/shop', renderShop);

function toggleColorFilter(name){
  const i = shopFilters.colors.indexOf(name);
  if(i>-1) shopFilters.colors.splice(i,1); else shopFilters.colors.push(name);
  renderShopOnly();
}
function toggleSizeFilter(name){
  const i = shopFilters.sizes.indexOf(name);
  if(i>-1) shopFilters.sizes.splice(i,1); else shopFilters.sizes.push(name);
  renderShopOnly();
}
function resetShopFilters(){
  shopFilters = { category:'All', colors:[], sizes:[], sort:'featured', search:'' };
  renderShopOnly();
}
function renderShopOnly(){
  document.getElementById('app').innerHTML = `<div class="page">${renderShop(new URLSearchParams())}</div>`;
  updateBadges();
}

/* ============================================================
   PRODUCT DETAIL PAGE
   ============================================================ */
let pdpState = { activeImage: 0, size: null, color: null, qty: 1 };

function renderProductPage(id){
  const p = getProduct(id);
  if(!p) return render404();
  pdpState = { activeImage: 0, size: null, color: p.colors[0].name, qty: 1 };
  const related = relatedProducts(p);
  const wished = STATE.wishlist.includes(p.id);

  return `
  <div class="container">
    <div class="breadcrumb"><a href="#/" data-link>Accueil</a> / <a href="#/shop" data-link>Boutique</a> / <a href="#/shop?cat=${p.category}" data-link>${p.category}</a> / ${p.name}</div>
  </div>
  <div class="container section-tight">
    <div class="pdp">
      <div>
        <div class="pdp-gallery-main"><img id="pdpMainImg" src="${p.images[0]}" alt="${p.name}"></div>
        <div class="pdp-thumbs">
          ${p.images.map((img,i)=>`<div class="pdp-thumb ${i===0?'active':''}" data-thumb="${i}" onclick="setPdpImage(${i}, '${p.id}')"><img src="${img}" alt="${p.name} vue ${i+1}"></div>`).join('')}
        </div>
      </div>
      <div class="pdp-info">
        <div class="pcat">${p.category}${p.badge?` · ${p.badge==='Best Seller'?'Meilleure Vente':'Nouveauté'}`:''}</div>
        <h1>${p.name}</h1>
        <div class="pdp-rating">★★★★★ <span>${p.rating} (${p.reviews} avis)</span></div>
        <div class="pdp-price">
          ${p.oldPrice ? `<span class="old">${money(p.oldPrice)}</span>` : ''}
          <span>${money(p.price)}</span>
        </div>
        <p class="pdp-desc">${p.description}</p>

        <div class="pdp-divider"></div>

        <div class="option-group">
          <div class="option-label"><span>Couleur : <strong id="selectedColorLabel">${p.colors[0].name}</strong></span></div>
          <div class="color-row">
            ${p.colors.map((c,i)=>`<span class="color-pill ${i===0?'selected':''}" data-color="${c.name}" style="background:${c.hex}" onclick="selectColor('${c.name}', this)"></span>`).join('')}
          </div>
        </div>

        <div class="option-group">
          <div class="option-label"><span>Taille</span><span class="muted" onclick="openSizeGuide()">Guide des Tailles</span></div>
          <div class="size-row">
            ${p.sizes.map(s=>`<div class="size-pill" data-size="${s}" onclick="selectSize('${s}', this)">${s}</div>`).join('')}
          </div>
          <div id="sizeError" style="display:none; color:#A85A4D; font-size:11.5px; margin-top:10px;">Veuillez sélectionner une taille avant d'ajouter au panier.</div>
        </div>

        <div class="option-group">
          <div class="option-label"><span>Quantité</span></div>
          <div class="qty-row">
            <button onclick="changePdpQty(-1)" aria-label="Diminuer">−</button>
            <span id="pdpQty">1</span>
            <button onclick="changePdpQty(1)" aria-label="Augmenter">+</button>
          </div>
        </div>

        <div class="pdp-actions">
          <button class="btn btn-fill" onclick="addPdpToCart('${p.id}')"><span>Ajouter au Panier — ${money(p.price)}</span></button>
          <button class="icon-square ${wished?'active':''}" data-wishlist-id="${p.id}" onclick="toggleWishlist('${p.id}')" aria-label="Ajouter aux favoris">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 7.9 2.3 4.5 5.7 4c2-.3 3.7.7 4.8 2.2.5.7.8 1.1 1.5 1.1s1-.4 1.5-1.1C14.6 4.7 16.3 3.7 18.3 4c3.4.5 5.1 3.9 3.5 7.4C19.5 15.9 12 20.5 12 20.5z" stroke-width="1.4"/></svg>
          </button>
        </div>

        <div class="trust-row">
          <div class="trust-item"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.4"><path d="M3 7h13l4 4v6h-2M3 7v10h2M3 7l2-3h9l2 3M16 17a2 2 0 104 0 2 2 0 00-4 0zM5 17a2 2 0 104 0 2 2 0 00-4 0z"/></svg> Paiement à la livraison</div>
          <div class="trust-item"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.4"><path d="M12 3l8 4v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4z"/></svg> Qualité Garantie</div>
          <div class="trust-item"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.4"><path d="M21 12a9 9 0 11-9-9M21 3v6h-6"/></svg> Échange Facile</div>
        </div>

        <div class="accordion">
          <div class="accordion-item">
            <div class="accordion-head" onclick="this.parentElement.classList.toggle('open')"><span>Tissu &amp; Entretien</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg></div>
            <div class="accordion-body"><p>Mélange de tissu premium sélectionné pour son tombé, sa respirabilité et sa durabilité. Nettoyage à sec recommandé ; en cas de lavage à la main, utilisez de l'eau froide et séchez à plat à l'abri du soleil direct.</p></div>
          </div>
          <div class="accordion-item">
            <div class="accordion-head" onclick="this.parentElement.classList.toggle('open')"><span>Livraison</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg></div>
            <div class="accordion-body"><p>Livraison partout en Algérie sous 2 à 5 jours ouvrables. Paiement à la livraison disponible dans tout le pays. Voir notre <a href="#/shipping" data-link style="color:var(--rose-deep); text-decoration:underline;">Politique de Livraison</a> pour plus de détails.</p></div>
          </div>
          <div class="accordion-item">
            <div class="accordion-head" onclick="this.parentElement.classList.toggle('open')"><span>Retours &amp; Échanges</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg></div>
            <div class="accordion-body"><p>Échanges acceptés sous 7 jours après livraison pour les articles non portés avec étiquettes. Voir notre <a href="#/returns" data-link style="color:var(--rose-deep); text-decoration:underline;">Politique de Retours</a>.</p></div>
          </div>
        </div>
      </div>
    </div>

    ${related.length ? `
    <div style="margin-top:120px;">
      <div class="section-head center">
        <p class="eyebrow">Vous Aimerez Aussi</p>
        <h2 style="font-size:clamp(26px,4vw,34px); font-style:italic; margin-top:10px;">Complétez Le Look</h2>
      </div>
      <div class="product-grid">${related.map(productCard).join('')}</div>
    </div>` : ''}
  </div>`;
}

function setPdpImage(i, productId){
  const p = getProduct(productId);
  document.getElementById('pdpMainImg').src = p.images[i];
  document.querySelectorAll('.pdp-thumb').forEach(t=>t.classList.remove('active'));
  document.querySelector(`.pdp-thumb[data-thumb="${i}"]`).classList.add('active');
}
function selectColor(name, el){
  pdpState.color = name;
  document.querySelectorAll('.color-pill').forEach(p=>p.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('selectedColorLabel').textContent = name;
}
function selectSize(size, el){
  pdpState.size = size;
  document.querySelectorAll('.size-pill').forEach(p=>p.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('sizeError').style.display = 'none';
}
function changePdpQty(delta){
  pdpState.qty = Math.max(1, pdpState.qty + delta);
  document.getElementById('pdpQty').textContent = pdpState.qty;
}
function addPdpToCart(productId){
  if(!pdpState.size){
    document.getElementById('sizeError').style.display = 'block';
    document.getElementById('sizeError').scrollIntoView({behavior:'smooth', block:'center'});
    return;
  }
  addToCart(productId, pdpState.size, pdpState.color, pdpState.qty);
}
function openSizeGuide(){
  showToast('S: 36-38 · M: 38-40 · L: 40-42 · XL: 42-44 (EU)');
}

/* ---------------- QUICK VIEW MODAL ---------------- */
let qvState = { size:null, color:null, qty:1, productId:null };
function openQuickView(id){
  const p = getProduct(id);
  qvState = { size:null, color:p.colors[0].name, qty:1, productId:id };
  const box = document.getElementById('quickViewBox');
  box.innerHTML = `
    <button class="modal-close" onclick="closeQuickView()" aria-label="Fermer">
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6"><path d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
    <div class="modal-img"><img src="${p.images[0]}" alt="${p.name}"></div>
    <div class="modal-body">
      <p class="pcat">${p.category}</p>
      <h2 style="font-size:26px; font-style:italic; margin-top:8px;">${p.name}</h2>
      <div class="pdp-price" style="margin-top:12px;">
        ${p.oldPrice ? `<span class="old">${money(p.oldPrice)}</span>` : ''}
        <span>${money(p.price)}</span>
      </div>
      <p style="font-size:13.5px; color:var(--ink-soft); margin-top:16px; line-height:1.8;">${p.description.slice(0,140)}…</p>
      <div class="option-group" style="margin-top:22px;">
        <div class="option-label"><span>Couleur : <strong id="qvColorLabel">${p.colors[0].name}</strong></span></div>
        <div class="color-row">
          ${p.colors.map((c,i)=>`<span class="color-pill ${i===0?'selected':''}" style="background:${c.hex}" onclick="qvSelectColor('${c.name}', this)"></span>`).join('')}
        </div>
      </div>
      <div class="option-group">
        <div class="option-label"><span>Taille</span></div>
        <div class="size-row">
          ${p.sizes.map(s=>`<div class="size-pill" onclick="qvSelectSize('${s}', this)">${s}</div>`).join('')}
        </div>
      </div>
      <div class="pdp-actions" style="margin-top:10px;">
        <button class="btn btn-fill" onclick="qvAddToCart()"><span>Ajouter au Panier</span></button>
      </div>
      <a href="#/product/${p.id}" data-link onclick="closeQuickView()" class="link-underline" style="display:inline-block; margin-top:18px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:var(--rose-deep);">Voir Tous Les Détails</a>
    </div>
  `;
  document.getElementById('quickViewModal').classList.add('open');
}
function closeQuickView(){ document.getElementById('quickViewModal').classList.remove('open'); }
function qvSelectColor(name, el){
  qvState.color = name;
  el.parentElement.querySelectorAll('.color-pill').forEach(p=>p.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('qvColorLabel').textContent = name;
}
function qvSelectSize(size, el){
  qvState.size = size;
  el.parentElement.querySelectorAll('.size-pill').forEach(p=>p.classList.remove('selected'));
  el.classList.add('selected');
}
function qvAddToCart(){
  if(!qvState.size){ showToast('Veuillez sélectionner une taille'); return; }
  addToCart(qvState.productId, qvState.size, qvState.color, 1);
  closeQuickView();
}

/* ============================================================
   CART PAGE
   ============================================================ */
function renderCart(){
  if(STATE.cart.length === 0){
    return `
    <div class="container">
      <div class="empty-state">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>
        <h3>Votre panier est vide</h3>
        <p>Découvrez des pièces conçues pour vous faire sentir gracieuse et confiante.</p>
        <a href="#/shop" class="btn btn-fill" data-link><span>Continuer mes achats</span></a>
      </div>
    </div>`;
  }

  const subtotal = cartTotal();
  const shipping = subtotal >= CONFIG.freeShippingThreshold ? 0 : CONFIG.shippingFlat;
  const total = subtotal + shipping;

  return `
  <div class="page-hero">
    <p class="eyebrow">${cartCount()} Article${cartCount()!==1?'s':''}</p>
    <h1>Votre Panier</h1>
  </div>
  <div class="container section-tight">
    <div class="cart-layout">
      <div>
        ${STATE.cart.map((item, idx)=>{
          const p = getProduct(item.productId);
          return `
          <div class="cart-row">
            <img src="${p.images[0]}" alt="${p.name}">
            <div>
              <a href="#/product/${p.id}" data-link><div class="cname">${p.name}</div></a>
              <div class="cmeta">Taille : ${item.size} &nbsp;·&nbsp; Couleur : ${item.color}</div>
              <div class="cprice">${money(p.price)}</div>
              <div class="mini-qty mt-8">
                <button onclick="updateCartQty(${idx}, -1)" aria-label="Diminuer">−</button>
                <span>${item.qty}</span>
                <button onclick="updateCartQty(${idx}, 1)" aria-label="Augmenter">+</button>
              </div>
            </div>
            <div class="cart-row-right">
              <div style="font-family:var(--serif); font-size:17px; font-style:italic;">${money(p.price * item.qty)}</div>
              <button class="remove-link" onclick="removeFromCart(${idx})">Retirer</button>
            </div>
          </div>`;
        }).join('')}
        <a href="#/shop" class="link-underline" data-link style="display:inline-block; margin-top:24px; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; color:var(--rose-deep);">← Continuer mes achats</a>
      </div>
      <div class="summary-box">
        <h3>Récapitulatif</h3>
        <div class="summary-line"><span>Sous-total</span><span>${money(subtotal)}</span></div>
        <div class="summary-line"><span>Livraison</span><span>${shipping===0?'Gratuite':money(shipping)}</span></div>
        ${shipping > 0 ? `<div class="summary-line" style="color:var(--rose-deep); font-size:12px;">Ajoutez ${money(CONFIG.freeShippingThreshold - subtotal)} pour la livraison gratuite</div>` : ''}
        <div class="promo-row">
          <input type="text" placeholder="Code promo">
          <button class="btn btn-ghost btn-sm" onclick="showToast('Code promo appliqué au moment du paiement')"><span>Appliquer</span></button>
        </div>
        <div class="summary-line total"><span>Total</span><span>${money(total)}</span></div>
        <a href="#/checkout" class="btn btn-fill btn-block mt-24" data-link><span>Passer Commande</span></a>
      </div>
    </div>
  </div>`;
}
registerRoute('/cart', renderCart);

/* ============================================================
   CHECKOUT PAGE + WHATSAPP ORDER CONFIRMATION
   ============================================================ */
let checkoutPayment = 'cod';

function renderCheckout(){
  if(STATE.cart.length === 0){
    return `<div class="container section text-center">
      <h2 style="font-style:italic;">Votre panier est vide</h2>
      <p class="muted mt-16">Ajoutez quelques favoris avant de finaliser votre commande.</p>
      <a href="#/shop" class="btn btn-fill mt-24" data-link><span>Découvrir la boutique</span></a>
    </div>`;
  }
  const subtotal = cartTotal();
  const shipping = subtotal >= CONFIG.freeShippingThreshold ? 0 : CONFIG.shippingFlat;
  const total = subtotal + shipping;

  return `
  <div class="page-hero">
    <p class="eyebrow">Dernière Étape</p>
    <h1>Finaliser la Commande</h1>
  </div>
  <div class="container section-tight">
    <div class="checkout-grid">
      <div>
        <h3 style="font-style:italic; font-size:19px; margin-bottom:22px;">Informations de Livraison</h3>
        <form id="checkoutForm" novalidate>
          <div class="form-row-2">
            <div class="form-group" id="fg-fullName">
              <label for="fullName">Nom Complet</label>
              <input type="text" id="fullName" placeholder="ex. Amina Belkacem" required>
              <div class="error-msg">Veuillez entrer votre nom complet.</div>
            </div>
            <div class="form-group" id="fg-phone">
              <label for="phone">Numéro de Téléphone</label>
              <input type="tel" id="phone" placeholder="ex. 0555 12 34 56" required>
              <div class="error-msg">Veuillez entrer un numéro valide.</div>
            </div>
          </div>
          <div class="form-group" id="fg-address">
            <label for="address">Adresse</label>
            <input type="text" id="address" placeholder="Immeuble/Maison, nom de rue" required>
            <div class="error-msg">Veuillez entrer votre adresse.</div>
          </div>
          <div class="form-row-2">
            <div class="form-group" id="fg-wilaya">
              <label for="wilaya">Wilaya</label>
              <select id="wilaya" required>
                <option value="">Sélectionnez votre wilaya</option>
                <option>Alger</option><option>Oran</option><option>Constantine</option><option>Blida</option>
                <option>Annaba</option><option>Sétif</option><option>Tlemcen</option><option>Béjaïa</option>
                <option>Batna</option><option>Autre</option>
              </select>
              <div class="error-msg">Veuillez sélectionner votre wilaya.</div>
            </div>
            <div class="form-group" id="fg-city">
              <label for="city">Ville / Commune</label>
              <input type="text" id="city" placeholder="ex. Hydra" required>
              <div class="error-msg">Veuillez entrer votre ville.</div>
            </div>
          </div>
          <div class="form-group">
            <label for="notes">Notes de Commande (optionnel)</label>
            <textarea id="notes" rows="3" placeholder="Instructions de livraison, point de repère, horaire préféré..."></textarea>
          </div>

          <h3 style="font-style:italic; font-size:19px; margin:34px 0 18px;">Mode de Paiement</h3>
          <label class="pay-option selected" for="pay-cod">
            <input type="radio" name="payment" id="pay-cod" value="cod" checked onchange="checkoutPayment='cod'">
            <div>
              <div class="pname">Paiement à la Livraison</div>
              <div class="pdesc">Payez en espèces à la réception de votre commande</div>
            </div>
          </label>
          <label class="pay-option disabled" for="pay-online">
            <input type="radio" name="payment" id="pay-online" value="online" disabled>
            <div>
              <div class="pname">Paiement en Ligne</div>
              <div class="pdesc">Bientôt disponible — paiement par carte</div>
            </div>
          </label>
        </form>
      </div>

      <div class="summary-box">
        <h3>Récapitulatif</h3>
        ${STATE.cart.map(item=>{
          const p = getProduct(item.productId);
          return `<div class="summary-line"><span>${p.name} (${item.size}) × ${item.qty}</span><span>${money(p.price*item.qty)}</span></div>`;
        }).join('')}
        <div class="pdp-divider" style="margin:18px 0;"></div>
        <div class="summary-line"><span>Sous-total</span><span>${money(subtotal)}</span></div>
        <div class="summary-line"><span>Livraison</span><span>${shipping===0?'Gratuite':money(shipping)}</span></div>
        <div class="summary-line total"><span>Total</span><span>${money(total)}</span></div>
        <button class="btn btn-fill btn-block mt-24" onclick="submitOrder()"><span>Confirmer via WhatsApp</span></button>
        <p style="font-size:11.5px; color:var(--soft-brown); margin-top:14px; text-align:center; line-height:1.6;">Vous serez redirigée vers WhatsApp pour confirmer votre commande avec notre équipe.</p>
      </div>
    </div>
  </div>`;
}
registerRoute('/checkout', renderCheckout);

function validateField(id, condition){
  const fg = document.getElementById('fg-'+id);
  if(!condition){ fg.classList.add('error'); return false; }
  fg.classList.remove('error'); return true;
}

function submitOrder(){
  const fullName = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const wilaya = document.getElementById('wilaya').value;
  const city = document.getElementById('city').value.trim();
  const notes = document.getElementById('notes').value.trim();

  let valid = true;
  valid = validateField('fullName', fullName.length >= 2) && valid;
  valid = validateField('phone', phone.replace(/\D/g,'').length >= 9) && valid;
  valid = validateField('address', address.length >= 4) && valid;
  valid = validateField('wilaya', wilaya !== '') && valid;
  valid = validateField('city', city.length >= 2) && valid;

  if(!valid){
    document.querySelector('.form-group.error').scrollIntoView({behavior:'smooth', block:'center'});
    showToast('Veuillez compléter tous les champs requis');
    return;
  }

  const subtotal = cartTotal();
  const shipping = subtotal >= CONFIG.freeShippingThreshold ? 0 : CONFIG.shippingFlat;
  const total = subtotal + shipping;
  const fullAddress = `${address}, ${city}, ${wilaya}`;

  // Build WhatsApp message in Arabic per original brand spec
  let productLines = '';
  STATE.cart.forEach(item=>{
    const p = getProduct(item.productId);
    productLines += `- ${p.name}\n  المقاس: ${item.size} | اللون: ${item.color}\n  الكمية: ${item.qty}\n`;
  });

  let message = `السلام عليكم، أود تأكيد طلبي من MAHA Collection.\n\n`;
  message += `الاسم: ${fullName}\n`;
  message += `رقم الهاتف: ${phone}\n`;
  message += `العنوان: ${fullAddress}\n\n`;
  message += `المنتجات المطلوبة:\n${productLines}\n`;
  message += `الشحن: ${shipping===0 ? 'مجاني' : money(shipping)}\n`;
  message += `إجمالي الطلب: ${money(total)}\n`;
  message += `طريقة الدفع: الدفع عند الاستلام\n`;
  if(notes) message += `ملاحظات: ${notes}\n`;
  message += `\nشكراً.`;

  // Save as a mock order
  STATE.orders.unshift({
    id: 'MC-' + Math.floor(10000 + Math.random()*89999),
    date: new Date().toLocaleDateString('fr-FR', { month:'long', day:'numeric', year:'numeric' }),
    status: 'processing',
    total: total,
    items: STATE.cart.map(item=>{
      const p = getProduct(item.productId);
      return { name:p.name, size:item.size, qty:item.qty, price:p.price };
    })
  });

  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Clear cart, then redirect
  STATE.cart = [];
  updateBadges();
  window.open(waUrl, '_blank');
  navigateTo('#/order-confirmation');
}

function renderOrderConfirmation(){
  return `
  <div class="container section text-center">
    <svg width="58" height="58" fill="none" viewBox="0 0 24 24" stroke="#C9A063" stroke-width="1.2" style="margin:0 auto 24px;"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 12.5l2.5 2.5L16 9"/></svg>
    <p class="eyebrow">Merci</p>
    <h1 style="font-size:clamp(30px,4vw,42px); font-style:italic; margin-top:10px;">Votre demande de commande a été envoyée</h1>
    <p class="muted mt-16" style="max-width:480px; margin-left:auto; margin-right:auto;">Nous avons ouvert WhatsApp avec les détails de votre commande pré-remplis. Veuillez envoyer le message à notre équipe pour confirmer votre commande — nous vous contacterons rapidement pour finaliser la livraison.</p>
    <div style="display:flex; gap:16px; justify-content:center; margin-top:36px; flex-wrap:wrap;">
      <a href="#/shop" class="btn btn-fill" data-link><span>Continuer mes achats</span></a>
      <a href="#/account?tab=orders" class="btn btn-ghost" data-link><span>Voir mes commandes</span></a>
    </div>
  </div>`;
}
registerRoute('/order-confirmation', renderOrderConfirmation);

/* ============================================================
   WISHLIST PAGE
   ============================================================ */
function renderWishlist(){
  const items = STATE.wishlist.map(getProduct).filter(Boolean);
  if(items.length === 0){
    return `
    <div class="container">
      <div class="empty-state">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 7.9 2.3 4.5 5.7 4c2-.3 3.7.7 4.8 2.2.5.7.8 1.1 1.5 1.1s1-.4 1.5-1.1C14.6 4.7 16.3 3.7 18.3 4c3.4.5 5.1 3.9 3.5 7.4C19.5 15.9 12 20.5 12 20.5z"/></svg>
        <h3>Votre liste de favoris est vide</h3>
        <p>Enregistrez les pièces qui vous plaisent pour les retrouver facilement.</p>
        <a href="#/shop" class="btn btn-fill" data-link><span>Explorer la Collection</span></a>
      </div>
    </div>`;
  }
  return `
  <div class="page-hero">
    <p class="eyebrow">${items.length} Pièce${items.length!==1?'s':''} Enregistrée${items.length!==1?'s':''}</p>
    <h1>Vos Favoris</h1>
  </div>
  <div class="container section-tight">
    <div class="product-grid">${items.map(productCard).join('')}</div>
  </div>`;
}
registerRoute('/wishlist', renderWishlist);

/* ============================================================
   ACCOUNT / AUTH PAGES
   ============================================================ */
let authTab = 'login';

function renderAccount(params){
  if(!STATE.currentUser.isLoggedIn){
    return renderAuthGate();
  }
  const tab = params.get('tab') || 'profile';
  return `
  <div class="page-hero">
    <p class="eyebrow">Bienvenue, ${STATE.account.name.split(' ')[0]}</p>
    <h1>Mon Compte</h1>
  </div>
  <div class="container section-tight">
    <div class="account-layout">
      <nav class="account-nav">
        <a href="#/account?tab=profile" data-link class="${tab==='profile'?'active':''}">Profil</a>
        <a href="#/account?tab=orders" data-link class="${tab==='orders'?'active':''}">Historique des Commandes</a>
        <a href="#/wishlist" data-link>Articles Favoris</a>
        <a href="#/" data-link onclick="logoutUser()">Déconnexion</a>
      </nav>
      <div>
        ${tab === 'orders' ? renderOrdersTab() : renderProfileTab()}
      </div>
    </div>
  </div>`;
}
registerRoute('/account', renderAccount);

function renderProfileTab(){
  return `
  <h3 style="font-style:italic; margin-bottom:24px;">Informations du Profil</h3>
  <div class="form-row-2">
    <div class="form-group"><label>Nom Complet</label><input type="text" value="${STATE.account.name}" id="profName"></div>
    <div class="form-group"><label>Email</label><input type="email" value="${STATE.account.email}" id="profEmail"></div>
  </div>
  <div class="form-group" style="max-width:340px;"><label>Téléphone</label><input type="tel" value="${STATE.account.phone||''}" id="profPhone"></div>
  <button class="btn btn-fill mt-16" onclick="saveProfile()"><span>Enregistrer</span></button>
  `;
}
function saveProfile(){
  STATE.account.name = document.getElementById('profName').value;
  STATE.account.email = document.getElementById('profEmail').value;
  STATE.account.phone = document.getElementById('profPhone').value;
  showToast('Profil mis à jour');
  render();
}

function renderOrdersTab(){
  if(STATE.orders.length===0) return `<p class="muted">Vous n'avez encore passé aucune commande.</p>`;
  return `
  <h3 style="font-style:italic; margin-bottom:24px;">Historique des Commandes</h3>
  ${STATE.orders.map(o=>`
    <div class="order-card">
      <div class="order-card-top">
        <span>Commande ${o.id} &nbsp;·&nbsp; ${o.date}</span>
        <span class="order-status ${o.status}">${o.status==='processing'?'en cours':o.status==='shipped'?'expédiée':'livrée'}</span>
      </div>
      ${o.items.map(it=>`<div class="summary-line"><span>${it.name} (${it.size}) × ${it.qty}</span><span>${money(it.price*it.qty)}</span></div>`).join('')}
      <div class="summary-line total" style="margin-top:10px;"><span>Total</span><span>${money(o.total)}</span></div>
      <div class="mt-16" style="font-size:12px; color:var(--rose-deep);">
        ${o.status==='processing' ? '● Commande reçue — en attente de confirmation' : o.status==='shipped' ? '● En cours de livraison' : '● Livrée'}
      </div>
    </div>
  `).join('')}`;
}

function renderAuthGate(){
  return `
  <div class="container section">
    <div class="auth-card">
      <div class="text-center mt-16" style="margin-bottom:30px;">
        <p class="eyebrow">Bienvenue</p>
        <h1 style="font-style:italic; font-size:30px; margin-top:10px;">Votre Compte</h1>
      </div>
      <div class="auth-tabs">
        <div class="auth-tab ${authTab==='login'?'active':''}" onclick="setAuthTab('login', this)">Connexion</div>
        <div class="auth-tab ${authTab==='signup'?'active':''}" onclick="setAuthTab('signup', this)">Créer un Compte</div>
      </div>
      <div id="authFormWrap">${authTab==='login' ? loginForm() : signupForm()}</div>
    </div>
  </div>`;
}
function setAuthTab(tab, el){
  authTab = tab;
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('authFormWrap').innerHTML = tab==='login' ? loginForm() : signupForm();
}
function loginForm(){
  return `
  <form onsubmit="event.preventDefault(); handleLogin();">
    <div class="form-group"><label>Email</label><input type="email" id="loginEmail" placeholder="vous@exemple.com" required></div>
    <div class="form-group"><label>Mot de Passe</label><input type="password" id="loginPass" placeholder="••••••••" required></div>
    <button class="btn btn-fill btn-block mt-16" type="submit"><span>Se Connecter</span></button>
  </form>
  <p class="text-center mt-24" style="font-size:12.5px; color:var(--soft-brown);">Pour cette démo, n'importe quel email et mot de passe vous connecteront.</p>`;
}
function signupForm(){
  return `
  <form onsubmit="event.preventDefault(); handleSignup();">
    <div class="form-group"><label>Nom Complet</label><input type="text" id="signupName" placeholder="Amina Belkacem" required></div>
    <div class="form-group"><label>Email</label><input type="email" id="signupEmail" placeholder="vous@exemple.com" required></div>
    <div class="form-group"><label>Téléphone</label><input type="tel" id="signupPhone" placeholder="0555 12 34 56"></div>
    <div class="form-group"><label>Mot de Passe</label><input type="password" id="signupPass" placeholder="••••••••" required></div>
    <button class="btn btn-fill btn-block mt-16" type="submit"><span>Créer Mon Compte</span></button>
  </form>`;
}
function handleLogin(){
  const email = document.getElementById('loginEmail').value;
  STATE.account = { name: email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g, l=>l.toUpperCase()), email, phone:'' };
  STATE.currentUser.isLoggedIn = true;
  showToast('Heureux de vous revoir !');
  navigateTo('#/account');
}
function handleSignup(){
  STATE.account = {
    name: document.getElementById('signupName').value,
    email: document.getElementById('signupEmail').value,
    phone: document.getElementById('signupPhone').value
  };
  STATE.currentUser.isLoggedIn = true;
  showToast('Compte créé — bienvenue chez MAHA Collection');
  navigateTo('#/account');
}
function logoutUser(){
  STATE.currentUser.isLoggedIn = false;
  showToast('Déconnectée');
}

/* ============================================================
   ABOUT US
   ============================================================ */
function renderAbout(){
  return `
  <div class="about-hero">
    <img src="${IMG.about1}" alt="Atelier MAHA Collection">
    <div class="overlay-text"><h1>Notre Histoire</h1></div>
  </div>
  <div class="container section">
    <div class="prose" style="margin:0 auto; text-align:center;">
      <p class="eyebrow" style="text-align:center;">Élégance Arabe Moderne</p>
      <h2 style="text-align:center;">Grâce, Féminité, Confiance.</h2>
      <p>MAHA Collection est née d'une conviction simple : la mode pudique mérite le même niveau de savoir-faire, de raffinement et d'attention aux détails que toute autre marque de luxe. Nous créons pour la femme qui se porte avec une confiance discrète — celle qui privilégie la grâce au bruit, et les pièces intemporelles aux tendances passagères.</p>
      <p>Chaque silhouette de notre collection s'inspire de l'élégance du style arabe moderne — lignes pures, tombé généreux, coupe réfléchie — réinventée pour la vie quotidienne. Des robes fluides aux chemises raffinées en passant par les ensembles coordonnés, chaque pièce est créée pour vous faire sentir belle, à l'aise, et résolument vous-même.</p>
    </div>
  </div>
  <div class="container section-tight">
    <div class="values-grid">
      <div class="value-item"><div class="num">01</div><h4>Grâce</h4><p>Une élégance sans effort dans chaque silhouette que nous créons.</p></div>
      <div class="value-item"><div class="num">02</div><h4>Féminité</h4><p>Des détails doux et réfléchis qui célèbrent la femme qui les porte.</p></div>
      <div class="value-item"><div class="num">03</div><h4>Confiance</h4><p>Des pièces conçues pour vous aider à entrer dans toute pièce avec assurance.</p></div>
      <div class="value-item"><div class="num">04</div><h4>Qualité</h4><p>Des tissus premium et une construction méticuleuse, toujours.</p></div>
      <div class="value-item"><div class="num">05</div><h4>Élégance</h4><p>Un design intemporel qui transcende les saisons et les tendances.</p></div>
    </div>
  </div>
  <section class="story">
    <div class="story-img"><img src="${IMG.story}" alt="Savoir-faire MAHA Collection"></div>
    <div class="story-text">
      <p class="eyebrow">Façonné avec Soin</p>
      <h2>Conçu en Algérie, pour chaque femme.</h2>
      <p>Nous travaillons en étroite collaboration avec des ateliers de confiance pour sélectionner des tissus premium et nous assurer que chaque pièce répond à notre standard avant de vous parvenir. Notre équipe examine personnellement chaque collection — du premier croquis à la dernière couture — car nous croyons que le véritable luxe réside dans les détails.</p>
      <a href="#/shop" class="btn btn-gold" data-link><span>Explorer la Collection</span></a>
    </div>
  </section>
  `;
}
registerRoute('/about', renderAbout);

/* ============================================================
   CONTACT PAGE
   ============================================================ */
function renderContact(){
  return `
  <div class="page-hero">
    <p class="eyebrow">Nous Aimerions Vous Entendre</p>
    <h1>Contactez-Nous</h1>
    <p>Des questions sur une commande, les tailles, ou autre chose ? Notre équipe est là pour vous aider.</p>
  </div>
  <div class="container section">
    <div class="contact-grid">
      <div>
        <h3 style="font-style:italic; margin-bottom:28px;">Restons en Contact</h3>
        <div class="contact-method">
          <div class="ic"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.4"><path d="M3 21l1.4-4.2A8 8 0 1110 19.8L3 21z"/></svg></div>
          <div><h4>WhatsApp</h4><p><a href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank">+213 555 123 456</a></p></div>
        </div>
        <div class="contact-method">
          <div class="ic"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.4"><path d="M3 8l9 6 9-6M3 6h18v12H3z"/></svg></div>
          <div><h4>Email</h4><p><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></p></div>
        </div>
        <div class="contact-method">
          <div class="ic"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.4"><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg></div>
          <div><h4>Adresse</h4><p>Alger, Algérie</p></div>
        </div>
        <div class="contact-method">
          <div class="ic"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.4"><path d="M12 7v5l3 3"/><circle cx="12" cy="12" r="9"/></svg></div>
          <div><h4>Horaires</h4><p>Dimanche – Jeudi, 9h – 18h</p></div>
        </div>
        <div class="social-row mt-24">
          <a href="${CONFIG.instagram}" target="_blank" aria-label="Instagram"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="5" stroke-width="1.4"/><circle cx="12" cy="12" r="4" stroke-width="1.4"/></svg></a>
          <a href="${CONFIG.facebook}" target="_blank" aria-label="Facebook"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-width="1.4" d="M15 4h-2a4 4 0 00-4 4v3H6v4h3v7h4v-7h3l1-4h-4V8a1 1 0 011-1h3V4z"/></svg></a>
        </div>
      </div>
      <div>
        <h3 style="font-style:italic; margin-bottom:28px;">Envoyez un Message</h3>
        <form onsubmit="event.preventDefault(); handleContactForm();">
          <div class="form-group"><label>Nom</label><input type="text" id="contactName" required></div>
          <div class="form-group"><label>Email</label><input type="email" id="contactEmail" required></div>
          <div class="form-group"><label>Sujet</label><input type="text" id="contactSubject"></div>
          <div class="form-group"><label>Message</label><textarea id="contactMsg" rows="5" required></textarea></div>
          <button class="btn btn-fill btn-block" type="submit"><span>Envoyer le Message</span></button>
        </form>
      </div>
    </div>
  </div>`;
}
registerRoute('/contact', renderContact);
function handleContactForm(){
  showToast('Message envoyé — nous répondrons sous 24 heures');
  document.querySelectorAll('#app input, #app textarea').forEach(el=>el.value='');
}

/* ============================================================
   FAQ PAGE
   ============================================================ */
const FAQ_DATA = [
  { cat:'Commandes', q:'Comment passer une commande ?', a:'Parcourez la collection, sélectionnez votre taille et couleur, ajoutez au panier, et finalisez la commande. Vous confirmerez votre commande via WhatsApp, et notre équipe vous contactera pour finaliser la livraison.' },
  { cat:'Commandes', q:'Puis-je modifier ou annuler ma commande ?', a:'Oui — contactez-nous sur WhatsApp dès que possible après avoir passé votre commande. Nous pouvons généralement accommoder les changements avant l\'expédition.' },
  { cat:'Commandes', q:'Livrez-vous à l\'international ?', a:'Actuellement, nous livrons uniquement en Algérie. Nous travaillons à étendre notre service à l\'international — suivez-nous sur Instagram pour les mises à jour.' },
  { cat:'Paiement', q:'Quels modes de paiement acceptez-vous ?', a:'Nous acceptons actuellement le paiement à la livraison partout en Algérie. Le paiement en ligne par carte arrive bientôt.' },
  { cat:'Paiement', q:'Le paiement à la livraison est-il disponible partout ?', a:'Oui, le paiement à la livraison est disponible dans toutes les wilayas où nous livrons actuellement. Sélectionnez-le lors du paiement.' },
  { cat:'Tailles', q:'Comment trouver ma taille ?', a:'Chaque fiche produit inclut un guide des tailles. En règle générale : S correspond au 36-38 EU, M au 38-40, L au 40-42, et XL au 42-44. Si vous hésitez entre deux tailles, nous recommandons de prendre la taille au-dessus pour nos coupes amples.' },
  { cat:'Tailles', q:'Vos pièces taillent-elles normalement ?', a:'La plupart de nos pièces sont conçues avec une coupe ample et fluide. Consultez la description de chaque produit pour des notes de coupe spécifiques.' },
  { cat:'Livraison', q:'Combien de temps prend la livraison ?', a:'Les commandes sont généralement livrées sous 2 à 5 jours ouvrables selon votre wilaya. Voir notre Politique de Livraison pour tous les détails.' },
  { cat:'Livraison', q:'Combien coûte la livraison ?', a:'La livraison est gratuite pour les commandes de plus de 8000 DA. Les commandes en dessous de ce montant ont des frais de livraison fixes de 500 DA.' },
  { cat:'Retours', q:'Quelle est votre politique de retour ?', a:'Nous acceptons les échanges sous 7 jours après livraison pour les articles non portés avec étiquettes attachées. Voir notre Politique de Retours et d\'Échanges complète.' },
  { cat:'Retours', q:'Comment démarrer un retour ou un échange ?', a:'Envoyez-nous un message sur WhatsApp avec votre numéro de commande et nous vous guiderons dans le processus.' }
];
let faqActiveCat = 'All';
function renderFaq(){
  const cats = ['All', ...new Set(FAQ_DATA.map(f=>f.cat))];
  const list = faqActiveCat==='All' ? FAQ_DATA : FAQ_DATA.filter(f=>f.cat===faqActiveCat);
  return `
  <div class="page-hero">
    <p class="eyebrow">Besoin d'Aide ?</p>
    <h1>Questions Fréquentes</h1>
    <p>Tout ce que vous devez savoir pour magasiner chez MAHA Collection.</p>
  </div>
  <div class="container section-tight">
    <div class="faq-cats">
      ${cats.map(c=>`<button class="faq-cat-btn ${faqActiveCat===c?'active':''}" onclick="faqActiveCat='${c}'; rerenderFaq();">${c==='All'?'Tout':c}</button>`).join('')}
    </div>
    <div id="faqList">
      ${list.map((f,i)=>`
        <div class="faq-item">
          <div class="faq-q" onclick="this.parentElement.classList.toggle('open')">
            <h4>${f.q}</h4>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <div class="faq-a"><p>${f.a}</p></div>
        </div>`).join('')}
    </div>
    <p class="text-center mt-24" style="color:var(--ink-soft); font-size:13.5px;">Vous avez d'autres questions ? <a href="#/contact" data-link style="color:var(--rose-deep); text-decoration:underline;">Contactez notre équipe</a> ou écrivez-nous sur <a href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" style="color:var(--rose-deep); text-decoration:underline;">WhatsApp</a>.</p>
  </div>`;
}
registerRoute('/faq', renderFaq);
function rerenderFaq(){
  document.getElementById('app').innerHTML = `<div class="page">${renderFaq()}</div>`;
}

/* ============================================================
   SHIPPING POLICY
   ============================================================ */
function renderShipping(){
  return `
  <div class="page-hero"><p class="eyebrow">Politiques</p><h1>Politique de Livraison</h1></div>
  <div class="container section-tight">
    <div class="prose">
      <h2>Zones de Livraison</h2>
      <p>MAHA Collection livre actuellement dans les 58 wilayas d'Algérie. Nous travaillons à étendre notre service à la livraison internationale à l'avenir — suivez notre Instagram pour les mises à jour.</p>
      <h2>Délais de Livraison</h2>
      <ul>
        <li>Alger et environs : 1 à 3 jours ouvrables</li>
        <li>Grandes villes (Oran, Constantine, Annaba, Sétif) : 2 à 4 jours ouvrables</li>
        <li>Autres wilayas : 3 à 5 jours ouvrables</li>
      </ul>
      <p>Les délais de livraison peuvent varier légèrement pendant les périodes de forte affluence ou les jours fériés.</p>
      <h2>Frais de Livraison</h2>
      <ul>
        <li>Livraison gratuite pour toute commande de plus de 8000 DA</li>
        <li>Frais de livraison fixes de 500 DA pour les commandes inférieures à ce montant</li>
      </ul>
      <h2>Suivi de Commande</h2>
      <p>Une fois votre commande confirmée via WhatsApp, notre équipe vous tiendra informée de son statut. Vous pouvez également vérifier le statut de votre commande à tout moment depuis votre page Compte.</p>
      <h2>Paiement à la Livraison</h2>
      <p>Toutes les commandes peuvent être payées en espèces à la livraison. Veuillez préparer le montant exact si possible pour notre partenaire de livraison.</p>
    </div>
  </div>`;
}
registerRoute('/shipping', renderShipping);

/* ============================================================
   RETURNS & EXCHANGE POLICY
   ============================================================ */
function renderReturns(){
  return `
  <div class="page-hero"><p class="eyebrow">Politiques</p><h1>Politique de Retours &amp; Échanges</h1></div>
  <div class="container section-tight">
    <div class="prose">
      <h2>Délai d'Échange</h2>
      <p>Nous acceptons les échanges sous 7 jours après la livraison. Les articles doivent être non portés, non lavés, et retournés avec toutes leurs étiquettes d'origine attachées.</p>
      <h2>Comment Demander un Échange</h2>
      <ul>
        <li>Envoyez-nous un message sur WhatsApp avec votre numéro de commande et l'article à échanger</li>
        <li>Notre équipe confirmera la disponibilité de la taille ou du style souhaité</li>
        <li>Organisez une collecte ou un dépôt selon les instructions de notre équipe</li>
        <li>Une fois reçu et inspecté, nous vous enverrons votre article de remplacement</li>
      </ul>
      <h2>Articles Non Retournables</h2>
      <ul>
        <li>Articles marqués comme Vente Finale</li>
        <li>Articles montrant des signes d'usure, de modification, ou de dommage non causé par nous</li>
        <li>Articles sans étiquettes d'origine</li>
      </ul>
      <h2>Remboursements</h2>
      <p>Comme nous fonctionnons actuellement sur la base du paiement à la livraison, nous proposons des échanges et des avoirs plutôt que des remboursements monétaires. Nous travaillons à introduire des options plus flexibles à mesure que les paiements en ligne deviennent disponibles.</p>
      <h2>Articles Endommagés ou Incorrects</h2>
      <p>Si vous recevez un article endommagé ou incorrect, veuillez nous contacter dans les 48 heures suivant la livraison avec des photos, et nous résoudrons le problème rapidement sans frais supplémentaires pour vous.</p>
    </div>
  </div>`;
}
registerRoute('/returns', renderReturns);

/* ============================================================
   PRIVACY POLICY
   ============================================================ */
function renderPrivacy(){
  return `
  <div class="page-hero"><p class="eyebrow">Politiques</p><h1>Politique de Confidentialité</h1></div>
  <div class="container section-tight">
    <div class="prose">
      <h2>Informations Que Nous Collectons</h2>
      <p>Lorsque vous créez un compte, passez une commande, ou nous contactez, nous pouvons collecter votre nom, numéro de téléphone, adresse de livraison, et adresse email. Ces informations sont utilisées uniquement pour traiter et livrer vos commandes et communiquer avec vous à leur sujet.</p>
      <h2>Comment Nous Utilisons Vos Informations</h2>
      <ul>
        <li>Pour traiter et exécuter vos commandes, y compris coordonner la livraison et le paiement à la livraison</li>
        <li>Pour communiquer avec vous concernant votre commande via WhatsApp, téléphone, ou email</li>
        <li>Pour vous envoyer des mises à jour sur les nouveautés ou offres, uniquement si vous vous êtes abonnée à notre newsletter</li>
        <li>Pour améliorer nos produits et votre expérience d'achat</li>
      </ul>
      <h2>Communication via WhatsApp</h2>
      <p>Lors du paiement, un récapitulatif de commande est généré et envoyé à notre équipe via WhatsApp à votre initiative. Veuillez noter que la messagerie WhatsApp est soumise aux propres pratiques de confidentialité de WhatsApp.</p>
      <h2>Partage des Données</h2>
      <p>Nous ne vendons ni ne louons vos informations personnelles à des tiers. Vos informations ne sont partagées qu'avec nos partenaires de livraison dans la mesure nécessaire à l'exécution de votre commande.</p>
      <h2>Vos Droits</h2>
      <p>Vous pouvez demander à consulter, mettre à jour, ou supprimer vos informations personnelles à tout moment en nous contactant à ${CONFIG.email}.</p>
      <h2>Nous Contacter</h2>
      <p>Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter via notre <a href="#/contact" data-link style="color:var(--rose-deep); text-decoration:underline;">page Contact</a>.</p>
    </div>
  </div>`;
}
registerRoute('/privacy', renderPrivacy);

/* ============================================================
   GLOBAL UI WIRING
   ============================================================ */

document.addEventListener('click', function(e){
  const link = e.target.closest('[data-link]');
  if(link){
    closeMobileDrawer();
  }
});

// Mobile drawer
function openMobileDrawer(){ document.getElementById('mobileDrawer').classList.add('open'); }
function closeMobileDrawer(){ document.getElementById('mobileDrawer')?.classList.remove('open'); }
document.getElementById('burgerBtn').addEventListener('click', openMobileDrawer);
document.getElementById('drawerClose').addEventListener('click', closeMobileDrawer);
document.getElementById('drawerOverlay').addEventListener('click', closeMobileDrawer);

// Quick view modal close on overlay click
document.getElementById('quickViewModal').addEventListener('click', function(e){
  if(e.target === this) closeQuickView();
});
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){ closeQuickView(); closeMobileDrawer(); }
});

// Header hide-on-scroll-down, show-on-scroll-up (subtle, premium touch)
let lastScroll = 0;
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', ()=>{
  const current = window.scrollY;
  if(current > 240 && current > lastScroll){
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = current;
}, { passive:true });

// Inject configured WhatsApp number/links into footer + floating button on load
function applyConfigToDom(){
  document.getElementById('footerWa').textContent = '+' + CONFIG.whatsappNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
  document.getElementById('waFloat').href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن منتجات MAHA Collection')}`;
}
applyConfigToDom();

// Per-route hooks (re-run small bits of JS some pages need after innerHTML swap)
function afterRender(path, params){
  if(path === '/checkout'){
    document.querySelectorAll('.pay-option').forEach(opt=>{
      opt.addEventListener('click', function(){
        if(this.querySelector('input').disabled) return;
        document.querySelectorAll('.pay-option').forEach(o=>o.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  }
}
