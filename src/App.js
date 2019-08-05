import React, { Component} from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators  } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import friendReducer from './reducers/mainReducer';
import MainScreen from './components/mainScreen';
import CalendarScreen from './components/calendarScreen';
import { addTask, removeTask, fetchToDos } from './actions/actions';


class App extends Component {
  constructor() {
    super();
    // Prototype extentions here
    Date.prototype.addDays = function(days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }
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
