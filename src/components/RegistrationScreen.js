import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { auth, database } from '../App';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
function RegistrationScreen() {
    const [email, setEmail] = useState('Email');
    const [password, setPassword] = useState('Password');
    const [name, setName] = useState('Your name');
    const authUser = useSelector((state) => state.sessionState.authUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (authUser) {
            navigate('/', { replace: true });
        }
    }, [authUser, navigate]);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const onPress = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.uid);
            return set(ref(database, 'users/' + user.uid), ({ email: user.email, uid: user.uid, name: name }));
        })
            .then(() => {
            console.log("User created and data saved.");
        })
            .catch((error) => {
            const errorMessage = error.message;
            console.error("Registration Error:", errorMessage);
        });
    };
    return (_jsxs("div", { children: [_jsx("input", { onChange: handleNameChange, value: name, type: "text", id: "name", name: "name", placeholder: "Your name" }), _jsx("input", { onChange: handleEmailChange, value: email, type: "email", id: "email", name: "email", placeholder: "Email" }), _jsx("input", { onChange: handlePasswordChange, value: password, type: "password", id: "password", name: "password", placeholder: "Password" }), _jsx("button", { onClick: onPress, type: "button", children: "Create account" }), _jsx(Link, { to: "/", children: "Back " })] }));
}
export default RegistrationScreen;
