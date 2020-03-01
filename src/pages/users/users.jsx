import React from "react";

class UsersPage extends React.Component {
	render() {
		return (
		    <div className = "mainContent">
				<div className = "wrapper">
					<center><h1>Your Profile</h1></center>
					<h3>Hello, {this.props.user.displayName}</h3>
				</div>
			</div>
		);
	}
}
  
export default UsersPage;