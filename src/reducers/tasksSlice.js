import { createSlice } from '@reduxjs/toolkit';

const initialState = null; // Or perhaps [] if you prefer an array for an empty task list

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      // This reducer replaces the state with the fetched tasks,
      // similar to the old FETCH_TASKS
      return action.payload; 
    },
    addTaskOptimistic: (state, action) => {
      // Placeholder for optimistic update. 
      // If state is an array: state.push(action.payload);
      // If state is an object: state[action.payload.id] = action.payload;
      // Current reducer is a no-op, actual update comes from Firebase via setTasks
    },
    removeTaskOptimistic: (state, action) => {
      // Placeholder for optimistic update.
      // If state is an array: return state.filter(task => task.id !== action.payload.id);
      // If state is an object: delete state[action.payload.id];
      // Current reducer is a no-op
    },
    updateTaskOptimistic: (state, action) => {
      const { id, changes } = action.payload;
      return {...state, [id]: {...state[id], ...changes}}
    }
  },
});

export const { setTasks, addTaskOptimistic, removeTaskOptimistic, updateTaskOptimistic } = tasksSlice.actions;
export default tasksSlice.reducer; 