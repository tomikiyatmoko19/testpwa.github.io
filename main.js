
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker
			.register('/sework.js')
			.then(function() {
				console.log('ServiceWorker Sukses');
			})
			.catch(function() {
				console.log('ServiceWorker Gagal');
			});
	});
} else {
	console.log('ServiceWorker tidak mendukung');
}
