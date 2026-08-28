const CACHE_NAME = 'history-pwa-v1';
const urlsToCache = [
  '.',
  'index.html',
  'style.css',  // 如果你有外部 CSS
  'script.js'   // 如果你有外部 JS
];

// 安装时缓存静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 拦截请求，优先返回缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
