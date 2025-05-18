import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from 'react-redux';

import { auth } from '../App';
import { signOut } from "firebase/auth";
import { addTask } from '../reducers/actions/tasksActions';
import EventList from './EventList';
import Footer from './Footer';
import "../App.css";
import {AppDispatch, RootState} from "../index";


const HomeContent = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>('Add task here');

  const sessionState = useSelector((state: RootState) => state.sessionState);
  const dispatch = useDispatch<AppDispatch>();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out successfully.");
      // Optionally, dispatch an action to clear user session state in Redux
      // dispatch(clearSession()); 
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  const userEmail = sessionState?.authUser?.email ?? 'Guest';

  return (
    <div className="App">
      <h1>
        Calendar App
        {sessionState?.authUser && (
          <button onClick={handleSignOut}>
            Log Out
          </button>
        )}
      </h1>
      <h4>
        Current user: {userEmail}
      </h4>

      {sessionState?.authUser ? (
        <>
          <EventList />
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
