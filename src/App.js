import React, { Component} from "react";
import { bindActionCreators, compose  } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeContent from './components/HomeContent';
import CalendarScreen from './components/CalendarScreen';
import { addTask, removeTask, fetchToDos } from './actions/actions';
import HomeScreen from './components/HomeScreen';
import RegistrationScreen from './components/RegistrationScreen';
import withAuthentication  from './components/Session/withAuthentication';


class App extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    let uid = null;
    if (this.props.sessionState.authUser) {
      uid = this.props.sessionState.authUser.uid;
    }
    this.props.fetchToDos(uid);
  }

  render() {
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
