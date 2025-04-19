// Profile.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <div className="card shadow p-4" style={{ maxWidth: '600px', margin: 'auto', borderRadius: '20px' }}>
        <h3 className="mb-4 text-primary text-center">User Profile</h3>

        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>

        {user.role === 'patient' && (
          <>
            <p><strong>Age:</strong> {user.age || 'N/A'}</p>
            <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
            <p><strong>Location:</strong> {user.city || 'N/A'}</p>

            <hr />
            <h5 className="mt-4 text-center text-success">🧾 Prediction History</h5>
{history.length === 0 ? (
  <p className="text-muted text-center">No prediction activity yet.</p>
) : (
  <div className="mt-3">
    {history.map((item, index) => (
      <div
        key={index}
        className="card mb-3 shadow-sm border-start border-4"
        style={{
          borderColor: "#007bff",
          backgroundColor: "#f8f9fa",
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
    <p><strong>Specialization:</strong> {user.specialization}</p>
    <p><strong>Experience:</strong> {user.experience} years</p>

    <hr />
    <h5 className="mt-4 text-center text-success">📅 Appointments Booked</h5>

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
              backgroundColor: "#f8f9fa",
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

      <button onClick={handleDashboardClick} className="btn btn-primary mt-4">Go to Dashboard</button>
    </div>
  );
}

export default Profile;
