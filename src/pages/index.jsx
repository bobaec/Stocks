import React, { Component } from "react";
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import App from "../App";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";


class MainPage extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const script = document.createElement("script");
		script.src = "/js/MainPage.js";
		script.async = true;
		script.innerHTML = "document.write('output written by document.write()!')";
		document.body.appendChild(script);
	}

	render() {
		return (
		<div>
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