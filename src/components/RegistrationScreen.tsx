import React, { useState, useEffect } from 'react';
import { auth, database } from '../App';
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from '../index';

function RegistrationScreen() {
  const [email, setEmail] = useState('Email');
  const [password, setPassword] = useState('Password');
  const [name, setName] = useState('Your name');
  const authUser = useSelector((state: RootState) => state.sessionState.authUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/', { replace: true });
    }
  }, [authUser, navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onPress = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        return set(ref(database, 'users/' + user.uid), ({ email: user.email, uid: user.uid, name: name }));
      })
      .then(() => {
        console.log("User created and data saved.");
      })
      .catch((error: AuthError) => {
        const errorMessage = error.message;
        console.error("Registration Error:", errorMessage);
      });
  };

  return (
    <div>
      <input
        onChange={handleNameChange}
        value={name}
        type="text"
        id="name"
        name="name"
        placeholder="Your name"
      />
      <input
        onChange={handleEmailChange}
        value={email}
        type="email"
        id="email"
        name="email"
        placeholder="Email"
      />
      <input
        onChange={handlePasswordChange}
        value={password}
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
      <button onClick={onPress} type="button">
        Create account
      </button>
      <Link to="/">Back </Link>
    </div>
  );
}

export default RegistrationScreen;
