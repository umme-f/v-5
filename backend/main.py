from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import logging

app = FastAPI()

logging.basicConfig(level=logging.INFO)

# Allow CORS for your frontend running on port 5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for vehicle data and suppliers (This will reset every time the server restarts)
vehicles = []
suppliers = set()  # Use a set to store suppliers dynamically and avoid duplicates

class Vehicle(BaseModel):
    vehicle_no: int
    vehicle_license: str
    supplier_no: int

@app.post("/api/load_vehicle")
async def load_vehicle(vehicle: Vehicle):
    # Log incoming request for debugging
    logging.info(f"Received vehicle: {vehicle.dict()}")

    # Check if the vehicle already exists in memory
    if any(v.vehicle_no == vehicle.vehicle_no for v in vehicles):
        raise HTTPException(status_code=400, detail="Vehicle already exists")
    
    # Store new supplier number dynamically
    suppliers.add(vehicle.supplier_no)

    # Add vehicle to in-memory list
    vehicles.append(vehicle)
    return {"status": "Vehicle loaded successfully", "vehicle": vehicle}

# GET request to retrieve vehicle data
@app.get("/api/vehicle_data/")
async def get_vehicle_data():
    return {"data": vehicles}

# Endpoint to return all suppliers (optional)
@app.get("/api/suppliers/")
async def get_suppliers():
    return {"suppliers": list(suppliers)}

# POST request to handle file uploads (optional)
@app.post("/api/upload_files/")
async def upload_files(files: List[UploadFile] = File(...)):
    file_names = [file.filename for file in files]
    return {"status": "Files uploaded successfully", "file_names": file_names}
