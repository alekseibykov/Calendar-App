import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Email@gmail.com',
      password: 'Password',
      error: '',
      loading: false
    };
  }

  async onPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });
    await firebase.auth().signInWithEmailAndPassword(email, password);
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

  // onLoginSuccess() {
  //   this.setState({
  //     email: '',
  //     password: '',
  //     loading: false,
  //     error: ''
  //   });
  // }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <div>Loading</div>;
    }

    return (
      <button onClick={this.onPress.bind(this)} >
        Log In
      </button>
    );
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleEmailChange.bind(this)}
          value={this.state.email}
          type="text"
          id="name"
          name="name"
        />
        <br/>
        <br/>
        <input
          onChange={this.handlePasswordChange.bind(this)}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />
        <br/>
        <br/>
        <div style={styles.errorTextStyle}>
          {this.state.error}
        </div>

        { this.renderButton() }

        <Link to="/registration/">Registration </Link>
      </div>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
