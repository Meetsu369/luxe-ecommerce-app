import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';

/* ── Product Data ──────────────────────────────────────────── */
const PRODUCTS = [
  { id: 1,  name: 'Linen Throw Pillow',     category: 'home', price: 1299, icon: '🛋️', badge: 'New',  desc: 'Handwoven Linen' },
  { id: 2,  name: 'Ceramic Pour-Over Set',  category: 'home', price: 2199, icon: '☕', badge: '',     desc: 'Artisan Ceramic' },
  { id: 3,  name: 'Merino Wool Tee',        category: 'wear', price: 3499, icon: '👕', badge: 'Sale', desc: 'Sustainable Merino', oldPrice: 4200 },
  { id: 4,  name: 'Brass Desk Lamp',        category: 'home', price: 5299, icon: '💡', badge: '',     desc: 'Handcrafted Brass' },
  { id: 5,  name: 'Wireless Earbuds Pro',   category: 'tech', price: 7999, icon: '🎧', badge: 'Hot',  desc: '36hr Battery Life' },
  { id: 6,  name: 'Rose Hip Face Oil',      category: 'care', price: 1899, icon: '🌹', badge: '',     desc: 'Certified Organic' },
  { id: 7,  name: 'Recycled Notebook Set',  category: 'home', price:  899, icon: '📓', badge: '',     desc: 'Recycled Paper' },
  { id: 8,  name: 'Slim Leather Card Case', category: 'wear', price: 2499, icon: '💼', badge: 'New',  desc: 'Full Grain Leather' },
  { id: 9,  name: 'Portable Speaker',       category: 'tech', price: 4599, icon: '🔊', badge: '',     desc: 'Waterproof IPX7' },
  { id: 10, name: 'Soy Wax Candle',         category: 'home', price:  799, icon: '🕯️', badge: '',    desc: 'Hand-poured Soy' },
  { id: 11, name: 'Linen Overshirt',        category: 'wear', price: 4199, icon: '👔', badge: '',     desc: 'Enzyme-washed Linen' },
  { id: 12, name: 'Face SPF 50 Serum',      category: 'care', price: 2299, icon: '🧴', badge: 'New',  desc: 'Lightweight Formula' },
];

const CATEGORIES = [
  { key: 'all',  label: 'All'  },
  { key: 'home', label: 'Home' },
  { key: 'wear', label: 'Wear' },
  { key: 'tech', label: 'Tech' },
  { key: 'care', label: 'Care' },
];

const STATS = [
  { num: '4.9 ★', label: 'Avg Rating' },
  { num: '12k+',  label: 'Happy Customers' },
  { num: 'Free',  label: 'Shipping over ₹2000' },
  { num: '30d',   label: 'Easy Returns' },
];

/**
 * Home Page
 * Props:
 *   cart            {object}   — { [id]: qty }
 *   cartOpen        {boolean}
 *   onAddToCart     {function} — (product) => void
 *   onRemoveFromCart{function} — (productId) => void
 *   onCartClose     {function}
 */
function Home({ cart = {}, cartOpen, onAddToCart, onRemoveFromCart, onCartClose }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  /* Filtered products */
  const filteredProducts = useMemo(
    () => activeFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeFilter),
    [activeFilter]
  );

  /* Cart totals */
  const cartTotal = useMemo(
    () => Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find(x => x.id === Number(id));
      return p ? sum + p.price * qty : sum;
    }, 0),
    [cart]
  );

  const cartItems = Object.keys(cart).filter(id => cart[id] > 0);

  /* Newsletter */
  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <main className="home">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="hero" id="home" aria-label="Hero banner">
        <div className="hero__text">
          <p className="hero__eyebrow">New Collection — 2025</p>
          <h1 className="hero__title">
            Refined<br />goods for<br />
            <em>the discerning</em>
          </h1>
          <p className="hero__desc">
            Curated pieces designed with intention. Each object in our
            collection is chosen for its craftsmanship, longevity, and quiet elegance.
          </p>
          <div className="hero__ctas">
            <button
              className="btn-primary"
              onClick={() => document.getElementById('products')
                ?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Now
            </button>
            <button className="btn-ghost">Our Story</button>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <span className="hero__symbol">✦</span>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <div className="stats-bar" role="region" aria-label="Store highlights">
        <div className="stats-bar__inner">
          {STATS.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat__num">{s.num}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS SECTION ──────────────────────────────── */}
      <section className="products-section" id="products" aria-label="Products">
        <div className="products-section__header">
          <div>
            <p className="section-label">Featured</p>
            <h2 className="section-title">Our Products</h2>
          </div>
          <span className="section-link" role="button" tabIndex={0}>View all →</span>
        </div>

        {/* Filter Tabs */}
        <div className="filter-bar" role="group" aria-label="Filter products by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className={`filter-btn${activeFilter === cat.key ? ' filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat.key)}
              aria-pressed={activeFilter === cat.key}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid — Responsive: 3 cols → 2 cols → 1 col */}
        <div className="product-grid" role="list" aria-label="Product listing">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              inCart={!!cart[product.id]}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <div className="newsletter" aria-label="Newsletter signup">
        <div className="newsletter__inner">
          <div className="newsletter__text">
            <p className="newsletter__eyebrow">Stay in the loop</p>
            <h3 className="newsletter__title">New arrivals, straight to your inbox</h3>
          </div>
          <div className="newsletter__form">
            {subscribed ? (
              <p className="newsletter__thanks">Thanks for subscribing! 🎉</p>
            ) : (
              <>
                <input
                  className="newsletter__input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  aria-label="Email address for newsletter"
                />
                <button className="btn-primary" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="footer" role="contentinfo">
        <div className="footer__inner">
          <span className="footer__logo">LUXE</span>
          <ul className="footer__links">
            {['About', 'Privacy', 'Terms', 'Contact'].map(link => (
              <li key={link}><a href="#home">{link}</a></li>
            ))}
          </ul>
          <p className="footer__copy">© 2025 LUXE Store. Responsive PWA Demo.</p>
        </div>
      </footer>

      {/* ── OVERLAY ───────────────────────────────────────── */}
      <div
        className={`overlay${cartOpen ? ' overlay--show' : ''}`}
        onClick={onCartClose}
        aria-hidden="true"
      />

      {/* ── CART DRAWER ───────────────────────────────────── */}
      <aside
        className={`cart-panel${cartOpen ? ' cart-panel--open' : ''}`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
        aria-hidden={!cartOpen}
      >
        <div className="cart-panel__header">
          <span className="cart-panel__title">Your Bag</span>
          <button
            className="cart-panel__close"
            onClick={onCartClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="cart-panel__items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">🛍️</div>
              <p>Your bag is empty</p>
            </div>
          ) : (
            cartItems.map(id => {
              const product = PRODUCTS.find(p => p.id === Number(id));
              if (!product) return null;
              return (
                <div className="cart-item" key={id}>
                  <div className="cart-item__img" aria-hidden="true">
                    {product.icon}
                  </div>
                  <div className="cart-item__info">
                    <p className="cart-item__name">{product.name}</p>
                    <p className="cart-item__price">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <p className="cart-item__qty">Qty: {cart[id]}</p>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => onRemoveFromCart(Number(id))}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-panel__footer">
            <div className="cart-panel__total">
              <span className="cart-panel__total-label">Total</span>
              <span className="cart-panel__total-value">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <button className="btn-primary" style={{ width: '100%' }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>

    </main>
  );
}

export default Home;
