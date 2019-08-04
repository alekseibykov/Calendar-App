import { combineReducers } from 'redux';

const INITIAL_STATE = [];

const mainReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'FETCH_TODOS':
      return action.payload;
    case 'ADD_TASK':
      return state;
    case 'REMOVE_TASK':
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  data: mainReducer,
});
