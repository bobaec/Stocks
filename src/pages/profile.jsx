import React from "react";
import {
	Link
  } from "react-router-dom";

import {
	Table,
	Col,
	Container,
	Image
} from 'react-bootstrap';

class Profile extends React.Component {
	render() {
		return (
		    <div className = "mainContent">
				<div className = "wrapper">
					<center><h4>Your Profile</h4></center><br/>
					<Container id="profile_cont">
						<Col xs={12} md={12} className="profile">
							<Image src={this.props.user.photoURL} roundedCircle width={150}/><br/><br/>
							<br/>
							<div className="user_information">
								<Table  bordered variant="dark">
									<tbody>
									<tr>
										<td>Name</td>
										<td>{this.props.user.displayName}</td>
									</tr>
									<tr>
										<td>Email</td>
										<td>{this.props.user.email}</td>
									</tr>
									</tbody>
								</Table>
							</div>
						</Col>
					</Container>
				</div>
			</div>
		);
	}
}
  
export default Profile;