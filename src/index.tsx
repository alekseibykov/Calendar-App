import React, {StrictMode} from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from "./App";
import mainReducer from './reducers/index';

const store = configureStore({
  reducer: mainReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const RootComponent = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

createRoot(document.getElementById('root'))
  .render(<StrictMode>
            <RootComponent />
          </StrictMode>)