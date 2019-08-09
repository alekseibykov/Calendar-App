import { combineReducers } from 'redux';

import { tasksReducer } from './tasksReducer';
import { datesReducer } from './datesReducer';
import ListReducer from './ListReducer';
import ItemReducer from './ItemReducer';

export default combineReducers({
  data: tasksReducer,
  dates: datesReducer,
  content: ListReducer,
  show: ItemReducer,
});
