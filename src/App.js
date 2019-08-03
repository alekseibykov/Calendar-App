import React, { Component} from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import friendReducer from './reducers/mainReducer';
import MainScreen from './components/mainScreen';

const store = createStore(friendReducer);

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
