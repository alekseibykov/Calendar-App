import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import DayTasks from './DayTasks';
const CalendarScreen = () => {
    const [startDate, setStartDate] = useState(new Date());
    const rawData = useSelector((state) => state.data);
    const handleChange = (date) => {
        if (date) {
            setStartDate(date);
        }
    };
    let data = [];
    if (rawData === null) {
        return _jsx("p", { children: "Loading page..." });
    }
    data = Object.keys(rawData)
        .filter(key => rawData[key] !== undefined)
        .map((key) => {
        return { key: key, data: rawData[key] };
    });
    const highlightedDates = data.map(el => new Date(el.data.eventDate));
    const highlightWithRanges = [
        { "react-datepicker__day--highlighted-custom-1": highlightedDates },
    ];
    return (_jsxs("div", { children: [_jsx("h1", { children: " Calendar Screen " }), _jsx(DatePicker, { inline: true, selected: startDate, onChange: handleChange, highlightDates: highlightWithRanges }), _jsx(DayTasks, { startDate: startDate }), _jsx("br", {}), _jsx("br", {}), _jsxs("nav", { children: [_jsx(Link, { to: "/", children: "Main " }), _jsx("br", {}), _jsx(Link, { to: "/calendar/", children: "Calendar " })] })] }));
};
export default CalendarScreen;
