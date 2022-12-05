
import './css/App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import MainLayout from './layouts/MainLayout';
import React, { useState } from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import ForgetPwd from './components/ForgetPwd';
import ResetPwd from './components/ResetPwd';
import UserProfile from './components/UserProfile';

export const ReactContext = React.createContext({

  isAdminLoggedIn: false,
  setIsAdminLoggedIn: () => { },

  isUserLoggedIn: false,
  setIsUserLoggedIn: () => { },

});



function App() {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const contextProvide = [isAdminLoggedIn, setIsAdminLoggedIn, isUserLoggedIn, setIsUserLoggedIn]

  return (
    <div>

      <ReactContext.Provider value={contextProvide}>
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="register" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="login/forgetPWD" element={<ForgetPwd />} />
            <Route path="login/resetPWD/:id/:token" element={<ResetPwd />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="*" element={<p>Invalid URL</p>} />
          </Route>
        </Routes>
      </ReactContext.Provider>

    </div>)

}

export default App;
