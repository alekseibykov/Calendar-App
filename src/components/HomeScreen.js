import React from 'react';
import "firebase/database";
import "firebase/auth";
import { useSelector } from 'react-redux';

import LoginForm from './LoginForm.js';
import HomeContent from './HomeContent.js';

const HomeScreen = () => {
  const authUser = useSelector(state => state.sessionState.authUser);

  return (
    <div>
      {authUser ? <HomeContent /> : <LoginForm />}
    </div>
  );
};

export default HomeScreen;
