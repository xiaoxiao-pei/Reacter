import '../css/App.css';
import React, { useState } from "react";
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



function UpdatePwd() {

    let userID = useParams().id;

    const navigate = useNavigate();

    const [password, setPassword] = useState();
    const [pwdValid, setPwdValid] = useState(true);

    const handleSubmit = (event) => {

        event.preventDefault(); 

        console.log(userID);

        //check if old password is valid
        fetch("http://localhost:3001/users/" + userID + "/oldPassword",
            {
                method: "POST",

                body: JSON.stringify({
                    userPassword: password,
                }),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                },

            })
            .then((data) => data.json())
            .then((json) => {
                if( json.success ) {
                    navigate("/user/" + userID + "/resetPWD"); //old password valid, go reset password page
                } else{
                    setPwdValid(false); //if old password not valid, show message to enter again
                }
            })

    }

    return (
        <div className='row'>
            <form className="reactForm col-8 col-md-6 col-lg-5 col-xl-4 text-center px-0 mt-5" onSubmit={handleSubmit}>
                <div className="form-body">
                    <div>
                        <h3 className='formTitle py-3'>Enter your old passord</h3>
                    </div>

                    {!pwdValid && <p>Sorry, the password you entered is wrong, try again</p>}

                    <div >
                        <FaLock className='form_icon' />
                        <input className="form__input mb-3" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>


                    <div className='form_button mb-4'>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" type="submit" >Confirm</Button>
                        </ThemeProvider>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default UpdatePwd;