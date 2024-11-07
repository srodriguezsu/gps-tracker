import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/gps-tracker/service-worker.js', { scope: '/gps-tracker/' })
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);

            // Register background sync
            registration.periodicSync.register('gps-sync', {
                minInterval: 24 * 60 * 60 * 1000, // 24 hours
            }).then(() => {
                console.log('Periodic sync registered');
            }).catch((error) => {
                console.log('Error registering periodic sync:', error);
            });

        }).catch((error) => {
        console.log('Service Worker registration failed:', error);
    });
}

navigator.permissions.query({ name: 'periodic-background-sync' }).then((status) => {
    if (status.state === 'granted') {
        console.log('Periodic Background Sync permission granted');
    } else if (status.state === 'prompt') {
        console.log('Prompting user for Periodic Background Sync permission');
    } else {
        console.log('Periodic Background Sync permission denied');
    }
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
