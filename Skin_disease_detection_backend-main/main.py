from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io
from PIL import Image


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and class names
model = load_model(r"C:\Users\adhar\OneDrive\Desktop\minor\minor_project\Skin_disease_detection_backend-main\best_model.keras")
class_names = [
    'Acne And Rosacea Photos','Actinic Keratosis Basal Cell Carcinoma And Other Malignant Lesions','Atopic Dermatitis Photos',
    'Ba Cellulitis','Ba Impetigo','Benign','Bullous Disease Photos','Cellulitis Impetigo And Other Bacterial Infections',
    'Eczema Photos','Exanthems And Drug Eruptions','Fu Athlete Foot','Fu Nail Fungus','Fu Ringworm',
    'Hair Loss Photos Alopecia And Other Hair Diseases','Heathy','Herpes Hpv And Other Stds Photos',
    'Light Diseases And Disorders Of Pigmentation','Lupus And Other Connective Tissue Diseases','Malignant',
    'Melanoma Skin Cancer Nevi And Moles','Nail Fungus And Other Nail Disease','Pa Cutaneous Larva Migrans',
    'Poison Ivy Photos And Other Contact Dermatitis','Psoriasis Pictures Lichen Planus And Related Diseases','Rashes',
    'Scabies Lyme Disease And Other Infestations And Bites','Seborrheic Keratoses And Other Benign Tumors',
    'Systemic Disease','Tinea Ringworm Candidiasis And Other Fungal Infections','Urticaria Hives','Vascular Tumors',
    'Vasculitis Photos','Vi Chickenpox','Vi Shingles','Warts Molluscum And Other Viral Infections'
]

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    # Debug: Check the image array shape
    print(f"Image shape: {img_array.shape}")
    
    prediction = model.predict(img_array)[0]

    # Debug: Check the prediction output
    print(f"Prediction: {prediction}")

    top_indices = prediction.argsort()[-3:][::-1]
    top_classes = [class_names[i] for i in top_indices]
    top_confidences = [float(prediction[i] * 100) for i in top_indices]

    return JSONResponse(content={
        "predictions": [
            {"class": top_classes[i], "confidence": top_confidences[i]}
            for i in range(3)
        ]
    })