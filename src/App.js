import React, { Component} from "react";
import { bindActionCreators  } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import MainScreen from './components/mainScreen';
import CalendarScreen from './components/calendarScreen';
import { addTask, removeTask, fetchToDos } from './actions/actions';


class App extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    this.props.fetchToDos();
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={MainScreen} />
        <Route path="/calendar/" component={CalendarScreen} />
        <Route path="/settings/" component={CalendarScreen} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTask,
    removeTask,
    fetchToDos,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
