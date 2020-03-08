import React, { useState, useEffect } from 'react';
import Chart from "chart.js";

export default Chart = () => {
    const data = useState(null); // 
    chartRef = React.createRef();
        
    useEffect(() => {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91],
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    });

    return (
        <div className={classes.graphContainer}>
            <canvas
                id="myChart"
                ref={this.chartRef}
            />
        </div>
    )
}