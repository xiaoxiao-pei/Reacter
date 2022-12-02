import '../css/header.css'
import React from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LoggedInContext } from "../App"
import LogoutButton from './LogoutButton';
import RegisterButton from './RegisterButton';


function Header() {

    const [isLoggedIn, setIsLoggedIn] = React.useContext(LoggedInContext);

    return (
        <div >
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/"> Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                            <NavDropdown title="Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#">Your profile</NavDropdown.Item>
                                <NavDropdown.Item href="#">Your projects</NavDropdown.Item>
                                <NavDropdown.Item href="#">Your credits</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#">Log out </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {isLoggedIn  && <LogoutButton />}
                        {!isLoggedIn && <RegisterButton/>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='container my-3'>
                <h3>
                     {isLoggedIn ? "Welcome!" : "Please login"}
                </h3>        
            </div>
           
        </div>
    );
}
export default Header;