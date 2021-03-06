import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import './pages/css/App.css';
import Sidebar from './pages/Sidebar.jsx';
import { Helmet } from 'react-helmet';

import {
    BrowserRouter as Router,
} from "react-router-dom";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const TITLE = "STONKS";

class App extends Component {
	// sidebar state - whether it is toggled or not.
	state = {
		marginLeft:'0px',
		transition: '0.2s',
		toggled: false,
	}

	// if you click the sidebar button to open, it becomes responsive
	// if open, main content moves to right and vice versa
	onChange = () => {

		if (this.state.toggled === true) {
			this.setState({
				marginLeft: '0px',
				toggled: false
			});
		}
		else if (this.state.toggled === false) {
			this.setState({
				marginLeft:'1%',
				toggled: true,
			});
		}
	}

  	render() {
    	const {
      		user,
      		// signOut,
      		signInWithGoogle,
			} = this.props;

	    return (
	      	<div className="App">
	      		{user && <Sidebar 
	      			user = {this.props.user}
			      	onChange = {this.onChange} 
			      	marginLeft = {this.state.marginLeft} 
	                transition = {this.state.transition}
	                signOut = {this.props.signOut}
	      		   />
	      		}
	      
		    <Helmet>
		        <title>{ TITLE }</title>
		    </Helmet>

	        <header className="App-header"></header>
	            {
            	    user ?
	              	// if user logged in, redirect to dashboard
	              	// everything in here must be wrapped in the div to avoid
	              	// adjacent jsx element error
	              	<Router>
	              	</Router>
              		: 
	              	// if user not logged in, ask to sign in.
	              	<div className="sign_in">
	                	<p>STONKS</p>
	                	<button className="login_button" onClick={signInWithGoogle}>Sign in with Google</button>
	              	</div>
	          	}
	      	</div>
    	);
  	}
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
