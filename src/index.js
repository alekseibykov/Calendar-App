import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from "./App";
import mainReducer from './reducers/index';
const store = configureStore({
    reducer: mainReducer,
});
const RootComponent = () => {
    return (_jsx(Provider, { store: store, children: _jsx(App, {}) }));
};
const rootElement = document.getElementById('root');
if (!rootElement)
    throw new Error('Failed to find the root element');
createRoot(rootElement)
    .render(_jsx(React.StrictMode, { children: _jsx(RootComponent, {}) }));
