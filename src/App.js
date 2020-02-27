import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import logo from './logo.svg';
import './App.css';

import MainPage from "./pages";
import UsersPage from "./pages/users/users.jsx";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
          }

          {
            user
              ?
              <Router>
              <Route exact path = '/'>
                <MainPage user = {this.props.user} signOut = {this.props.signOut}/>
              </Route>
              </Router>
              
              : <button onClick={signInWithGoogle}>Sign in with Google</button>
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