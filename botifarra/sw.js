// Caché per jugar sense connexió. Puja el número de versió quan canviïn els fitxers.
const CACHE='botifarra-v1';
const CORE=["./", "./fonts/alegreya-sans-latin-400-normal.woff2", "./fonts/alegreya-sans-latin-500-normal.woff2", "./fonts/alegreya-sans-latin-700-normal.woff2", "./fonts/alegreya-sans-sc-latin-800-normal.woff2", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./index.html", "./manifest.webmanifest"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(res=>{ if(res&&res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));} return res; }).catch(()=>hit);
    return hit||net;
  }));
});
