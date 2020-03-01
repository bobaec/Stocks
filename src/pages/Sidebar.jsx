import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'font-awesome/css/font-awesome.min.css';
import MainPage from "/";
import UsersPage from "./users/users.jsx";
import App from "../App";
import Browse from "./Browse.jsx";
import Trending from "./Trending.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

class Sidebar extends Component {
	render() {
		return (
			<Router>
			    <Route render={({ location, history }) => (
			        <React.Fragment>
			            <SideNav id = "mySidenav"
			                onSelect={(selected) => {
			                    const to = '/' + selected;
			                    if (location.pathname !== to) {
			                        history.push(to);
			                    }
			                }}>
			                <SideNav.Toggle onClick = {this.props.onChange}/>
			                <SideNav.Nav defaultSelected="home">
			                    <NavItem eventKey="">
			                        <NavIcon>
			                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
			                        </NavIcon>
			                        <NavText>
			                            Home
			                        </NavText>
			                    </NavItem>
			                    <NavItem eventKey="browse">
					            <NavIcon>
					                <i className="fa fa-fw fa-search" style={{ fontSize: '1.75em' }} />
					            </NavIcon>
					            <NavText>
					                Browse
					            </NavText>
					        </NavItem>
					        <NavItem eventKey="trending">
					            <NavIcon>
					                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
					            </NavIcon>
					            <NavText>
					                Trending
					            </NavText>
					        </NavItem>
					        <NavItem eventKey="users">
			                        <NavIcon>
			                            <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
			                        </NavIcon>
			                        <NavText>
			                            Profile
			                        </NavText>
			                    </NavItem>
			                </SideNav.Nav>
			            </SideNav>
			            <main className = "mainContent" style = {{
							marginLeft: this.props.marginLeft,
							transition: this.props.transition
							}}>
			                <Route path="/" exact component={props => <MainPage user = {this.props.user}/>} />
			                <Route path="/browse" component={props => <Browse user = {this.props.user}/>} />
			                <Route path="/trending" component={props => <Trending user = {this.props.user}/>} />
			                <Route path="/users" component={props => <UsersPage user = {this.props.user}/>} />
			            </main>
			        </React.Fragment>
			    )}
			    />
			</Router>
		);
	}
}

export default Sidebar;