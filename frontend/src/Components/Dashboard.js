import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaStethoscope, FaImage, FaHospitalAlt, FaCalendarCheck } from 'react-icons/fa';
import './Dashboard.css'; // Optional, you can still style here

function Dashboard() {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  const cards = [
    {
      title: 'Symptom Checker',
      description: 'Quickly analyze symptoms to get instant AI-powered health insights.',
      route: '/symptom-checker',
      icon: <FaStethoscope size={40} className="text-primary" />,
    },
    {
      title: 'Skin Disease Detection',
      description: 'Upload skin images to get visual AI diagnosis and suggestions.',
      route: '/image-detection',
      icon: <FaImage size={40} className="text-success" />,
    },
    {
      title: 'Hospital Finder',
      description: 'Locate hospitals near you based on your needs and preferences.',
      icon: <FaHospitalAlt size={40} className="text-danger" />,
    },
    {
      title: 'Appointments',
      description: 'Book and manage appointments with AI-recommended specialists.',
      icon: <FaCalendarCheck size={40} className="text-info" />,
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">👋 Welcome Back, {username}!</h2>
      <div className="row">
        {cards.map((card, idx) => (
          <div key={idx} className="col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm h-100"
              onClick={() => card.route && navigate(card.route)}
              style={{ cursor: card.route ? 'pointer' : 'not-allowed' }}
            >
              <div className="card-body d-flex flex-column align-items-start">
                <div className="mb-3">{card.icon}</div>
                <h5 className="card-title fw-bold">{card.title}</h5>
                <p className="card-text">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
