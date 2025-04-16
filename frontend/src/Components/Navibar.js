import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navibar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // assuming your slice is named `user`

  const handleProfileClick = () => {
    navigate('/dashboard');
  };

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
          {user && user.token ? (
            <FaUserCircle
              size={28}
              color="white"
              role="button"
              onClick={handleProfileClick}
              title="Go to Dashboard"
            />
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
