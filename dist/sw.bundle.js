(()=>{const e="personalNote-v1";self.addEventListener("install",(e=>{console.log("Service Worker Installed")})),self.addEventListener("activate",(t=>{t.waitUntil(caches.keys().then((t=>{Promise.all(t.map((t=>{t!==e&&caches.delete(t)})))}))())})),self.addEventListener("fetch",(t=>{0===t.request.url.indexOf("http")&&t.respondWith(fetch(t.request).then((s=>{const n=s.clone();return caches.open(e).then((e=>{e.put(t.request,n)})),s})).catch((e=>caches.match(t.request).then((e=>e)))))}))})();