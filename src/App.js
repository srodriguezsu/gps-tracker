import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

// Connect to your WebSocket server
const socket = io('https://telemetria-server.onrender.com');

function GPSAccelerometer() {
  const [gpsCurrentData, setGpsCurrentData] = useState({
    lat:0,
    lng:0,
    speed:0,
  })

  useEffect(() => {
    // Function to send GPS data
    const sendGPSData = (position) => {
      const { latitude, longitude, speed } = position.coords;
      const gpsData = {
        lat: latitude,
        lng: longitude,
        speed: speed ? (speed * 3.6).toFixed(2) : 0, // Convert speed from m/s to km/h (if available)
      };
      setGpsCurrentData(gpsData); // For viewing the live data
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

  }, []);

  return (
      <div>
        <h1>Transmisor GPS</h1>
        <p>Latitud: {gpsCurrentData.lat}</p>
        <p>Longitud: {gpsCurrentData.lng}</p>
        <p>Velocidad: {gpsCurrentData.speed}</p>
      </div>
  );
}

export default GPSAccelerometer;
