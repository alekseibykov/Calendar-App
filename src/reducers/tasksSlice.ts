import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ref, push, update, remove, onValue } from "firebase/database";

import { database } from "../App";
import { AppDispatch } from "../index";

// --- Types ---
export interface Task {
  name: string;
  eventDate: string;
}
export interface TasksState { [key: string]: Task; }
export type TasksSliceState = TasksState;
interface TaskPayload { uid: string; name: string; startDate: Date; }
interface CurrentTaskPayload { key: string; uid: string; name?: string; date?: Date; }

// --- Firebase Helpers ---
const userTasksRef = (uid: string) => ref(database, `users/${uid}/tasks/`);
const taskRef = (uid: string, key: string) => ref(database, `users/${uid}/tasks/${key}`);

// --- Thunks ---
export const fetchToDos = (uid: string) => (dispatch: AppDispatch) => {
  onValue(userTasksRef(uid), snapshot => {
    dispatch(setTasks(snapshot.val() as TasksState));
  });
};

export const addTask = ({ uid, name, startDate }: TaskPayload) => () =>
  push(userTasksRef(uid), { name, eventDate: startDate.toString() })
    .catch(error => console.error("Error adding task:", error));

export const removeTask = (key: string, uid: string) => (dispatch: AppDispatch) => {
  dispatch(removeTaskOptimistic({ id: key }));
  remove(taskRef(uid, key)).catch(error => {
    console.error("Error removing task:", error);
  });
};

export const changeTaskName = ({ key, uid, name }: CurrentTaskPayload) => (dispatch: AppDispatch) => {
  if (!uid || !key || name === undefined) {
    console.error("Missing uid, key, or name for changeTaskName", { key, uid, name });
    return;
  }
  dispatch(updateTaskOptimistic({ id: key, changes: { name } }));
  update(taskRef(uid, key), { name }).catch(error => {
    console.error("Error changing task name:", error);
  });
};

export const changeTaskDate = ({ key, uid, date }: CurrentTaskPayload) => (dispatch: AppDispatch) => {
  if (!uid || !key || !date) {
    console.error("Missing uid, key, or date for changeTaskDate", { key, uid, date });
    return;
  }
  const eventDate = date.toString();
  dispatch(updateTaskOptimistic({ id: key, changes: { eventDate } }));
  update(taskRef(uid, key), { eventDate }).catch(error => {
    console.error("Error changing task date:", error);
  });
};

// --- Slice ---
const initialState: TasksSliceState = {};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (_state, action: PayloadAction<TasksState>): TasksSliceState => action.payload,
    removeTaskOptimistic: (state, action: PayloadAction<{ id: string }>) => {
      if (state && state[action.payload.id]) delete state[action.payload.id];
    },
    updateTaskOptimistic: (state, action: PayloadAction<{ id: string; changes: Partial<Task> }>) => {
      const { id, changes } = action.payload;
      if (state && state[id]) state[id] = { ...state[id], ...changes };
    }
  },
});

export const { setTasks, removeTaskOptimistic, updateTaskOptimistic } = tasksSlice.actions;
export default tasksSlice.reducer; 