import { combineReducers } from 'redux';
import tasksReducer from './tasksSlice';
import datesReducer from './datesSlice';
import sessionReducer from './sessionSlice';
export default combineReducers({
    data: tasksReducer,
    dates: datesReducer,
    sessionState: sessionReducer,
});
