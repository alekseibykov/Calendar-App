import { ref, push, update, remove, onValue } from "firebase/database";
import { database } from "../../App";
import { setTasks, removeTaskOptimistic, updateTaskOptimistic, TasksState } from '../tasksSlice';
import {AppDispatch} from "../../index";

interface TaskPayload {
  uid: string;
  name: string;
  startDate: Date;
  id?: string;
  key?: string;
}

interface CurrentTaskPayload {
  key: string;
  uid: string;
  name?: string;
  date?: Date;
}

// Augment the Date interface to include addDays
declare global {
  interface Date {
    addDays(days: number): Date;
  }
}

Date.prototype.addDays = function(days: number): Date {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const fetchToDos = (uid: string) => (dispatch: AppDispatch) => {
  const userTasksRef = ref(database, 'users/' + uid + '/tasks/');
  onValue(userTasksRef, snapshot => {
    dispatch(setTasks(snapshot.val() as TasksState | null));
  });
};

export const addTask = (taskObject: TaskPayload) => () => {
  const userTasksRef = ref(database, 'users/' + taskObject.uid + '/tasks/');
  // Optimistically add the task
  // For Firebase push, a key is generated, so we might not have it beforehand for an optimistic update
  // unless we generate a temporary client-side key.
  // If taskObject includes an 'id' or 'key' for optimistic update:
  // dispatch(addTaskOptimistic({ ...taskObject, id: taskObject.id || taskObject.key || 'temp-id' }));

  push(userTasksRef, {name: taskObject.name, eventDate: taskObject.startDate.toString()}).then(() => {
    // If you want to dispatch an action after a successful Firebase push, e.g., to update with the real key
    // dispatch(addTaskOptimistic({ ...taskObject, id: pushedRef.key! }));
    // Or simply refetch or rely on onValue listener from fetchToDos
  }).catch(error => {
    console.error("Error adding task: ", error);
    // Optionally, dispatch an error action
    // dispatch(setError("Failed to add task"));
  });
};

export const removeTask = (key: string, uid: string) => (dispatch: AppDispatch) => {
  const taskRef = ref(database, 'users/' + uid + '/tasks/' + key);
  // Optimistically remove the task
  dispatch(removeTaskOptimistic({ id: key }));

  remove(taskRef).then(() => {
    // Success, optimistic update already handled
  }).catch(error => {
    console.error("Error removing task: ", error);
    // Revert optimistic update or dispatch an error
    // Example: Re-fetch tasks or dispatch an error action
    // dispatch(setError("Failed to remove task"));
    // To revert, you might need to fetch the task again or store its state before removal.
  });
};

export const changeTaskName = (currentTaskObject: CurrentTaskPayload) => (dispatch: AppDispatch) => {
  if (!currentTaskObject || !currentTaskObject.uid || !currentTaskObject.key || currentTaskObject.name === undefined) {
    console.error("Error: uid, key, or name missing in currentTaskObject for changeTaskName", currentTaskObject);
    return;
  }
  const taskRef = ref(database, 'users/' + currentTaskObject.uid + '/tasks/' + currentTaskObject.key);
  // Optimistically update the task name
  dispatch(updateTaskOptimistic({ id: currentTaskObject.key, changes: { name: currentTaskObject.name } }));

  update(taskRef, { name: currentTaskObject.name }).then(() => {
    // Success, optimistic update already handled
  }).catch(error => {
    console.error("Error changing task name in Firebase: ", error);
    // Revert optimistic update or dispatch an error
    // Example: dispatch(setError("Failed to change task name"));
    // To revert, you would dispatch updateTaskOptimistic with the original name.
  });
};

export const changeTaskDate = (currentTaskObject: CurrentTaskPayload) => (dispatch: AppDispatch) => {
  if (!currentTaskObject || !currentTaskObject.uid || !currentTaskObject.key || !currentTaskObject.date) {
    console.error("Error: uid, key, or date missing in currentTaskObject for changeTaskDate", currentTaskObject);
    return;
  }
  const taskRef = ref(database, 'users/' + currentTaskObject.uid + '/tasks/' + currentTaskObject.key);
  const newEventDate = currentTaskObject.date.toString();
  // Optimistically update the task date
  dispatch(updateTaskOptimistic({ id: currentTaskObject.key, changes: { eventDate: newEventDate } }));

  update(taskRef, { eventDate: newEventDate }).then(() => {
    // Success, optimistic update already handled
  }).catch(error => {
    console.error("Error changing task date: ", error);
    // Revert optimistic update or dispatch an error
    // Example: dispatch(setError("Failed to change task date"));
  });
};
