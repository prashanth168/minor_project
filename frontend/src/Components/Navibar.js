import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Features from './Features';

function Navibar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="py-3">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/726/726476.png"
            alt="Logo"
            style={{ width: '40px', marginRight: '10px' }}
          />
          <span className="fs-4 fw-bold">HealthMate</span>
        </Navbar.Brand>

        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/features">Features</Nav.Link>
          <Nav.Link as={Link} to="/about">About us</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
        </Nav>

        <div>
          {isLoggedIn ? (
            <FaUserCircle size={28} color="white" />
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/signup" className="btn btn-outline-light">Register</Link>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Navibar;
