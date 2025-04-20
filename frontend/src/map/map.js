import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHospital, faClinicMedical, faPrescriptionBottleAlt, 
  faSearch, faLocationArrow, faSpinner, faChevronLeft, 
  faChevronRight, faCalendarCheck, faUser, faDirections,
  faCalendarPlus, faMapMarkerAlt, faPhone, faRoute,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './App.css';

// Sample doctor data
const sampleDoctors = {
  hospital: [
    { id: 'doc1', name: 'Dr. Rajesh Kumar', specialty: 'Cardiology', available: true, nextAvailable: 'Tomorrow 10 AM' },
    { id: 'doc2', name: 'Dr. Priya Sharma', specialty: 'Pediatrics', available: false, nextAvailable: 'Friday 2 PM' },
    { id: 'doc3', name: 'Dr. Amit Patel', specialty: 'Orthopedics', available: true, nextAvailable: 'Today 4 PM' }
  ],
  clinic: [
    { id: 'doc4', name: 'Dr. Sunita Reddy', specialty: 'General Medicine', available: true, nextAvailable: 'Today 5 PM' },
    { id: 'doc5', name: 'Dr. Vikram Singh', specialty: 'Dermatology', available: true, nextAvailable: 'Wednesday 11 AM' }
  ],
  pharmacy: [
    { id: 'pharm1', name: 'Pharmacist Available', specialty: 'Medication Consultation', available: true, nextAvailable: 'Now' }
  ]
};

// Custom icons
const facilityIcons = {
  hospital: { icon: faHospital, color: '#2980b9' },
  clinic: { icon: faClinicMedical, color: '#27ae60' },
  pharmacy: { icon: faPrescriptionBottleAlt, color: '#f39c12' }
};

const UserLocationMarker = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (!coords) return;

    const marker = L.marker([coords.lat, coords.lon], {
      icon: L.divIcon({
        className: 'user-location-marker',
        html: `<div style="background-color: #4285F4; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;"><i class="fas fa-user"></i></div>`,
        iconSize: [30, 30]
      })
    }).addTo(map).bindPopup("Your Current Location").openPopup();

    const circle = L.circle([coords.lat, coords.lon], {
      radius: coords.accuracy,
      fillOpacity: 0.2,
      color: '#4285F4',
      fillColor: '#4285F4'
    }).addTo(map);

    map.setView([coords.lat, coords.lon], 15);

    return () => {
      map.removeLayer(marker);
      map.removeLayer(circle);
    };
  }, [coords, map]);

  return null;
};

const FacilityMarkers = ({ facilities, userCoords }) => {
  return facilities.map((facility, index) => {
    const icon = facilityIcons[facility.type];
    return (
      <Marker
        key={index}
        position={[facility.lat, facility.lon]}
        icon={L.divIcon({
          className: 'facility-marker',
          html: `<div style="background-color: ${icon.color}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;"><i class="fas ${icon.icon}"></i></div>`,
          iconSize: [34, 34]
        })}
      >
        <Popup>
          <b>{facility.name}</b><br />
          <small>{facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}</small><br />
          {facility.specialization && `Specialties: ${facility.specialization}<br />`}
          {facility.address && `Address: ${facility.address}<br />`}
          {facility.phone !== "Not available" && `Phone: ${facility.phone}<br />`}
          Distance: {facility.distance} km<br />
          <a href={`https://www.openstreetmap.org/?mlat=${facility.lat}&mlon=${facility.lon}#map=18/${facility.lat}/${facility.lon}`} target="_blank" rel="noopener noreferrer">View on OSM</a><br />
          <a href="#" onClick={(e) => {
            e.preventDefault();
            window.open(`https://www.openstreetmap.org/directions?engine=osrm_car&route=${userCoords.lat},${userCoords.lon};${facility.lat},${facility.lon}#map=15/${userCoords.lat}/${userCoords.lon}`);
          }}>Get Directions</a>
        </Popup>
      </Marker>
    );
  });
};

