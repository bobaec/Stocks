import React from "react";
import App from "../App";
import Dashboard  from '../components/Dashboard/index'
import '../pages/css/App.css';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import {
	Container,
	Image,
	Table,
	Row
} from 'react-bootstrap';

const axios = require('axios');

// var allUsers;
// var allEmails = [];
// var currentUserStocks = [];
// var currentUserCryptos = [];
// var numberOfStocks = 0;
// var numberOfCryptos = 0;

// var firstTimeVisit = true;

function generateStocksTable(user, numberOfStocks) {
	let stocksAdd = "";
	if (numberOfStocks > 0) {
		for (let i = 0; i < numberOfStocks; i++) {
			stocksAdd += 
			"<tr>" +
				`<td type='stock' name='${user[i].stock_name}' symbol='${user[i].stock_symbol}'` + "data-item=" + "'" + user[i]._id + "'" + ">" +
					user[i].stock_name +
				"</td>" +
				`<td type='stock' name='${user[i].stock_name}' symbol='${user[i].stock_symbol}'` + "data-item=" + "'" + user[i]._id + "'" + ">" +
					user[i].stock_symbol + 
				"</td>" + 
				`<td type='stock' name='${user[i].stock_name}' symbol='${user[i].stock_symbol}'` + "data-item=" + "'" + user[i]._id + "'" + ">$" + 
					user[i].latest_stock_price + 
				"</td>"+
			"</tr>"
		}
	}
	document.getElementById("generateStocks").innerHTML = (stocksAdd);
}

function generateCryptoTable(user, numberOfCryptos) {
	let cryptosAdd = "";
	if (numberOfCryptos > 0) {
		for (let i = 0; i < numberOfCryptos; i++) {
			cryptosAdd += 
			"<tr>" +
				`<td type='crypto' name='${user[i].crypto_name}' symbol='${user[i].crypto_symbol}'` + "data-item=" + "'" + user[i]._id + "'" + ">" +
					user[i].crypto_name +
				"</td>" +
				`<td type='crypto' name='${user[i].crypto_name}' symbol='${user[i].crypto_symbol}'` + "data-item=" + "'" + user[i]._id + "'" + ">" +
					user[i].crypto_symbol + 
				"</td>" + 
				`<td type='crypto' name='${user[i].crypto_name}' symbol='${user[i].crypto_symbol}'` + "data-item=" + "'" + user._id + "'" + ">$" + 
					user[i].latest_crypto_price + 
				"</td>"+
			"</tr>"
		}
	}
	document.getElementById("generateCryptos").innerHTML = (cryptosAdd);
}

class MainPage extends React.Component {
	constructor() {
        super();
        this.state = {
			selected_id: "none",
			date: '',
			allUsers: "",
			allEmails: [],
			currentUserStocks: [],
			numberOfStocks: 0,
			currentUserCryptos: [],
			numberOfCryptos: 0,
			type: "",
			name: "",
			symbol: "",
		}
	}

	componentDidMount(){
		var date = new Date().getDate();
		const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
		];
		var month = monthNames[new Date().getMonth()]
		var year = new Date().getFullYear();
		this.setState({
			date:
			' ' + month + ' ' + date + ', ' + year
		});

		axios.get('/user/all').then((response) =>{
			this.setState({
				allUsers: response.data,
				firstTimeVisit: true
			});
			for (let i = 0; i < this.state.allUsers.length; i++) {
				this.setState({
					allEmails: this.state.allEmails.concat([this.state.allUsers[i].email])
				})
			}

	        if (this.state.allEmails.includes(this.props.user.email) === false) {
				console.log(this.props.user.email + " is not in the db, adding now.");
				
				axios.post('/user/create', { 
					name: this.props.user.displayName.toString(),
					email: this.props.user.email.toString() 
				})	
				.then(res => {
				 	console.log(res.data);
				})
				.then(function (error) {
					console.log(error);
				})
			} else {
				console.log(this.props.user.email + " is already in the db");
			}			

			for (let i = 0; i < this.state.allUsers.length; i++) {
				if (this.state.allUsers[i].email === this.props.user.email) {
					for (let j = 0; j < this.state.allUsers[i].stocks.length; j++) {
						if (typeof this.state.allUsers[i].stocks[j] !== "undefined") {
							this.setState({
								currentUserStocks: this.state.currentUserStocks.concat([this.state.allUsers[i].stocks[j]]),
							})
							if (this.state.firstTimeVisit === true) {
								this.setState({
									numberOfStocks: this.state.numberOfStocks + 1
								})
							}
						} 
					}
					for (let j = 0; j < this.state.allUsers[i].cryptos.length; j++) {
						if (typeof this.state.allUsers[i].cryptos[j] !== "undefined") {
							this.setState({
								currentUserCryptos: this.state.currentUserCryptos.concat([this.state.allUsers[i].cryptos[j]]),
							})
							if (this.state.firstTimeVisit === true) {
								this.setState({
									numberOfCryptos: this.state.numberOfCryptos + 1
								})
							}
						} 
					}
				}
			}

		generateStocksTable(this.state.currentUserStocks, this.state.numberOfStocks);
		generateCryptoTable(this.state.currentUserCryptos, this.state.numberOfCryptos);

		this.setState({
				firstTimeVisit: false
			})
		});

		$("tbody").on("click", "tr", (function(e) {
			const id = e.target.getAttribute('data-item');
			const type = e.target.getAttribute('type');
			const name = e.target.getAttribute('name');
			const symbol = e.target.getAttribute('symbol');

			this.setState({
				selected_id: id,
				type: type,
				name: name,
				symbol: symbol
			});
			Dashboard.selected_id=this.state.selected_id;
			this.setState({
				showComponent: true
			});
		}.bind(this)));
	}

	render() {

		return (			
			<div className = "mainContent">
			{
			this.props.user ? 
			// if logged in, show all content
			// all content should be inside this div
				<div className="main">
					<center><p id="date"><Image src={this.props.user.photoURL} roundedCircle width={20}/>{this.state.date}</p></center>
					<div className="wrapper">
						<center><h4>Dashboard</h4></center>
						
					{/* <Dashboard className="dashboard"/> */}
					<Dashboard selected_id={this.state.selected_id} type={this.state.type} name={this.state.name} symbol={this.state.symbol}/>	
					<Container className="users">
							<Row style={{marginTop: "10px"}}>
							{/* Display favorite stocks */}
							<center><h4>Your Favorite Stocks</h4></center>
							<Table responsive variant="dark" className="dashboard_table">
								<thead>
									<tr>
										<th>Stock</th>
										<th>Symbol</th>
										<th>24h</th>
									</tr>
								</thead>
								<tbody id = "generateStocks">
								</tbody>
							</Table>

							{/* Display favorite cryptos */}
							<center><h4>Your Favorite Cryptos</h4></center>
							<Table responsive variant="dark" className="dashboard_table">
								<thead>
									<tr>
										<th>Crypto</th>
										<th>Symbol</th>
										<th>24h</th>
									</tr>
								</thead>
								<tbody id = "generateCryptos">
								</tbody>
							</Table>
							</Row>
						</Container>
					</div>
				</div>
				:
				// else, redirect back to login page
				<Router>
					<Route exact path = '/' component = {App}/>
				</Router>
			}
			</div>
		);
	}
} 

export default MainPage;
