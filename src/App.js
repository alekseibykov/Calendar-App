import React, { Component} from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import friendReducer from './reducers/mainReducer';
import MainScreen from './components/mainScreen';
import CalendarScreen from './components/calendarScreen';

const store = createStore(friendReducer, {}, applyMiddleware(reduxThunk));

const App = () => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={MainScreen} />
      <Route path="/calendar/" component={CalendarScreen} />
      <Route path="/settings/" component={CalendarScreen} />
    </Router>
  </Provider>
);

export default App;
