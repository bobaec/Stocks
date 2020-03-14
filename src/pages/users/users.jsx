import React from "react";
import {
	Container,
	Image,
	Table,
	Row
} from 'react-bootstrap';
// import stock_img from '../img/image.png'

class UsersPage extends React.Component {
	render() {
		return (
		    <div className = "mainContent">
				<div className = "wrapper">
					<center><h4>Users</h4></center>
					<Container className="users">
						<Row style={{marginTop: "10px"}}>
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