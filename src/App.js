import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import './pages/css/App.css';
import Sidebar from './pages/Sidebar.jsx';
import MainPage from "./pages";
import UsersPage from "./pages/users/users.jsx";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import { Helmet } from 'react-helmet';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const TITLE = "STONKS";

class App extends Component {
	// sidebar state - whether it is toggled or not.
	state = {
		marginLeft:'0px',
		transition: '0.2s',
		toggled: false
	}
	navbarState = {
		marginLeft:'0px'
	}

	staticNavbar = () => {
		this.setState({
			marginLeft:'0px'
		});
	}

	// if you click the sidebar button to open, it becomes responsive
	// if open, main content moves to right and vice versa
	onChange = () => {
		this.setState({
			marginLeft:'240px',
			toggled:true,
			navbar:false
		});

		if (this.state.toggled == true) {
			this.setState({
				marginLeft: '0px',
				toggled: false
			});
		}
		if (this.state.toggled == false) {
			this.setState({
				marginLeft:'240px',
				toggled: true
			});
		}
	}
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
      {user && <Sidebar onChange = {this.onChange} staticNavbar = {this.staticNavbar}/>}
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>
        <header className="App-header"></header>
          {
            user ?
              // if user logged in, redirect to dashboard
              // everything in here must be wrapped in the div to avoid
              // adjacent jsx element errors
              <Router>
              <Route exact path = '/'>
                <MainPage 
                user = {this.props.user} 
                signOut = {this.props.signOut} 
                marginLeft = {this.state.marginLeft} 
                transition = {this.state.transition}/>
              </Route>
              </Router>
              : 
              // if user not logged in, ask to sign in.
              <div class="sign_in">
                <p>STONKS</p>
                <button class="login_button" onClick={signInWithGoogle}>Sign in with Google</button>

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
