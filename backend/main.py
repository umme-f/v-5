from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for your React frontend (http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to the frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your routes go here
@app.post("http://192.168.1.171:8000/api/load_vehicle")
async def load_vehicle(vehicle: VehicleApp):
    return {"message": "Vehicle loaded successfully!"}
