import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Add CORS middleware to allow your frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
    if os.path.exists('database.json'):
        with open('database.json', 'r') as file:
            return json.load(file)
    else:
        return {"vehicles": [], "suppliers": []}

# Function to write to the JSON file
def write_database(data):
    try:
        with open('database.json', 'w') as file:
            json.dump(data, file, indent=4)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write data: {e}")

favicon_path = 'favicon.ico'  # Adjust path to file

@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)
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
@app.post("/api/load_vehicle/")
async def add_vehicle(vehicle: Vehicle):
    data = read_database()

    # Check if vehicle_id already exists
    for v in data["vehicles"]:
        if v["vehicle_id"] == vehicle.vehicle_id:
            raise HTTPException(status_code=400, detail="Vehicle ID already exists.")

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

# Endpoint to get vehicles by supplier ID
@app.get("/api/vehicles_by_supplier/{supplier_id}")
async def get_vehicles_by_supplier(supplier_id: int):
    data = read_database()
    vehicles = [v for v in data["vehicles"] if v["supplier_id"] == supplier_id]
    if vehicles:
        return vehicles
    else:
        raise HTTPException(status_code=404, detail="No vehicles found for the supplier")
