import React from 'react';
import './HomeContent.css'; 

function HomeContent() {
  return (
    <div className="container mt-5">

      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">HealthMate</h1>
        <p className="lead">Your Health, Our AI-Powered Assistant</p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="text-center mb-5">
        <h4 className="mb-4">Highlights</h4>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100 p-3">
              <h5 className="card-title">AI Symptom Checker</h5>
              <p className="card-text">Enter symptoms, get quick AI-based diagnosis with suggested steps.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 p-3">
              <h5 className="card-title">Skin Disease Detection</h5>
              <p className="card-text">Upload a image to get an AI-based prediction of the disease type.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 p-3">
              <h5 className="card-title">Hospital/Clinic Finder</h5>
              <p className="card-text">Find the nearest hospital or clinic based on your current location.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 p-3">
              <h5 className="card-title">Smart Health Alerts</h5>
              <p className="card-text">Get real-time alerts on health trends, outbreaks, or health tips.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="text-center mb-5">
        <h4 className="mb-4">How it works</h4>
        <p className="text-muted">1. Choose service → 2. Input info → 3. Get AI result → 4. Follow guidance</p>
        {/* Replace below with images or icons if needed */}
      </div>

      {/* Why Us */}
      <div className="text-center mb-5">
        <h4 className="mb-4">Why us?</h4>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <span className="badge bg-primary p-3 fs-6">Affordable</span>
          <span className="badge bg-secondary p-3 fs-6">Private & Secure</span>
          <span className="badge bg-success p-3 fs-6">Fast & Simple</span>
          <span className="badge bg-info text-dark p-3 fs-6">AI-Powered Accuracy</span>
        </div>
      </div>

      {/* About Us */}
      <div className="text-center mb-5">
        <h4 className="mb-3">About Us</h4>
        <p className="text-muted px-md-5">
          At <strong>HealthMate</strong>, our goal is to offer fast, accessible, and accurate AI-powered healthcare solutions.
          Whether it's detecting symptoms, scanning wounds, or finding nearby medical help, HealthMate
          combines cutting-edge AI with real-world needs for better health outcomes.
        </p>
      </div>

      {/* Contact Form */}
      <div className="bg-light p-4 rounded">
        <h4 className="text-center mb-4">Contact us</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="your@email.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="3" placeholder="Your message"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Contact us</button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default HomeContent;
