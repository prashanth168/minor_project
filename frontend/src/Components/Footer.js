import React from 'react';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaFax,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram
} from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#4a3aff', color: 'white', padding: '2rem 0' }}>
      <div className='container text-center'>
        <h3 className='mb-4' style={{ fontWeight: 'bold' }}>HealthMate</h3>

        {/* Contact Info */}
        <div className='row justify-content-center mb-4'>
          <div className='col-md-4'>
            <p><FaMapMarkerAlt /> 123 Health Street, MediCity, NY 10001</p>
            <p><FaPhone /> Appointment: (800) 555-HEAL</p>
            <p><FaFax /> Emergency: (911) 789-4321</p>
          </div>
        </div>

        {/* Social Media */}
        <div className='mb-4'>
          <p>Follow us on</p>
          <div style={{ fontSize: '1.5rem' }}>
            <a href='#' className='text-white me-3'><FaFacebook /></a>
            <a href='#' className='text-white me-3'><FaTwitter /></a>
            <a href='#' className='text-white me-3'><FaLinkedin /></a>
            <a href='#' className='text-white me-3'><FaYoutube /></a>
            <a href='#' className='text-white me-3'><FaInstagram /></a>
          </div>
        </div>

        {/* Footer Links */}
        <div className='row justify-content-center mb-3'>
          <div className='col-md-8 d-flex justify-content-around flex-wrap'>
            <a href='/about' className='text-white text-decoration-none mb-2'>About Hospital</a>
            <a href='/departments' className='text-white text-decoration-none mb-2'>Departments</a>
            <a href='/doctors' className='text-white text-decoration-none mb-2'>Our Doctors</a>
            <a href='/contact' className='text-white text-decoration-none mb-2'>Contact</a>
            <a href='/privacy' className='text-white text-decoration-none mb-2'>Privacy Policy</a>
            <a href='/terms' className='text-white text-decoration-none mb-2'>Disclaimer</a>
          </div>
        </div>

        {/* Copyright */}
        <p className='mt-3' style={{ fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} HealthMate Hospital Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
