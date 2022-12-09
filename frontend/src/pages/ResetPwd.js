import '../css/App.css';
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa"; //import react icons
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// button style for material Button
const theme = createTheme({
    palette: {
        primary: {
            main: '#C2DCB1',
            darker: '#053e85',
        },
    },
});


function ResetPwd() {

    const navigate = useNavigate();

    let userID = useParams().id;

    const [isReset, setIsReset] = useState(false);

    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [passwordErr, setPasswordErr] = useState(false);
    const [rePasswordErr, setRePasswordErr] = useState(false);

    const validate = () => {

        //validation for password, at least one letter, at least one number, at least 6 characters
        const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

        if (!validPassword.test(password)) {
            setPasswordErr(true);
        } else {
            setPasswordErr(false);
        }
        //validation for retype password, must equal password
        if (rePassword !== password) {
            setRePasswordErr(true);
        } else {
            setRePasswordErr(false);
        }
    }


    // reset new password
    const handleSubmit = (event) => {

        event.preventDefault();

        validate();

        fetch("http://localhost:3001/users/" + userID + "/resetPassword",
            {
                method: "PATCH",

                body: JSON.stringify({
                    userPassword: password,
                }),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                },

            })
            .then((data) => data.json())
            .then((json) => {
                if (json.success) {
                    setIsReset(true);
                } else {
                    alert("failed, please reset again.")
                }
            })
    }

    return (
        < div className='row' >
            {isReset &&
                <div className="reactForm col-8 col-md-6 col-lg-5 col-xl-4 text-center px-0 mt-5" >
                    <div>
                        <h3 className='formTitle py-3'>Confirmed! Please log in</h3>
                    </div>
                    <div className='form_button mb-4'>
                        <ThemeProvider theme={theme}>
                             <Button variant="contained" onClick={() =>navigate('/login')} >login</Button>
                        </ThemeProvider>
                    </div>
                </div>
            }

            {!isReset &&
                <form className="reactForm col-8 col-md-6 col-lg-5 col-xl-4 text-center px-0 mt-5" onSubmit={handleSubmit}>
                    <div className="form-body">
                        <div>
                            <h3 className='formTitle py-3'>Reset Password</h3>
                        </div>
                        <div >
                            <FaLock className='form_icon' />
                            <input className="form__input mb-3" type="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                            <p className='inputErr'> {passwordErr ? '* Password must have at least one letter, at least one number, and at least 6 characters' : ''} </p>
                        </div>
                        <div >
                            <FaLock className='form_icon' />
                            <input className="form__input mb-3" type="password" placeholder="Retype Password" value={rePassword} onChange={(event) => { setRePassword(event.target.value) }} />
                            <p className='inputErr'> {rePasswordErr ? "* Password doesn't match" : ''} </p>
                        </div>
                        <div className='form_button mb-4'>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" type="submit" >Confirm</Button>
                            </ThemeProvider>
                        </div>
                    </div>
                </form>
            }
        </div>
    )

}

export default ResetPwd;