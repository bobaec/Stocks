import React, { useState, useEffect } from 'react';
import Chart from "chart.js";

<<<<<<< HEAD
export default function Chart() {
    const [data, setData] = useState(null);
=======
export default Chart = () => {
    const [data, setData] = useState(null); // get data from 
>>>>>>> e010003182c0f26b5b4110178e681c5e8d77db25
    const chartRef = useState(React.createRef());
    
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");

        const gradient = myChartRef.createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Stocks",
                        data: [86, 67, 91],
                        backgroundColor: gradient,
                        borderColor: "#db3d44",
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'white'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'white'
                        }
                    }],
                },
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }
        });
    });

    return (
        <div>
            <canvas
                id="myChart"
                ref={chartRef}
            />
        </div>
    )
}