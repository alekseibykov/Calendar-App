import React, { useState } from 'react';
import { auth } from '../App.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState('Email@gmail.com');
  const [password, setPassword] = useState('Password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      onLoginFail(err);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLoginFail = (err) => {
    let errorMessage = 'Authentication Failed';
    if (err && err.message) {
      errorMessage = err.message;
    }
    setError(errorMessage);
    setLoading(false);
  };

  const renderButton = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <button onClick={onPress} >
        Log In
      </button>
    );
  };

  return (
    <div>
      <input
        onChange={handleEmailChange}
        value={email}
        type="email"
        id="email"
        name="email"
        placeholder="Email"
      />
      <br/>
      <br/>
      <input
        onChange={handlePasswordChange}
        value={password}
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
      <br/>
      <br/>
      <div style={styles.errorTextStyle}>
        {error}
      </div>

      {renderButton()}

      <Link to="/registration/">Registration </Link>
    </div>
  );
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
