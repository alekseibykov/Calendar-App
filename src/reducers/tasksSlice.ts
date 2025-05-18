import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define Task and TasksState interfaces
export interface Task {
  name: string;
  eventDate: string; // Stored as a string (e.g., ISO string)
  // Add other task properties if any, e.g., id if not the key itself
}

export interface TasksState {
  [key: string]: Task;
}

// Type for the slice state
export type TasksSliceState = TasksState | null;

const initialState: TasksSliceState = null;

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState as TasksSliceState, // Explicitly cast for createSlice if needed, or ensure initial state matches type
  reducers: {
    setTasks: (_state, action: PayloadAction<TasksState | null>): TasksSliceState => {
      return action.payload;
    },
    removeTaskOptimistic: (state, action: PayloadAction<{ id: string }>) => {
      if (state && action.payload && state[action.payload.id]) {
        delete state[action.payload.id];
      }
      // No explicit return needed if mutating, or return state;
    },
    updateTaskOptimistic: (state, action: PayloadAction<{ id: string; changes: Partial<Task> }>) => {
      const { id, changes } = action.payload;
      if (state && state[id]) {
        state[id] = { ...state[id], ...changes };
      }
      // No explicit return needed if mutating, or return state;
    }
  },
});

export const { setTasks, removeTaskOptimistic, updateTaskOptimistic } = tasksSlice.actions;
export default tasksSlice.reducer; 