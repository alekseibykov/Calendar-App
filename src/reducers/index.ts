import { combineReducers } from 'redux';

import tasksReducer from './tasksSlice.ts';
import datesReducer from './datesSlice.ts';
import sessionReducer from './sessionSlice.ts';

export default combineReducers({
  data: tasksReducer,
  dates: datesReducer,
  sessionState: sessionReducer,
});
