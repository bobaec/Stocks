import React, { Component } from "react";
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
import { Link } from "react-router-dom";


class MainPage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		<div>
	      <h3>Welcome to STONKS</h3>
	      <p>Hello, {this.props.user.displayName}</p>
	      {
	      this.props.user ? 
	      <button onClick={this.props.signOut}>Sign out</button> :
	      <button onClick={this.props.signInWithGoogle}>Sign in with Google</button>
	      }

	      <br/><Link to="/users">test</Link>
	    </div>
		);
	}
}



export default MainPage;