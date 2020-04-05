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
            data: {},
            labels: {},
            stock: 'bitcoin'
        };
    }


    async componentDidMount(){
        const userId = "1"; // Get current userId
        const url = `/stock/${userId}`;

        const response = await fetch(url, {
            method: 'GET', 
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            // body: JSON.stringify(data)
          });

        //   console.log(await response.json())
        //   return await response.json();
        console.log('here')
        console.log(this.props.selected_id);
    }

    componentDidUpdate(prevProp) {
        if (this.state.selected_id === '' || prevProp.selected_id !== this.props.selected_id) {
            this.setState({selected_id: this.props.selected_id});
        }
    } 

    getChart = name => ({
        crypto: <PriceGraph coin={name} days={1} validMarketCap={true} found={true} updateDays={null} />,
        stock: <> </>
    });
    
    render() {
        const { selected_id, type, name} = this.props;
        
        return (
            <div>
            <h6>ID: {type}</h6>
            <center><div style = {{width:'60%'}}>
                {this.getChart(name)[type]}
                {/* <Chart data={data} labels={labels} />
                <News stock={stock} /> */}
            </div></center>
            </div>
        )
    }
}