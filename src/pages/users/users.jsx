import React from "react";

class UsersPage extends React.Component {
	render() {
		return (
		    <div className = "mainContent">
				<div className = "wrapper">
					<center><h1>Your Profile</h1></center>
					<h3>{this.props.user.displayName}</h3>
					<div className="profile">
						<img src={this.props.user.photoURL} class="profile_img"/><br/>
						<button className="general_button" >Edit</button>
					</div>
				</div>
			</div>
		);
	}
}
  
export default UsersPage;