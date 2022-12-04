import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css'
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";//icons from fontawesome
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#C2DCB1',
            darker: '#053e85',
        },
    },
});

function RegistrationForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");
    const [motto, setMotto] = useState("");

    const [usernameErr, setUsernameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [rePasswordErr, setRePasswordErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false); const navigate = useNavigate();

    //validation for input fields
    const validate = () => {

        const validUsername = new RegExp('^[a-zA-Z0-9]{3,10}$')
        if (!validUsername.test(username)){
            console.log("username wrong");
            setUsernameErr(true);
        }

        //validation for password, at least one letter, at least one number, at least 6 characters
        const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
        if (!validPassword.test(password)) {
            setPasswordErr(true);
        }

        //validation for retype password, must equal password
        if (rePassword !== password) {
            setRePasswordErr(true);
        }

        //validation for email
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$' );
        if (!validEmail.test(email)) {
            setEmailErr(true);
        }
    }

    //handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        validate();

        if (usernameErr || passwordErr || rePasswordErr || emailErr) {
            return
        }

        fetch("http://localhost:3001/users/register",
            {
                method: "POST",

                body: JSON.stringify({
                    userName: username,
                    userEmail: email,
                    userPassword: password,
                    rePassword: rePassword,
                    userMotto: motto,

                }),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                },

            })
            .then((data) => data.json())
            .then((json) => {
                alert(JSON.stringify(json) + ", Please login!");
                navigate('/');
            });

    }

    return (
        <div className='row'>
            <form className="regisForm col-10 col-md-6 text-center px-0" onSubmit={handleSubmit}>
                <div className="form-body">
                    <div>
                        <h3 className='formTitle py-3'>Create Your Account</h3>
                    </div>
                    <div >
                        <FaUserAlt className='form_icon' />
                        <input className="form__input" type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
                        <p className='inputErr'> {usernameErr? '* Username must have 3-10 characters':''} </p>
                    </div>

                    <div >
                        <FaEnvelope className='form_icon' />
                        <input className="form__input" type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <p className='inputErr'> {emailErr ? '* Email format wrong' : ''} </p>
                    </div>

                    <div >
                        <FaLock className='form_icon' />
                        <input className="form__input" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <p className='inputErr'> {passwordErr ? '* Password must have at least one letter, at least one number, and at least 6 characters' : ''} </p>
                    </div>

                    <div >
                        <FaLock className='form_icon' />
                        <input className="form__input" type="password" placeholder="Retype Password" value={rePassword} onChange={(event) => setRePassword(event.target.value)} />
                        <p className='inputErr'> {rePasswordErr ? "* Password doesn't match": ''} </p>

                    </div>

                    <div >
                        <label className="form__label" htmlFor="password">Motto: </label>
                        <input className="form__input" type="text" id="motto" placeholder="Moto" value={motto} onChange={(event) => setMotto(event.target.value)} />
                    </div>
                </div>
                <div className='form_button'>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" onClick={handleSubmit} >Register</Button>
                    </ThemeProvider>
                </div>
            </form>
        </div>

    )
}
export default RegistrationForm;