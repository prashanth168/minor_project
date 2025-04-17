import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdHealthAndSafety } from 'react-icons/md';
import { FaDiagnoses, FaHospital, FaCalendarCheck } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  const cards = [
    {
      title: 'Symptom Checker',
      description: 'Quickly analyze symptoms to get instant AI-powered health insights.',
      route: '/symptom-checker',
      icon: <MdHealthAndSafety size={40} color="#007BFF" />,
    },
    {
      title: 'Skin disease detection',
      description: 'Quickly upload images to get instant AI-powered health insights.',
      route: '/image-detection',
      icon: <FaDiagnoses size={40} color="#28A745" />,
    },
    {
      title: 'Hospital Finder',
      // description: 'Search hospitals near you based on affordability, specialization, and compatibility.',
      // route: '/hospital-finder',
      icon: <FaHospital size={40} color="#FFC107" />,
    },
    {
      title: 'Appointments',
      description: 'Book and manage appointments with AI-recommended doctors.',
      // route: '/appointments',
      icon: <FaCalendarCheck size={40} color="#DC3545" />,
    },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="welcome-text">Welcome Back {username}!</h2>
      <div className="cards-grid">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="dashboard-card"
            onClick={() => card.route && navigate(card.route)}
            style={{ cursor: card.route ? 'pointer' : 'not-allowed' }}
          >
            <div className="card-content">
              <h5 className="fw-bold">{card.title}</h5>
              <p>{card.description}</p>
            </div>
            <div className="icon-wrapper">{card.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
