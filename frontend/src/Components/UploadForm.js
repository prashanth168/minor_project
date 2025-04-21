import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

const UploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Please select an image!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPredictions(response.data.predictions);
    } catch (err) {
      setError('An error occurred while uploading the image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <div className="upload-form">
        <h1>Skin Disease Prediction</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="upload-button">
              Choose Image
            </label>
          </div>


          {previewUrl && (
            <div className="image-preview">
              <h2>Uploaded Image:</h2>
              <img src={previewUrl} alt="Selected Preview" className="preview-img" />
            </div>
          )}

          <br/>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {predictions.length > 0 && (
          <div className="predictions">
            <h2>Predictions:</h2>
            <ul>
              {predictions.map((prediction, index) => (
                <li key={index}>
                  <strong>{prediction.class}</strong>: {prediction.confidence.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
