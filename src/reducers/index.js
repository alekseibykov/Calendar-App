import { combineReducers } from 'redux';

import { tasksReducer } from './tasksReducer';
import { datesReducer } from './datesReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
  data: tasksReducer,
  dates: datesReducer,
  sessionState: sessionReducer,
});
