/* ============================================================
   SERVICE WORKER REGISTRATION HELPER
   ============================================================
   Call register() from index.js to enable the PWA service worker.
   Call unregister() to remove it (useful during development).
   ============================================================ */

const SW_URL = `${process.env.PUBLIC_URL}/service-worker.js`;

// ── REGISTER ─────────────────────────────────────────────────
export function register(config) {
  // Only run in production and in browsers that support SW
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      _registerSW(SW_URL, config);
    });
  } else if ('serviceWorker' in navigator) {
    // Allow registration in development too (for lab/demo purposes)
    console.log('[SW Registration] Running in development mode — registering anyway for PWA demo');
    window.addEventListener('load', () => {
      _registerSW(SW_URL, config);
    });
  } else {
    console.warn('[SW Registration] Service Workers are not supported in this browser.');
  }
}

async function _registerSW(swUrl, config) {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);

    // ── UPDATE FOUND ─────────────────────────────────────────
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {

          if (navigator.serviceWorker.controller) {
            // New content is available; the old one will be used
            // until all tabs are closed.
            console.log(
              '[SW] New content available — close all tabs to update.',
              'Or send SKIP_WAITING message to activate immediately.'
            );
            if (config && config.onUpdate) config.onUpdate(registration);

          } else {
            // Content cached for offline use
            console.log('[SW] Content is cached for offline use.');
            if (config && config.onSuccess) config.onSuccess(registration);
          }
        }
      };
    };

    console.log('[SW] Service Worker registered successfully. Scope:', registration.scope);

  } catch (error) {
    console.error('[SW] Service Worker registration failed:', error);
  }
}

// ── UNREGISTER ───────────────────────────────────────────────
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('[SW] Service Worker unregistered.');
      })
      .catch((error) => {
        console.error('[SW] Unregister error:', error.message);
      });
  }
}
