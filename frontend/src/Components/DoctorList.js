import React, { useState, useEffect } from 'react';
import { FaUserMd, FaCalendarAlt, FaClock, FaNotesMedical, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    disease: '',
    symptoms: ''
  });
  const [apiError, setApiError] = useState('');

  const user = useSelector(state => state.user);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:4000/userapi/doctors');
        const data = await response.json();
        if (response.ok) {
          setDoctors(data.data);
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

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
    setApiError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    try {
      const appointmentData = {
        name: user.username,
        email: user.email,
        date: formData.date,
        time: formData.time,
        disease: formData.disease,
        symptoms: formData.symptoms || '',
        doctorId: selectedDoctor._id
      };

      const res = await fetch('http://localhost:4000/userapi/book-appointment', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      alert('Appointment booked successfully!');
      setShowForm(false);
      setFormData({
        date: '',
        time: '',
        disease: '',
        symptoms: ''
      });
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <div className="doctor-list-container">
      <h2 className="section-title">Available Doctors</h2>
      <p className="section-subtitle">Book an appointment with our specialists</p>

      <div className="doctor-cards">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <div className="doctor-avatar">
              <FaUserMd size={32} />
            </div>
            <div className="doctor-info">
              <h3>Dr. {doctor.username}</h3>
              <p className="specialty">{doctor.specialization}</p>
              <div className="doctor-meta">
                <span>{doctor.hospitalName}</span>
                <span>{doctor.experience} years experience</span>
              </div>
              <button 
                className="book-btn"
                onClick={() => handleBookClick(doctor)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && selectedDoctor && (
        <div className="doctor-list-modal-overlay">
          <div className="doctor-list-appointment-modal">
            <button className="doctor-list-close-btn" onClick={() => setShowForm(false)}>
              <FaTimes />
            </button>
            <div className="doctor-list-modal-header">
              <h3><FaUserMd /> Book Appointment with {selectedDoctor.name}</h3>
              <p className="doctor-list-specialty">{selectedDoctor.specialty}</p>
            </div>
            <div className="doctor-list-patient-info">
              <p><strong>Patient Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="doctor-list-form-group">
                <label><FaCalendarAlt /> Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="doctor-list-form-group">
                <label><FaClock /> Time:</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
              </div>
              <div className="doctor-list-form-group">
                <label><FaNotesMedical /> Disease:</label>
                <input type="text" name="disease" value={formData.disease} onChange={handleChange} required />
              </div>
              <div className="doctor-list-form-group">
                <label>Symptoms (optional):</label>
                <textarea name="symptoms" value={formData.symptoms} onChange={handleChange}></textarea>
              </div>
              {apiError && <div className="doctor-list-error-message">{apiError}</div>}
              <button className="doctor-list-submit-btn" type="submit">Submit Appointment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;