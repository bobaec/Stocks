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

    sendCoin(e) {
        e.preventDefault();
        e.stopPropagation();
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
                <div className = "wrapper">
                    <center><h4>Browse Crypto</h4></center>
                    <form onSubmit={this.sendCoin} className="browse_input">
                        <InputGroup >
                            <FormControl type="text" list="coinList" onChange={this.updateCoin} autoFocus />
                            <InputGroup.Append>
                                <Button type="submit" id="refresh" style={{backgroundColor:"inherit", borderColor:"white"}}> Browse </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <datalist id="coinList">
                            {
                                Object.keys(coinList).map(key => {
                                    return <option key={key} value={coinList[key]} />
                                })
                            }
                        </datalist>
                    </form>
                </div>
            </div>
        )
    };
} 

class Coin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coin: '',
            found: null
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
                this.setState( { found: true } );
                this.props.updateFoundCoin(true);
                this.setState( { coin } );

                const key = Object.keys(coin);
                if (key.length > 0) {
                    const vals = coin[key];
                    const cap = Object.keys(vals)[1];
                    const capVal = vals[cap]

                    if (capVal < 1) {
                        this.props.updateMarketCap(false);
                    } else {
                        this.props.updateMarketCap(true);
                    }
                }
            } 
        } else {
            this.props.updateFoundCoin(false);
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
            const lastUpdate = new Date(last_updated_at*1000).toString()
            return (
            <tr key={index}>
                <td style={this.style}>{cad}</td>
                <td style={this.style}>{cad_24h_change}</td>
                <td style={this.style}>{cad_24h_vol}</td>
                <td style={this.style}>{cad_market_cap}</td>
                <td style={this.style}>{lastUpdate}</td>
            </tr>
            )
        })
    }

    render() {
        if (this.props.coin !== '') {
            let header = this.props.coin + ' Overview'
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

        let message;
        if (this.state.found !== true) {
            message = 'Select an option from the list.'
        } else {
            message = 'Error searching for coin. Please choose a coin from the list.'
        }

        return (
            <div style={{padding: "15px"}}>
               <center>
                   <h3>{message}</h3>
               </center>
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

class CryptoList extends React.Component {

    constructor(){
        super();
        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d';
        const response = await fetch(url);
        const json = await response.json();
        console.log(json)
        this.setState({ data: json });
    }

    renderTableData() {
        let data = this.state.data;
        let i = 1;

        return Object.keys(data).map((key, index) => {
            let { name, id, symbol, current_price, last_updated, image, price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency, price_change_percentage_7d_in_currency } = data[key];
            const styleRed = {color: '#EF9A9A'};
            const styleGreen = {color: '#A5D6A7'};
            let style1h = styleGreen,
                style24h = styleGreen,
                style7d = styleGreen;

            if (price_change_percentage_1h_in_currency === null) {
                price_change_percentage_1h_in_currency = 0;
                style1h = {color: '#E0E0E0'};
            }
            if (price_change_percentage_24h_in_currency === null) {
                price_change_percentage_24h_in_currency = 0;
                style24h = {color: '#E0E0E0'};
            }
            if (price_change_percentage_7d_in_currency === null) {
                price_change_percentage_7d_in_currency = 0;
                style7d = {color: '#E0E0E0'};
            }

            if (price_change_percentage_1h_in_currency < 0) {
                style1h = styleRed;
            }
            if (price_change_percentage_24h_in_currency < 0) {
                style24h = styleRed;
            }
            if (price_change_percentage_7d_in_currency < 0) {
                style7d = styleRed;
            }
            return (
            <tr key={id} style={{padding:'10px'}}>
                <td>{i++}</td>
                <td><div><img style={{display:'inline-block', width:'10%', height:'10%'}} alt={symbol} src={image}  align='left' /></div><div style={{paddingLeft:'20%'}}>{name}</div></td>
                <td>{name}</td>
                <td>${current_price}</td>
                <td style={style1h}>{Number(price_change_percentage_1h_in_currency).toFixed(4)}%</td>
                <td style={style24h}>{Number(price_change_percentage_24h_in_currency).toFixed(4)}%</td>
                <td style={style7d}>{Number(price_change_percentage_7d_in_currency).toFixed(4)}%</td>
                <td>{last_updated}</td>
            </tr>
            )
        })
    }

    render() {
        return(
            <div>
                <center>
                    <h3>Top 100 Cryptocurrencies</h3>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Coin</th>
                                <th>Symbol</th>
                                <th>Price</th>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                </center>
                <br /><br />
            </div>
        )
    }
}

class CryptoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            coinList: {},
            coin: '',
            validMarketCap: true,
            foundCoin: null
        }
        this.updateCoin = this.updateCoin.bind(this);
        this.updateList = this.updateList.bind(this);
        this.getCoin = this.getCoin.bind(this);
        this.updateMarketCap = this.updateMarketCap.bind(this);
        this.updateFoundCoin = this.updateFoundCoin.bind(this);
    }


    updateCoin(c) {
        this.setState( { coin: c } );
    }

    updateList(l) {
        this.setState( { coinList: l } );
    }

    updateMarketCap(c) {
        this.setState( { validMarketCap: c } );
    }

    updateFoundCoin(c) {
        this.setState( { foundCoin: c } );
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
                    <Coin coin={this.getCoin(this.state.coin)} updateMarketCap={this.updateMarketCap} updateFoundCoin={this.updateFoundCoin} />
                </div>
                <div id="coin_overview_graph">
                    <PriceGraph coin={this.getCoin(this.state.coin)} days='1' validMarketCap={this.state.validMarketCap} 
                        found={this.state.foundCoin} />
                </div>
                <div>
                    <CryptoList />
                </div>
            </div>
        )
    }
}

export default CryptoPage;