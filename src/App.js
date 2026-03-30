import React, { useState, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  // ── Cart state: { [productId]: quantity } ──────────────────
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  // ── Toast helper ───────────────────────────────────────────
  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    const timer = setTimeout(() => setToast({ visible: false, message: '' }), 2600);
    return () => clearTimeout(timer);
  }, []);

  // ── Add to cart ────────────────────────────────────────────
  const addToCart = useCallback((product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    showToast(`${product.name} added to bag`);
  }, [showToast]);

  // ── Remove from cart ───────────────────────────────────────
  const removeFromCart = useCallback((productId) => {
    setCart(prev => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }, []);

  // ── Total item count ───────────────────────────────────────
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <Home
        cart={cart}
        cartOpen={cartOpen}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onCartClose={() => setCartOpen(false)}
      />

      {/* Toast Notification */}
      <div className={`toast${toast.visible ? ' toast--show' : ''}`} role="status" aria-live="polite">
        {toast.message}
      </div>
    </div>
  );
}

export default App;
