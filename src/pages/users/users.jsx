import React from "react";
import {
	Container,
	Table,
	Row
} from 'react-bootstrap';
// import stock_img from '../img/image.png'

const axios = require('axios');

var allUsers;

axios.get('/user/all').then(function(response){
	allUsers = response.data
	console.log(allUsers[0].stocks.length);
	for (let i = 0; i < allUsers.length; i++) {
		console.log(allUsers[i])
	}
})

function tableGenerate() {
	var htmlAdd = "";
	for (let i in allUsers) {
		htmlAdd += 
			"<tr>" + 
				"<td>" + 
					allUsers[i].name + 
				"</td>"+
				"<td>"+ 
					allUsers[i].email + 
				"</td>"+
				"<td>" +
					allUsers[i].stocks.length + 
				"</td>"+
			"</tr>"
	}
	
	document.getElementById("generate").innerHTML += (htmlAdd);
}

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
						<Row style={{marginTop: "10px"}}>
							<Table responsive variant="dark" className="users_table" >
							<tbody>
							 	<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Stocks</th>
								</tr>
							</tbody>
							<tbody id = "generate">
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
