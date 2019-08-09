import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import HomeContent from './HomeContent';

class HomeScreen extends Component {
  constructor(props) {
    super();
    this.state = { authUser: null };
  }

  componentWillMount() {
    this.listener = firebase.auth().onAuthStateChanged ((authUser) => {
      if (authUser) {
        this.setState({ authUser });
      } else {
        this.setState({ authUser: false });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  renderMainScreen() {
    if (this.state.authUser) {
      return (
        <HomeContent />
      );
    } else if (this.state.authUser === false) {
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
    console.log(this.props);
    return (
      <div>
        { this.renderMainScreen() }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(HomeScreen);
