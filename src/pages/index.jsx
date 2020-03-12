import React from "react";
import App from "../App";
import Dashboard  from '../components/Dashboard/index'

// sidebar imports
import '../pages/css/App.css';
// import stock_img from './img/image.png'

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

class MainPage extends React.Component {
	render() {
		return (			
			<div className = "mainContent">
			{
			this.props.user ? 
			// if logged in, show all content
			// all content should be inside this div
				<div className="main">
					<div className="wrapper">
						
						<Dashboard className="dashboard"/>
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
