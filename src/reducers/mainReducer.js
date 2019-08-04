import { combineReducers } from 'redux';
import * as firebase from "firebase/app";
import "firebase/database";

const INITIAL_STATE = [];

const mainReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'FETCH_TODOS':
      return action.payload;
    case 'ADD_TASK':
      return state
    case 'REMOVE_TASK':
      let newData = [];
      state.forEach((el) => {
        if (el.eventDate !== action.payload) {
          newData.push(el);
        }
      })
      return newData;
    default:
      return state
  }
};

export default combineReducers({
  data: mainReducer,
});
