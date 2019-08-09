import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import LoginForm from './LoginForm';
import ContentScreen from './ContentScreen';
import MainScreen from './mainScreen';

class HomeScreen extends Component {
  constructor(props) {
    super();
    this.state = { loggedIn: null };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderMainScreen() {
    let self = this;
    if (this.state.loggedIn) {
      return (
        <MainScreen />
      );
    } else if (this.state.loggedIn === false) {
      return (
        <LoginForm  />
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Authentication</h1>
        { this.renderMainScreen() }
      </div>
    );
  }
}

export default HomeScreen;
