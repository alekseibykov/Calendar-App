import React, { Component} from "react";
import { bindActionCreators, compose  } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import HomeContent from './components/HomeContent';
import CalendarScreen from './components/CalendarScreen';
import { addTask, removeTask, fetchToDos } from './actions/actions';
import HomeScreen from './components/HomeScreen';
import RegistrationScreen from './components/RegistrationScreen';
import withAuthentication  from './components/Session/withAuthentication';

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
// --- End Firebase Initialization ---

class App extends Component {
  constructor() {
    super();

  }

  render() {
    console.log(this.props);
    return (
      <Router>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/registration/" component={RegistrationScreen} />
        <Route path="/calendar/" component={CalendarScreen} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, sessionState } = state
  return { data, sessionState }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
    fetchToDos,
  }, dispatch)
);

export default compose(
  withAuthentication,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(App);
