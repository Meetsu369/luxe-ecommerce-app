/* ============================================================
   src/index.js — React Entry Point + Service Worker Registration
   ============================================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { register as registerServiceWorker } from './serviceWorkerRegistration';

// ── Render React App ──────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ── Register Service Worker ───────────────────────────────────
// Callbacks allow the UI to respond to SW lifecycle changes.
registerServiceWorker({
  onSuccess: (registration) => {
    console.log(
      '%c[PWA] App is cached for offline use!',
      'color: #c9a96e; font-weight: bold; font-size: 12px;'
    );
  },
  onUpdate: (registration) => {
    console.log(
      '%c[PWA] New version available! Refresh the page to update.',
      'color: #e05252; font-weight: bold; font-size: 12px;'
    );
    // Auto-activate new SW immediately (optional):
    // registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  },
});

// ── Web Vitals (optional performance logging) ─────────────────
// Uncomment below to log CLS, FID, FCP, LCP, TTFB:
// reportWebVitals(console.log);
reportWebVitals();
