// Symptom.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useSelector } from "react-redux";

function Symptom() {
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get("http://localhost:5000/symptoms")
      .then((res) => {
        const formatted = res.data.map((sym) => ({ value: sym, label: sym }));
        setAllSymptoms(formatted);
      })
      .catch(() => setAllSymptoms([]));
  }, []);

  const handleChange = (selectedOptions) => {
    if (selectedOptions.length <= 5) {
      setSelected(selectedOptions);
      setError("");
    } else {
      setError("You can select up to 5 symptoms.");
    }
  };

  const handleSubmit = async () => {
    if (!selected || selected.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }

    const symptomNames = selected.map((s) => s.value);

    try {
      const res = await axios.post("http://localhost:5000/predict", {
        symptoms: symptomNames,
        userId: user?._id || null,
      });

      setResult(res.data);

      // Send to Node.js to save history
      if (user?._id) {
        await axios.post("http://localhost:4000/userapi/save-prediction", {
          userId: user._id,
          symptoms: symptomNames,
          ...res.data,
        });
      }

      setError("");
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Error during prediction. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">🧠 AI Disease Predictor</h2>
        <p>
          Select up to 5 symptoms to predict the disease, get description,
          precautions, and a specialist suggestion.
        </p>

        <div className="form-group mt-3">
          <label htmlFor="symptomSelect" className="fw-bold">
            🔍 Select Symptoms:
          </label>
          <Select
            id="symptomSelect"
            options={allSymptoms}
            isMulti
            value={selected}
            onChange={handleChange}
          />
          {error && <small className="text-danger">{error}</small>}
        </div>

        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          Predict
        </button>

        {result && (
          <div className="mt-4">
            <h4 className="text-success">🦠 Disease: {result.disease}</h4>
            {result.description && (
              <p>
                <strong>📄 Description:</strong> {result.description}
              </p>
            )}
            <p>
              <strong>🩺 Recommended Specialist:</strong>{" "}
              {result.specialist}
            </p>

            {result.precautions && result.precautions.length > 0 && (
              <>
                <p>
                  <strong>🛡️ Precautions:</strong>
                </p>
                <ul className="list-group">
                  {result.precautions.map((precaution, i) => (
                    <li key={i} className="list-group-item">
                      {precaution}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Symptom;
