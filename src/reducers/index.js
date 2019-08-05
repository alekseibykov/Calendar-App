import { combineReducers } from 'redux';

import { tasksReducer } from './tasksReducer';
import { datesReducer } from './datesReducer';

export default combineReducers({
  data: tasksReducer,
  dates: datesReducer,
});
