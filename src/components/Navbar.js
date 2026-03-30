import React, { useState, useEffect } from 'react';
import './Navbar.css';

/**
 * Navbar
 * Props:
 *   cartCount  {number}   — total items in cart badge
 *   onCartOpen {function} — called when bag button is clicked
 */
function Navbar({ cartCount = 0, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow/border on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu  = () => setMenuOpen(false);

  const scrollToProducts = (e) => {
    e.preventDefault();
    closeMenu();
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner">

        {/* Logo */}
        <a className="navbar__logo" href="#home" aria-label="LUXE Home">
          LUXE
        </a>

        {/* Desktop Links */}
        <nav className="navbar__links" aria-label="Main navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products" onClick={scrollToProducts}>Products</a></li>
            <li>
              <button className="navbar__link-btn" onClick={onCartOpen}>
                Cart
              </button>
            </li>
          </ul>
        </nav>

        {/* Right side */}
        <div className="navbar__right">
          {/* Cart Button */}
          <button
            className="navbar__cart-btn"
            onClick={onCartOpen}
            aria-label={`Open cart, ${cartCount} items`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <span className="navbar__cart-label">Bag</span>
            <span className="navbar__cart-count" aria-live="polite">
              {cartCount}
            </span>
          </button>

          {/* Hamburger (mobile) */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <nav
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#products" onClick={scrollToProducts}>Products</a>
        <button
          className="navbar__mobile-cart"
          onClick={() => { closeMenu(); onCartOpen(); }}
        >
          Cart
          {cartCount > 0 && (
            <span className="navbar__mobile-badge">{cartCount}</span>
          )}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
