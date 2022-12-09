import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Container from "react-bootstrap/Container";

function MainLayout() {
  return (
    <div className="page" >
    <Header /> 
      <Container >
        <Outlet />
      </Container>

      <Footer /> 
    </div>
  );
}
export default MainLayout;
