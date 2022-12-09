import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/App.css'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactContext } from "../App";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";

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

    const navigate = useNavigate();

    const [user, setUser] = useState();

    const [motto, setMotto] = useState();
    const [isActive, setIsActive] = useState(true);
    const [isMottoUpdated, setIsMottoUpdated] = useState(false);
    const [isStatuesUpdated, setIsStatuesUpdated] = useState(false);

    let userID = useParams().userId;

    if (!userID){
         userID = JSON.parse(localStorage.getItem('user'))._id
    }
    
    useEffect(() => {

        fetch("http://localhost:3001/user/" + userID, { method: "GET" })
            .then((data) => data.json())
            .then((json) => setUser(json))
            .catch((error) => console.log(error))
    }, []);

    //handle update motto
    const updateMotto = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/users/" + userID + "/motto",
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
            .then(setIsMottoUpdated(true))

    }

    //handle update status
    const updateStatus = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/users/" + userID + "/status",
            {
                method: "PATCH",

                body: JSON.stringify({
                    userIsActive: isActive,
                }),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                },

            })
            .then((data) => data.json())
            .then(setIsStatuesUpdated(true))
    }


    return (user &&
        <div className='row'>
            <form className="reactForm col-10 col-lg-8  text-center px-0" >
                <div className="form-body">

                    <div>
                        {isUserLoggedIn && <h3 className='formTitle py-3'>Your profile</h3>}
                        {isAdminLoggedIn && <h3 className='formTitle py-3'>Profile of {user.userName}</h3>}
                    </div>

                    <div className="row px-3">

                        <div className='d-inline col-12 col-md-6'>

                            <div
                                className='mx-5'
                                style={{
                                    height: "50%",
                                }}
                            >
                                <img
                                    src={`http://localhost:3001/getImg/${user.userPhoto}`}
                                    alt="user head"
                                    style={{
                                        //height: "100%",
                                        width: "20vh",
                                    }}
                                />
                            </div>

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
                                <input className="col-6 form__input" type="text" placeholder={user.userMotto} value={motto} onChange={(event) => setMotto(event.target.value)} />
                                <button className='col-2 mt-3 mx-0 iconBtn' onClick={updateMotto}>
                                    {isMottoUpdated ?
                                        <AiOutlineCheck className='form_icon' />
                                        : <AiFillEdit className='form_icon' />
                                    }

                                </button>
                            </div>

                            <div className='row my-3'>
                                <div className='col-4 mt-3'><label className='d-flex justify-content-end'> Status:</label></div>
                                    {/* if is admin, he can edit the status */}
                                {isAdminLoggedIn && !user.userIsAdmin &&
                                    <>
                                        <div className='col-6'>
                                            <div className=" radio ">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="active"
                                                        checked={isActive}
                                                        onClick={() => setIsActive(true)}
                                                    />
                                                    Active
                                                </label>
                                            </div>
                                            <div className=" radio ">
                                                <label>
                                                    <input
                                                        type="radio"
                                                        value="banned"
                                                        checked={!isActive}
                                                        onClick={() => setIsActive(false)}
                                                    />
                                                    Banned
                                                </label>
                                            </div>
                                        </div>
                                        <button className='col-2 mt-3 mx-0 iconBtn' onClick={updateStatus}>
                                            {isStatuesUpdated ?
                                                <AiOutlineCheck className='form_icon' />
                                                : <AiFillEdit className='form_icon' />
                                            }
                                        </button>
                                    </>
                                }

                                {(!user.userIsAdmin || (isAdminLoggedIn && user.userIsAdmin)) &&
                                    <input className="col-6 form__input" type="text" value={user.userIsActive ? "Active" : "Banned"} readOnly={true} />
                                }
                            </div>

                            <div className='row my-3'>
                                <div className='col-4 mt-3'><label className='d-flex justify-content-end'> PostCount:</label></div>
                                <input className="col-6 form__input" type="text" value={user.userPostCount} readOnly={true} />
                            </div>

                            <div className='row my-3'>
                                <div className='col-4 mt-3'><label className='d-flex justify-content-end'> RegisterDate:</label></div>
                                <input className="col-6 form__input" type="text" value={user.userJoinTime.substring(0, 10)} readOnly={true} />
                            </div>

                            {!user.userIsAdmin &&
                                <div className='row my-3'>
                                    <ThemeProvider theme={theme}>
                                        <Button className='col-10' variant="contained"
                                            onClick={() => navigate("/user/" + userID + "/updatePWD")} >Reset Password</Button>
                                    </ThemeProvider>
                                </div>
                            }

                        </div>

                    </div>
                </div>

            </form>
        </div>

    )
}
export default UserProfile;