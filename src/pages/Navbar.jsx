import React, { Component } from 'react';
import App from "../App";
import 'font-awesome/css/font-awesome.min.css';
import '../pages/css/App.css';

class Navbar extends Component {
	render() {
		return ( 
			<div className="navbar">
				<div className="dropdown">
					<button className="dropbtn">Welcome, {this.props.user.displayName}  
					<i className="fa fa-caret-down"></i>
					</button>
					<div className="dropdown-content">
						<a onClick={this.props.signOut}>Sign Out</a>
					</div>
				</div> 
			</div>
		)
	}
}

export default Navbar;