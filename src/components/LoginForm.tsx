import React, { useState } from 'react';
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { Link } from "react-router-dom";

import { auth } from '../App';

const LoginForm = () => {
  const [email, setEmail] = useState('Email@gmail.com');
  const [password, setPassword] = useState('Password');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      onLoginFail(err as AuthError);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onLoginFail = (err: AuthError) => {
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
      <button onClick={() => void onPress()} type="button">
        Log In
      </button>
    );
  };

  return (
    <div className="login-form">
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
      {error && <div className="errorTextStyle">
        {error}
      </div>}

      {renderButton()}

      <Link to="/registration/">Registration </Link>
    </div>
  );
};

export default LoginForm;
