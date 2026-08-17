from ultralytics import YOLO
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

app = FastAPI()

# Load YOLO model
model = YOLO("yolov8n.pt")


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "SASR Backend Running Successfully 🚀"
    }


# =========================================================
# DASHBOARD
# =========================================================

@app.get("/dashboard")
def dashboard():
    return {
        "victims": 24,
        "drones": 8,
        "alerts": 5,
        "missions": 12
    }


# =========================================================
# IMAGE UPLOAD + AI DETECTION
# =========================================================

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):

    # Create upload folder
    os.makedirs("uploads", exist_ok=True)

    # Save uploaded image
    file_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Run YOLO detection
    results = model(file_path)

    # Count detected people
    people_count = 0
    confidences = []

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            # COCO class 0 = Person
            if class_id == 0:

                people_count += 1

                confidence = float(box.conf[0])

                confidences.append(
                    round(confidence * 100, 2)
                )

    # Save detected image
    detected_filename = f"detected_{file.filename}"

    detected_path = os.path.join(
        "uploads",
        detected_filename
    )

    results[0].save(
        filename=detected_path
    )

    # =====================================================
    # AI RISK ASSESSMENT
    # =====================================================

    if people_count == 0:

        risk = "LOW"

        recommendation = (
            "Continue monitoring the disaster area."
        )

    elif people_count <= 2:

        risk = "MEDIUM"

        recommendation = (
            "Deploy one rescue team immediately."
        )

    else:

        risk = "HIGH"

        recommendation = (
            "Deploy multiple rescue teams immediately."
        )

    mission_status = "ACTIVE"

    return {
        "message": "Detection Completed",

        "filename": file.filename,

        "people_detected": people_count,

        "confidence_scores": confidences,

        "risk_level": risk,

        "mission_status": mission_status,

        "recommendation": recommendation,

        "output_image": f"uploads/{detected_filename}"
    }


# =========================================================
# LIVE CAMERA DETECTION
# =========================================================

@app.post("/live-detect")
async def live_detect(file: UploadFile = File(...)):

    # Create live frames folder
    os.makedirs(
        "live_frames",
        exist_ok=True
    )

    # Save live frame
    file_path = os.path.join(
        "live_frames",
        "live_frame.jpg"
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Run YOLO detection
    results = model(file_path)

    # Count people
    people_count = 0
    confidences = []

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            # COCO class 0 = Person
            if class_id == 0:

                people_count += 1

                confidence = float(box.conf[0])

                confidences.append(
                    round(confidence * 100, 2)
                )

    # =====================================================
    # RISK ASSESSMENT
    # =====================================================

    if people_count == 0:

        risk = "LOW"

    elif people_count <= 2:

        risk = "MEDIUM"

    else:

        risk = "HIGH"

    return {
        "message": "Live Detection Completed",

        "people_detected": people_count,

        "confidence_scores": confidences,

        "risk_level": risk
    }