import React from "react";
import App from "../App";
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
		<div className = "main">
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
		);
	}
} 

export default MainPage;