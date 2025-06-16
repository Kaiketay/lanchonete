/* eslint-disable no-restricted-globals */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open('lanchonete-v1')
      .then((cache) => cache.addAll(['/', '/index.html']))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
