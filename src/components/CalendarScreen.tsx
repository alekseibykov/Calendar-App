import { useState } from "react";
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { RootState } from '../index';

import DayTasks from './DayTasks';
import Footer from './Footer';

const CalendarScreen = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const rawData = useSelector((state: RootState) => state.data);

  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  if (rawData === null) {
    return <p className="loading">Loading page...</p>;
  }

  const data = Object.keys(rawData)
    .filter(key => rawData[key] !== undefined)
    .map((key: string) => ({ key, data: rawData[key] }));

  const highlightedDates = data.map(el => new Date(el.data.eventDate));
  const highlightWithRanges = [
    { "react-datepicker__day--highlighted-custom-1": highlightedDates },
  ];

  return (
    <div className="App">
      <h1>Calendar</h1>
      
      <div className="calendar-container">
        <div className="calendar-section">
          <DatePicker
            inline
            selected={startDate}
            onChange={handleChange}
            highlightDates={highlightWithRanges}
          />
        </div>
        
        <div className="tasks-section">
          <DayTasks startDate={startDate} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CalendarScreen;
