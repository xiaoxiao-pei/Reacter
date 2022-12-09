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


function ForgetPwd() {

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [emailSent, setEmailSent] = useState(false);

    const [code, setCode] = useState();

    var userID;

    //check if email is exist, if exist send a recovery code to this email
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
                if (json.success) {
                    setEmailSent(true);
                    localStorage.setItem("userID", json.userID);
                } else {
                    console.log("Email wrong.");
                }
            });
    }

    // check if the code is right, if it's right redirect to reset password page
    const handleRecoveryCode = (event) => {

        event.preventDefault();

        fetch("http://localhost:3001/forgotPassword/verifyCode", {
            method: "POST",
            body: JSON.stringify({
                code: code,
            }),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
            },

        })
            .then((data) => data.json())
            .then((json) => {
                console.log(json);
                if(json.success){
                    let userID = localStorage.getItem("userID");
                    localStorage.clear("userID");
                    navigate("/user/" + userID + "/resetPWD") 
                }else{
                    console.log("Code wrong.");
                    localStorage.clear("userID");
                }
            });
    }


    return (

        <div className='row'>
            <div className="form-body mt-5">

                {/* after email sent successfully show login button */}
                {emailSent &&
                    <form className='reactForm col-8 col-md-6 col-lg-5 col-xl-4 text-center p-3' onSubmit={handleRecoveryCode}>

                        <h6> Email already sent successfully! </h6>
                        <h6> Enter the code </h6>
                        <div >
                            <input className="form__input mb-3" type="text" placeholder="Code" value={code} onChange={(event) => setCode(event.target.value)} />
                        </div>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" type="submit"> Reset Password </Button>
                        </ThemeProvider>
                    </form>
                }

                {/* haven't sent email, show forget password form */}
                {!emailSent &&

                    <form className="reactForm col-8 col-md-6 col-lg-5 col-xl-4 text-center px-0 pb-3" onSubmit={handleForgetPwd}>
                        <div>
                            <h3 className='formTitle py-3'>Forget Password</h3>
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

export default ForgetPwd;