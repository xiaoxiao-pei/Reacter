import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { ReactContext, ModeContext } from "../App";
import Icon from "../components/Icon";

function Header() {
  const navigate = useNavigate();
  const [
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    isUserLoggedIn,
    setIsUserLoggedIn,
  ] = React.useContext(ReactContext);
  const [isDark, setIsDark] = React.useContext(ModeContext);

  const btnDark = {
    backgroundColor: `black`,
    color: "#C2DCB1",
  };
  const btnLight = {
    backgroundColor: "#C2DCB1",
    color: "black",
  };

  const tabDark = {
    color: "#C2DCB1",
  };
  const tabLight = {
    color: "black",
  };

  const handleLogout = () => {
    console.log("logout start");

    setIsAdminLoggedIn(false);
    setIsUserLoggedIn(false);

    localStorage.clear("user");

    navigate("/");
  };

  return (
    <div className="header">
      <Navbar
        collapseOnSelect
        expand="md"
        style={
          isDark ? { backgroundColor: "black" } : { backgroundColor: "#C2DCB1" }
        }
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/" className="px-5">
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Icon />
              <div className="container my-3">
                <h4 style={{ color: "yellow" }}>
                  {isAdminLoggedIn || isUserLoggedIn
                    ? "Welcome! " +
                      JSON.parse(localStorage.getItem("user")).userName
                    : "Please login"}
                </h4>
              </div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" style={isDark ? tabDark : tabLight}>
                {" "}
                Home
              </Nav.Link>
              <Nav.Link href="/about" style={isDark ? tabDark : tabLight}>
                About
              </Nav.Link>

              {/* if no one login, show Register and login button */}
              {!(isAdminLoggedIn || isUserLoggedIn) && (
                <>
                  <Nav.Link
                    href="/register"
                    style={isDark ? tabDark : tabLight}
                  >
                    Register
                  </Nav.Link>
                  <Nav.Link href="/login" style={isDark ? tabDark : tabLight}>
                    Login
                  </Nav.Link>
                </>
              )}

              {isAdminLoggedIn && (
                <>
                  <NavDropdown title="Management" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/admin">
                      Your profile{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/admin/authors">
                      Authors
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/admin/posts">
                      Posts
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <button
                      className="mx-2"
                      style={{
                        backgroundColor: "white",
                        border: "none",
                      }}
                      onclick={handleLogout}
                    >
                      Log out
                    </button>
                  </NavDropdown>
                  <button
                    style={isDark ? tabDark : tabLight}
                    className="menuBtn"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              )}

              {isUserLoggedIn && (
                <>
                  <NavDropdown title="Management" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/user">
                      Your profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/user/posts">
                      Posts
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/user/add">+Post</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <button
                      className="mx-2"
                      style={{
                        backgroundColor: "white",
                        border: "none",
                      }}
                      onclick={handleLogout}
                    >
                      Log out
                    </button>
                  </NavDropdown>
                  <button
                    style={isDark ? btnDark : btnLight}
                    className="menuBtn"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              )}
            </Nav>

            {/* if is login, show logout button */}
            {isDark ? (
              <button
                className="menuBtn"
                style={{ color: "#C2DCB1" }}
                onClick={() => {
                  setIsDark(false);
                }}
              >
                Light
              </button>
            ) : (
              <button
                className="menuBtn"
                onClick={() => {
                  setIsDark(true);
                }}
              >
                Dark
              </button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ width: "100%", height: "2rem" }}></div>
    </div>
  );
}
export default Header;
