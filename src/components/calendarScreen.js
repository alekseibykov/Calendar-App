import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

import DayTasks from './DayTasks.js';

const CalendarScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const rawData = useSelector(state => state.data);

  const handleChange = (date) => {
    setStartDate(date);
  };

  let data = [];
  if (rawData === null) {
    return <p>Loading page...</p>;
  }
  data = Object.keys(rawData).map(function(key) {
    return {key: key, data: rawData[key]};
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
