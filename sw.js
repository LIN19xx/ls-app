const CACHE_NAME = 'history-pwa-v2';  // 版本号提升
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  'helpers.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
