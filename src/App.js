import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Speedometer from "./Components/Speedometer";

// Connect to WebSocket server
const socket = io('https://telemetria-server.onrender.com');

function GPSAccelerometer() {
  const [gpsCurrentData, setGpsCurrentData] = useState({
    lat: 0,
    lng: 0,
    speed: 0,
  });

  useEffect(() => {
    // Send GPS data via WebSocket
    const sendGPSData = (position) => {
      const { latitude, longitude, speed } = position.coords;
      const gpsData = {
        lat: latitude,
        lng: longitude,
        speed: speed ? (speed * 3.6).toFixed(2) : 0, // Convert m/s to km/h
      };
      setGpsCurrentData(gpsData);
      console.log('Sending GPS data:', gpsData);
      socket.emit('gpsData', gpsData); // Send data to the server
    };

    // Handle GPS success
    const handleGPSSuccess = (position) => {
      sendGPSData(position);
    };

    // Handle GPS error
    const handleGPSError = (error) => {
      console.error('Error getting GPS position:', error);
    };

    // Get GPS data and watch position
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(handleGPSSuccess, handleGPSError, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    // Clean up WebSocket connection
    return () => {
      socket.disconnect();
    };

  }, []);

  if (!gpsCurrentData.lng || !gpsCurrentData.lat){
    return (
        <div style={{
          backgroundColor: "#301c4a",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <h2 style={{color: "#f4f0f9"}}> No se puede acceder al GPS</h2>


        </div>
    )
  }

  return (
      <div style={{
        backgroundColor: "#301c4a",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Speedometer speed={gpsCurrentData.speed}/>



      </div>
  );
}

export default GPSAccelerometer;
