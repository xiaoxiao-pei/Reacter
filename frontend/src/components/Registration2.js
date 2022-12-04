import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/App.css'
import { FaUserAlt, FaEnvelope, FaLock  } from "react-icons/fa";//icons from fontawesome
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";

const theme = createTheme({
    palette: {
        primary: {
            main: '#C2DCB1',
            darker: '#053e85',
        },
    },
});

function RegistrationForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");
    const [motto, setMotto] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
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
                        <FaUserAlt className='form_icon'/>
                        <input className="form__input" type="text" id="username" placeholder="Username" 
                        {...register("Username", {required: true, pattern:/^\w{3,10}$/})
                        }
                        onChange={(event) => setUsername(event.target.value)} />
                        {errors.username && <p>Please check the username</p>}
                    </div>

                    <div >
                        <FaEnvelope className='form_icon' />
                        <input className="form__input" type="text" id="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>

                    <div >
                        <FaLock className='form_icon' />
                        <input className="form__input" type="password" id="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>

                    <div >
                        <FaLock className='form_icon' />
                        <input className="form__input" type="password" id="password" placeholder="Retype Password" value={rePassword} onChange={(event) => setRePassword(event.target.value)} />
                    </div>

                    <div >
                        <label className="form__label" htmlFor="password">Motto: </label> 
                        <input className="form__input" type="text" id="motto" placeholder="Moto" value={motto} onChange={(event) => setMotto(event.target.value)} />
                    </div>
                </div>
                <div className='form_button'>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" onClick = {handleSubmit(onSubmit)} >Register</Button>
                    </ThemeProvider>            
                </div>
            </form>
        </div>

    )
}
export default RegistrationForm;