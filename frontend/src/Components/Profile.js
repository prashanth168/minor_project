import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

function Profile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user && user._id && user.role === "patient") {
      axios.get(`http://localhost:5000/history/${user._id}`)
        .then(res => setHistory(res.data))
        .catch(err => console.error(err));
    }

    if (user && user._id && user.role === "doctor") {
      axios.get(`http://localhost:4000/userapi/appointments/${user._id}`)
        .then(res => setAppointments(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (!user || !user.token) {
    return (
      <div className="container mt-5">
        <h4>Please login to view your profile.</h4>
      </div>
    );
  }

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: '700px', margin: 'auto', borderRadius: '20px' }}>
        <div className="d-flex align-items-center mb-4">
          <FaUserCircle size={60} className="text-primary me-3" />
          <h3 className="mb-0 text-primary">User Profile</h3>
        </div>
  
        <div className="mb-4">
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.role === 'patient' && (
            <>
              <p><strong>Age:</strong> {user.age || 'N/A'}</p>
              <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
              <p><strong>Location:</strong> {user.city || 'N/A'}</p>
            </>
          )}
          {user.role === 'doctor' && (
            <>
              <p><strong>Specialization:</strong> {user.specialization}</p>
              <p><strong>Experience:</strong> {user.experience} years</p>
            </>
          )}
        </div>
  
        <div className="text-center mb-4">
          <button
            onClick={handleDashboardClick}
            className="btn btn-outline-primary px-4 py-2"
            style={{
              borderRadius: '30px',
              fontWeight: '500',
              fontSize: '16px',
            }}
          >
            Go to Dashboard
          </button>
        </div>
  
        {user.role === 'patient' && (
          <>
            <hr />
            <h5 className="text-center text-success mb-3">🧾 Prediction History</h5>
            {history.length === 0 ? (
              <p className="text-muted text-center">No prediction activity yet.</p>
            ) : (
              <div className="mt-3">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="card mb-3 shadow-sm border-start border-4"
                    style={{
                      borderColor: "#0d6efd",
                      backgroundColor: "#e9f2ff",
                      borderRadius: "15px",
                    }}
                  >
                    <div className="card-body">
                      <h6 className="card-title text-primary mb-2">
                        🦠 Disease: <span className="text-danger">{item.disease}</span>
                      </h6>
                      <p className="card-text mb-1">
                        <strong>🧬 Symptoms:</strong>{" "}
                        <span className="text-dark">{item.symptoms.join(', ')}</span>
                      </p>
                      {item.specialist && (
                        <p className="card-text mb-1">
                          <strong>👨‍⚕️ Specialist:</strong>{" "}
                          <span className="text-info">{item.specialist}</span>
                        </p>
                      )}
                      <p className="card-text">
                        <small className="text-muted">📅 {new Date(item.timestamp).toLocaleString()}</small>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
  
        {user.role === 'doctor' && (
          <>
            <hr />
            <h5 className="text-center text-success mb-3">📅 Appointments Booked</h5>
            {appointments.length === 0 ? (
              <p className="text-muted text-center">No appointments booked yet.</p>
            ) : (
              <div className="mt-3">
                {appointments.map((appt, index) => (
                  <div
                    key={index}
                    className="card mb-3 shadow-sm border-start border-4"
                    style={{
                      borderColor: "#198754",
                      backgroundColor: "#e6f5ea",
                      borderRadius: "15px",
                    }}
                  >
                    <div className="card-body">
                      <h6 className="card-title text-success mb-2">
                        🧑‍🤝‍🧑 Patient: <span className="text-dark">{appt.name}</span>
                      </h6>
                      <p className="card-text mb-1">
                        <strong>📧 Email:</strong> {appt.email}
                      </p>
                      <p className="card-text mb-1">
                        <strong>🦠 Disease:</strong> <span className="text-danger">{appt.disease}</span>
                      </p>
                      {appt.symptoms && (
                        <p className="card-text mb-1">
                          <strong>📝 Additional Symptoms:</strong> {appt.symptoms}
                        </p>
                      )}
                      <p className="card-text">
                        <strong>🗓 Date:</strong> {appt.date} &nbsp;
                        <strong>🕒 Time:</strong> {appt.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}  

export default Profile;
