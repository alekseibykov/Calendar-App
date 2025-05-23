import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch , RootState } from '../index';
import { removeTask , Task } from '../reducers/tasksSlice';

import TaskAdder from './TaskAdder';
import ModalEdit from './ModalEdit';




interface DayTasksProps {
  startDate: Date;
}

const DayTasks = ({ startDate }: DayTasksProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState<string>('');

  const rawData = useSelector((state: RootState) => state.data);
  const sessionState = useSelector((state: RootState) => state.sessionState);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = (key: string, uid: string | undefined) => {
    if (uid) {
      dispatch(removeTask(key, uid));
    }
  };

  const handleOpenModal = (key: string) => {
    setShowModal(true);
    setModalKey(key);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderTasks = () => {
    let data: { key: string; data: Task }[] = [];
    if (rawData !== null) {
      data = Object.keys(rawData).map((key: string) => {
        return {key: key, data: rawData[key] };
      });
    }
    const validStartDate = startDate;

    const today = new Date(validStartDate.getFullYear(), validStartDate.getMonth(), validStartDate.getDate());
    // The addDays method should be available via global declaration in tasksActions.ts
    const tomorrow = new Date(validStartDate.valueOf()); // Clone startDate
    tomorrow.setDate(tomorrow.getDate() + 1); // Standard way to add a day

    return data.map((el) => {
      if (!el || !el.data || !el.data.eventDate) return null; // Guard against undefined task data
      const date = new Date(el.data.eventDate);
      if (date >= today && date < tomorrow) {
        return (
          <li className="task_item" key={el.key}>
            <button
              type="button"
              onClick={() => handleOpenModal(el.key)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
            >
              {el.data.name + ' '}
            </button>
            <button onClick={() => handleRemove(el.key, sessionState?.authUser?.uid)} type="button">Remove</button>
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
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        modalKey={modalKey}
      />
      <ul>
        {renderTasks()}
      </ul>
    </div>
  );
};

export default DayTasks;
