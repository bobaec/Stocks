import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    InputGroup,
    FormControl,
    Button,
    Row,
    Table,
    Col,
} from 'react-bootstrap';
import '../css/App.css';

let crypto = require('./crypto.js');


class CoinList extends React.Component {

    constructor() {
        super();
        this.state = {
            coinList: {},
            coin: ''
        };
        this.updateCoin = this.updateCoin.bind(this);
        this.sendCoin = this.sendCoin.bind(this);
    }

    updateCoin(e) {
        e.preventDefault();
        this.setState( { coin : e.target.value } );
    }

    sendCoin() {
        this.props.updateCoin(this.state.coin);
    }

    async componentDidMount() {
        let list;
        try {
            list = await crypto.getCoins();
        } catch (err) {
            console.log('API error:', err);
        }

        if (Object.entries(list).length !== 0) {
            this.setState( { coinList : list } );
            this.props.updateList(list);
        }
    }

	render() {
        const coinList = this.state.coinList;

        return (
            <div className = "mainContent">
                <center><h4>Browse Crypto</h4></center>
                    <InputGroup className="browse_input">
                        <FormControl placeholder="ex)Bitcoin" type="text" list="coinList" onChange={this.updateCoin}/>
                        <InputGroup.Append>
                        <Button variant="outline-secondary" type="button" id="refresh" onClick={this.sendCoin}>Browse</Button>
                        </InputGroup.Append>
                    </InputGroup>

                <datalist id="coinList" >
                    {
                        Object.keys(coinList).map(key => {
                            return <option key={key} value={coinList[key]}/>
                        })
                    }
                </datalist>
            </div>

        )
    };
} 

class Coin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coin: ''
        };
    }

    async componentDidUpdate(prevProp) {
        const c = this.props.coin;
        if (c === prevProp.coin) return;
        let coin;

        if (c !== '') {
            try {
                coin = await crypto.getCoin(c);
            } catch (err) {
                console.log('API error:', err);
            }

            if (Object.entries(coin).length !== 0) {
                this.setState( { coin } );
            }
        }
    }

    style = {
        border: "1px solid white"
    }

    // https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
    renderTableHeader() {
        let c = this.state.coin;
        return Object.keys(c).map(coin => {
            return Object.keys(c[coin]).map((key, index) => {
                return <th key={index} style={this.style}>{key.toUpperCase()}</th>
            })
        })
     }

    renderTableData() {
        let c = this.state.coin;
        return Object.keys(c).map((key, index) => {
            const { cad, cad_24h_change, cad_24h_vol, cad_market_cap, last_updated_at } = c[key];
            return (
            <tr key={index}>
                <td style={this.style}>{cad}</td>
                <td style={this.style}>{cad_24h_change}</td>
                <td style={this.style}>{cad_24h_vol}</td>
                <td style={this.style}>{cad_market_cap}</td>
                <td style={this.style}>{last_updated_at}</td>
            </tr>
            )
        })
    }

    render() {
        let header;
        if (this.props.coin !== '') {
            header = this.props.coin + ' Overview'
        } else {
            header = ''
        }

        return (
            <div style={{marginBottom:'10px'}}>
                <center><h4>{header}</h4></center>
                <Table responsive variant="dark" id="coin_overview_table">
                    <tbody>
                        <tr>
                            {this.renderTableHeader()}
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

class PriceGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            labels: []
        };
    }

    async componentDidUpdate(prevProp) {
        const c = this.props.coin;
        if (c === prevProp.coin) return;

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
    
                    if (this.props.days > 1) {
                        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
                    } else {
                        return hours + ":" + minutes + ":" + seconds;
                    }
                });
    
                this.setState( { data: prices, labels: dates } );
            } catch (err) {
                console.log('API error:', err);
            }
        }
    }

    
    render() {

        const { data, labels } = this.state;
        if (this.props.coin !== '') {
            let graphData = {
                labels: labels,
                datasets: [
                    {
                        label: this.props.coin + ' prices over last 24h',
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
                    <Line data={graphData} />
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

class CryptoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coinList: {},
            coin: ''
        }
        this.updateCoin = this.updateCoin.bind(this);
        this.updateList = this.updateList.bind(this);
        this.getCoin = this.getCoin.bind(this);
    }


    updateCoin(c) {
        this.setState( { coin: c } );
    }

    updateList(l) {
        this.setState( { coinList: l } );
    }

    getCoin(c) {
        const coinList = this.state.coinList;
        for (let coin in coinList) {
            if (c === coinList[coin]) {
                return coin;
            }
        }

        return '';
    }

    render() {
        return (
            
            <div>
                <div>
                    <CoinList updateCoin={this.updateCoin} updateList={this.updateList} />
                </div>
                <div>
                    <Coin coin={this.getCoin(this.state.coin)} />
                </div>
                <div style={{ position: "relative", margin: "auto", width: "60vw", height: '30vh'}}>
                    <PriceGraph coin={this.getCoin(this.state.coin)} days='1' />
                </div>
            </div>
        )
    }
}

export default CryptoPage;