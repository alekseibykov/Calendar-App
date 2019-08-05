const INITIAL_STATE = [];

export const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return state;
    case 'REMOVE_TASK':
      return state;
    default:
      return state;
  }
};
