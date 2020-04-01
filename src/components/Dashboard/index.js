import React, { Component } from 'react';
import Chart from "../Chart/index";
import News from "../News/index";
import '../../pages/css/App.css';
import MainPage from '../../pages';

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
        console.log(this.props.selected_id);
    }

    componentDidUpdate(prevProp) {
        if (this.state.selected_id === '' || prevProp.selected_id !== this.props.selected_id) {
            this.setState({selected_id: this.props.selected_id});
        }
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