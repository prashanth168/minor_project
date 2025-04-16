from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load model and features
try:
    with open("newmodel.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully.")
except Exception as e:
    print("❌ Error loading model:", e)

try:
    with open("newfeature.pkl", "rb") as f:
        all_symptoms = pickle.load(f)
    print("✅ Features loaded successfully.")
except Exception as e:
    print("❌ Error loading features:", e)

# Load other data (optional for description, specialist, precautions)
try:
    desc_df = pd.read_csv("Disease_Description.csv")
    print("✅ Description file loaded.")
except Exception as e:
    print("❌ Failed to load Disease_Description.csv:", e)

try:
    doc_vs_disease_df = pd.read_csv("Doctor_Versus_Disease.csv", encoding='ISO-8859-1', header=None)
    disease_to_specialist = doc_vs_disease_df.set_index(0).to_dict()[1]
    print("✅ Specialist mapping loaded.")
except Exception as e:
    print("❌ Failed to load Doctor_Versus_Disease.csv:", e)
    disease_to_specialist = {}

try:
    precaution_df = pd.read_csv("symptom_precaution.csv")
    print("✅ Precaution file loaded.")
except Exception as e:
    print("❌ Failed to load symptom_precaution.csv:", e)
    precaution_df = pd.DataFrame()

# -------------------- Routes --------------------

@app.route("/")
def index():
    return "🎉 Flask server is running!"

@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    try:
        print("🔍 /symptoms endpoint called.")
        return jsonify(all_symptoms)
    except Exception as e:
        print("❌ Error in /symptoms:", e)
        return jsonify({"error": "Failed to fetch symptoms"}), 500

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("📨 Received data for prediction:", data)

        selected_symptoms = data.get("symptoms", [])
        if not selected_symptoms:
            return jsonify({"error": "No symptoms provided."}), 400

        # Create one-hot vector
        input_vector = [1 if symptom in selected_symptoms else 0 for symptom in all_symptoms]

        # Predict disease
        predicted_disease = model.predict([input_vector])[0]
        print("✅ Predicted disease:", predicted_disease)

        # Description
        desc = None
        if not desc_df.empty and predicted_disease.lower() in desc_df["Disease"].str.lower().values:
            desc_row = desc_df[desc_df["Disease"].str.lower() == predicted_disease.lower()]
            if not desc_row.empty:
                desc = desc_row.iloc[0]["Description"]

        # Specialist
        specialist = disease_to_specialist.get(predicted_disease, "Specialist not found")

        # Precautions
        precautions = []
        if not precaution_df.empty and predicted_disease.lower() in precaution_df["Disease"].str.lower().values:
            row = precaution_df[precaution_df["Disease"].str.lower() == predicted_disease.lower()].iloc[0]
            for i in range(1, 5):
                col = f"Precaution_{i}"
                if pd.notna(row.get(col)):
                    precautions.append(row[col])

        return jsonify({
            "disease": predicted_disease,
            "description": desc,
            "specialist": specialist,
            "precautions": precautions
        })

    except Exception as e:
        print("❌ Error in /predict:", e)
        return jsonify({"error": "Prediction failed."}), 500

# -------------------- Run --------------------
if __name__ == "__main__":
    print("🚀 Starting Flask server...")
    app.run(debug=True)
