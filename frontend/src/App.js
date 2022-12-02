
import './css/App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import MainLayout from './layouts/MainLayout';
import React, { useState } from 'react';
import Login from './components/Login';
import Registration from './components/Registration';


//administrator login statue
export const AdminLoggedInContext = React.createContext({
  isAdminLoggedIn: false,
  setIsAdminLoggedIn: () => { },
});

//user login statue
export const UserLoggedInContext = React.createContext({
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => { },
});

//display mode(dark/light)
export const ModeContext = React.createContext({
  mode: "light",
  setMode: () => { },
});



function App() {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [mode, setMode] = useState("light");


  const adminLoggedInProvide = [isAdminLoggedIn, setIsAdminLoggedIn];
  const userLoggedInProvide = [isUserLoggedIn, setIsUserLoggedIn];
  const modeProvide = [mode, setMode];

  return (
    <div>
      <ModeContext.Provider value={modeProvide}>
        <AdminLoggedInContext.Provider value={adminLoggedInProvide}>
          <UserLoggedInContext.Provider value={userLoggedInProvide}>
            <Routes>
              <Route path="/" element={<MainLayout />} >
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="register" element={<Registration />} />
                <Route path="signin" element={<Login />} />
                <Route path="*" element={<p>Invalid URL</p>} />
              </Route>
            </Routes>
          </UserLoggedInContext.Provider>
        </AdminLoggedInContext.Provider>
      </ModeContext.Provider>

    </div>)

}

export default App;
