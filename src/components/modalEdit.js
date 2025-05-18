import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactModal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { changeTaskName, changeTaskDate } from '../reducers/actions/tasksActions.js';

const ModalEdit = (props) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');

  const data = useSelector(state => state.data);
  const authUser = useSelector(state => state.sessionState.authUser);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleChangeName = () => {
    if (!authUser || !authUser.uid) {
      console.error("User not authenticated, cannot change task name.");
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

  const handleInputChange_2 = (date) => {
    setStartDate(date);
  };

  const handleChangeDate = () => {
    if (!authUser || !authUser.uid) {
      console.error("User not authenticated, cannot change task date.");
      return;
    }
    let currentTaskObject = {
      key: props.modalKey,
      date: startDate,
      uid: authUser.uid,
    }

    dispatch(changeTaskDate(currentTaskObject));
    props.handleCloseModal();
  };

  let currentData = data || [];
  let el = document.getElementById("root");
  let date = new Date(startDate ?
          startDate :
          currentData[props.modalKey] ?
          currentData[props.modalKey].eventDate
          : '');
  return (
    <ReactModal
      isOpen={props.showModal}
      contentLabel="Minimal Modal Example"
      appElement={el}
      onRequestClose={props.handleCloseModal}
    >
      <button onClick={props.handleCloseModal}>Close Modal</button>
      <br />
      <br />
      <input
        onChange={handleInputChange}
        value={name ?
              name :
              currentData[props.modalKey] ?
              currentData[props.modalKey].name
              : ''}
        type="text"
        id="name"
        name="name"
      />
      <button onClick={handleChangeName}>Change name</button>
      <br />
      <br />
      <DatePicker
        selected={date}
        onChange={handleInputChange_2}
      />
    <button onClick={handleChangeDate}>Change date</button>
    </ReactModal>
  );
};

export default ModalEdit;
