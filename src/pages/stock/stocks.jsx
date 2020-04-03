import React from 'react';
import { Table } from 'react-bootstrap';
import '../css/App.css';

const axios = require('axios');

// https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20
class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            query: '',
            results: [],
            searchResults: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);

        this._isMounted = false;
    }
  
    async getInfo() {
        let res = await axios.get(`stock/name/${this.state.query}`);
        res = await res.data;
        console.log(res);
        if (this._isMounted) {
            this.setState({results: res});
        }
        this.updateResults();
    }
  
    handleInputChange() {
        this.setState({ query: this.search.value }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo();
                }
            } else if (!this.state.query) {
            }
        });
    }

    async updateResults() {
        const q = [];
        this.state.results.forEach(e => {
            q.push(e.id);
        });
        let s = await axios.get(`stock/search/${q}`);
        s = await s.data;

        if (this._isMounted) {
            this.setState({searchResults: s});
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }
  
    render() {
      return (
        <form>
            <input list='stockSearch' placeholder="Search for..." ref={input => this.search = input} onChange={this.handleInputChange} />
            <DisplayTable data={this.state.searchResults} />
        </form>
      )
    }
}

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

        if (this._isMounted) {
            this.setState({stockData: s});
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Search />
                    <br />
                </div>
                <div>
                    <center><h4>Popular Market Summaries</h4></center>
                    <DisplayTable data={this.state.stockData} />
                </div>
            </div>
        )
    }
}

export default StocksPage;
