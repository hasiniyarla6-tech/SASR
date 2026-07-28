from ultralytics import YOLO
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
app = FastAPI()
model = YOLO("yolov8n.pt")

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "SASR Backend Running Successfully 🚀"}

@app.get("/dashboard")
def dashboard():
    return {
        "victims": 24,
        "drones": 8,
        "alerts": 5,
        "missions": 12
    }
@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):

    # Create upload folder
    os.makedirs("uploads", exist_ok=True)

    # Save uploaded image
    file_path = os.path.join("uploads", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run YOLO detection
    results = model(file_path)

    # Count detected people
    people_count = 0
    confidences = []
    for result in results:
        for box in result.boxes:
            class_id = int(box.cls[0])

            # COCO dataset: class 0 = person
            if class_id == 0:
                people_count += 1
                confidence = float(box.conf[0])

            confidences.append(round(confidence * 100, 2))
    # Save image with detections
    results[0].save(filename=f"uploads/detected_{file.filename}")

    return {
        "message": "Detection Completed",
        "filename": file.filename,
        "people_detected": people_count,
         "confidence_scores": confidences,
        "output_image": f"uploads/detected_{file.filename}"
    }