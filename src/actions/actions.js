import { database } from '../App.js';
import { ref, onValue, push, remove, update } from "firebase/database";

// Prototype extentions here
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

// Manually add item to database on refresh
// let testDate = new Date().toString();
// push(ref(database, 'data'), {name: 'do stuff', eventDate: testDate}); // Example of updated push

export const fetchToDos = (uid) => async dispatch => {
  const userTasksRef = ref(database, 'users/' + uid + '/tasks/');
  onValue(userTasksRef, snapshot => {
    dispatch({
      type: 'FETCH_TASKS',
      payload: snapshot.val()
    });
  });
};

export const addTask = (taskObject) => async dispatch => {
  const userTasksRef = ref(database, 'users/' + taskObject.uid + '/tasks/');
  push(userTasksRef, {name: taskObject.name, eventDate: taskObject.startDate.toString()}).then(() => {
    dispatch({
      type: 'ADD_TASK'
    });
  }).catch(error => {
    console.error("Error adding task: ", error);
  });
};

export const removeTask = (key, uid) => async dispatch => {
  const taskRef = ref(database, 'users/' + uid + '/tasks/' + key);
  remove(taskRef).then(() => {
    dispatch({
      type: 'REMOVE_TASK'
    });
  }).catch(error => {
    console.error("Error removing task: ", error);
  });
};

export const changeTaskName = (currentTaskObject) => async dispatch => {
  const taskRef = ref(database, 'users/' + currentTaskObject.uid + '/tasks/' + currentTaskObject.key);
  update(taskRef, { name: currentTaskObject.name }).then(() => {
    dispatch({
      type: 'CHANGE_TASK_NAME'
    });
  }).catch(error => {
    console.error("Error changing task name: ", error);
  });
};

export const changeTaskDate = (currentTaskObject) => async dispatch => {
  const taskRef = ref(database, 'users/' + currentTaskObject.uid + '/tasks/' + currentTaskObject.key);
  update(taskRef, { eventDate: currentTaskObject.date.toString() }).then(() => {
    dispatch({
      type: 'CHANGE_TASK_DATE'
    });
  }).catch(error => {
    console.error("Error changing task date: ", error);
  });
};
