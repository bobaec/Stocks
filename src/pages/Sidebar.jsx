import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'font-awesome/css/font-awesome.min.css';

class Sidebar extends Component {
	render() {
		return (
			<div>
			<SideNav id = "mySidenav" 
		    onSelect={(selected) => { }}>
		    <SideNav.Toggle onClick = {this.props.onChange}/>
		    <SideNav.Nav defaultSelected="home">
		        <NavItem eventKey="home">
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
		        <NavItem eventKey="charts" style = {{color:'black'}}>
		            <NavIcon>
		                <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
		            </NavIcon>
		            <NavText>
		                Profile
		            </NavText>
		            <NavItem eventKey="charts/linechart">
		                <NavText>
		                    Example 1 
		                </NavText>
		            </NavItem>
		            <NavItem eventKey="charts/barchart">
		                <NavText>
		                    Example 2
		                </NavText>
		            </NavItem>
		        </NavItem>
			    </SideNav.Nav>
			    
			</SideNav>
			</div>
		);
	}
}

export default Sidebar;