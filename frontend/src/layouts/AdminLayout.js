import React from "react";
import { Outlet } from "react-router-dom";
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
