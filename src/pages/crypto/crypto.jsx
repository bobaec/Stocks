import React from 'react';
import { Line } from 'react-chartjs-2';
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
            <div>
                <input type="text" list="coinList" onChange={this.updateCoin} />
                <button type="button" id="refresh" onClick={this.sendCoin} > Get </button>
                <datalist id="coinList">
                    {
                        Object.keys(coinList).map(key => {
                            return <option key={key} value={coinList[key]} />
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
            <div>
                <center><h1>{header}</h1></center>
                <center><table id="coin" style={{border: "3px solid white", "border-collapse": "collapse"}}>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
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
                datasets: [{
                    label: this.props.coin + ' prices over last 24h',
                    borderColor: '#FFFFFF',
                    fill: false,
                    data: data,
                }],
                options: {
                    maintainAspectRatio: false
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
            coin: '',
            validMarketCap: true
        }
        this.updateCoin = this.updateCoin.bind(this);
        this.updateList = this.updateList.bind(this);
        this.getCoin = this.getCoin.bind(this);
        this.updateMarketCap = this.updateMarketCap.bind(this);
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
            
            <div className = "mainContent">
                <div className = "wrapper">
                    <CoinList updateCoin={this.updateCoin} updateList={this.updateList} />
                </div>
                <div>
                    <Coin coin={this.getCoin(this.state.coin)} updateMarketCap={this.updateMarketCap} />
                </div>
                <div style={{ position: "relative", margin: "auto", width: "60vw", height: '30vh' }}>
                    <PriceGraph coin={this.getCoin(this.state.coin)} days='1' validMarketCap={this.state.validMarketCap} />
                </div>
            </div>
        )
    }
}

export default CryptoPage;