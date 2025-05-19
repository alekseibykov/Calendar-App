import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../App';
import { signOut } from "firebase/auth";
import { addTask } from '../reducers/actions/tasksActions';
import EventList from './EventList';
import Footer from './Footer';
import "../App.css";
const HomeContent = () => {
    var _a, _b;
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState('Add task here');
    const sessionState = useSelector((state) => state.sessionState);
    const dispatch = useDispatch();
    const handleDateChange = (date) => {
        if (date) {
            setStartDate(date);
        }
    };
    const handleInputChange = (e) => {
        setName(e.target.value);
    };
    const handleAddTaskClick = () => {
        if (!sessionState || !sessionState.authUser) {
            console.error("Cannot add task: User not authenticated.");
            return;
        }
        const d = startDate;
        const nd = new Date();
        const dateId = new Date(d.getFullYear(), d.getMonth(), d.getDate(), nd.getHours(), nd.getMinutes(), nd.getSeconds(), nd.getMilliseconds());
        dispatch(addTask({
            name: name,
            startDate: dateId,
            uid: sessionState.authUser.uid
        }));
        setName(''); // Reset input field
    };
    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("User signed out successfully.");
            // Optionally, dispatch an action to clear user session state in Redux
            // dispatch(clearSession()); 
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    };
    const userEmail = (_b = (_a = sessionState === null || sessionState === void 0 ? void 0 : sessionState.authUser) === null || _a === void 0 ? void 0 : _a.email) !== null && _b !== void 0 ? _b : 'Guest';
    return (_jsxs("div", { className: "App", children: [_jsxs("h1", { children: ["Calendar App", (sessionState === null || sessionState === void 0 ? void 0 : sessionState.authUser) && (_jsx("button", { onClick: handleSignOut, children: "Log Out" }))] }), _jsxs("h4", { children: ["Current user: ", userEmail] }), (sessionState === null || sessionState === void 0 ? void 0 : sessionState.authUser) ? (_jsxs(_Fragment, { children: [_jsx(EventList, {}), _jsx("br", {}), _jsx("input", { onChange: handleInputChange, value: name, type: "text", id: "name", name: "name", placeholder: "Add task here" }), _jsx(DatePicker, { selected: startDate, onChange: handleDateChange }), _jsx("button", { onClick: handleAddTaskClick, type: "button", children: "Add" })] })) : (_jsx("p", { children: "Please log in to manage your tasks." })), _jsx(Footer, {})] }));
};
export default HomeContent;
