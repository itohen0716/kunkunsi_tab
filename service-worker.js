"use strict";
const CACHE="kunkunshi-player-v2";
const ASSETS=[
  "./","index.html","styles.css","player.css","sample-score.js","player.js","manifest.webmanifest","icon.svg",
  "assets/fonts/ShipporiMincho-SemiBold-Kunkunshi.ttf","assets/fonts/ShipporiMincho-LICENSE.txt",
  "audio/合.wav","audio/乙.wav","audio/老.wav","audio/下老.wav","audio/四.wav","audio/上.wav",
  "audio/中.wav","audio/尺.wav","audio/工.wav","audio/五.wav","audio/六.wav","audio/七.wav","audio/八.wav",
  "audio/二揚四.wav","audio/二揚上.wav","audio/二揚_中.wav","audio/三下七.wav"
  ,"legacy-img/cha1.gif","legacy-img/tindami2.gif","legacy-img/○.gif","legacy-img/七.gif","legacy-img/上.gif","legacy-img/下尺.gif","legacy-img/下老.gif","legacy-img/中.gif","legacy-img/乙.gif","legacy-img/五.gif","legacy-img/八.gif","legacy-img/六.gif","legacy-img/合.gif","legacy-img/四.gif","legacy-img/尺.gif","legacy-img/工.gif","legacy-img/老.gif"
];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;const request=event.request,url=new URL(request.url),isAppCode=url.origin===self.location.origin&&(request.mode==="navigate"||/[.](?:html|css|js)$/.test(url.pathname));if(isAppCode){event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return response;}).catch(()=>caches.match(request).then(cached=>cached||caches.match("index.html"))));return;}event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return response;}).catch(()=>caches.match("index.html"))));});
