import '../css/App.css';
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa"; //import react icons
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
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

    const [email, setEmail] = useState();
    const [emailSent, setEmailSent] = useState(false);

    const handleForgetPwd = (event) => {
        event.preventDefault(); // prevent page reload
        fetch("http://localhost:3001/forgotPassword", {
            method: "POST",
            body: JSON.stringify({
                email: email,
            }),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
            },

        })
            .then((data) => data.json())
            .then((json) => {
                alert(JSON.stringify(json));
                json.success ? setEmailSent(true) : console.log("Email wrong.");
            });
    }


    return (

        <div className='row'>
            <div className="form-body ">

                {/* after email sent successfully show login button */}
                {emailSent &&
                    <div className='reactForm col-8 col-md-6 col-lg-5 col-xl-4 text-center p-3'>
                        <h6> Email already sent successfully! </h6>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained"  onClick = { () => {navigate('/login') } } >Login </Button>
                        </ThemeProvider>
                    </div>
                }

                {/* haven't sent email, show forget password form */}
                {!emailSent &&

                    <form className="reactForm col-8 col-md-6 col-lg-5 col-xl-4 text-center px-0 pb-3" onSubmit={handleForgetPwd}>
                        <div>
                            <h3 className='formTitle py-3'>Reset Password</h3>
                        </div>
                        <div >
                            <FaEnvelope className='form_icon' />
                            <input className="form__input mb-3" type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className='form_button my-4'>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" type="submit" >Send Reset Code </Button>
                            </ThemeProvider>
                        </div>

                    </form >
                }
            </div>
        </div>

    );

}

export default ResetPwd;