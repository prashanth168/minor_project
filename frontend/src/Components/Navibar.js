import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import './Navibar.css';

function Navibar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleProfileClick = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="navibar">
      <div className="nav-container">
        {/* Logo + Brand */}
        <a href="/" className="nav-brand">
          <span className="nav-title">HealthMate</span>
        </a>

        {/* Section Links */}
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#about" className="nav-link">About us</a>
          <a href="#contact" className="nav-link">Contact us</a>
        </div>

        {/* Actions */}
        <div className="nav-actions">
          {user && user.token ? (
            <FaUserCircle
              size={28}
              className="profile-icon"
              title="Go to Dashboard"
              onClick={handleProfileClick}
            />
          ) : (
            <>
              <Link to="/signin" className="btn-login">Login</Link>
              <Link to="/signup" className="btn-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navibar;
