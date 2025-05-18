import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { removeTask } from '../reducers/actions/tasksActions.js';
import TaskAdder from './TaskAdder.js';
import ModalEdit from './ModalEdit.js';

const DayTasks = ({ startDate }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState('');

  const rawData = useSelector(state => state.data);
  const sessionState = useSelector(state => state.sessionState);
  const dispatch = useDispatch();

  const handleRemove = (key, uid) => {
    dispatch(removeTask(key, uid));
  };

  const handleOpenModal = (key) => {
    setShowModal(true);
    setModalKey(key);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderTasks = () => {
    let data = [];
    if (rawData !== null) {
      data = Object.keys(rawData).map(function(key) {
        return {key: key, data: rawData[key]};
      });
    }
    const validStartDate = startDate instanceof Date ? startDate : new Date(startDate);

    let today = new Date(validStartDate.getFullYear(), validStartDate.getMonth(), validStartDate.getDate());
    let tomorrow = new Date(validStartDate.getFullYear(), validStartDate.getMonth(), validStartDate.getDate());
    if (typeof tomorrow.addDays === 'function') {
        tomorrow = tomorrow.addDays(1);
    } else {
        tomorrow.setDate(tomorrow.getDate() + 1);
        console.warn("Date.prototype.addDays is not defined. Using fallback setDate.")
    }

    return data.map((el) => {
      let date = new Date(el.data.eventDate);
      if (date >= today && date < tomorrow) {
        return (
          <li className="task_item" key={el.key}>
            <span onClick={() => handleOpenModal(el.key)}>
              {el.data.name + ' '}
            </span>
            <button onClick={() => handleRemove(el.key, sessionState.authUser.uid)} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <h2>
        Tasks for this day <TaskAdder day={startDate} />
      </h2>
      <ModalEdit
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        modalKey={modalKey}
      />
      {renderTasks()}
    </div>
  );
};

export default DayTasks;
