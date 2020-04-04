import React from "react";
import App from "../App";
import Dashboard  from '../components/Dashboard/index'
import '../pages/css/App.css';
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

axios.get('/user/all').then(function(response){
	allUsers = response.data
	for (let i = 0; i < allUsers.length; i++) {
		allEmails.push(allUsers[i].email);
	}
})

class MainPage extends React.Component {
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

		return (			
			<div className = "mainContent">
			{
			this.props.user ? 
			// if logged in, show all content
			// all content should be inside this div
				<div className="main">
					<div className="wrapper">
						<center><h4>Dashboard</h4></center>
						<Dashboard className="dashboard"/>

						<Container className="users">
						<Row style={{marginTop: "10px"}}>
							<Table responsive variant="dark" className="dashboard_table">
							<thead>
								<th>Coin</th>
								<th>Price</th>
								<th>24h</th>
								<th>7d</th>
								<th>Last 7 Days</th>
							</thead>
							<tbody>
								<tr>
									<td>
										<Image src="https://assets.coingecko.com/coins/images/1/thumb_2x/bitcoin.png?1547033579" roundedCircle width={25}  style={{marginRight:'5px'}}/>
										BTC
									</td>
									<td>$4,673.84</td>
									<td>-39.6%</td>
									<td>-41.3%</td>
									<td>
										<Image src="https://www.coingecko.com/coins/1/sparkline" roundedCircle width={90}/>
									</td>
								</tr>
								<tr>
									<td>
										<Image src="https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png?1547034048" roundedCircle width={25}  style={{marginRight:'5px'}}/>
										ETH
									</td>
									<td>$4,673.84</td>
									<td>-39.6%</td>
									<td>-41.3%</td>
									<td>
										<Image src="https://www.coingecko.com/coins/325/sparkline" roundedCircle width={90}/>
									</td>
								</tr>
								<tr>
									<td>
										<Image src="https://assets.coingecko.com/coins/images/1094/thumb_2x/tron-logo.png?1547035066" roundedCircle width={25}  style={{marginRight:'5px'}}/>
										TRX
									</td>
									<td>$4,673.84</td>
									<td>-39.6%</td>
									<td>-41.3%</td>
									<td>
										<Image src="https://www.coingecko.com/coins/8418/sparkline" roundedCircle width={90}/>
									</td>
								</tr>
								
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
