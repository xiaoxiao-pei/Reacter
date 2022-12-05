import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import '../css/App.css'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactContext } from "../App";
import { AiFillEdit } from "react-icons/ai";

const theme = createTheme({
    palette: {
        primary: {
            main: '#C2DCB1',
            darker: '#053e85',
        },
    },
});

function UserProfile() {
    const [isAdminLoggedIn, setIsAdminLoggedIn, isUserLoggedIn, setIsUserLoggedIn] = React.useContext(ReactContext);

    const [user, setUser] = useState("");

    const [motto, setMotto] = useState();

    let userName = localStorage.getItem("userName");

    useEffect(() => {

        fetch("http://localhost:3001/user?_id=" + localStorage.getItem("userID"), { method: "GET" })
            .then((data) => data.json())
            .then((json) => {setUser(json); setMotto(user.userMotto)})
            .catch((error) => console.log(error))
    }, []);

    //handle form submission
    const updateMotto = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/users/" + localStorage.getItem("userID") + "/motto",
            {
                method: "PATCH",

                body: JSON.stringify({
                    userMotto: motto,
                }),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                },

            })
            .then((data) => data.json())

    }

    return (user &&
        <div className='row'>
            <form className="reactForm col-10 col-lg-8 col-xl-6 text-center px-0" >
                <div className="form-body">

                    <div>
                        {isUserLoggedIn && <h3 className='formTitle py-3'>Your profile</h3>}
                        {isAdminLoggedIn && <h3 className='formTitle py-3'>Profile of {userName}</h3>}
                    </div>

                    <div className="row px-3">

                        <div className='d-inline col-12 col-md-6'>
                            <div>img</div>

                            <div className='row my-3'>
                                <div className='col-4 mt-3'><label className='d-flex justify-content-end'> Username:</label></div>
                                <input className="col-6 form__input" type="text" value={user.userName} readOnly={true} />
                            </div>

                            <div className='row my-3'>
                                <div className='col-4 mt-3'><label className='d-flex justify-content-end'> Email:</label></div>
                                <input className="col-6 form__input" type="text" value={user.userEmail} readOnly={true} />
                            </div>

                        </div>

                        <div className='d-inline col-12 col-md-6'>

                            <div className='row  my-3'>
                                <div className='col-4 mt-3'><label className='d-flex justify-content-end'> Motto:</label></div>
                                <input className="col-6 form__input" type="text" value={motto} onChange={(event) => setMotto(event.target.value)} />
                                <button className='col-2 mt-3 mx-0 iconBtn' onClick={updateMotto}>
                                    <AiFillEdit className='form_icon' />
                                </button>
                            </div>

                            <div className='row my-3'>
                                <div className='col-4 mt-3'><label className='d-flex justify-content-end'> Status:</label></div>
                                <input className="col-6 form__input" type="text" value={user.userIsActive ? "active" : "banned"} readOnly={true} />
                            </div>

                            <div className='row my-3'>
                                <div className='col-4 mt-3'><label className='d-flex justify-content-end'> PostCount:</label></div>
                                <input className="col-6 form__input" type="text" value={user.userPostCount} readOnly={true} />
                            </div>

                            <div className='row my-3'>
                                <div className='col-4 mt-3'><label className='d-flex justify-content-end'> RegisterDate:</label></div>
                                <input className="col-6 form__input" type="text" value={user.userJoinTime.substring(0, 10)} readOnly={true} />
                            </div>

                            <div className='row my-3'>
                                <ThemeProvider theme={theme}>
                                    <Button className='col-10' variant="contained" type="submit" >Reset Password</Button>
                                </ThemeProvider>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>

    )
}
export default UserProfile;