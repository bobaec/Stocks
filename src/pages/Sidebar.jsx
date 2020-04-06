import React, { Component } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'font-awesome/css/font-awesome.min.css';
import MainPage from "/";
import Browse from "./Browse.jsx";
import UsersPage from "./users/users.jsx";
import ProfilePage from "./profile.jsx";
import StocksPage from "./stock/stocks.jsx";
import CryptoPage from "./crypto/crypto.jsx";
import Trending from "./trending/trending.jsx";
import './css/App.css';


import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

class Sidebar extends Component {
	render() {
		return (
			<Router>
			    <Route render= {({ location, history }) => (
			        <React.Fragment>
			            <SideNav id = "mySidenav"
			                onSelect = {(selected) => {
			                    var to = '/' + selected;
			                    if (selected === undefined) {
			                    	to = '/';
			                    	selected = " ";
			                    }
								if (selected === " ") {
		                    		to = '/';
		                    	}
			                    if (location.pathname !== to) {
			                        history.push(to);
			                    }
			                }}>
			                <SideNav.Toggle onClick = {this.props.onChange}/>
			                <SideNav.Nav defaultSelected = " ">
			                    <NavItem eventKey = " ">
			                        <NavIcon>
			                            <i className = "fa fa-fw fa-home" style = {{ fontSize: '1.75em' }} />
			                        </NavIcon>
			                        <NavText>
			                            Home
			                        </NavText>
			                    </NavItem>
								<NavItem eventKey = "stocks">
					            	<NavIcon>
					                	<i className = "fa fa-fw fa-globe" style = {{ fontSize: '1.75em' }} />
					            	</NavIcon>
					            	<NavText>
					                	Stocks
					            	</NavText>
					        	</NavItem>
			                    <NavItem eventKey = "crypto">
					            	<NavIcon>
					                	<i className = "fa fa-fw fa-btc" style = {{ fontSize: '1.75em' }} />
					            	</NavIcon>
					            	<NavText>
					                	Crypto
					            	</NavText>
					        	</NavItem>
						        <NavItem eventKey = "trending">
						            <NavIcon>
						                <i className = "fa fa-fw fa-line-chart" style = {{ fontSize: '1.75em' }} />
						            </NavIcon>
						            <NavText>
						                Trending
						            </NavText>
						        </NavItem>
					        	<NavItem eventKey= "users">
			                        <NavIcon>
			                            <i className = "fa fa-fw fa-users" style = {{ fontSize: '1.75em' }} />
			                        </NavIcon>
			                        <NavText>
			                            Users
			                        </NavText>
			                    </NavItem>
								<NavItem eventKey= "profile">
			                        <NavIcon>
			                            <i className = "fa fa-fw fa-user" style = {{ fontSize: '1.75em' }} />
			                        </NavIcon>
			                        <NavText>
			                            Profile
			                        </NavText>
			                    </NavItem>
			                    <NavItem className = "logoutButton" onClick = {this.props.signOut}>
			                        <NavIcon>
			                            <i className = "fa fa-fw fa-sign-out" style = {{ fontSize: '1.75em' }} />
			                        </NavIcon>
			                        <NavText>
			                            Logout
			                        </NavText>
			                    </NavItem>
			                </SideNav.Nav>
			            </SideNav>
			            <main className = "mainContent" style = {{
							marginLeft: this.props.marginLeft,
							transition: this.props.transition
						}}>
			                <Route path= "/" exact component = {props => <MainPage user = {this.props.user}/>} />
							<Route path= "/stocks" component = {props => <StocksPage user = {this.props.user}/>} />
			                <Route path= "/crypto" component = {props => <CryptoPage user = {this.props.user}/>} />
			                <Route path= "/trending" component = {props => <Trending user = {this.props.user}/>} />
			                <Route path= "/users" component = {props => <UsersPage user = {this.props.user}/>} />
			                <Route path= "/profile" component = {props => <ProfilePage user = {this.props.user}/>} />

			                			            
			            </main>
			        </React.Fragment>
			    )}/>
			</Router>
		);
	}
}

export default Sidebar;