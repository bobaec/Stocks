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
	console.log(allUsers[0].stocks.length);
	for (let i = 0; i < allUsers.length; i++) {
		console.log(allUsers[i])
	}
})

// use when deploying live
// async function getUser() {
// 	try {
// 		const allUsers = await axios.get('/api/v1/user/all');
// 		console.log(allUsers);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
// getUser();

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
	console.log("aa");
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
							<thead>
								<th>Name</th>
								<th>Email</th>
								<th>Stocks</th>
							</thead>
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