const FacilityItem = ({ facility, userCoords, onBookAppointment }) => {
  const icon = facilityIcons[facility.type];
  const doctors = sampleDoctors[facility.type] || [];

  return (
    <div className="facility-item">
      <div className={`facility-type ${facility.type}-type`}>
        {facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
      </div>
      <h3>{facility.name}</h3>
      {facility.address && (
        <div className="meta-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {facility.address}
        </div>
      )}
      {facility.phone !== "Not available" && (
        <div className="meta-item">
          <FontAwesomeIcon icon={faPhone} /> {facility.phone}
        </div>
      )}
      <div className="meta-item">
        <FontAwesomeIcon icon={faRoute} /> 
        <span className="distance">{facility.distance} km away</span>
      </div>
      {facility.specialization && (
        <div style={{ margin: '15px 0' }}>
          {facility.specialization.split(',').map((s, i) => (
            <span key={i} className="specialization-tag">{s.trim()}</span>
          ))}
        </div>
      )}
      {doctors.length > 0 && (
        <div className="doctors-list">
          <h4>Available Doctors:</h4>
          {doctors.map(doctor => (
            <div key={doctor.id} className="doctor-item">
              <div className="doctor-avatar">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="doctor-info">
                <div className="doctor-name">{doctor.name}</div>
                <div className="doctor-specialty">{doctor.specialty}</div>
              </div>
              <div className={`doctor-availability ${doctor.available ? 'available' : 'unavailable'}`}>
                {doctor.available ? 'Available Now' : `Next: ${doctor.nextAvailable}`}
              </div>
              {doctor.available && (
                <button 
                  className="appointment-btn" 
                  onClick={() => onBookAppointment(doctor.id, facility.name, doctor.name)}
                >
                  <FontAwesomeIcon icon={faCalendarPlus} /> Book
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="action-buttons">
        {doctors.length > 0 && (
          <button 
            className="appointment-btn"
            onClick={() => onBookAppointment(doctors[0].id, facility.name, doctors[0].name)}
          >
            <FontAwesomeIcon icon={faCalendarPlus} /> Book Appointment
          </button>
        )}
        <button 
          className="directions-btn"
          onClick={() => window.open(`https://www.openstreetmap.org/directions?engine=osrm_car&route=${userCoords.lat},${userCoords.lon};${facility.lat},${facility.lon}#map=15/${userCoords.lat}/${userCoords.lon}`)}
        >
          <FontAwesomeIcon icon={faDirections} /> Get Directions
        </button>
      </div>
    </div>
  );
};

const AppointmentModal = ({ isOpen, onClose, doctorId, facilityName, doctorName }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentNotes: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment booked:', {
      ...formData,
      doctorId,
      facilityName
    });
    alert(`Appointment booked successfully with ${doctorName} at ${facilityName}!\n\nWe'll contact you shortly at ${formData.patientPhone} to confirm.`);
    setFormData({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentNotes: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="appointment-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h3 className="modal-title">Book Appointment with {doctorName} at {facilityName}</h3>
        <form id="appointmentForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">Full Name</label>
            <input 
              type="text" 
              id="patientName" 
              value={formData.patientName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientPhone">Phone Number</label>
            <input 
              type="tel" 
              id="patientPhone" 
              value={formData.patientPhone}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientEmail">Email</label>
            <input 
              type="email" 
              id="patientEmail" 
              value={formData.patientEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentDate">Preferred Date</label>
            <input 
              type="date" 
              id="appointmentDate" 
              value={formData.appointmentDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentTime">Preferred Time</label>
            <input 
              type="time" 
              id="appointmentTime" 
              value={formData.appointmentTime}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentNotes">Notes (Symptoms, etc.)</label>
            <textarea 
              id="appointmentNotes" 
              rows="3"
              value={formData.appointmentNotes}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            <FontAwesomeIcon icon={faCalendarCheck} /> Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [locationInput, setLocationInput] = useState('');
  const [facilityType, setFacilityType] = useState('all');
  const [specialization, setSpecialization] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userCoords, setUserCoords] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState(null);
  const itemsPerPage = 10;

  const mapRef = useRef(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const geocodeLocation = async (location) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
      const data = await response.json();
      if (data.length === 0) return null;
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const locateUser = () => {
    setIsLoading(true);
    setError('');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setUserCoords(coords);
          setLocationInput('My Location');
          searchFacilities(coords);
        },
        (err) => {
          setIsLoading(false);
          setError(`Error getting location: ${err.message}`);
          console.error("Geolocation error:", err);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    } else {
      setIsLoading(false);
      setError("Geolocation is not supported by your browser.");
    }
  };

  const searchFacilities = async (coords = null) => {
    if (!coords && locationInput === "My Location" && userCoords) {
      coords = userCoords;
    } else if (!coords && locationInput && locationInput !== "My Location") {
      coords = await geocodeLocation(locationInput);
      if (!coords) {
        setError("Location not found!");
        return;
      }
    } else if (!coords) {
      setError("Please enter a location or use 'My Location'");
      return;
    }

    setIsLoading(true);
    setError('');
    setCurrentPage(1);

    try {
      const radius = 5000;
      let amenityFilter = "";
      
      if (facilityType === "hospital") {
        amenityFilter = '"amenity"="hospital"';
      } else if (facilityType === "clinic") {
        amenityFilter = '"amenity"~"clinic|doctors"';
      } else if (facilityType === "pharmacy") {
        amenityFilter = '"amenity"="pharmacy"';
      } else {
        amenityFilter = '"amenity"~"hospital|clinic|doctors|pharmacy"';
      }
      
      const query = `
        [out:json];
        (
          node[${amenityFilter}](around:${radius},${coords.lat},${coords.lon});
          way[${amenityFilter}](around:${radius},${coords.lat},${coords.lon});
          relation[${amenityFilter}](around:${radius},${coords.lat},${coords.lon});
        );
        out center;
      `;

      const overpassURLs = [
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter",
        "https://overpass.openstreetmap.ru/api/interpreter"
      ];

      let data;
      for (let url of overpassURLs) {
        try {
          const response = await fetch(`${url}?data=${encodeURIComponent(query)}`);
          if (response.ok) {
            data = await response.json();
            break;
          }
        } catch (e) {
          console.log(`Failed with ${url}, trying next...`);
        }
      }

      if (!data || !data.elements || data.elements.length === 0) {
        setFacilities([]);
        setFilteredFacilities([]);
        return;
      }

      const processedFacilities = data.elements
        .filter(el => el.lat || el.center?.lat)
        .map(el => {
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;
          const name = el.tags?.name || "Unnamed Facility";
          let type = "hospital";
          
          if (el.tags?.amenity === "pharmacy") {
            type = "pharmacy";
          } else if (el.tags?.amenity === "clinic" || el.tags?.amenity === "doctors") {
            type = "clinic";
          }
          
          const specialization = el.tags?.speciality || 
                              el.tags?.["healthcare:speciality"] || 
                              (type === "hospital" ? "General Hospital" : 
                              type === "clinic" ? "General Clinic" : "Pharmacy");
          
          const distance = calculateDistance(
            coords.lat, coords.lon,
            lat, lon
          ).toFixed(1);
          
          const phone = el.tags?.phone || "Not available";
          const address = [
            el.tags?.["addr:street"],
            el.tags?.["addr:city"],
            el.tags?.["addr:postcode"]
          ].filter(Boolean).join(", ");
          
          return {
            lat, lon, name, specialization,
            type, tags: el.tags,
            distance, phone, address
          };
        })
        .sort((a, b) => a.distance - b.distance);

      setFacilities(processedFacilities);
      filterFacilities(processedFacilities, specialization.toLowerCase(), facilityType);
      
      if (mapRef.current) {
        mapRef.current.setView([coords.lat, coords.lon], 13);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterFacilities = (facilitiesToFilter, specKeyword, typeFilter) => {
    const filtered = facilitiesToFilter.filter(facility => {
      const description = (facility.name + " " + facility.specialization).toLowerCase();
      return (typeFilter === "all" || facility.type === typeFilter) &&
            (specKeyword === "all" || description.includes(specKeyword));
    });
    setFilteredFacilities(filtered);
  };

  useEffect(() => {
    if (facilities.length > 0) {
      filterFacilities(facilities, specialization.toLowerCase(), facilityType);
    }
  }, [facilityType, specialization, facilities]);

  const openAppointmentModal = (doctorId, facilityName, doctorName) => {
    setSelectedDoctor(doctorId);
    setSelectedFacility(facilityName);
    setSelectedDoctorName(doctorName);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredFacilities.slice(startIndex, endIndex);

  return (
    <div className="container">
      <h1><FontAwesomeIcon icon={faHospital} /> Medical Facility Finder</h1>
      <h2>Find Hospitals, Clinics & Pharmacies with Doctor Availability</h2>
      
      <div className="search-box">
        <input 
          type="text" 
          id="locationInput" 
          placeholder="Enter location (e.g. Hyderabad)" 
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          autoComplete="off"
        />
        <select 
          id="facilityType" 
          value={facilityType}
          onChange={(e) => setFacilityType(e.target.value)}
        >
          <option value="all">All Facilities</option>
          <option value="hospital">Hospitals</option>
          <option value="clinic">Clinics</option>
          <option value="pharmacy">Pharmacies</option>
        </select>
        <select 
          id="specialization" 
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="all">All Specializations</option>
          <option value="emergency">Emergency</option>
          <option value="general">General Medicine</option>
          <option value="dentistry">Dentistry</option>
          <option value="dermatology">Dermatology</option>
          <option value="cardiology">Cardiology</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="orthopedics">Orthopedics</option>
          <option value="neurology">Neurology</option>
          <option value="gynaecology">Gynaecology</option>
          <option value="psychiatry">Psychiatry</option>
        </select>
        <button onClick={() => searchFacilities()}>
          <FontAwesomeIcon icon={faSearch} /> Search
        </button>
        <button onClick={locateUser}>
          <FontAwesomeIcon icon={faLocationArrow} /> My Location
        </button>
        {isLoading && (
          <span id="loading">
            <FontAwesomeIcon icon={faSpinner} spin /> Loading...
          </span>
        )}
        {error && <div id="error">{error}</div>}
      </div>
      
      <MapContainer 
        center={[17.385044, 78.486671]} 
        zoom={13} 
        style={{ height: '500px', width: '100%', margin: '25px 0', borderRadius: '10px' }}
        whenCreated={map => { mapRef.current = map; }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userCoords && <UserLocationMarker coords={userCoords} />}
        <FacilityMarkers facilities={paginatedItems} userCoords={userCoords || { lat: 17.385044, lon: 78.486671 }} />
      </MapContainer>
      
      <div id="facilityList">
        {filteredFacilities.length === 0 ? (
          <div className="no-results">
            <FontAwesomeIcon icon={faHospital} style={{ fontSize: '48px', color: '#bdc3c7', marginBottom: '15px' }} />
            <h3>No medical facilities found</h3>
            <p>Try adjusting your search filters or expanding the search radius</p>
          </div>
        ) : (
          paginatedItems.map((facility, index) => (
            <FacilityItem 
              key={index} 
              facility={facility} 
              userCoords={userCoords || { lat: 17.385044, lon: 78.486671 }}
              onBookAppointment={openAppointmentModal}
            />
          ))
        )}
      </div>
      
      {filteredFacilities.length > itemsPerPage && (
        <div className="pagination">
          <button 
            className="page-btn" 
            id="prevPage" 
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Previous
          </button>
          <span className="page-info" id="pageInfo">
            Page {currentPage} of {totalPages} ({startIndex + 1}-{Math.min(endIndex, filteredFacilities.length)} of {filteredFacilities.length})
          </span>
          <button 
            className="page-btn" 
            id="nextPage" 
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
      
      <AppointmentModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        doctorId={selectedDoctor} 
        facilityName={selectedFacility} 
        doctorName={selectedDoctorName}
      />
    </div>
  );
};

export default App;