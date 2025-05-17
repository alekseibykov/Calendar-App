import React, { Component } from 'react';
import "firebase/database";
import "firebase/auth";
import { connect } from 'react-redux';

import LoginForm from './LoginForm.js';
import HomeContent from './HomeContent.js';

class HomeScreen extends Component {
  constructor(props) {
    super();
    this.state = { authUser: null };
  }

  renderMainScreen() {
    let {authUser} = this.props;
    if (authUser) {
      return (
        <HomeContent />
      );
    } else {
      return (
        <LoginForm  />
      );
    }
  }

  render() {
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
