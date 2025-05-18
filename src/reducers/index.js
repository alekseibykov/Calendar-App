import { combineReducers } from 'redux';

import tasksReducer from './tasksSlice.js';
import datesReducer from './datesSlice.js';
import sessionReducer from './sessionSlice.js';

export default combineReducers({
  data: tasksReducer,
  dates: datesReducer,
  sessionState: sessionReducer,
});
