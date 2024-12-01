// Nombre del caché
const CACHE_NAME = 'pwa-cache-v1';

// Archivos a cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/scripts.js',
  '/manifest.json',
  '/img/logo.png',
  '/img/perfil.png',
  '/img/perfil.jpg',
  '/img/mypetlife.png',
  '/img/rutna.png',
  '/img/healthySmiles.png',
  '/img/certificado_azle.png',
  '/img/certificado_motoko.png',
  '/img/certificado_santander.png',
  '/img/certificado_tc.png',
  '/img/icon_icp.png',
  '/img/icon_motoko.jpg',
  '/img/icon_santander.png',
  '/img/icon_tecnolochicas.png',
  '/files/CV.pdf',
  '/Demo/experiencia_interactiva.html'
];

// Instalar el Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos cacheados con éxito');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar el Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes y responder con el caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
