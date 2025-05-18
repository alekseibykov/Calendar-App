import React, { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { changeTaskName, changeTaskDate } from '../reducers/actions/tasksActions.ts';
import { useAppSelector, useAppDispatch } from "../App.tsx";
import type { TasksState } from '../reducers/tasksSlice.ts'; // Corrected import path

interface Props {
  modalKey: string | null; // Allow modalKey to be null if no task is selected
  handleCloseModal: () => void;
  showModal: boolean;
}

const ModalEdit = (props: Props) => {
  const [name, setName] = useState('');
  // Initialize startDate with Date or null for better type handling with DatePicker
  const [startDate, setStartDate] = useState<Date | null>(null);

  const allTasks = useAppSelector(state => state.data as TasksState | null); // state.data is tasksReducer state
  const authUser = useAppSelector(state => state.sessionState.authUser);
  const dispatch = useAppDispatch();

  const currentTask = props.modalKey && allTasks ? allTasks[props.modalKey] : null;

  useEffect(() => {
    if (currentTask) {
      setName(currentTask.name);
      setStartDate(currentTask.eventDate ? new Date(currentTask.eventDate) : null);
    } else {
      setName('');
      setStartDate(null);
    }
  }, [currentTask, props.showModal]); // Reset form when modalKey changes or modal opens

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeName = () => {
    if (!authUser || !authUser.uid || !props.modalKey) {
      console.error("User not authenticated or task key missing, cannot change task name.");
      return;
    }
    let currentTaskObject = {
      key: props.modalKey,
      name: name,
      uid: authUser.uid,
    }

    dispatch(changeTaskName(currentTaskObject));
    props.handleCloseModal();
  };

  const handleDateChange = (date: Date | null) => { // Renamed from handleInputChange_2 for clarity
    setStartDate(date);
  };

  const handleChangeDate = () => {
    if (!authUser || !authUser.uid || !props.modalKey || !startDate) {
      console.error("User not authenticated, task key, or date missing, cannot change task date.");
      return;
    }
    let currentTaskObject = {
      key: props.modalKey,
      // Ensure date is a Date object as expected by CurrentTaskPayload
      date: startDate, 
      uid: authUser.uid,
    }

    dispatch(changeTaskDate(currentTaskObject));
    props.handleCloseModal();
  };

  const el = document.getElementById("root");
  if (!el) {
    console.error("Root element #root not found for ReactModal appElement.");
    return null;
  }
  
  if (!props.showModal) { // Don't render anything if modal is not shown
    return null;
  }

  return (
    <ReactModal
      isOpen={props.showModal}
      contentLabel="Edit Task Modal"
      appElement={el}
      onRequestClose={props.handleCloseModal}
    >
      <button onClick={props.handleCloseModal}>Close Modal</button>
      <br />
      <br />
      <input
        onChange={handleInputChange}
        value={name}
        type="text"
        id="name"
        name="name"
        placeholder="Task name"
      />
      <button onClick={handleChangeName}>Change name</button>
      <br />
      <br />
      <DatePicker
        selected={startDate} // DatePicker can handle null
        onChange={handleDateChange}
        placeholderText="Select date"
      />
    <button onClick={handleChangeDate} disabled={!startDate}>Change date</button>
    </ReactModal>
  );
};

export default ModalEdit;
