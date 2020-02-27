import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import './pages/css/App.css';

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
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (

      <div className="App">
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>
        <header className="App-header">
          {
            user ?

              // if user logged in, redirect to dashboard
              // everything in here must be wrapped in the div to avoid
              // adjacent jsx element errors
              <Router>
              <Route exact path = '/'>
                <MainPage user = {this.props.user} signOut = {this.props.signOut}/>
              </Route>
              </Router>
              : 
              // if user not logged in, ask to sign in.
              <div>
              <p>Please sign in.</p>
              <button onClick={signInWithGoogle}>Sign in with Google</button>
              </div>
          }
        </header>

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