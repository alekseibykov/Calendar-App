import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../reducers/actions/tasksActions';
const TaskAdder = (props) => {
    const [showAddToday, setShowAddToday] = useState(false);
    const [nameAddToday, setNameAddToday] = useState('');
    const sessionState = useSelector((state) => state.sessionState);
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        setShowAddToday(true);
    };
    const handleClick_2 = (e) => {
        e.preventDefault();
        setShowAddToday(false);
    };
    const handleClick_3 = (e) => {
        setNameAddToday(e.target.value);
    };
    const handleClick_4 = (day) => {
        var _a;
        let eventDate;
        if (day instanceof Date) {
            eventDate = day;
        }
        else if (day === 'today') {
            eventDate = new Date();
        }
        else if (day === 'tomorrow') {
            const tempDate = new Date();
            tempDate.setDate(tempDate.getDate() + 1);
            eventDate = tempDate;
        }
        else if (day === 'upcoming') {
            const tempDate = new Date();
            tempDate.setDate(tempDate.getDate() + 7);
            eventDate = tempDate;
        }
        else {
            console.error("Invalid day prop for TaskAdder");
            return;
        }
        if (!((_a = sessionState === null || sessionState === void 0 ? void 0 : sessionState.authUser) === null || _a === void 0 ? void 0 : _a.uid)) {
            console.error("User not authenticated, cannot add task.");
            return;
        }
        if (eventDate) {
            dispatch(addTask({ name: nameAddToday, startDate: eventDate, uid: sessionState.authUser.uid }));
            setShowAddToday(false);
            setNameAddToday('');
        }
        else {
            console.error("Event date could not be determined for adding task.");
        }
    };
    let renderAddTodayTask;
    if (showAddToday) {
        renderAddTodayTask = (_jsxs("span", { children: [_jsx("input", { onChange: handleClick_3, value: nameAddToday, type: "text", id: "nameAddToday", name: "nameAddToday", placeholder: "Task name" }), _jsx("button", { onClick: () => handleClick_4(props.day), type: "button", children: "Add" }), _jsx("button", { onClick: handleClick_2, type: "button", children: "Cancel" })] }));
    }
    else {
        renderAddTodayTask = (_jsx("button", { onClick: handleClick, type: "button", children: "Add Task" }));
    }
    return (_jsx("span", { children: renderAddTodayTask }));
};
export default TaskAdder;
