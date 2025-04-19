import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { clearUser } from '../Components/userSlice';
import './Navibar.css';

function Navibar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/signin');
  };

  return (
    <nav className="navibar">
      <div className="nav-container">
        {/* Logo + Brand */}
        <Link to="/" className="nav-brand">
          <span className="nav-title">HealthMate</span>
        </Link>

        {/* Section Links */}
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#about" className="nav-link">About us</a>
          <a href="#contact" className="nav-link">Contact us</a>
        </div>

        {/* User Actions */}
        <div className="nav-actions">
          {user && user.token ? (
            <>
              <FaUserCircle
                size={28}
                className="profile-icon me-3"
                title="Profile"
                onClick={handleProfileClick}
                style={{ cursor: 'pointer' }}
              />
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
                style={{ marginLeft: '10px' }}
              >
                Logout
              </button>
            </>
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
