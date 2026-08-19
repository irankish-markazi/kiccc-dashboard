const CACHE_NAME = 'terminal-cache-v2';

const BASE_PATH = '/kiccc-dashboard/';

const STATIC_ASSETS = [
    BASE_PATH,
    BASE_PATH + 'index.html',
    BASE_PATH + 'manifest.json',
    BASE_PATH + 'icon-512.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(STATIC_ASSETS);
            })
            .then(function() {
                return self.skipWaiting();
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function(cacheName) {
                        return cacheName !== CACHE_NAME;
                    })
                    .map(function(cacheName) {
                        return caches.delete(cacheName);
                    })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                if (response && response.status === 200) {
                    const clone = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, clone);
                        });
                }

                return response;
            })
            .catch(function() {
                return caches.match(event.request);
            })
    );
});