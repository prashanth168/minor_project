from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["minor-project"]
history_col = db["predictionHistoryCollection"]

# Load ML model
try:
    with open("newmodel.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully.")
except Exception as e:
    print("❌ Error loading model:", e)

# Load symptom features
try:
    with open("newfeature.pkl", "rb") as f:
        all_symptoms = pickle.load(f)
    print("✅ Features loaded successfully.")
except Exception as e:
    print("❌ Error loading features:", e)
    all_symptoms = []

# Load additional data files
try:
    desc_df = pd.read_csv("Disease_Description.csv")
    print("✅ Description file loaded.")
except Exception as e:
    print("❌ Failed to load Disease_Description.csv:", e)
    desc_df = pd.DataFrame()

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

# ---------------- Routes ----------------

@app.route("/")
def index():
    return "🎉 Flask server is running!"

@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    try:
        return jsonify(all_symptoms)
    except Exception as e:
        print("❌ Error in /symptoms:", e)
        return jsonify({"error": "Failed to fetch symptoms"}), 500

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        selected_symptoms = data.get("symptoms", [])
        user_id = data.get("userId")

        if not selected_symptoms:
            return jsonify({"error": "No symptoms provided."}), 400

        # One-hot encode
        input_vector = [1 if symptom in selected_symptoms else 0 for symptom in all_symptoms]

        # Predict disease
        predicted_disease = model.predict([input_vector])[0]

        # Get description
        desc = None
        if not desc_df.empty and predicted_disease.lower() in desc_df["Disease"].str.lower().values:
            desc_row = desc_df[desc_df["Disease"].str.lower() == predicted_disease.lower()]
            if not desc_row.empty:
                desc = desc_row.iloc[0]["Description"]

        # Get specialist
        specialist = disease_to_specialist.get(predicted_disease, "Specialist not found")

        # Get precautions
        precautions = []
        if not precaution_df.empty and predicted_disease.lower() in precaution_df["Disease"].str.lower().values:
            row = precaution_df[precaution_df["Disease"].str.lower() == predicted_disease.lower()].iloc[0]
            for i in range(1, 5):
                col = f"Precaution_{i}"
                if pd.notna(row.get(col)):
                    precautions.append(row[col])

        # Save to MongoDB if logged in
        if user_id:
            history_col.insert_one({
                "userId": user_id,
                "symptoms": selected_symptoms,
                "disease": predicted_disease,
                "description": desc,
                "precautions": precautions,
                "specialist": specialist,
                "timestamp": datetime.utcnow()
            })

        return jsonify({
            "disease": predicted_disease,
            "description": desc,
            "specialist": specialist,
            "precautions": precautions
        })

    except Exception as e:
        print("❌ Error in /predict:", e)
        return jsonify({"error": "Prediction failed."}), 500

@app.route("/history/<user_id>", methods=["GET"])
def get_user_history(user_id):
    try:
        records = list(history_col.find({"userId": user_id}).sort("timestamp", -1))
        for record in records:
            record["_id"] = str(record["_id"])
            record["timestamp"] = record["timestamp"].strftime("%Y-%m-%d %H:%M")
        return jsonify(records)
    except Exception as e:
        print("❌ Error fetching history:", e)
        return jsonify({"error": "Could not retrieve history"}), 500

# ---------------- Run Server ----------------

if __name__ == "__main__":
    print("🚀 Starting Flask server...")
    app.run(debug=True)
