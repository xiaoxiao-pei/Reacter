import "./css/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Registration from "./pages/Registration.js";
import Login from "./pages/Login.js";
import About from "./pages/About.js";
import Profile from "./pages/Profile.js";
import Posts from "./pages/Posts.js";
import Authors from "./pages/Authors.js";
import AddPost from "./pages/AddPost.js";
import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import React, { useState } from "react";
import PostsUser from "./pages/Posts";
import PostsAdmin from "./pages/Posts";

import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

//administrator login statue
export const ReactContext = React.createContext({
  isAdminLoggedIn: false,
  setIsAdminLoggedIn: () => {},

  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
});

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [startTime, setStartTime] = useState();

  // const user = localStorage.getItem('user')

  // const mouseMoveHandle = () => {
  //   if (user) setStartTime(new Date().getTime());
  // };

  const navigate = useNavigate();
  // count down to rediret user to home page if no action during long time
  // useEffect(() => {
  //   if (user) {
  //     console.log("start counting down");
  //     const check = setInterval(() => {
  //       const timeDiff = new Date().getTime() - startTime;
  //       if (timeDiff >= 10 * 10 * 1000) {
  //         navigate("/timeout");
  //         localStorage.removeItem("user");

  //         return;
  //       }
  //       console.log("time left:" + timeDiff);
  //     }, 1000);
  //     return () => {
  //       clearInterval(check);
  //     };
  //   }
  // }, [startTime]);

  const contextProvide = [
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    isUserLoggedIn,
    setIsUserLoggedIn,
  ];

  // console.log(recAuthors);
  // onMouseMove={mouseMoveHandle}
  return (
    <ReactContext.Provider value={contextProvide}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="recAuthorPosts/:userId/:userName" element={<Posts />} />

          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Profile />} />
            <Route path="posts" element={<PostsUser />} />
            <Route path="add" element={<AddPost />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Profile />} />
            <Route path="posts" element={<PostsAdmin />} />
            <Route path="authors" element={<Authors />} />
            <Route path="author/profile/:userId" element={<Profile />} />
            <Route path="author/posts/:userId/:userName" element={<Posts />} />
          </Route>
          <Route path="*" element={<p>Invalid URL</p>} />
        </Route>
      </Routes>
    </ReactContext.Provider>
  );
}

export default App;
