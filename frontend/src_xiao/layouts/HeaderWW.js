import '../css/header.css'
import React from "react";
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import { useNavigate } from 'react-router-dom';
import { ReactContext } from "../App";
import { NavLink } from 'react-router-dom';



function Header() {

    const userType = localStorage.getItem('userName')
    // const navigate = useNavigate();
    const [isAdminLoggedIn, setIsAdminLoggedIn, isUserLoggedIn, setIsUserLoggedIn] = React.useContext(ReactContext);
    let headerBar
    let headerLeft

    if (!isAdminLoggedIn || !isUserLoggedIn) {
        headerBar = (
            <>
                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/">&nbsp;Home</NavLink>
                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/Login">&nbsp; Login</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/Register">&nbsp; Register</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/About">&nbsp; About</NavLink>
            </>
        )
        headerLeft = (
            <>
                <div>Please login</div>
            </>
        )
    } else if (isAdminLoggedIn) {
        headerBar = (
            <>
                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/">&nbsp; Home</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="Dis_Post">&nbsp; Posts</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/Rec_list">&nbsp; Authors</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/About">&nbsp;About</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/">&nbsp;Log out</NavLink>

            </>
        )
        headerLeft = (
            <>
                <div>
                    <span>Welcome!</span>{userType}
                </div>
            </>
        )
    } else {
        headerBar = (
            <>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/">&nbsp; Home</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="Dis_Post">&nbsp; Posts</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/Cre_Post">&nbsp; +Posts</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/About">&nbsp; About</NavLink>

                <NavLink className={({ isActive }) =>
                    isActive ? "link-active" : "link-inactive"} to="/">&nbsp;Log out</NavLink>

            </>
        )
        headerLeft = (
            <>
                <div>
                    <span>Welcome!</span>{userType}
                </div>
            </>
        )
    }

    return (
        <div className="header">
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    {/*<Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>*/}
                    {/*<Navbar.Toggle aria-controls="responsive-navbar-nav" />*/}
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <div className='container my-3'>
                                <h3 style={{ color: 'white' }}>
                                    {/* {localStorage.getItem('userName') ? "Welcome!" + localStorage.getItem('userName') : "Please login"} */}
                                    {headerLeft}
                                </h3>
                            </div>
                        </Nav>
                        <Nav className="me-auto me-auto-right">
                            {headerBar}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </div>
    );
}
export default Header;