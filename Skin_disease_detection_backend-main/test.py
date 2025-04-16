from keras.models import load_model

# Load your existing model
model = load_model(r"D:\image-generator\model\final_skin_disease_model.keras", compile=False)  # Set compile=False to avoid loading errors

# Re-save the model to a new file in H5 format (more commonly supported)
model.save(r"D:\image-generator\model\skin_disease_model.h5")

print("Model re-saved successfully as 'skin_disease_model.h5'")
