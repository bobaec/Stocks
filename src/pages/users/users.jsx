import React from "react";
import {
	Container,
	Image,
	Table,
	Row
} from 'react-bootstrap';
// import stock_img from '../img/image.png'

const axios = require('axios');

var allUsers;

// testing in localhost
axios.get('http://localhost:8001/user/all').then(function(response){
	allUsers = response.data
	for (let i = 0; i < allUsers.length; i++) {
		console.log(allUsers[i])
	}
})

function tableGenerate() {
	var htmlAdd = "";
	for (let i in allUsers) {
		htmlAdd += 
		"<Table responsive variant = 'dark' className = 'users_table'>" + 
			"<thead>" + 
				"<th>Name</th>" + 
				"<th>Email</th>" + 
				"<th>Stocks</th>" +
			"</thead>" + 
			"<tbody>" + 
			"<tr>" + 
				"<td>" + 
					allUsers[i].name + 
				"</td>"+
				"<td>"+ 
					allUsers[i].email + 
				"</td>"+
				"<td>" +
					"2" + 
				"</td>"+
			"</tr>" + 
			"</tbody>" + 
		"</Table>"
	}
	console.log("aa");
	document.getElementById("generate").innerHTML += (htmlAdd);
}

// use when deploying live
// async function getUser() {
// 	try {
// 		const response = await axios.get('/api/v1/user/all');
// 		console.log(response);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
// getUser();

class UsersPage extends React.Component {
	componentDidMount() {
		tableGenerate();
	}
	render() {
		return (
		    <div className = "mainContent">
				<div className = "wrapper">
					<center><h4>Users</h4></center>
					<Container className="users">
						<Row style={{marginTop: "10px"}} id = "generate">

							<Table responsive variant="dark" className="users_table">
							<thead>
								<th></th>
								<th>Name</th>
								<th>Email</th>
								<th>Stocks</th>
							</thead>
							<tbody>
								<tr>
								<td>
									<Image src={this.props.user.photoURL} roundedCircle width={50}/>
								</td>
								<td>
									{this.props.user.displayName}
								</td>
								<td>{this.props.user.email}</td>
								<td>2</td>
								</tr>
								<tr>
								<td>
									<Image src={this.props.user.photoURL} roundedCircle width={50}/>
								</td>
								<td>
									{this.props.user.displayName}
								</td>
								<td>{this.props.user.email}</td>
								<td>2</td>
								</tr>
								<tr>
								<td>
									<Image src={this.props.user.photoURL} roundedCircle width={50}/>
								</td>
								<td>
									{this.props.user.displayName}
								</td>
								<td>{this.props.user.email}</td>
								<td>2</td>
								</tr>
							</tbody>
							</Table>
						</Row>

					</Container>
				</div>
			</div>
		);
	}
}
  
export default UsersPage;