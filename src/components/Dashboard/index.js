import React, { Component } from 'react';
import Chart from "../Chart/index";
import News from "../News/index";
import '../../pages/css/App.css';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {}
    }

    state = {
        data: {},
        labels: {},
        stock: 'bitcoin'
    }

    async componentDidMount(){
        const userId = "1"; // Get current userId
        const url = `/api/v1/stock/${userId}`;

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
    }

    render() {
        const { data, labels, stock} = this.state;
        return (
            <div>
            <center><div style = {{width:'60%'}}>
                <Chart 
                    data={data}
                    labels={labels} 
                />
                <News 
                    stock={stock}
                />
            </div></center>
            </div>
        )
    }
}