const CACHE_NAME = 'gelumbangvilla';
var urlsToCache = [
	'/',
	'/manifest.json',
	'/nav.html',
	'/index.html',
	'/galeri/logo.png',
	'/galeri/glb1.png',
	'/galeri/glb.png',
	'/halamanweb/about.html',
	'/halamanweb/peta.html',
	'/halamanweb/galeri.html',
	'/halamanweb/home.html',
	'/images/icon-36x36.png',
	'/images/icon-48x48.png',
	'/images/icon-72x72.png',
	'/images/icon-96x96.png',
	'/images/icon-144x144.png',
	'/images/icon-192x192.png',
	'/images/icon-512x512.png',
	'/css/materialize.min.css',
	'/js/materialize.min.js',
	'/js/nav.js',
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			console.log('install serviceWorker.... cache opened');
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('activate', function(event) {
	var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function(cacheName) {
						return cacheName != CACHE_NAME;
					})
					.map(function(cacheName) {
						return caches.delete(cacheName);
					})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});



