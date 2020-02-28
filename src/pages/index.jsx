import React from "react";
import App from "../App";
// sidebar imports
import '../pages/css/App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

class MainPage extends React.Component {
	render() {
		return (
			<div class = "mainContent" 
			style = {{
				marginLeft: this.props.marginLeft,
				transition: this.props.transition
			}}>		
			{
			this.props.user ? 
			// if logged in, show all content
			// all content should be inside this div
				<div class="main">
					{/* <div className = "sidebar">
					</div> */}
					<div class="navbar">
						<div class="dropdown">
							<button class="dropbtn">Welcome, {this.props.user.displayName}  
							<i class="fa fa-caret-down"></i>
							</button>
							<div class="dropdown-content">
								<a onClick={this.props.signOut}>Sign Out</a>
							</div>
						</div> 
					</div>
					<div class="wrapper">
						<center><h1>STONKS</h1></center>
						<h3>Contents</h3>
						<Link to="/users">test</Link>
					</div>
				</div>
			:
				// else, redirect back to login page
				<Router>
					<Route exact path = '/' component = {App}/>
				</Router>
			}
			</div>
		);
	}

} 

export default MainPage;
