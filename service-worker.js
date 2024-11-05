const CACHE_NAME = 'gps-pwa-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/logo192.png',
    '/logo512.png'
];

// Installation event - cache essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve cached files when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; // Return cached response
                }
                return fetch(event.request); // Fetch from network if not cached
            })
    );
});

// Background Sync event
self.addEventListener('sync', (event) => {
    if (event.tag === 'gps-sync') {
        event.waitUntil(syncGPSData());
    }
});

// Periodic Sync event
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'gps-sync') {
        event.waitUntil(syncGPSData());
    }
});

// Mock sync function for GPS data
async function syncGPSData() {
    // Simulate syncing GPS data (e.g., send cached data to the server)
    console.log('Syncing GPS data...');
    // Add the logic to fetch stored data and send to the server
}
