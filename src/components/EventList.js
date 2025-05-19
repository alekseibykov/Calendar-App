import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import TaskAdder from './TaskAdder';
import ModalEdit from './ModalEdit';
import { removeTask as removeTaskAction } from '../reducers/actions/tasksActions';
// Define getISODateString locally or import from a shared utility file
const getISODateString = (date) => {
    // Ensures the date is treated as local timezone then converted to ISO string for the Z-normalized date part
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
};
function EventList() {
    var _a;
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [modalKey, setModalKey] = useState('');
    const handleOpenModal = (key) => {
        setShowModal(true);
        setModalKey(key);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setModalKey(''); // Reset modalKey on close
    };
    const sessionState = useSelector((state) => state.sessionState);
    const rawData = useSelector((state) => state.data);
    const dates = useSelector((state) => state.dates);
    // Guard against null dates, though RootState implies it's always there
    const today = dates === null || dates === void 0 ? void 0 : dates.today;
    const tomorrow = dates === null || dates === void 0 ? void 0 : dates.tomorrow;
    const upcoming = dates === null || dates === void 0 ? void 0 : dates.upcoming;
    let data = [];
    if (rawData !== null) {
        data = Object.keys(rawData).map((key) => {
            return { key: key, data: rawData[key] };
        });
    }
    const uid = (_a = sessionState === null || sessionState === void 0 ? void 0 : sessionState.authUser) === null || _a === void 0 ? void 0 : _a.uid;
    const createTaskList = (filterCondition) => {
        return data
            .filter(el => el && el.data && el.data.eventDate) // Ensure task and eventDate exist
            .map((el) => {
            const date = getISODateString(new Date(el.data.eventDate)); // el.data.eventDate is now checked
            if (filterCondition(date)) {
                return (_jsxs("li", { className: "task_item", children: [_jsx("span", { onClick: () => handleOpenModal(el.key), children: el.data.name + ' ' }), _jsx("button", { onClick: () => {
                                if (uid) { // Ensure uid is available
                                    void dispatch(removeTaskAction(el.key, uid));
                                }
                            }, type: "button", children: "Remove" })] }, el.key));
            }
            return null;
        });
    };
    // Ensure dates are defined before using them in filters
    const todayList = today && tomorrow ? createTaskList(date => date >= today && date < tomorrow) : [];
    const tomorrowList = tomorrow && upcoming ? createTaskList(date => date >= tomorrow && date < upcoming) : [];
    const upcomingList = upcoming ? createTaskList(date => date >= upcoming) : [];
    return (_jsxs("div", { className: "List", children: [_jsx(ModalEdit, { handleCloseModal: handleCloseModal, showModal: showModal, modalKey: modalKey }), "Today ", _jsx(TaskAdder, { day: "today" }), _jsx("ul", { children: todayList }), "Tomorrow ", _jsx(TaskAdder, { day: "tomorrow" }), _jsx("ul", { children: tomorrowList }), "Upcoming ", _jsx(TaskAdder, { day: "upcoming" }), _jsx("ul", { children: upcomingList })] }));
}
export default EventList;
