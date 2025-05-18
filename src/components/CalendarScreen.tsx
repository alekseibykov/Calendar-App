import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { RootState } from '../index';

import DayTasks from './DayTasks';
import { Task } from '../reducers/tasksSlice';

const CalendarScreen = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const rawData = useSelector((state: RootState) => state.data);

  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  let data: { key: string; data: Task }[] = [];
  if (rawData === null) {
    return <p>Loading page...</p>;
  }
  data = Object.keys(rawData).map((key: string) => {
    return {key: key, data: rawData[key] };
  })

  const highlightedDates = data.map(el => new Date(el.data.eventDate));

  const highlightWithRanges = [
    { "react-datepicker__day--highlighted-custom-1": highlightedDates },
  ];
  return (
    <div>
      <h1> Calendar Screen </h1>
      <DatePicker
        inline
        selected={startDate}
        onChange={handleChange}
        highlightDates={highlightWithRanges}
      />
      <DayTasks startDate={startDate} />
      <br/>
      <br/>
      <nav>
        <Link to="/">Main </Link>
        <br />
        <Link to="/calendar/">Calendar </Link>
      </nav>
    </div>
  );
};

export default CalendarScreen;
