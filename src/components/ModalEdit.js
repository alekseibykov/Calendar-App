import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { changeTaskName, changeTaskDate } from '../reducers/actions/tasksActions';
import { useAppSelector, useAppDispatch } from "../App";
const ModalEdit = (props) => {
    const [name, setName] = useState('');
    // Initialize startDate with Date or null for better type handling with DatePicker
    const [startDate, setStartDate] = useState(null);
    const allTasks = useAppSelector(state => state.data); // state.data is tasksReducer state
    const authUser = useAppSelector(state => state.sessionState.authUser);
    const dispatch = useAppDispatch();
    const currentTask = props.modalKey && allTasks ? allTasks[props.modalKey] : null;
    useEffect(() => {
        if (currentTask) {
            setName(currentTask.name);
            setStartDate(currentTask.eventDate ? new Date(currentTask.eventDate) : null);
        }
        else {
            setName('');
            setStartDate(null);
        }
    }, [currentTask, props.showModal]); // Reset form when modalKey changes or modal opens
    const handleInputChange = (e) => {
        setName(e.target.value);
    };
    const handleChangeName = () => {
        if (!authUser || !authUser.uid || !props.modalKey) {
            console.error("User not authenticated or task key missing, cannot change task name.");
            return;
        }
        const currentTaskObject = {
            key: props.modalKey,
            name: name,
            uid: authUser.uid,
        };
        dispatch(changeTaskName(currentTaskObject));
        props.handleCloseModal();
    };
    const handleDateChange = (date) => {
        setStartDate(date);
    };
    const handleChangeDate = () => {
        if (!authUser || !authUser.uid || !props.modalKey || !startDate) {
            console.error("User not authenticated, task key, or date missing, cannot change task date.");
            return;
        }
        const currentTaskObject = {
            key: props.modalKey,
            // Ensure date is a Date object as expected by CurrentTaskPayload
            date: startDate,
            uid: authUser.uid,
        };
        dispatch(changeTaskDate(currentTaskObject));
        props.handleCloseModal();
    };
    const el = document.getElementById("root");
    if (!el) {
        console.error("Root element #root not found for ReactModal appElement.");
        return null;
    }
    if (!props.showModal) { // Don't render anything if modal is not shown
        return null;
    }
    return (_jsxs(ReactModal, { isOpen: props.showModal, contentLabel: "Edit Task Modal", appElement: el, onRequestClose: props.handleCloseModal, children: [_jsx("button", { onClick: props.handleCloseModal, children: "Close Modal" }), _jsx("br", {}), _jsx("br", {}), _jsx("input", { onChange: handleInputChange, value: name, type: "text", id: "name", name: "name", placeholder: "Task name" }), _jsx("button", { onClick: handleChangeName, children: "Change name" }), _jsx("br", {}), _jsx("br", {}), _jsx(DatePicker, { selected: startDate, onChange: handleDateChange, placeholderText: "Select date" }), _jsx("button", { onClick: handleChangeDate, disabled: !startDate, children: "Change date" })] }));
};
export default ModalEdit;
