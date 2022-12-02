
import './css/App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import MainLayout from './layouts/MainLayout';
import React, { useState } from 'react';
import Login from './components/Login';
import Registration from './components/Registration';



export const AdminLoggedInContext = React.createContext({
  isAdminLoggedIn: false,
  setIsAdminLoggedIn: () => { },
});

export const ModeContext = React.createContext({
  mode: "light",
  setMode: () => { },
});



function App() {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [mode, setMode] = useState("light");
  const AdminloggedInProvide = [isAdminLoggedIn, setIsAdminLoggedIn]; // So we can pass down both value and setter
  const modeProvide = [mode, setMode];

  return (
  <div>
    <modeProvide.Provider value={modeProvide}>
      <AdminLoggedInContext.Provider value={AdminloggedInProvide}>
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="register" element={<Registration />} />
            <Route path="signin" element={<Login />} />
            <Route path="*" element={<p>Invalid URL</p>} />
          </Route>
        </Routes>

      </AdminLoggedInContext.Provider>
    </modeProvide.Provider>

  </div>)

}

export default App;
