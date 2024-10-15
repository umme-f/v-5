import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend running on specific port (e.g., 5173 for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data from your JSON file
with open('database.json', 'r') as file:
    database = json.load(file)

vehicles = database["vehicles"]
vehicle_managers = database["vehicle_managers"]
suppliers = database["suppliers"]
inspections = database["inspections"]
vehicle_repairs = database["vehicle_repairs"]
vehicle_maintenance = database["vehicle_maintenance"]

# Pydantic models for validation
class Vehicle(BaseModel):
    vehicle_id: int
    vehicle_no: str
    license_plate: str
    supplier_id: int
    maker_id: int
    car_name: str
    shape: str
    spec: str
    introduce_type: str
    purchase_date: Optional[str]
    lease_start_date: Optional[str]
    lease_end_date: Optional[str]
    first_inspection_date: Optional[str]
    registration_date: Optional[str]
    next_inspection_date: Optional[str]
    etc_card_no: Optional[str]
    fuel_card_no_TOKO: Optional[str]
    fuel_card_no_eneos: Optional[str]
    last_maintenance_milage: Optional[int]
    last_maintenance_date: Optional[str]
    maintenance_interval_milage: Optional[int]
    maintenance_interval_month: Optional[int]
    last_driving_date: Optional[str]
    last_milage: Optional[int]

# Sample Endpoint to Get All Vehicles
@app.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles():
    return vehicles

# Get a single vehicle by ID
@app.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: int):
    vehicle = next((v for v in vehicles if v['vehicle_id'] == vehicle_id), None)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

# Add a new vehicle
@app.post("/vehicles", response_model=Vehicle)
async def add_vehicle(vehicle: Vehicle):
    vehicles.append(vehicle.dict())
    return vehicle

# Update a vehicle by ID
@app.put("/vehicles/{vehicle_id}", response_model=Vehicle)
async def update_vehicle(vehicle_id: int, updated_vehicle: Vehicle):
    for index, vehicle in enumerate(vehicles):
        if vehicle["vehicle_id"] == vehicle_id:
            vehicles[index] = updated_vehicle.dict()
            return updated_vehicle
    raise HTTPException(status_code=404, detail="Vehicle not found")

# Delete a vehicle by ID
@app.delete("/vehicles/{vehicle_id}")
async def delete_vehicle(vehicle_id: int):
    global vehicles
    vehicles = [v for v in vehicles if v["vehicle_id"] != vehicle_id]
    return {"status": "Vehicle deleted successfully"}
