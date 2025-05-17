import { combineReducers } from 'redux';

import { tasksReducer } from './tasksReducer.js';
import { datesReducer } from './datesReducer.js';
import sessionReducer from './sessionReducer.js';

export default combineReducers({
  data: tasksReducer,
  dates: datesReducer,
  sessionState: sessionReducer,
});
