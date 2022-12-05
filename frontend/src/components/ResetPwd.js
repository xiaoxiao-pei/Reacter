import '../css/App.css';
import React, { useState } from "react";
import { FaLock } from "react-icons/fa"; //import react icons
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

// button style for material Button
const theme = createTheme({
    palette: {
        primary: {
            main: '#C2DCB1',
            darker: '#053e85',
        },
    },
});

const handleSubmit = () => {

}

function ResetPwd(){
    let { id, token } = useParams();

    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();

    fetch("/reset-password/" + id + "/" + token, { method: "GET" })
        .then((data) => data.json())
        .then((json) => alert(JSON.stringify(json)));

    return (
    <div className='row'>
        <form className="reactForm col-8 col-md-6 col-lg-5 col-xl-4 text-center px-0" onSubmit={handleSubmit}>
            <div className="form-body">
                <div>
                    <h3 className='formTitle py-3'>Please Log In</h3>
                </div>
                <div >
                    <FaLock className='form_icon' />
                    <input className="form__input mb-3" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                    <div >
                        <FaLock className='form_icon' />
                        <input className="form__input mb-3" type="password" placeholder="Retype Password" value={rePassword} onChange={(event) => setRePassword(event.target.value)} />
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

export default ResetPwd;