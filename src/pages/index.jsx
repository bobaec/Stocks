import React from "react";
import App from "../App";
// sidebar imports
import '../pages/css/App.css';
import stock_img from './img/image.png'
import Navbar from '../pages/Navbar.jsx';
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
			<div className = "mainContent" 
			style = {{
				marginLeft: this.props.marginLeft,
				transition: this.props.transition
			}}>
			{
			this.props.user ? 
			// if logged in, show all content
			// all content should be inside this div
				<div className="main">
					<Navbar user = {this.props.user} signOut = {this.props.signOut}/>
					<div className="wrapper">
						<center><h1>STONKS</h1></center>
						<h3>Contents</h3>
						<img src={stock_img} alt="Logo" />
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
