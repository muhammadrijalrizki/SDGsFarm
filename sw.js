// Daftar file yang ingin disimpan agar bisa diakses offline
const CACHE_FILES = [
  '/index.html',
  '/style.css',
  '/script.js',
  '/images/icon-512x512.png'
];

// Saat PWA diinstall, simpan semua file di atas ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-app-cache-v1').then((cache) => {
      return cache.addAll(CACHE_FILES);
    })
  );
});

// Saat website dibuka, coba ambil file dari cache dulu.
// Kalau tidak ada di cache, baru ambil dari internet.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});