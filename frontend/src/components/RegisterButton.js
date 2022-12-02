import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterButton() {
    const navigate = useNavigate();

    const showRegister = () => {
        navigate("/register");
    };

    return (
        <button onClick={showRegister}>Register</button>
    );
};

export default RegisterButton;