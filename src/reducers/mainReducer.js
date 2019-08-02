import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [
    'qwe'
  ],
  possible: [
    'Allie',
    'Gator',
    'Lizzie',
    'Reptar',
  ],
};

const friendReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  friends: friendReducer,
});
