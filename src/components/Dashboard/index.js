import React, { Component } from 'react';
import Chart from "../Chart/index";
import News from "../News/index";
import '../../pages/css/App.css';
import MainPage from '../../pages';
import PriceGraph from "../../pages/crypto/graph";

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            selected_id: '',
            stock: 'bitcoin'
        };
    }

    // removing not sure why it is being used
    // componentDidUpdate(prevProp) {
    //     if (this.state.selected_id === '' || prevProp.selected_id !== this.props.selected_id) {
    //         this.setState({selected_id: this.props.selected_id});
    //     }
    // } 

    getChart = (name, symbol) => ({
        crypto: <PriceGraph coin={name} days={1} validMarketCap={true} found={true} updateDays={null} />,
        stock: <><Chart stock={symbol} /> <News stock={name} /></>
    });
    
    render() {
        const { selected_id, type, name, symbol} = this.props;
        
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