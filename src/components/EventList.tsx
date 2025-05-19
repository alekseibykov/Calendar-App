import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import TaskAdder from './TaskAdder';
import ModalEdit from './ModalEdit';
import { removeTask as removeTaskAction } from '../reducers/actions/tasksActions';
import { Task } from '../reducers/tasksSlice';
import { RootState, AppDispatch } from '../index';

// Define getISODateString locally or import from a shared utility file
const getISODateString = (date: Date): string => {
  // Ensures the date is treated as local timezone then converted to ISO string for the Z-normalized date part
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
};

function EventList() {
    const dispatch = useDispatch<AppDispatch>();
    const [showModal, setShowModal] = useState(false);
    const [modalKey, setModalKey] = useState<string>('');

    const handleOpenModal = (key: string) => {
      setShowModal(true);
      setModalKey(key);
    }

    const handleCloseModal = () => {
      setShowModal(false);
      setModalKey(''); // Reset modalKey on close
    }

    const sessionState = useSelector((state: RootState) => state.sessionState);
    const rawData = useSelector((state: RootState) => state.data);
    const dates = useSelector((state: RootState) => state.dates);

    // Guard against null dates, though RootState implies it's always there
    const today = dates?.today;
    const tomorrow = dates?.tomorrow;
    const upcoming = dates?.upcoming;

    let data: { key: string; data: Task }[] = [];
    if (rawData !== null) {
      data = Object.keys(rawData).map((key: string) => {
        return {key: key, data: rawData[key]! };
      })
    }

    const uid = sessionState?.authUser?.uid;

    const createTaskList = (filterCondition: (dateString: string) => boolean) => {
      return data
        .filter(el => el && el.data && el.data.eventDate) // Ensure task and eventDate exist
        .map((el) => {
          const date = getISODateString(new Date(el.data.eventDate!)); // el.data.eventDate is now checked
          if (filterCondition(date)) {
            return (
              <li className="task_item" key={el.key}>
                <span onClick={() => handleOpenModal(el.key)}>
                  {el.data.name + ' '}
                </span>
                <button onClick={() => {
                  if (uid) { // Ensure uid is available
                    dispatch(removeTaskAction(el.key, uid));
                  }
                }} type="button">Remove</button>
              </li>
            );
          }
          return null;
        });
    };

    // Ensure dates are defined before using them in filters
    const todayList = today && tomorrow ? createTaskList(date => date >= today && date < tomorrow) : [];
    const tomorrowList = tomorrow && upcoming ? createTaskList(date => date >= tomorrow && date < upcoming) : [];
    const upcomingList = upcoming ? createTaskList(date => date >= upcoming) : [];

    return (
      <div className="List">
        <ModalEdit
          handleCloseModal={handleCloseModal}
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
