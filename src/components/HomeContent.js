import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../App.js';
import { signOut } from "firebase/auth";
import { addTask, removeTask } from '../reducers/actions/tasksActions.js';
import EventList from './EventList.js';
import Footer from './Footer.js';
import "../App.css";

const HomeContent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState('Add task here');

  const sessionState = useSelector((state) => state.sessionState);
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleAddTaskClick = () => {
    if (!sessionState || !sessionState.authUser) {
      console.error("Cannot add task: User not authenticated.");
      return;
    }
    let d = startDate;
    let nd = new Date();
    let dateId = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      nd.getHours(),
      nd.getMinutes(),
      nd.getSeconds(),
      nd.getMilliseconds()
    );
    dispatch(addTask({
      name: name,
      startDate: dateId,
      uid: sessionState.authUser.uid
    }));
    setName(''); // Reset input field
  };

  // Using useCallback for handleClick_2 to stabilize the function reference if passed to children
  const handleRemoveTaskClick = useCallback((key, uid) => {
    if (!sessionState || !sessionState.authUser || sessionState.authUser.uid !== uid) {
      console.error("Cannot remove task: User not authenticated or UID mismatch.");
      return;
    }
    dispatch(removeTask(key, uid));
  }, [dispatch, sessionState]); // Added sessionState to dependency array

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out successfully.");
      // Optionally, dispatch an action to clear user session state in Redux
      // dispatch(clearSession()); 
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  const userEmail = sessionState && sessionState.authUser ? sessionState.authUser.email : 'Guest';

  return (
    <div className="App">
      <h1>
        Calendar App
        {sessionState && sessionState.authUser && (
          <button onClick={handleSignOut}>
            Log Out
          </button>
        )}
      </h1>
      <h4>
        Current user: {userEmail}
      </h4>

      {sessionState && sessionState.authUser ? (
        <>
          <EventList removeTask={handleRemoveTaskClick} />
          <br/>
          <input
            onChange={handleInputChange}
            value={name}
            type="text"
            id="name"
            name="name"
            placeholder="Add task here"
          />
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
          />
          <button onClick={handleAddTaskClick} type="button">Add</button>
        </>
      ) : (
        <p>Please log in to manage your tasks.</p>
      )}
      <Footer />
    </div>
  );
};

export default HomeContent;
