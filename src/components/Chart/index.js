import React, { useState, useEffect } from 'react';
import Chart from "chart.js";

export default Chart = () => {
    const [data] = useState(null); // get data from 
    const chartRef = React.createRef();
    
    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Stocks",
                        data: [86, 67, 91],
                    }
                ]
            },
            options: {}
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