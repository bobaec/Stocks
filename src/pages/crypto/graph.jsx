import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Button,
    ButtonGroup
} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import '../css/App.css';
import News from "../../components/News/index";
let crypto = require('./crypto.js');

class PriceGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            labels: []
        };
    }

    updateDays(e, d) {
        e.preventDefault();
        this.props.updateDays(d);
    }

    componentDidMount() {
        this.setState({ days: this.props.days });
    }

    addZero(t) {
        return '0' + t;
    }

    formatTime(hours, minutes, seconds) {
        return (hours < 10 ? this.addZero(hours) : hours) + ":" + (minutes < 10 ? this.addZero(minutes) : minutes)
            + ":" + (seconds < 10 ? this.addZero(seconds) : seconds);
    }

    async componentDidUpdate(prevProp) {
        const c = this.props.coin.toLowerCase();
        const d = this.props.days;
        if (c === prevProp.coin && d === prevProp.days) return;

        let dayData;
        if (c !== '') {
            try {
                dayData = await crypto.getHistoricalData(c, this.props.days);

                let prices = dayData.map((elem, index) => {
                    return elem[1];
                });
    
                let dates = dayData.map(elem => {
                    const date = new Date(elem[0]);
    
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const hours = date.getHours();
                    const minutes = date.getMinutes();
                    const seconds = date.getSeconds();
                    const formattedTime = this.formatTime(hours, minutes, seconds);
    
                    if (this.props.days > 1) {
                        return year + "-" + month + "-" + day + " " + formattedTime;
                    } else {
                        return formattedTime;
                    }
                });
    
                this.setState( { data: prices, labels: dates } );
            } catch (err) {
                console.log('API error:', err);
            }
        }
    }

    
    render() {
        if (this.props.found !== true) return(<div></div>)
        if (this.props.validMarketCap === false) {
            return (
                <div style={{padding: "15px"}}>
                    <center>
                        <h3>Price graph not available for {this.props.coin}</h3>
                    </center>
                </div>
            )
        }

        const { data, labels } = this.state;        
        if (this.props.coin !== '') {
            let graphData = {
                labels: labels,
                datasets: [
                    {
                        label: this.props.coin + ' prices over last ' + this.props.days + ' day(s)',
                        backgroundColor: "rgba(255, 10, 10, 0.2)",
                        borderColor: "#db3d44",
                        data: data,
                    }
                ],
            
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: 'white'
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Price in CAD',
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
                            fontColor: 'white',
                        }
                    }
                }
            }
            return (
                <div>
                    <ButtonGroup style={{float: 'right'}} className='mb2'>
                        <Button variant="secondary" onClick={(e) => this.updateDays(e, 1)}>24H</Button>
                        <Button variant="secondary" onClick={(e) => this.updateDays(e, 7)}>7D</Button>
                        <Button variant="secondary" onClick={(e) => this.updateDays(e, 30)}>30D</Button>
                    </ButtonGroup>
                    <Line data={graphData} />
                    <News 
                        stock={this.props.coin}
                        index={3}
                    />
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}

export default PriceGraph;