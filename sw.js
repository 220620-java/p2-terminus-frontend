self.addEventListener('install', function(e) {
    e.waitUntil(

        caches.open('toneweb').then(function(cache) {
            return cache.addAll([


                '/',
                'assets/css/style.css',
                'assets/html/login.html',
                'assets/html/signup.html',
                'assets/html/main.html',
                'assets/images/webicon.png',
                'assets/images/logo.png',
                'lib/auth.js',
                'lib/login.js',
                'lib/signup.js',
                'lib/store.js',
                'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});