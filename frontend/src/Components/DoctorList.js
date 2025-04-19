import React, { useState, useEffect } from 'react';
import { FaUserMd } from 'react-icons/fa';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the doctor data from the backend API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:4000/userapi/doctors'); // Adjust the URL if needed
        const data = await response.json();

        if (response.ok) {
          setDoctors(data.data); // Assuming the data you need is in the `data` key
        } else {
          setError(data.message || 'Failed to fetch doctors');
        }
      } catch (error) {
        setError('Error fetching doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div>Loading doctors...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="doctor-list-container">
      <h3>Available Doctors</h3>
      <div className="doctor-cards">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <div className="doctor-card-header">
              <FaUserMd size={40} color="#007BFF" />
              <h5>{doctor.username}</h5>
            </div>
            <div className="doctor-card-body">
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Hospital:</strong> {doctor.hospitalName}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <button className="book-appointment-btn">Book Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
