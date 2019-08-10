import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Link, Redirect  } from "react-router-dom";
import { connect } from 'react-redux';

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
      name: 'Your name',
    };
  }

  renderRedirect() {
    if (this.props.authUser) {
      return <Redirect to='/' />
    }
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  onPress() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((snap) => {
      console.log(snap.user.uid);
      firebase.database().ref().child('users/' + snap.user.uid).set(({email: snap.user.email, uid: snap.user.uid }))
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <input
          onChange={this.handleNameChange.bind(this)}
          value={this.state.name}
          type="text"
          id="name"
          name="name"
        />
        <input
          onChange={this.handleEmailChange.bind(this)}
          value={this.state.email}
          type="text"
          id="email"
          name="email"
        />
        <input
          onChange={this.handlePasswordChange.bind(this)}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
        <button onClick={this.onPress.bind(this)}>
          Create account
        </button>
        <Link to="/">Back </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(RegistrationScreen);
