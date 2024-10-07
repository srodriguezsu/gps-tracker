import React, { useEffect } from 'react';
import io from 'socket.io-client';

// Connect to your WebSocket server
const socket = io('https://telemetria-server.onrender.com');

function GPSAccelerometer() {
  useEffect(() => {
    // Function to send GPS data
    const sendGPSData = (position) => {
      const { latitude, longitude } = position.coords;
      const gpsData = {
        lat: latitude,
        lng: longitude,
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

    // Function to send accelerometer data
    const handleMotion = (event) => {
      const { acceleration } = event;
      if (acceleration) {
        const accelerometerData = {
          x: acceleration.x,
          y: acceleration.y,
          z: acceleration.z,
        };
        console.log('Sending accelerometer data:', accelerometerData);
        socket.emit('accelerometerData', accelerometerData); // Send accelerometer data to WebSocket server
      }
    };

    // Adding event listener for device motion
    window.addEventListener('devicemotion', handleMotion);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);

  return (
      <div>
        <h1>GPS and Accelerometer Data Sender</h1>
      </div>
  );
}

export default GPSAccelerometer;
