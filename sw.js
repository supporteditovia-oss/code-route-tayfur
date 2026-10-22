const CACHE='code-route-v19';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./fra.traineddata.gz", "./tesseract-core-simd-lstm.wasm", "./tesseract-core-simd-lstm.wasm.js", "./tesseract.min.js", "./worker.min.js"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(nr=>{const cp=nr.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return nr;}).catch(()=>caches.match('./index.html'))))});
