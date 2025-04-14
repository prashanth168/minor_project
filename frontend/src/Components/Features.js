import React from 'react'

function Features() {
  return (
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
  )
}

export default Features