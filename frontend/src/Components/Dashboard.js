import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Dashboard.css'; // optional for custom styling

function Dashboard() {
  const navigate = useNavigate();

  // Get username from Redux
  const username = useSelector((state) => state.user.username);

  const cards = [
    {
      title: 'Symptom Checker',
      description: 'Quickly analyze symptoms to get instant AI-powered health insights.',
      route: '/symptom-checker',
      img: '/assets/symptom-checker.png', // Replace with actual asset paths or Lottie if needed
    },
    {
      title: 'Skin disease detection',
      description: 'Quickly upload images to get instant AI-powered health insights.',
    //   route: '/skin-disease-detection',
      img: '/assets/skin-detection.png',
    },
    {
      title: 'Hospital Finder',
    //   description: 'Search hospitals near you based on affordability, specialization, and compatibility.',
    //   route: '/hospital-finder',
      img: '/assets/hospital-finder.png',
    },
    {
      title: 'Appointments',
      description: 'Book and manage appointments with AI-recommended doctors.',
    //   route: '/appointments',
      img: '/assets/appointments.png',
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
            onClick={() => navigate(card.route)}
            style={{ cursor: 'pointer' }}
          >
            <div>
              <h5 className="fw-bold">{card.title}</h5>
              <p>{card.description}</p>
            </div>
            <img src={card.img} alt={card.title} style={{ width: '100px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
