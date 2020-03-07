import React from "react";
import {
	BrowserRouter as Router,
	Link,
  } from "react-router-dom";

import {
	Table,
	Col,
	Row,
	Container,
	Image
} from 'react-bootstrap';

class Profile extends React.Component {
	render() {
		return (
		    <div className = "mainContent">
				<div className = "wrapper">
					<center><h2>Your Profile</h2></center>
					<h5>{this.props.user.displayName}</h5><br/>
					<Container>
						<Col xs={12} md={12} className="profile">
							<Image src={this.props.user.photoURL} roundedCircle width={150}/>
							<div>
								<button class="general_button">Edit</button>
							</div>
							<br/>
							<h5>Information</h5>
							<div className="user_information">
								<Table  bordered variant="dark">
									<tr>
										<td>Name</td>
										<td>{this.props.user.displayName}</td>
									</tr>
									<tr>
										<td>Email</td>
										<td>{this.props.user.email}</td>
									</tr>
								</Table>
							</div>
							<br/>
							<div className="fav_stock_summary">
								<h5>Favourite Stocks</h5>
								<Col xs={12} md={12}>
									<Table bordered variant="dark" id="stock_table">
										<thead>
											<th>Stock</th>
											<th>Last Price</th>
											<th>Change</th>
										</thead>
										<tr>
											<td>Alphabet Inc Class A</td>
											<td>1,295.74 USD</td>
											<td style={{
												color: -1 < 0 ? "red" : "green"
												}}>
												−19.02%
												<i className = "fa fa-angle-up"/>
											</td>
										</tr>
										<tr>
											<td>Microsoft Corporation</td>
											<td>161.57 USD</td>
											<td style={{
												color: -1 < 0 ? "red" : "green"
												}}>
												−4.7%
												<i className = "fa fa-angle-up"/>
											</td>
										</tr>
										<tr>
											<td>Intel Corporation</td>
											<td>55.77 USD</td>
											<td style={{
												color: -1 < 0 ? "red" : "green"
												}}>
												−999.02%
												<i className = "fa fa-angle-up"/>
											</td>
										</tr>
										<tr>
											<td colSpan="4"><Link to="/browse" style={{color:"inherit"}}>+ Add New</Link></td>
										</tr>
									</Table>
								</Col>
							</div>
						</Col>
					</Container>
				</div>
			</div>
		);
	}
}
  
export default Profile;