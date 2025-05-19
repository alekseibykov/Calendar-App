import { createSlice } from '@reduxjs/toolkit';
const initialState = null;
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState, // Explicitly cast for createSlice if needed, or ensure initial state matches type
    reducers: {
        setTasks: (_state, action) => {
            return action.payload;
        },
        removeTaskOptimistic: (state, action) => {
            if (state && action.payload && state[action.payload.id]) {
                delete state[action.payload.id];
            }
            // No explicit return needed if mutating, or return state;
        },
        updateTaskOptimistic: (state, action) => {
            const { id, changes } = action.payload;
            if (state && state[id]) {
                state[id] = Object.assign(Object.assign({}, state[id]), changes);
            }
            // No explicit return needed if mutating, or return state;
        }
    },
});
export const { setTasks, removeTaskOptimistic, updateTaskOptimistic } = tasksSlice.actions;
export default tasksSlice.reducer;
