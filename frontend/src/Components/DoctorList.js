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
    // Pre-fill form with user data
    setFormData(prev => ({
      ...prev,
      disease: '',
      symptoms: ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    try {
      // Prepare data exactly as backend expects
      const appointmentData = {
        name: user.username,  // From Redux store
        email: user.email,    // From Redux store
        date: formData.date,
        time: formData.time,
        disease: formData.disease,
        symptoms: formData.symptoms || "", // Optional but included
        doctorId: selectedDoctor._id
      };



      const res = await fetch('http://localhost:4000/userapi/book-appointment', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }

      alert('Appointment booked successfully!');
      setShowForm(false);
      setFormData({
        date: '',
        time: '',
        disease: '',
        symptoms: ''
      });
    } catch (error) {

      setApiError(error.message || 'Failed to book appointment');
    }
  };

  if (loading) return <div className="loading-spinner">Loading doctors...</div>;
  if (error) return <div className="error-message">{error}</div>;

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

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="appointment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowForm(false)}>
              <FaTimes />
            </button>
            
            <div className="modal-header">
              <h3>
                <FaUserMd className="icon" />
                Book with Dr. {selectedDoctor?.username}
              </h3>
              <p className="specialty">{selectedDoctor?.specialization}</p>
            </div>

            <div className="patient-info">
              <p><strong>Patient:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>

            {apiError && <div className="error-message">{apiError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <FaCalendarAlt className="icon" />
                  Appointment Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaClock className="icon" />
                  Appointment Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaNotesMedical className="icon" />
                  Medical Concern *
                </label>
                <textarea
                  name="disease"
                  value={formData.disease}
                  onChange={handleChange}
                  placeholder="Describe your primary medical concern"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaNotesMedical className="icon" />
                  Additional Symptoms
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  placeholder="Any other symptoms you're experiencing (optional)"
                />
              </div>

              <button type="submit" className="submit-btn">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;