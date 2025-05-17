import React, { Component } from 'react';
import { auth, database } from '../App';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link, Navigate  } from "react-router-dom";
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
      return <Navigate to='/' replace />
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
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.uid);
      return set(ref(database, 'users/' + user.uid), ({email: user.email, uid: user.uid, name: this.state.name }));
    })
    .then(() => {
      console.log("User created and data saved.");
    })
    .catch(function(error) {
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
          placeholder="Your name"
        />
        <input
          onChange={this.handleEmailChange.bind(this)}
          value={this.state.email}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
        <input
          onChange={this.handlePasswordChange.bind(this)}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
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
