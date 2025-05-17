import React, { Component } from 'react';
import { auth } from '../App.js';
import { signInWithEmailAndPassword } from "firebase/auth";
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
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      this.onLoginFail(error);
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

  onLoginFail(error) {
    let errorMessage = 'Authentication Failed';
    if (error && error.message) {
      errorMessage = error.message;
    }
    this.setState({ error: errorMessage, loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <div>Loading...</div>;
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
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
        <br/>
        <br/>
        <input
          onChange={this.handlePasswordChange.bind(this)}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
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
