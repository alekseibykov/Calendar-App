import React, { Component} from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import reduxThunk from 'redux-thunk';

import friendReducer from './reducers/mainReducer';
import MainScreen from './components/mainScreen';

const store = createStore(friendReducer, {}, applyMiddleware(reduxThunk));

class App extends Component {
render() {
    return (
      <Provider store={ store }>
        <MainScreen />
      </Provider>
    );
  }
}

export default App;
