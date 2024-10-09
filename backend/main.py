from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow CORS for your React frontend (http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to the frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request body model based on the expected schema
class VehicleApp(BaseModel):
    vehicle_no: int
    vehicle_license: str
    supplier_no: int

# Define the API endpoint
@app.post("/api/load_vehicle")
async def load_vehicle(vehicle: VehicleApp):
    return {"message": f"Vehicle {vehicle.vehicle_license} loaded successfully!"}
