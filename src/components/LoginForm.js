var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { auth } from '../App';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
const LoginForm = () => {
    const [email, setEmail] = useState('Email@gmail.com');
    const [password, setPassword] = useState('Password');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const onPress = () => __awaiter(void 0, void 0, void 0, function* () {
        setError('');
        setLoading(true);
        try {
            yield signInWithEmailAndPassword(auth, email, password);
        }
        catch (err) {
            onLoginFail(err);
        }
    });
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onLoginFail = (err) => {
        let errorMessage = 'Authentication Failed';
        if (err && err.message) {
            errorMessage = err.message;
        }
        setError(errorMessage);
        setLoading(false);
    };
    const renderButton = () => {
        if (loading) {
            return _jsx("div", { children: "Loading..." });
        }
        return (_jsx("button", { onClick: () => void onPress(), type: "button", children: "Log In" }));
    };
    return (_jsxs("div", { children: [_jsx("input", { onChange: handleEmailChange, value: email, type: "email", id: "email", name: "email", placeholder: "Email" }), _jsx("br", {}), _jsx("br", {}), _jsx("input", { onChange: handlePasswordChange, value: password, type: "password", id: "password", name: "password", placeholder: "Password" }), _jsx("br", {}), _jsx("br", {}), _jsx("div", { style: styles.errorTextStyle, children: error }), renderButton(), _jsx(Link, { to: "/registration/", children: "Registration " })] }));
};
const styles = {
    errorTextStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'red'
    }
};
export default LoginForm;
