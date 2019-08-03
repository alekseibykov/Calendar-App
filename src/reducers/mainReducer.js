import { combineReducers } from 'redux';

const INITIAL_STATE = [];

const mainReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          name: action.payload.name,
          eventDate: action.payload.startDate,
        }
      ];
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
