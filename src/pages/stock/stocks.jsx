import React from 'react';
import { Table } from 'react-bootstrap';
import '../css/App.css';

const axios = require('axios');

class DisplayTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    
    renderTableHeader() {
        const d = this.props.data;
        if (Object.keys(d).length > 0) {
            let first = d[0];
            return Object.keys(first).map(t => {
                return (
                    <th key={t}>{t.toUpperCase()}</th>
                )
            });
        }
     }

     renderTableBody() {
        const d = this.props.data;
        const styleGreen = {color: '#A5D6A7'};

        if (Object.keys(d).length > 0) {
            return Object.keys(d).map(t => {
                return (
                    <tr key={d[t].symbol}>
                        <td>{d[t].name}</td>
                        <td>{d[t].symbol.toUpperCase()}</td>
                        <td>${Number(d[t].price).toLocaleString('en-US', {maximumFractionDigits: 6})}</td>
                        <td style={styleGreen}>{Number(d[t].change).toLocaleString('en-US', {maximumFractionDigits: 4})}%</td>
                        <td>{d[t].exchange}</td>
                        <td>{d[t].market.toUpperCase()}</td>
                        <td>{d[t].quoteType}</td>
                        <td>{new Date(d[t].time).toLocaleString()}</td>
                    </tr>
                )
            });
        }
     }

     render() {
         return (
            <Table responsive variant="dark">
                <thead>
                    <tr>
                        {this.renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableBody()}
                </tbody>
            </Table>
         )
     }
}

class StocksPage extends React.Component {

    constructor() {
        super();
        this.state = {
            stockData: {}
        }

        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;
        let s = await axios.get('/stock/markets');
        s = await s.data;
        console.log(s)

        if (this._isMounted) {
            this.setState({stockData: s});
        }
    }

    render() {
        return (
            <div>
                <div>
                    <center><h4>Popular Market Summaries</h4></center>
                    <DisplayTable data={this.state.stockData} />
                </div>
            </div>
        )
    }
}

export default StocksPage;
