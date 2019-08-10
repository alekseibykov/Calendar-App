const INITIAL_STATE = null;

export const tasksReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'FETCH_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return state;
    case 'REMOVE_TASK':
      return state;
    case 'CHANGE_TASK_NAME':
      return state;
    default:
      return state;
  }
};
