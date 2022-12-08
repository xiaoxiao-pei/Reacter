import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Container from 'react-bootstrap/Container';
import '../css/App.css'

function MainLayout() {
    return <div  className="pageBody" >
        <Header />
        <Container id="container">
             <Outlet />
        </Container>
       
        <Footer /> 
    </div>
} 
export default MainLayout;