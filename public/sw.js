const CACHE_PREFIX = 'dominase-site-';
const SHELL_CACHE = `${CACHE_PREFIX}v1-shell`;
const PAGE_CACHE = `${CACHE_PREFIX}v1-pages`;
const STATIC_CACHE = `${CACHE_PREFIX}v1-static`;
const IMAGE_CACHE = `${CACHE_PREFIX}v1-images`;
const OFFLINE_URL = '/offline.html';
const CORE = [
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const current = new Set([SHELL_CACHE, PAGE_CACHE, STATIC_CACHE, IMAGE_CACHE]);
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && !current.has(key)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

async function trim(cacheName, maximum) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - maximum)).map((key) => cache.delete(key)));
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(PAGE_CACHE);
  const url = new URL(request.url);
  const cacheKey = new Request(`${url.origin}${url.pathname}`, { headers: { Accept: 'text/html' } });
  try {
    const response = await fetch(request);
    if (response.ok && response.type === 'basic') {
      await cache.put(cacheKey, response.clone());
      await trim(PAGE_CACHE, 20);
    }
    return response;
  } catch {
    return (await cache.match(cacheKey)) || (await caches.match(OFFLINE_URL)) || Response.error();
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok && response.type === 'basic') {
    const cache = await caches.open(STATIC_CACHE);
    await cache.put(request, response.clone());
    await trim(STATIC_CACHE, 100);
  }
  return response;
}

async function staleImage(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  const fresh = fetch(request).then(async (response) => {
    if (response.ok && response.type === 'basic') {
      await cache.put(request, response.clone());
      await trim(IMAGE_CACHE, 60);
    }
    return response;
  }).catch(() => undefined);
  return cached || (await fresh) || Response.error();
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.destination === 'image' && !url.pathname.startsWith('/_next/image')) {
    event.respondWith(staleImage(request));
  }
});
