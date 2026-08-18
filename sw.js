// ============================================================
// Service Worker برای کش کردن داده‌ها
// ============================================================

// register-sw.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function(reg) {
            console.log('✅ Service Worker ثبت شد');
        })
        .catch(function(err) {
            console.log('❌ خطا در ثبت Service Worker:', err);
        });
}

// sw.js (فایل جداگانه)
const CACHE_NAME = 'terminal-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js'
];

// نصب Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(STATIC_ASSETS);
            })
    );
});

// پاسخ به درخواست‌ها
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(function(response) {
                        // ذخیره در کش
                        var clone = response.clone();
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, clone);
                            });
                        return response;
                    });
            })
    );
});