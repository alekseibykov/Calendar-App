import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../reducers/actions/tasksActions';
import TaskAdder from './TaskAdder';
import ModalEdit from './ModalEdit';
const DayTasks = ({ startDate }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalKey, setModalKey] = useState('');
    const rawData = useSelector((state) => state.data);
    const sessionState = useSelector((state) => state.sessionState);
    const dispatch = useDispatch();
    const handleRemove = (key, uid) => {
        if (uid) {
            dispatch(removeTask(key, uid));
        }
    };
    const handleOpenModal = (key) => {
        setShowModal(true);
        setModalKey(key);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const renderTasks = () => {
        let data = [];
        if (rawData !== null) {
            data = Object.keys(rawData).map((key) => {
                return { key: key, data: rawData[key] };
            });
        }
        const validStartDate = startDate;
        const today = new Date(validStartDate.getFullYear(), validStartDate.getMonth(), validStartDate.getDate());
        // The addDays method should be available via global declaration in tasksActions.ts
        const tomorrow = new Date(validStartDate.valueOf()); // Clone startDate
        tomorrow.setDate(tomorrow.getDate() + 1); // Standard way to add a day
        return data.map((el) => {
            if (!el || !el.data || !el.data.eventDate)
                return null; // Guard against undefined task data
            const date = new Date(el.data.eventDate);
            if (date >= today && date < tomorrow) {
                return (_jsxs("li", { className: "task_item", children: [_jsx("span", { onClick: () => handleOpenModal(el.key), children: el.data.name + ' ' }), _jsx("button", { onClick: () => { var _a; return handleRemove(el.key, (_a = sessionState === null || sessionState === void 0 ? void 0 : sessionState.authUser) === null || _a === void 0 ? void 0 : _a.uid); }, type: "button", children: "Remove" })] }, el.key));
            }
            return null;
        });
    };
    return (_jsxs("div", { children: [_jsxs("h2", { children: ["Tasks for this day ", _jsx(TaskAdder, { day: startDate })] }), _jsx(ModalEdit, { handleCloseModal: handleCloseModal, showModal: showModal, modalKey: modalKey }), _jsx("ul", { children: renderTasks() })] }));
};
export default DayTasks;
