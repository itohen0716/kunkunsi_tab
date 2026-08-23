"use strict";
const CACHE="kunkunshi-player-v11";
const ASSETS=[
  "./","index.html","styles.css","player.css","player-layout-v3.css","sample-score.js","legacy-songs.js","player.js","manifest.webmanifest","icon.svg",
  "assets/fonts/ShipporiMincho-SemiBold-Kunkunshi.ttf","assets/fonts/ShipporiMincho-LICENSE.txt",
  "audio/合.wav","audio/乙.wav","audio/老.wav","audio/下老.wav","audio/四.wav","audio/上.wav",
  "audio/中.wav","audio/尺.wav","audio/工.wav","audio/五.wav","audio/六.wav","audio/七.wav","audio/八.wav",
  "audio/二揚四.wav","audio/二揚上.wav","audio/二揚_中.wav","audio/三下七.wav"
  ,"kando-hd/cha1.gif","kando-hd/tindami2.png","kando-hd/○.png","kando-hd/七.png","kando-hd/上.png","kando-hd/下尺.png","kando-hd/下老.png","kando-hd/中.png","kando-hd/乙.png","kando-hd/五.png","kando-hd/八.png","kando-hd/六.png","kando-hd/合.png","kando-hd/四.png","kando-hd/尺.png","kando-hd/工.png","kando-hd/老.png"
];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;const request=event.request,url=new URL(request.url),isAppCode=url.origin===self.location.origin&&(request.mode==="navigate"||/[.](?:html|css|js)$/.test(url.pathname));if(isAppCode){event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return response;}).catch(()=>caches.match(request).then(cached=>cached||caches.match("index.html"))));return;}event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return response;}).catch(()=>caches.match("index.html"))));});
