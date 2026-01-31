import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const NavBar = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Navbar expand="lg" className="glass-navbar sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">LearnHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {user && user.type === 'teacher' && (
                            <Nav.Link as={Link} to="/teacher">Dashboard</Nav.Link>
                        )}
                        {user && (user.type === 'student' || user.type === 'admin') && (
                            <Nav.Link as={Link} to="/student">Courses</Nav.Link>
                        )}
                    </Nav>
                    <Nav className="align-items-center">
                        <Button 
                            variant="link" 
                            className="nav-link theme-toggle me-3 p-0" 
                            onClick={toggleTheme}
                            style={{ color: 'inherit', fontSize: '1.5rem' }}
                        >
                            {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
                        </Button>
                        
                        {user ? (
                            <>
                                <Navbar.Text className="me-3 d-none d-md-inline">
                                    {user.name} ({user.type})
                                </Navbar.Text>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="rounded-pill">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Button as={Link} to="/register" variant="primary" className="ms-lg-3 auth-btn rounded-pill border-0 px-4">
                                    Register
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
