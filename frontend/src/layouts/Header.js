import '../css/header.css'
import React, { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { ReactContext } from "../App";


function Header() {

    const navigate = useNavigate();
    const [isAdminLoggedIn, setIsAdminLoggedIn, isUserLoggedIn, setIsUserLoggedIn] = React.useContext(ReactContext);
    const [user, setUser] = useState();


    return (
        <div >
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">YMH</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/"> Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <NavDropdown title="Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#">Your profile</NavDropdown.Item>
                                <NavDropdown.Item href="#">Your projects</NavDropdown.Item>
                                <NavDropdown.Item href="#">Your credits</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#">Log out </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                      {isUserLoggedIn && 
                        // {user && !user.userIsAdmin && 
                            <button onClick={() => { navigate("/user/" + localStorage.getItem('userID') + "/profile") }}>Profile</button>
                        }


                        {/* if not login, show Register and login button */}
                         {!(isAdminLoggedIn || isUserLoggedIn) && 
                            <div>
                                <button onClick={() => { navigate("/register") }}>Register</button>
                                <button onClick={() => { navigate("/login"); }}>Login</button>
                            </div>
                        }

                        {/* if is login, show logout button */}
                        {(isAdminLoggedIn || isUserLoggedIn) &&
                            <button
                                onClick={() => {
                                    setIsAdminLoggedIn(false);
                                    setIsUserLoggedIn(false);
                                    localStorage.clear("user");
                                    setUser(null);
                                    navigate("/")
                                }} >
                                logout</button>}
                                
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='container my-3'>
                <h3 style={{ color: 'white' }}>
                    {(isAdminLoggedIn || isUserLoggedIn) ? "Welcome!" + localStorage.getItem('userName') : "Please login"}
                </h3>
            </div>

        </div>
    );
}
export default Header;