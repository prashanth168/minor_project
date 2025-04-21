import React, { useState, useEffect } from 'react';
import DoctorList from './DoctorList';
import MapWithHospitals from '../map/map';
import './DoctorsMapPage.css';

const DoctorsMapPage = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('http://localhost:4000/userapi/doctors');
        const data = await res.json();
        if (res.ok) {
          setDoctors(data.data);
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors based on selected hospital
  const filteredDoctors = selectedHospital
    ? doctors.filter(doc => doc.hospitalName === selectedHospital)
    : doctors;

  return (
    <div className="page-container">
      <div className="tab-buttons">
        <button
          className={activeTab === 'doctors' ? 'active' : ''}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
        <button
          className={activeTab === 'map' ? 'active' : ''}
          onClick={() => setActiveTab('map')}
        >
          Map
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'doctors' && (
          <DoctorList filteredDoctors={filteredDoctors} />
        )}
        {activeTab === 'map' && (
          <MapWithHospitals
            doctors={doctors}
            onHospitalSelect={(hospitalName) => {
              setSelectedHospital(hospitalName);
              setActiveTab('doctors');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorsMapPage;
