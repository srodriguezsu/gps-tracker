import io from "socket.io-client";

const CACHE_NAME = 'gps-pwa-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/logo192.png',
    '/logo512.png'
];
const socket = io('https://telemetria-server.onrender.com');

self.addEventListener('install', (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Background Sync registration
self.addEventListener('sync', (event) => {
    if (event.tag === 'gps-sync') {
        event.waitUntil(sendGPSDataToServer());
    }
});
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'gps-sync') {
        event.waitUntil(syncGPSData());
    }
});
const sendGPSData = (position) => {
    const { latitude, longitude, speed } = position.coords;
    const gpsData = {
        lat: latitude,
        lng: longitude,
        speed: speed ? (speed * 3.6).toFixed(2) : 0, // Convert speed from m/s to km/h (if available)
    };

    console.log('Sending GPS data:', gpsData);
    socket.emit('gpsData', gpsData); // Send GPS data to WebSocket server
};

// Function to handle GPS position success
const handleGPSSuccess = (position) => {
    sendGPSData(position);
};

// Function to handle GPS position error
const handleGPSError = (error) => {
    console.error('Error getting GPS position:', error);
};

async function sendGPSDataToServer() {

    // Requesting GPS permission and getting current position
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(handleGPSSuccess, handleGPSError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
    console.log('Syncing GPS data...');
}


async function syncGPSData() {
    // Requesting GPS permission and getting current position
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(handleGPSSuccess, handleGPSError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
    console.log('Syncing GPS data...');


}


// Background Fetch or Push Notification setup
// You can also use Web Push APIs to push updates when the app is in the background
