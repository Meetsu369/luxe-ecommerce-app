import React, { useState } from 'react';
import './ProductCard.css';

/**
 * ProductCard
 * Props:
 *   product     {object}   — { id, name, category, price, icon, badge, desc, oldPrice? }
 *   inCart      {boolean}  — whether product is already in cart
 *   onAddToCart {function} — called with (product) when button clicked
 */
function ProductCard({ product, inCart = false, onAddToCart }) {
  const [hovered, setHovered] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const discountPercent = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <article
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={product.name}
      role="listitem"
    >
      {/* Image area */}
      <div className="product-card__image">
        <span className="product-card__icon" aria-hidden="true">
          {product.icon}
        </span>

        {/* Badge */}
        {product.badge && (
          <span className={`product-card__badge${product.badge === 'Sale' ? ' product-card__badge--sale' : ''}`}>
            {product.badge}
          </span>
        )}

        {/* Discount pill */}
        {discountPercent && (
          <span className="product-card__discount" aria-label={`${discountPercent}% off`}>
            -{discountPercent}%
          </span>
        )}

        {/* Hover overlay with Quick Add */}
        <div className={`product-card__overlay${hovered ? ' product-card__overlay--visible' : ''}`}>
          <button
            className="product-card__quick-add"
            onClick={handleAdd}
            aria-label={`Quick add ${product.name} to cart`}
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="product-card__body">
        <p className="product-card__category">{product.desc}</p>
        <p className="product-card__name">{product.name}</p>

        <div className="product-card__footer">
          <div className="product-card__prices">
            <span className="product-card__price">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.oldPrice && (
              <span className="product-card__old-price">
                ₹{product.oldPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            className={`product-card__add-btn${inCart ? ' product-card__add-btn--added' : ''}`}
            onClick={handleAdd}
            aria-label={inCart ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          >
            {inCart ? 'Added ✓' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
