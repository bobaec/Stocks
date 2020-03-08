import React, { Component } from 'react';
import Chart from "src/components/Chart/index";

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {}
    }

    state = {
        data: {},
        labels: {}
    }

    async componentDidMount(){
        const userId = "1"; // Get current userId
        const url = `/stocks/${userId}`;

        const response = await fetch(url, {
            method: 'POST', 
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          console.log(await response.json())
        //   return await response.json();
    }

    render() {
        const { data, labels } = this.state;
        return (
            <div>
                <header>
                    <h1>Dashboard</h1>
                </header>
                <Chart
                    data={data}
                    labels={labels} /
                >
            </div>
        )
    }
}