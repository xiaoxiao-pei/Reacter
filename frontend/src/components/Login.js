import React, { useRef } from "react";
//import { LoggedInContext } from "../App";

function LoginForm() {
    //const [isLoggedIn, setIsLoggedIn] = React.useContext(LoggedInContext);
    const usernameRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent page reload
        fetch("http://localhost:3001/users/login", {
            method: "POST",
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            }),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
            },

        })
            .then((data) => data.json())
            .then((json) => {
                alert(JSON.stringify(json));
                //json.success ? setIsLoggedIn(true) : setIsLoggedIn(false);
            });
    }
    return (
        <form onSubmit={handleSubmit} className="centerText my-3" >
            <tr>
                <td className="px-3"><label htmlFor="username">Username: </label></td>
                <td><input id="username" type="text" ref={usernameRef} required /></td>
            </tr>
            <br />
            <tr>
                <td className="px-3"><label htmlFor="password">Password: </label></td>
                <td><input id="password" type="password" ref={passwordRef} required /></td>
            </tr>
            <br />

            <tr>
                <td colSpan={2} className="px-3">
                    <button type="submit">Login</button>
                </td>
            </tr>
        </form>


        
    );
}

export default LoginForm;


