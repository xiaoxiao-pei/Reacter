import '../css/header.css'
import React, { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ReactContext, ModeContext} from "../App";
import Icon from '../components/Icon';


function Header() {

    const navigate = useNavigate();
    const [isAdminLoggedIn, setIsAdminLoggedIn, isUserLoggedIn, setIsUserLoggedIn] = React.useContext(ReactContext);
    const [isDark, setIsDark] = React.useContext(ModeContext);

    const handleLogout = () => {

        setIsAdminLoggedIn(false);
        setIsUserLoggedIn(false);

        localStorage.clear("user");

        navigate("/")
    }


    return (
        <div >
            <Navbar collapseOnSelect expand="md" bg={isDark? "dark" :"light"} variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <Icon />
                        <span className="mx-4 fs-3 fw-bold fst-italic">YMH</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/"> Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>

                            {/* if no one login, show Register and login button */}
                            {!(isAdminLoggedIn || isUserLoggedIn) &&
                                <>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </>
                            }

                            {isAdminLoggedIn &&
                                <>
                                    <NavDropdown title="Management" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/admin">Your profile</NavDropdown.Item>
                                        <NavDropdown.Item href="/admin/authors">Authors</NavDropdown.Item>
                                        <NavDropdown.Item href="/admin/posts">Posts</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <button
                                            className='mx-2'
                                            style={{
                                                backgroundColor: "white",
                                                border: "none",
                                            }}
                                            onclick={handleLogout}
                                        >Log out</button>
                                    </NavDropdown>
                                    <Button
                                        variant="dark"
                                        onclick={handleLogout}>
                                        Log out
                                    </Button>

                                </>
                            }

                            {isUserLoggedIn &&
                                <>
                                    <NavDropdown title="Management" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/user">Your profile</NavDropdown.Item>
                                        <NavDropdown.Item href="/user/posts">Posts</NavDropdown.Item>
                                        <NavDropdown.Item href="/user/add">+Post</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <button
                                            className='mx-2'
                                            style={{
                                                backgroundColor: "white",
                                                border: "none",
                                            }}
                                            onclick={handleLogout}
                                        >Log out</button>
                                    </NavDropdown>
                                    <Button
                                        variant="dark"
                                        onclick={handleLogout}>
                                        Log out
                                    </Button>
                                </>
                            }

                        </Nav>


                        {/* if is login, show logout button */}
                        {isDark
                            ?<button onClick={() => { setIsDark(false); }} > Light </button>
                            : <button onClick={() => { setIsDark(true); }}> Dark </button>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='container my-3'>
                <h4 style={{ color: 'white' }}>
                    {(isAdminLoggedIn || isUserLoggedIn)
                        ? "Welcome! " + JSON.parse(localStorage.getItem('user')).userName 
                        : "Please login"}
                </h4>
            </div>

        </div>
    );
}
export default Header;