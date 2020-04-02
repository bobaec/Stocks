import React, { useState, useEffect } from 'react';
import ChartJs from "chart.js";

export default function Chart() {
    const [data, setData] = useState(null);
    const chartRef = useState(React.createRef());
    
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");

        const gradient = myChartRef.createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        new ChartJs(myChartRef, {
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