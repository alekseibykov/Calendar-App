import { database } from '../../App.js';
import { ref, onValue, push, remove, update } from "firebase/database";
import { setTasks, addTaskOptimistic, removeTaskOptimistic, updateTaskOptimistic } from '../tasksSlice.js'; // Import slice actions

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const fetchToDos = (uid) => async dispatch => {
  const userTasksRef = ref(database, 'users/' + uid + '/tasks/');
  onValue(userTasksRef, snapshot => {
    dispatch(setTasks(snapshot.val())); // Use setTasks action creator
  });
};

export const addTask = (taskObject) => async dispatch => {
  const userTasksRef = ref(database, 'users/' + taskObject.uid + '/tasks/');
  push(userTasksRef, {name: taskObject.name, eventDate: taskObject.startDate.toString()}).then(() => {
    // dispatch(addTaskOptimistic(taskObject)); // Example if using optimistic update
  }).catch(error => {
    console.error("Error adding task: ", error);
  });
};

export const removeTask = (key, uid) => async dispatch => {
  const taskRef = ref(database, 'users/' + uid + '/tasks/' + key);
  remove(taskRef).then(() => {
    // dispatch(removeTaskOptimistic({ id: key })); // Example for optimistic update
  }).catch(error => {
    console.error("Error removing task: ", error);
  });
};

export const changeTaskName = (currentTaskObject) => async dispatch => {
  if (!currentTaskObject || !currentTaskObject.uid || !currentTaskObject.key) {
    console.error("Error: uid or key missing in currentTaskObject for changeTaskName", currentTaskObject);
    return;
  }
  const taskRef = ref(database, 'users/' + currentTaskObject.uid + '/tasks/' + currentTaskObject.key);
  update(taskRef, { name: currentTaskObject.name }).then(() => {
    dispatch(updateTaskOptimistic({ id: currentTaskObject.key, changes: { name: currentTaskObject.name } }));
  }).catch(error => {
    console.error("Error changing task name in Firebase: ", error);
  });
};

export const changeTaskDate = (currentTaskObject) => async dispatch => {
  if (!currentTaskObject || !currentTaskObject.uid || !currentTaskObject.key) {
    console.error("Error: uid or key missing in currentTaskObject for changeTaskDate", currentTaskObject);
    return;
  }
  const taskRef = ref(database, 'users/' + currentTaskObject.uid + '/tasks/' + currentTaskObject.key);
  update(taskRef, { eventDate: currentTaskObject.date.toString() }).then(() => {
    dispatch(updateTaskOptimistic({ id: currentTaskObject.key, changes: { eventDate: currentTaskObject.date.toString() } }));
  }).catch(error => {
    console.error("Error changing task date: ", error);
  });
};
