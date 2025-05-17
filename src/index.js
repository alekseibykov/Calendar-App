import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import {thunk} from 'redux-thunk';

import App from "./App.js";
import mainReducer from './reducers';

const store = createStore(mainReducer, {}, applyMiddleware(thunk));

const RootComponent = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<RootComponent />);
} else {
  console.error("Failed to find the root element for React mounting.");
}
