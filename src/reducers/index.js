import { combineReducers } from 'redux';

import { tasksReducer } from './tasksReducer';
import { datesReducer } from './datesReducer';
import { itemReducer } from './itemReducer';
import sessionReducer from './sessionReducer';
import userReducer from './userReducer';

export default combineReducers({
  data: tasksReducer,
  dates: datesReducer,
  show: itemReducer,
  sessionState: sessionReducer,
  userState: userReducer,
});
