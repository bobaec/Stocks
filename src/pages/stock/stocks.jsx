import React from 'react';
import { Table, InputGroup, FormControl } from 'react-bootstrap';
import '../css/App.css';
import News from '../../components/News/index';

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
            <InputGroup className="browse_input_stock">
                <FormControl type='text' list='stockSearch' placeholder="Search for..." ref={input => this.search = input} onChange={this.handleInputChange} />
            </InputGroup>
            <DisplayTable user={this.props.user} favs={this.props.favs} updateFavs={this.props.updateFavs} data={this.state.searchResults} search={true}/>
        </form>
      )
    }
}


class DisplayTable extends React.Component {

    addFav(e, n, s, p) {
        e.preventDefault();
        let favs = this.props.favs;
        favs.push({stock_symbol: s.toUpperCase()});
        this.props.updateFavs(favs);
        
        axios.post(`/user/stock/add/${this.props.user}`, {
            stock_name: n,
            stock_symbol: s,
            latest_stock_price: p
        });
    }

    removeFav(e, c) {
        e.preventDefault()
        let favs = this.props.favs;
        const toRemoveIndex = favs.findIndex(fav => fav.stock_symbol === c.toUpperCase());
        const toRemove = favs[toRemoveIndex];
        favs.splice(toRemoveIndex, 1);
        this.props.updateFavs(favs);

        axios.post(`/user/stock/remove/${this.props.user}/${toRemove._id}`);
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
        const s = this.props.search;
        const styleGreen = {color: '#A5D6A7'};

        if (Object.keys(d).length > 0) {
            return Object.keys(d).map(t => {
                let fav;
                if (s) {
                    let favs = this.props.favs;
                    fav = false;
                    if (Object.keys(favs).length > 0) {
                        favs.forEach(e => {
                            if (Object.values(e).includes(d[t].symbol.toUpperCase())) {
                                fav = true;
                            }
                        });
                    }
                }
                return (
                        <tr key={d[t].symbol}>
                        {s 
                            ? [ fav
                                ? <td id="fav" onClick={(e) => this.removeFav(e, d[t].symbol)}><i id="favStar" className="fa fa-star" /></td>
                                : <td id="fav" onClick={(e) => this.addFav(e, d[t].name, d[t].symbol, d[t].price)}><i id="favStar" className="fa fa-star-o" /></td>
                                ]
                            : null
                        }
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

     renderTableFooter() {
        const d = this.props.data;
        if (Object.keys(d).length > 0) {
            const len = Object.keys(d[0]).length;
            const id = d[0].symbol;
            return (
                <tr>
                    <td colspan={len+1}>
                        <center><News stock={id} index={5}/></center>
                    </td>
                </tr>
            )
        }
     }

     render() {
         const s = this.props.search;
         return (
            <Table id="stock_table" responsive variant="dark">
                <thead>
                    <tr>
                    { s &&
                        <th></th>
                    }
                        {this.renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableBody()}
                </tbody>
                {
                    s &&
                    <tfoot>
                        {this.renderTableFooter()}
                    </tfoot>
                }
            </Table>
         )
     }
}

class StocksPage extends React.Component {

    constructor() {
        super();
        this.state = {
            stockData: {},
            user: '',
            favs: []
        }

        this.updateFavs = this.updateFavs.bind(this);
        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;
        let s = await axios.get('/stock/markets');
        s = await s.data;
        let d = await fetch(`/user/email/${this.props.user.email}`);
        d = await d.json();
        
        if (this._isMounted) {
            this.setState({stockData: s, user: d[0]._id, favs: d[0].stocks});
        }
    }

    updateFavs(f) {
        this.setState({ favs: f });
    }

    render() {
        const user = this.state.user
        return (
            <div className = "mainContent">
                <div className= "wrapper">
                    <center><h4>Browse Stock</h4></center>

                    <Search user={user} favs={this.state.favs} updateFavs={this.updateFavs} />
                    <br/>
                <div>
                    <center><h4>Popular Market Summaries</h4></center>
                    <DisplayTable data={this.state.stockData} search={false} />
                </div>
            </div>
            </div>

        )
    }
}

export default StocksPage;
