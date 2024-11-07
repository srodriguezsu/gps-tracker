import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Speedometer = ({ speed }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const speedometerChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [speed, 60 - speed], // Adjust according to max speed
                        backgroundColor: ['#b79cda', '#f4f0f9'],
                        hoverBackgroundColor: ['#b79cda', '#f4f0f9'],
                    },
                ],
            },
            options: {
                rotation: -45,
                circumference: 90,
                cutout: '70%', // Adjust chart thickness
                animation: false,
                plugins: {
                    tooltip: { enabled: false },
                    legend: { display: false },

                },
            },
        });

        // Cleanup
        return () => speedometerChart.destroy();
    }, [speed]);

    return(
        <div style={{width: "100%", display: "flex", flexDirection:"column", alignItems:"center"}}>

            <canvas ref={chartRef} style={{maxHeight:"200px"}}></canvas>
            <h1 style={{color:"#f4f0f9"}}> {speed} km/h</h1>
        </div>
    )

};

export default Speedometer;
