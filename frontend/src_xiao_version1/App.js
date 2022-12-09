import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";
import About from "./pages/About.js";
//import Profile from "./pages/Profile.js";
import Posts from "./pages/Posts.js";
import Authors from "./pages/Authors.js";
import AddPost from "./pages/AddPost.js";
import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import React, { useState, useEffect } from "react";
import PostsUser from "./pages/Posts";
import PostsAdmin from "./pages/Posts";
import UserProfile from "./pages/UserProfile";
import ForgetPwd from "./pages/ForgetPwd";
import UpdatePWD from "./pages/UpdatePWD";
import ResetPwd from "./pages/ResetPwd";

import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

//administrator login statue
export const ReactContext = React.createContext({
  isAdminLoggedIn: false,
  setIsAdminLoggedIn: () => {},

  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
});

export const TimeoutContext = React.createContext({

  isTimeOut: false,
  setIsTimeOut: () => { },

});

export const ModeContext = React.createContext({

  isDark: true,
  setIsDark: () => { },

});

function App() {

  let isAdmin = false;
  let isUser = false;
  if(localStorage.getItem('user') !== null){
    let user = JSON.parse(localStorage.getItem('user'));
    isAdmin = user.userIsAdmin;
    console.log("isAdmin" );
    console.log(isAdmin);
    isUser = !isAdmin;
    console.log("isUser");
    console.log(isUser);
  }
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(isAdmin? true: false);
  console.log(isAdminLoggedIn);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isUser? true: false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [startTime, setStartTime] = useState();
  const [isDark, setIsDark] = useState(true);

  console.log()

  const user = localStorage.getItem("user");

  const mouseMoveHandle = () => {
    if (user) setStartTime(new Date().getTime());
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      //console.log("start counting down");
      const check = setInterval(() => {
        const timeDiff = new Date().getTime() - startTime;
        if (timeDiff >= 60 * 10 * 1000) {
          navigate("/login");
          localStorage.removeItem("user");
          setIsTimeOut(true);
          return;
        }
        //console.log("time left:" + timeDiff);
      }, 1000);
      return () => {
        clearInterval(check);
      };
    }
  }, [startTime]);

  const contextProvide = [
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    isUserLoggedIn,
    setIsUserLoggedIn,
    isTimeOut,
    setIsTimeOut,
  ];

  const timeOutProvide = [isTimeOut, setIsTimeOut];

  const modeProvide = [isDark, setIsDark];
return (
    <div>
      <ModeContext.Provider value={modeProvide}>
        <TimeoutContext.Provider value={timeOutProvide}>
          <ReactContext.Provider value={contextProvide}>
            <div onMouseMove={mouseMoveHandle}>
              <Routes>
                <Route path="/" element={<MainLayout />} >

                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="register" element={<Registration />} />
                  <Route path="login" element={<Login />} />
                  <Route path="login/forgetPWD" element={<ForgetPwd />} />
                  <Route
                    path="recAuthorPosts/:userId/:userName"
                    element={<Posts />}
                  />

                  <Route path="admin/" element={<AdminLayout />} >
                    <Route index element={<UserProfile />} />
                    <Route path="posts" element={<PostsAdmin />} />
                    <Route path="authors" element={<Authors />} />
                    <Route path="author/profile/:userId" element={<UserProfile />} />
                  <Route
                    path="author/posts/:userId/:userName"
                    element={<Posts />}
                  />
                  </Route>

                  <Route path="user/" element={<UserLayout />} >
                    <Route index element={<UserProfile />} />
                    <Route path=":id/resetPWD" element={<ResetPwd />} />
                    <Route path="profile/:userid" element={<UserProfile />} />
                    <Route path=":id/updatePWD" element={<UpdatePWD />} />
                    <Route path="posts" element={<PostsUser />} />
                    <Route path="add" element={<AddPost />} />
                    <Route
                      path="author/posts/:userId/:userName"
                      element={<Posts />}
                    />
                  </Route>

                  <Route path="*" element={<p>Invalid URL</p>} />
                </Route>
              </Routes>
            </div>
          </ReactContext.Provider>
        </TimeoutContext.Provider>
      </ModeContext.Provider >

    </div>)
 
}

export default App;
