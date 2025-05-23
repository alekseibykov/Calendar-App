import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '../index';
import { addTask } from '../reducers/tasksSlice';

// Re-introduce TaskAdderProps interface
interface TaskAdderProps {
  day: Date | 'today' | 'tomorrow' | 'upcoming';
}

const TaskAdder = (props: TaskAdderProps) => { // Use TaskAdderProps
  const [showAddToday, setShowAddToday] = useState(false);
  const [nameAddToday, setNameAddToday] = useState<string>('');
  const sessionState = useSelector((state: RootState) => state.sessionState);

  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowAddToday(true);
  };

  const handleClick_2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowAddToday(false);
  };

  const handleClick_3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameAddToday(e.target.value);
  };

  const handleClick_4 = (day: Date | 'today' | 'tomorrow' | 'upcoming') => {
    let eventDate: Date | undefined;
    if (day instanceof Date) {
      eventDate = day;
    } else if (day === 'today') {
      eventDate = new Date();
    } else if (day === 'tomorrow') {
      const tempDate = new Date();
      tempDate.setDate(tempDate.getDate() + 1);
      eventDate = tempDate;
    } else if (day === 'upcoming') {
      const tempDate = new Date();
      tempDate.setDate(tempDate.getDate() + 7);
      eventDate = tempDate;
    } else {
      console.error("Invalid day prop for TaskAdder");
      return;
    }

    if (!sessionState?.authUser?.uid) {
      console.error("User not authenticated, cannot add task.");
      return;
    }
    
    if (eventDate) {
      void dispatch(addTask({ name: nameAddToday, startDate: eventDate, uid: sessionState.authUser.uid }));
      setShowAddToday(false);
      setNameAddToday('');
    } else {
      console.error("Event date could not be determined for adding task.");
    }
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
          placeholder="Task name"
        />
        <button onClick={() => handleClick_4(props.day)} type="button">Add</button>
        <button onClick={handleClick_2} type="button">Cancel</button>
      </span>
    );
  } else {
    renderAddTodayTask = (
      <button onClick={handleClick} type="button">Add Task</button>
    );
  }

  return (
    <span>
      {renderAddTodayTask}
    </span>
  );
};

export default TaskAdder;
