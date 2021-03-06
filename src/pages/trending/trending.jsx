import React from 'react';
import { Table, Tabs, Tab} from 'react-bootstrap';
import '../css/App.css';

const Trending = require('../trending/trending');

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
                        <td style={styleGreen}>{Number(d[t]['growth 24h']).toLocaleString('en-US', {maximumFractionDigits: 4})}%</td>
                    </tr>
                )
            });
        }
     }

     render() {
         return (
            <Table id="trending_table" responsive variant="dark">
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

class TrendingPage extends React.Component {

    constructor() {
        super();
        this.state = {
            stockData: {},
            cryptoData: {}
        }

        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;
        const s = await Trending.getStockData();
        // const s = ''
        const c = await Trending.getCoins();

        if (this._isMounted) {
            this.setState({stockData: s, cryptoData: c});
        }
    }

    render() {
        return (
            <div className = "mainContent">
				<div className = "wrapper">
                    <Tabs className="trending_tabs" defaultActiveKey="Stock">
                        <Tab eventKey="Stock" title="Trending Stocks" className="tab_items">
                            <center><h4 id="trending_label">Trending Stocks</h4></center>
                            <br/>
                            <DisplayTable data={this.state.stockData} />
                        </Tab>
                        <Tab eventKey="Crypto" title="Trending Cryptos" className="tab_items">
                            <center><h4 id="trending_label">Trending Cryptocurrencies</h4></center>
                            <br/>
                            <DisplayTable data={this.state.cryptoData} />
                        </Tab>
                    </Tabs>

                </div>
                <br/>
            </div>
        )
    }
}

export default TrendingPage;