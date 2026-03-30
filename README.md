# LUXE E-Commerce UI

A responsive e-commerce web application built with **React.js**.  
Demonstrates responsive design principles across mobile, tablet, and desktop screen sizes.

---

## Getting Started

### Prerequisites
- Node.js ≥ 14
- npm ≥ 6

### Install & Run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
ecommerce-ui/
├── public/
│   ├── index.html          # HTML entry point
│   ├── manifest.json       # PWA manifest
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Navbar.js       # Sticky responsive navigation bar
│   │   ├── Navbar.css
│   │   ├── ProductCard.js  # Individual product card with hover overlay
│   │   └── ProductCard.css
│   ├── pages/
│   │   ├── Home.js         # Full page: Hero, Stats, Products, Cart, Footer
│   │   └── Home.css
│   ├── App.js              # Root component — holds cart state
│   ├── App.css             # Shared styles: buttons, toast, cart drawer
│   ├── App.test.js         # Basic smoke tests
│   ├── index.js            # React DOM entry
│   ├── index.css           # Global reset & CSS variables
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
└── README.md
```

---

## Features

| Feature | Details |
|---|---|
| **Responsive Navbar** | Sticky top bar; collapses to hamburger on mobile |
| **Product Grid** | 3 cols (desktop) → 2 cols (tablet) → 1 col (mobile) |
| **Product Cards** | Image, name, price, badge, hover overlay, Add to Bag |
| **Cart Drawer** | Slide-in panel with item list, quantities, total |
| **Filter Tabs** | Filter by All / Home / Wear / Tech / Care |
| **Toast Notifications** | Appears on add-to-cart |
| **Newsletter** | Email capture with validation |
| **PWA Ready** | manifest.json, theme-color, responsive design |
| **Accessibility** | ARIA labels, roles, keyboard support (Escape closes cart) |

---

## Responsive Breakpoints

| Screen | Columns | Breakpoint |
|---|---|---|
| Desktop | 3 products/row | ≥ 1025px |
| Tablet  | 2 products/row | 769px – 1024px |
| Mobile  | 1 product/row  | ≤ 768px |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Run development server |
| `npm test`  | Run test suite |
| `npm run build` | Production build |
