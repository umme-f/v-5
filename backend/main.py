import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Add CORS middleware to allow your frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define Pydantic models for input validation
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
    purchase_date: str
    lease_start_date: Optional[str] = None
    lease_end_date: Optional[str] = None
    first_inspection_date: str
    registration_date: str
    next_inspection_date: str
    etc_card_no: str
    fuel_card_no_TOKO: str
    fuel_card_no_eneos: str
    last_maintenance_milage: int
    last_maintenance_date: str
    maintenance_interval_milage: int
    maintenance_interval_month: int
    last_driving_date: str
    last_milage: int

# Function to read from the JSON file
def read_database():
    with open('database.json', 'r') as file:
        return json.load(file)

# Function to write to the JSON file
def write_database(data):
    with open('database.json', 'w') as file:
        json.dump(data, file, indent=4)

# Endpoint to get all vehicles
@app.get("/api/vehicles/")
async def get_vehicles():
    data = read_database()
    return {"vehicles": data["vehicles"]}

# Endpoint to get a vehicle by its ID
@app.get("/api/vehicles/{vehicle_id}")
async def get_vehicle(vehicle_id: int):
    data = read_database()
    for vehicle in data["vehicles"]:
        if vehicle["vehicle_id"] == vehicle_id:
            return vehicle
    raise HTTPException(status_code=404, detail="Vehicle not found")

# Endpoint to add a new vehicle
@app.post("/api/vehicles/")
async def add_vehicle(vehicle: Vehicle):
    data = read_database()
    data["vehicles"].append(vehicle.dict())  # Add the new vehicle to the list
    write_database(data)  # Save the updated data back to the JSON file
    return vehicle

# Endpoint to update an existing vehicle by ID
@app.put("/api/vehicles/{vehicle_id}")
async def update_vehicle(vehicle_id: int, updated_vehicle: Vehicle):
    data = read_database()
    for index, vehicle in enumerate(data["vehicles"]):
        if vehicle["vehicle_id"] == vehicle_id:
            data["vehicles"][index] = updated_vehicle.dict()  # Update the vehicle
            write_database(data)  # Save the updated data back to the JSON file
            return updated_vehicle
    raise HTTPException(status_code=404, detail="Vehicle not found")

# Endpoint to delete a vehicle by ID
@app.delete("/api/vehicles/{vehicle_id}")
async def delete_vehicle(vehicle_id: int):
    data = read_database()
    for index, vehicle in enumerate(data["vehicles"]):
        if vehicle["vehicle_id"] == vehicle_id:
            del data["vehicles"][index]  # Remove the vehicle from the list
            write_database(data)  # Save the updated data back to the JSON file
            return {"message": f"Vehicle {vehicle_id} deleted successfully"}
    raise HTTPException(status_code=404, detail="Vehicle not found")

# Endpoint to get all suppliers
@app.get("/api/suppliers/")
async def get_suppliers():
    data = read_database()
    return {"suppliers": data["suppliers"]}
