import React from 'react';
import "firebase/database";
import "firebase/auth";
import { useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import HomeContent from './HomeContent';

// Define RootState, should match your store's state structure
interface AuthUser {
  uid: string;
  // include other properties of authUser if accessed, e.g., email, displayName
}

interface SessionState {
  authUser: AuthUser | null;
  // other session properties
}

interface RootState {
  sessionState: SessionState; // Or SessionState | null if sessionState itself can be null
  // other top-level state slices like 'data', 'dates' if accessed
}

const HomeScreen = () => {
  // Typed the state in useSelector
  const authUser = useSelector((state: RootState) => state.sessionState.authUser);

  return (
    <div>
      {authUser ? <HomeContent /> : <LoginForm />}
    </div>
  );
};

export default HomeScreen;
