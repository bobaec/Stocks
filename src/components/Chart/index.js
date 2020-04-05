import React, { useState, useEffect } from 'react';
import Chart from "chart.js";

export default Chart = props => {
    const [stock, setStock] = useState(props);
    const [data, setData] = useState({});
    const chartRef = React.createRef();

    const getStock = async symbol => {
        const response = await fetch(`/stock/data/${symbol}`);
        const data = await response.json();
        setData(data);
    }
       
    useEffect(() => {
        setStock(props);
        getStock(stock.stock)
    }, []);

    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        const gradient = myChartRef.createLinearGradient(0, 0, 0, 450);

        gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

        new Chart(myChartRef, {
            type: "line",
            data: data,
            options: {
                title: {
                    display: true,
                    text: stock.stock
                },
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
    })

    return (
        <div>
            <canvas
                id="myChart"
                ref={chartRef}
            />
        </div>
    )
}