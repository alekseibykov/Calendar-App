import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import TaskAdder from './TaskAdder.js';
import ModalEdit from './ModalEdit.js';
import { removeTask } from '../reducers/actions/tasksActions.js';

// Define getISODateString locally or import from a shared utility file
const getISODateString = (date) => {
  // Ensures the date is treated as local timezone then converted to ISO string for the Z-normalized date part
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
};

function EventList() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [modalKey, setModalKey] = useState('');
    const handleOpenModal = (key) => {
      setShowModal(true);
      setModalKey(key);
    }
    const sessionState = useSelector((state) => state.sessionState);
    const rawData = useSelector((state) => state.data);
    const dates = useSelector((state) => state.dates);
    let today = dates.today;
    let tomorrow = dates.tomorrow;
    let upcoming = dates.upcoming;

    let data = [];
    if (rawData !== null) {
      data = Object.keys(rawData).map(function(key) {
        return {key: key, data: rawData[key]};
      })
    }

    let uid = sessionState.authUser.uid;

    let todayList = data.map((el, index) => {
      let date = getISODateString(new Date(el.data.eventDate));
      if (date >= today && date < tomorrow) {
        return (
          <li className="task_item" key={el.key}>
            <span onClick={() => handleOpenModal(el.key)}>
              {el.data.name + ' '}
            </span>
            <button onClick={() => dispatch(removeTask(el.key, uid))} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    let tomorrowList = data.map((el, index) => {
      let date = getISODateString(new Date(el.data.eventDate));
      if (date >= tomorrow && date < upcoming) {
        return (
          <li className="task_item" key={el.key}>
            <span onClick={() => handleOpenModal(el.key)}>
              {el.data.name + ' '}
            </span>
            <button onClick={() => dispatch(removeTask(el.key, uid))} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    // TODO upcoming should be no date insted of today + 2
    let upcomingList = data.map((el, index) => {
      let date = getISODateString(new Date(el.data.eventDate));
      if (date >= upcoming) {
        return (
          <li className="task_item" key={el.key}>
            <span onClick={() => handleOpenModal(el.key)}>
              {el.data.name + ' '}
            </span>
            <button onClick={() => dispatch(removeTask(el.key, uid))} type="button">Remove</button>
          </li>
        );
      }
      return null;
    });

    return (
      <div className="List">
        <ModalEdit
          handleOpenModal={handleOpenModal}
          handleCloseModal={() => setShowModal(false)}
          showModal={showModal}
          modalKey={modalKey}
        />
        Today <TaskAdder day="today" />
        <ul>
          {todayList}
        </ul>
        Tomorrow <TaskAdder day="tomorrow" />
        <ul>
          {tomorrowList}
        </ul>
        Upcoming <TaskAdder day="upcoming" />
        <ul>
          {upcomingList}
        </ul>
      </div>
    );
 }


export default EventList;
