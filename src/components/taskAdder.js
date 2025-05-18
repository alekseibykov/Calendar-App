import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { addTask } from '../reducers/actions/tasksActions.js';

const TaskAdder = (props) => {
  const [showAddToday, setShowAddToday] = useState(false);
  const [nameAddToday, setNameAddToday] = useState('');

  const data = useSelector(state => state.data);
  const sessionState = useSelector(state => state.sessionState);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    setShowAddToday(true);
  };

  const handleClick_2 = (e) => {
    e.preventDefault();
    setShowAddToday(false);
  };

  const handleClick_3 = (e) => {
    setNameAddToday(e.target.value);
  };

  const handleClick_4 = (day) => {
    let eventDate;
    if (day instanceof Date) {
      eventDate = day;
    }
    if (day === 'today') {
      eventDate = new Date();
    }
    if (day === 'tomorrow') {
      const tempDate = new Date();
      tempDate.setDate(tempDate.getDate() + 1);
      eventDate = tempDate;
    }
    if (day === 'upcoming') {
      const tempDate = new Date();
      tempDate.setDate(tempDate.getDate() + 2);
      eventDate = tempDate;
    }
    dispatch(addTask({name: nameAddToday, startDate: eventDate, uid: sessionState.authUser.uid}));
    setShowAddToday(false);
    setNameAddToday('');
  };

  let renderAddTodayTask;
  if (showAddToday) {
    renderAddTodayTask = (
      <span>
        <input
          onChange={handleClick_3}
          value={nameAddToday}
          type="text"
          id="nameAddToday"
          name="nameAddToday"
        />
        <button onClick={() => handleClick_4(props.day)} type="button">Add</button>
        <button onClick={handleClick_2} type="button">Cancel</button>
      </span>
    );
  } else {
    renderAddTodayTask = (
      <button onClick={handleClick} type="button">Add</button>
    );
  }

  return (
    <span>
      {renderAddTodayTask}
    </span>
  );
};

export default TaskAdder;
