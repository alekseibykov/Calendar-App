import { jsx as _jsx } from "react/jsx-runtime";
import "firebase/database";
import "firebase/auth";
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import HomeContent from './HomeContent';
const HomeScreen = () => {
    const authUser = useSelector((state) => state.sessionState.authUser);
    return (_jsx("div", { children: authUser ? _jsx(HomeContent, {}) : _jsx(LoginForm, {}) }));
};
export default HomeScreen;
