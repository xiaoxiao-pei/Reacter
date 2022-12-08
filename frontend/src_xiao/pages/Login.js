import "../css/App.css";
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ReactContext } from "../App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C2DCB1",
      darker: "#053e85",
    },
  },
});

function LoginForm() {
  const [
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    isUserLoggedIn,
    setIsUserLoggedIn,
  ] = React.useContext(ReactContext);

  const navigate = useNavigate();
  //const [isLoggedIn, setIsLoggedIn] = React.useContext(LoggedInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page reload
    fetch("http://localhost:3001/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    })
      .then((data) => data.json())
      .then((json) => {
        alert(JSON.stringify(json));
        localStorage.setItem("userName", json.userName);
        localStorage.setItem("userID", json.userID);
        json.isAdmin ? setIsAdminLoggedIn(true) : setIsUserLoggedIn(true);
        navigate("/");
        //json.success ? setIsLoggedIn(true) : setIsLoggedIn(false);
      });
  };
  return (
    <div className="row">
      <form
        className="loginForm col-8 col-md-6 col-lg-5 col-xl-4 text-center px-0"
        onSubmit={handleSubmit}
      >
        <div className="form-body">
          <div>
            <h3 className="formTitle py-3">Please Log In</h3>
          </div>
          <div>
            <FaEnvelope className="form_icon" />
            <input
              className="form__input mb-3"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <FaLock className="form_icon" />
            <input
              className="form__input mb-3"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="form_button mb-4">
            <ThemeProvider theme={theme}>
              <Button variant="contained" type="submit">
                Confirm
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
