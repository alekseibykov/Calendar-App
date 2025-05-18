import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import { fetchToDos } from './reducers/actions/tasksActions.js';
import withAuthentication  from './hooks/withAuthentication.js';

// Lazy load route components
const HomeScreen = lazy(() => import('./components/HomeScreen.js'));
const RegistrationScreen = lazy(() => import('./components/RegistrationScreen.js'));
const CalendarScreen = lazy(() => import('./components/CalendarScreen.js'));

// --- Firebase Initialization ---
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

const LoadingFallback = () => <p>Loading page...</p>;

const App = () => {
  const authUser = useSelector(state => state.sessionState.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser && authUser.uid) {
      dispatch(fetchToDos(authUser.uid));
    }
  }, [authUser]);

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/registration/" element={<RegistrationScreen />} />
          <Route path="/calendar/*" element={<CalendarScreen />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default withAuthentication(App);
