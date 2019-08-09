import { combineReducers } from 'redux';

import { tasksReducer } from './tasksReducer';
import { datesReducer } from './datesReducer';
import { itemReducer } from './itemReducer';

export default combineReducers({
  data: tasksReducer,
  dates: datesReducer,
  show: itemReducer,
});
