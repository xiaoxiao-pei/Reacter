import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Container from "react-bootstrap/Container";
import { ModeContext } from '../App';

function MainLayout() {
  const [isDark, setIsDark] = React.useContext(ModeContext);

  const pageDark = {
    backgroundColor:"#080a3f"
  }

  const pageLight ={
    backgroundColor: "#f9f4d9"
  }

  return (
    <div style={isDark ? pageDark : pageLight} className ="page">
    <Header /> 
      <Container >
        <Outlet />
      </Container>

      <Footer /> 
    </div>
  );
}
export default MainLayout;
