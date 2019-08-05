import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import reduxThunk from 'redux-thunk';

import App from "./App.js";
import friendReducer from './reducers/mainReducer';

const store = createStore(friendReducer, {}, applyMiddleware(reduxThunk));

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
