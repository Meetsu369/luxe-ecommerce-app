/* ============================================================
   LUXE STORE — Service Worker  (place in /public folder)
   Strategy : Cache-First with Network Fallback
   ============================================================ */

// ── 1. CACHE CONFIG ──────────────────────────────────────────
const CACHE_NAME   = 'luxe-store-v1';
const OFFLINE_PAGE = '/offline.html';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
];

// ── 2. INSTALL EVENT ─────────────────────────────────────────
// Triggered once when the service worker is first registered.
// Opens a cache and pre-caches all defined assets.
self.addEventListener('install', (event) => {
  console.log('[SW] Install event fired');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching app shell assets');
        // addAll fetches every URL and stores the response.
        // If any request fails the entire install fails — keep list lean.
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Pre-cache complete — skipping waiting');
        // Force this SW to become active immediately
        // instead of waiting for existing tabs to close.
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Pre-cache failed:', err);
      })
  );
});

// ── 3. ACTIVATE EVENT ────────────────────────────────────────
// Triggered after install, once old SWs are gone.
// Used to clean up outdated caches from previous versions.
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event fired');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)   // keep only current cache
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Old caches cleared — claiming clients');
        // Take control of all open tabs/pages immediately
        // without requiring a reload.
        return self.clients.claim();
      })
  );
});

// ── 4. FETCH EVENT — CACHE-FIRST STRATEGY ────────────────────
// Intercepts every network request made by the app.
//
// Flow:
//   1. Check cache → return cached response immediately (fast, offline-safe)
//   2. Cache miss  → go to network
//   3. Network ok  → clone + store response in cache, return to browser
//   4. Network err → return offline fallback page (for navigation requests)
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests — skip POST, PUT, DELETE etc.
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (CDN fonts, analytics, etc.)
  const requestURL = new URL(request.url);
  if (requestURL.origin !== self.location.origin) return;

  event.respondWith(cacheFirstWithNetworkFallback(request));
});

// ── 5. CACHE-FIRST HELPER ────────────────────────────────────
async function cacheFirstWithNetworkFallback(request) {
  // Step 1 — Try cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('[SW] Serving from cache:', request.url);
    return cachedResponse;
  }

  // Step 2 — Cache miss → fetch from network
  try {
    const networkResponse = await fetch(request);

    // Only cache valid responses (status 200, not opaque)
    if (
      networkResponse &&
      networkResponse.status === 200 &&
      networkResponse.type === 'basic'
    ) {
      // Clone because response body can only be consumed once
      const responseToCache = networkResponse.clone();
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, responseToCache);
      console.log('[SW] Fetched & cached:', request.url);
    }

    return networkResponse;

  } catch (error) {
    // Step 3 — Network failed (offline)
    console.warn('[SW] Network request failed, serving offline page:', error);

    // For page navigation requests, return the offline fallback
    if (request.destination === 'document') {
      const offlinePage = await caches.match(OFFLINE_PAGE);
      if (offlinePage) return offlinePage;
    }

    // For other asset types (images, scripts) return a minimal error response
    return new Response('Network error — resource unavailable offline.', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({ 'Content-Type': 'text/plain' }),
    });
  }
}

// ── 6. MESSAGE EVENT ─────────────────────────────────────────
// Allows the React app to communicate with the service worker.
// Usage from app: navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' })
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] SKIP_WAITING message received — activating new SW');
    self.skipWaiting();
  }
});