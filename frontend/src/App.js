
import './css/App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import MainLayout from './layouts/MainLayout';
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

export const LoggedInContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
});




function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedInValueToProvide = [isLoggedIn, setIsLoggedIn]; // So we can pass down both value and setter

  return (<div>

    <LoggedInContext.Provider value={loggedInValueToProvide}>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={isLoggedIn? <Home />:<LoginForm />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="*" element={<p>Invalid URL</p>} />
        </Route>
      </Routes>
    </LoggedInContext.Provider>



  </div>)

}



export default App;
