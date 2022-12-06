import React from "react";
import { Outlet } from "react-router-dom";
// import Header from "../layouts/Header";
// import Footer from "../layouts/Footer";
import Container from "react-bootstrap/Container";

function UserLayout() {
  return (
    <div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
export default UserLayout;
