from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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