import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from "./App";
import mainReducer from './reducers/index';

const store = configureStore({
  reducer: mainReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {data: TasksState, dates: DatesState, sessionState: SessionState}
export type AppDispatch = typeof store.dispatch;

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
