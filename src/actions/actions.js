import * as firebase from "firebase/app";
import "firebase/database";

// Prototype extentions here
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(config);
let database = firebase.database();
let todosRef = database.ref().child('data');

// Manually add item to database on refresh
// let testDate = new Date().toString();
// firebase.database().ref().child('data').push({name: 'do stuff', eventDate: testDate})

export const fetchToDos = (uid) => async dispatch => {
  database.ref().child('users/' + uid + '/tasks/').on("value", snapshot => {
    dispatch({
      type: 'FETCH_TASKS',
      payload: snapshot.val()
    });
  });
};

export const addTask = (taskObject) => async dispatch => {
  database.ref().child('users/' + taskObject.uid + '/tasks/').push({name: taskObject.name, eventDate: taskObject.startDate.toString()}, (snap) => {
    dispatch({
      type: 'ADD_TASK'
    });
  })
};

export const removeTask = (dateId) => async dispatch => {
  database.ref().child('data/' + dateId).remove((snap) => {
    dispatch({
      type: 'REMOVE_TASK'
    });
  });
};

export const changeTaskName = (currentTaskObject) => async dispatch => {
  database.ref().child('data/' + currentTaskObject.key).update({ name: currentTaskObject.name }, (snap) => {
    dispatch({
      type: 'CHANGE_TASK_NAME'
    });
  })
};

export const changeTaskDate = (currentTaskObject) => async dispatch => {
  database.ref().child('data/' + currentTaskObject.key).update({ eventDate: currentTaskObject.date.toString() }, (snap) => {
    dispatch({
      type: 'CHANGE_TASK_DATE'
    });
  })
};
