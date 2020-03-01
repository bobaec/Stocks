import React from "react";
import Navbar from '../Navbar.jsx';

class UsersPage extends React.Component {
	render() {
		return (
		    <div class = "mainContent" 
					style = {{
						marginLeft: this.props.marginLeft,
						transition: this.props.transition
					}}>
					<Navbar user = {this.props.user} signOut = {this.props.signOut}/>
					<div class="wrapper">
						<center><h1>STONKS</h1></center>
						<h3>Profile</h3>
					</div>
			</div>

  			);}
	}
  
export default UsersPage;