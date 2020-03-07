import React from "react";
import { Table } from "react-bootstrap";

class UsersPage extends React.Component {
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
						<h4>Information</h4>
							<div className="user_information">
								<table class="usr_table" id="user_table">
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
					</div>
				</div>
			</div>
		);
	}
}
  
export default UsersPage;