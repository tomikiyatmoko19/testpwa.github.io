document.addEventListener('DOMContentLoaded', function() {

	const elems = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elems);
	loadNav();

	function loadNav() {
		var xhtpp = new XMLHttpRequest();
		xhtpp.onreadystatechange = function() {
			if (this.readyState == 4) {
				if (this.status != 200) return;

				
				document.querySelectorAll('.topnav, .sidenav').forEach(function(elm) {
					elm.innerHTML = xhtpp.responseText;
				});

				
				document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm) {
					elm.addEventListener('click', function(event) {
					
						var sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();

						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};

		xhtpp.open('GET', 'nav.html', true);
		xhtpp.send();
	}
	var page = window.location.hash.substr(1);
	if (page == '') page = 'home';
	loadPage(page);

	function loadPage(page) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				var content = document.querySelector('#body-content');
				if (this.status == 200) {
					content.innerHTML = xhttp.responseText;
				} else if (this.status == 404) {
					content.innerHTML = '<p>Tidak Ditemukan</p>';
				} else {
					content.innerHTML = '<p>Tidak dapats diakses</p>';
				}
			}
		};
		xhttp.open('GET', 'halamanweb/' + page + '.html', true);
		xhttp.send();
	}
});
