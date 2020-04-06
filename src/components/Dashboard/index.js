import React, { Component } from 'react';
import Chart from "../Chart/index";
import News from "../News/index";
import '../../pages/css/App.css';
import PriceGraph from "../../pages/crypto/graph";

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            selected_id: '',
            stock: 'bitcoin',
            days: 1
        };
        this.updateDays = this.updateDays.bind(this);

    }

    updateDays(d) {
        this.setState({ days: d });
    }

    getChart = (name, symbol) => ({
        crypto: <PriceGraph coin={name} days={this.state.days} validMarketCap={true} found={true} updateDays={this.updateDays} />,
        stock: <><Chart stock={symbol} /> <News stock={name} /></>
    });
    
    render() {
        const { type, name, symbol} = this.props;
        return (
            <div>
                <center>
                    <div style = {{width:'60%'}}>
                        {this.getChart(name, symbol)[type]}
                    </div>
                </center>
            </div>
        )
    }
}