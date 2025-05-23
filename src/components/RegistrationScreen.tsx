import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { auth, database } from '../App';
import type { RootState } from '../index';

function RegistrationScreen() {
  const [email, setEmail] = useState('Email');
  const [password, setPassword] = useState('Password');
  const [name, setName] = useState('Your name');
  const authUser = useSelector((state: RootState) => state.sessionState.authUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      void navigate('/', { replace: true });
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

  const onPress = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid);
      await set(ref(database, 'users/' + user.uid), ({ email: user.email, uid: user.uid, name: name }));
      console.log("User created and data saved.");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error("Registration Error:", errorMessage);
    }
  };

  return (
    <div className="registration-form">
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
      <button onClick={() => void onPress()} type="button">
        Create account
      </button>
      <Link to="/">Back </Link>
    </div>
  );
}

export default RegistrationScreen;
