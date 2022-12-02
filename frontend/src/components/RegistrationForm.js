import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/users/register",
            {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                },

            })
            .then((data) => data.json())
            .then((json) => {
                alert(JSON.stringify(json) +", Please login!");
                navigate('/');
            });

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-body">
                <div className="username">
                    <label className="form__label" htmlFor="username">Username </label>
                    <input className="form__input" type="text" id="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>

                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password" id="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
            </div>
            <div >
                <button type="submit"  >Register</button>
            </div>
        </form>
    )
}
export default RegistrationForm;