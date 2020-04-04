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

var allUsers;
var allEmails = [];
var currentUser;
var numberOfCryptos = 0;

axios.get('/user/all').then(function(response){
	allUsers = response.data
	for (let i = 0; i < allUsers.length; i++) {
		allEmails.push(allUsers[i].email);
	}
});

function generateCryptoTable(user, numberOfCryptos) {
	var htmlAdd = "";
	if (numberOfCryptos > 0) {
		for (let i = 0; i < numberOfCryptos; i++) {
			htmlAdd += 
			"<tr>" +
				"<td data-item=" + "'" + user.crypto_symbol + "'" + ">" +
					user.crypto_name +
				"</td>" +
				"<td data-item=" + "'" + user.crypto_symbol + "'" + ">" +
					user.crypto_symbol + 
				"</td>" + 
				"<td data-item=" + "'" + user.crypto_symbol + "'" + ">$" + 
					user.latest_crypto_price + 
				"</td>"+
			"</tr>"
		}
	} 
	document.getElementById("generate").innerHTML += (htmlAdd);
}

class MainPage extends React.Component {
	constructor() {
        super();
        this.state = {
			selected_id: "none",
			date: ''
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

		generateCryptoTable(currentUser, numberOfCryptos);

		$("tbody").on("click", "tr", (function(e) {
			const id = e.target.getAttribute('data-item');
			this.setState({selected_id: id});
			Dashboard.selected_id=this.state.selected_id;
			this.setState({
				showComponent: true
			});
		}.bind(this)));
	}

	render() {
	    
        if (allEmails.includes(this.props.user.email) === false) {
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
		
		for (var i = 0; i < allUsers.length; i++) {
			for (var j = 0; j < allUsers[i].cryptos.length; j++) {
				if (allUsers[i].email === this.props.user.email) {
					if (typeof allUsers[i].cryptos[j] !== "undefined") {
						currentUser = allUsers[i].cryptos[0];
						numberOfCryptos++;
					} 
				}
			}
			
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
						<Container className="users">
						<Row style={{marginTop: "10px"}}>
						{/* Display favorite stocks */}


						{/* Display favorite cryptos */}
						<center><h4>Your Favorite Cryptos</h4></center>
						<Table responsive variant="dark" className="dashboard_table">
							<thead>
								<th>Crypto</th>
								<th>Symbol</th>
								<th>24h</th>
							</thead>
							<tbody id = "generate">
							</tbody>
						</Table>
						</Row>
					</Container>
					{/* <Dashboard className="dashboard"/> */}
					<Dashboard selected_id={this.state.selected_id}/>	
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
