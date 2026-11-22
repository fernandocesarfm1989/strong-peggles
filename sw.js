const V='peggles-v2';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./icon.svg','./img/pulldown.jpg','./img/remada.jpg','./img/supino.jpg','./img/peckdeck.jpg','./img/cabos.jpg','./img/polia-alta.jpg','./img/scott.jpg','./img/extensora.jpg','./img/adutora.jpg','./img/abdutora.jpg','./ilu/0017.png','./ilu/0018.png','./ilu/0025.png','./ilu/0048.png','./ilu/0066.png','./ilu/0093.png','./ilu/0096.png','./ilu/0112.png','./ilu/0117.png','./ilu/0119.png','./ilu/0123.png','./ilu/0127.png','./ilu/0142.png','./ilu/0156.png','./ilu/0157.png','./ilu/0205.png','./ilu/0206.png','./ilu/0212.png','./ilu/0236.png','./ilu/0273.png','./ilu/0279.png','./ilu/0288.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>fetch(u,{cache:'no-store'}).then(r=>c.put(u,r))))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  if(u.origin===location.origin){ // network first, bypassing the HTTP cache, so updates arrive; cache fallback offline
    if(u.pathname.endsWith('version.json')) return;
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));
  } else if(/fonts\.(googleapis|gstatic)\.com/.test(u.host)){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(e.request,c));return res})));
  }});
