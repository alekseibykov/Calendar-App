import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Link } from "react-router-dom";

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email',
      password: 'Password',
      name: 'Your name'
    };
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
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorMessage);
    });

    console.log(this.state.email);
  }

  render() {
    return (
      <div>
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

export default RegistrationScreen;
