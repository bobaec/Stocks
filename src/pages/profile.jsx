import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	Redirect
  } from "react-router-dom";
class Profile extends React.Component {
	render() {
		return (
		    <div className = "mainContent">
				<div className = "wrapper">
					<center><h1>Your Profile</h1></center>
					<h3>{this.props.user.displayName}</h3>
					<div className="profile">
						<img src={this.props.user.photoURL} class="profile_img"/>
						<div>
							<button class="general_button">Edit</button>
						</div>
						<br/>
						<h4>Information</h4>
						<div className="user_information">
							<table>
								<tr>
									<td>Name</td>
									<td>{this.props.user.displayName}</td>
								</tr>
								<tr>
									<td>Email</td>
									<td>{this.props.user.email}</td>
								</tr>
							</table>
						</div>
						<br/>
						<div className="fav_stock_summary">
							<h4>Favourite Stocks</h4>
							<table id="stock_table">
								<thead>
									<th>Stock</th>
									<th>Last Price</th>
									<th>Change</th>
									<th>% Change</th>
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
									<td id="stock_table">1.45%</td>
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
									<td>2.83%</td>
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
									<td>69.6%</td>
								</tr>
								<tr>
									<td><Link to="/browse" style={{color:"inherit"}}>+ Add New</Link></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
			
		);
	}
}
  
export default Profile;