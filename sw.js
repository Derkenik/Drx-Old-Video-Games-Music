self.addEventListener('install', (e)=>{

    if (self.skipWaiting) { self.skipWaiting(); }
    e.waitUntil(
        caches.open('cache01').then((cache) =>{
            return cache.addAll([
                    './',
                    'index.html',
                    'css/main.css',
                    'js/main.js',
                    'img/',
                    'img/DefaultCover.jpeg',
                    'img/Megaman2.png',
                    'img/Sonic.jpeg',
                    'img/superMarioBros.jpeg',
                    'img/theLegendOfZelda.jpeg',
                    'img/yoshisland.jpeg',
                    'img/icon.png'
                ]);
        })
    )
})



self.addEventListener('fetch', (e)=>{
    e.respondeWith(
        caches.match(e.request).then(res =>{
            return response || fetch(e.request);
        })
    );
});

// Deleting old cache version
var cacheWhitelist = ['cache01'];
caches.keys().then(function(cacheNames) {
  return Promise.all(
    cacheNames.map(function(cacheName) {
      if (cacheWhitelist.indexOf(cacheName) === -1) {
        return caches.delete(cacheName);
      }
    })
  );
});
caches.keys().then(function(cacheKeys) {
// Muestra en la consola la cache instalada 
console.log('Versión SW: '+cacheKeys);
});  
