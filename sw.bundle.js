const cacheName = 'personalNote-v1';

// Call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker Installed');
});

// Call activate event
self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
        Promise.all(keyList.map((key) => {
            if (key === cacheName) { return; }
            caches.delete(key);
        }))
    })());
});

// Call fetch event
self.addEventListener('fetch', (e) => {
    if (!(e.request.url.indexOf('http') === 0)) return;
    e.respondWith(
        fetch(e.request).then(res => {
            // Make clone of response
            const resClone = res.clone();
            // /open cache
            caches.open(cacheName).then(cache => {
                // add response to cache
                cache.put(e.request, resClone)
            })
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );
});



