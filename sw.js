// sw.js — registra o cache do app shell
const CACHE = 'app-ihc-v1';
const ASSETS = ['/', '/index.html',
 '/style.css', '/script.js'];
// instala: guarda os arquivos no cache
self.addEventListener('install', e => {
 e.waitUntil(
 caches.open(CACHE)
 .then(c => c.addAll(ASSETS)));
});
// intercepta: responde do cache primeiro
self.addEventListener('fetch', e => {
 e.respondWith(
 caches.match(e.request)
 .then(r => r || fetch(e.request)));
});
