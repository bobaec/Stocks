import React from "react";
import App from "../App";
// sidebar imports
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../pages/css/App.css';
 
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

class MainPage extends React.Component {

	// sidebar state - whether it is toggled or not.
	state = {
		marginLeft:'100px',
		toggled: false
	}

	// if you click the sidebar button to open, it becomes responsive
	// if open, main content moves to right and vice versa
	onChange = () => {
		this.setState({
			marginLeft:'275px',
			toggled:true
		});

		if (this.state.toggled == true) {
			this.setState({
				marginLeft: '100px',
				toggled: false
			});
		}
		if (this.state.toggled == false) {
			this.setState({
			marginLeft:'275px',
			toggled: true
			});
		}
	}

	render() {
		return (
		<div className = "main">
		<SideNav id = "mySidenav" 
			onClick = {this.onChange}
		    onSelect={this.onChange, (selected) => {
		        // Add your code here
			    }}>
		    <SideNav.Toggle />
		    <SideNav.Nav defaultSelected="home">
		        <NavItem eventKey="home">
		            <NavIcon>
		                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
		            </NavIcon>
		            <NavText>
		                Home
		            </NavText>
		        </NavItem>
		        <NavItem eventKey="charts">
		            <NavIcon>
		                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
		            </NavIcon>
		            <NavText>
		                Charts
		            </NavText>
		            <NavItem eventKey="charts/linechart">
		                <NavText>
		                    Line Chart
		                </NavText>
		            </NavItem>
		            <NavItem eventKey="charts/barchart">
		                <NavText>
		                    Bar Chart
		                </NavText>
		            </NavItem>
		        </NavItem>
			    </SideNav.Nav>
			</SideNav>
			<div id = "mainContent" style = {{marginLeft: this.state.marginLeft}}>
	      {
	      	
	      this.props.user ?

  		  // if logged in, show all content
  		  // all content should be inside this div
  		  <div>

  		  <p>Hello, {this.props.user.displayName}</p>
	      <h3>Welcome to STONKS</h3>
	      <button onClick={this.props.signOut}>Sign out</button>
	      </div>

	      :
	      // else, redirect back to login page
	      <Router>
              <Route exact path = '/' component = {App}/>
          </Router>
	      }

	      <br/><Link to="/users">test</Link>
	    </div>
	    </div>
		);
	}

} 

export default MainPage;