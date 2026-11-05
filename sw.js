const CACHE_NAME = 'couple-space-pwa-v4';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Пропускаем все запросы напрямую в сеть, отключая жесткий офлайн-кэш, вызывавший 404
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
