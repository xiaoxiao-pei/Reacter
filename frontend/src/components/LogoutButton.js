import { LoggedInContext } from "../App";
import React from 'react';

function LogoutButton(){

    const [isLoggedIn, setIsLoggedIn] = React.useContext(LoggedInContext);

    const callLogout = (event) => {
         setIsLoggedIn(false);
    }

    return(
        <button onClick={callLogout}>Log out</button>
    );
};

export default LogoutButton;
