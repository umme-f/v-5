import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Add CORS middleware to allow your frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Pydantic model for Vehicle
class Vehicle(BaseModel):
    vehicle_id: int
    vehicle_no: str
    license_plate: str
    car_name: str
    # Add other vehicle fields as needed

# Pydantic model for Vehicle Manager
class VehicleManager(BaseModel):
    vehicle_id: int
    company_id: int
    company_name: str
    employee_no: int
    start_date: str
    end_date: Optional[str]  # Optional if it can be null

# Function to read from the JSON file
def read_database():
    if os.path.exists('database.json'):
        with open('database.json', 'r') as file:
            return json.load(file)
    else:
        return {"vehicles": [], "vehicle_managers": []}

# Function to write to the JSON file
def write_database(data):
    try:
        with open('database.json', 'w') as file:
            json.dump(data, file, indent=4)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write data: {e}")

# --- Vehicle Endpoints ---
# Endpoint to add a new vehicle
@app.post("/api/load_vehicle/")
async def add_vehicle(vehicle: Vehicle):
    data = read_database()

    # Check if vehicle_id already exists
    for existing_vehicle in data["vehicles"]:
        if existing_vehicle["vehicle_id"] == vehicle.vehicle_id:
            raise HTTPException(status_code=400, detail="Vehicle ID already exists.")

    # Add the new vehicle to the list
    data["vehicles"].append(vehicle.dict())

    # Write the updated data back to the JSON file
    write_database(data)

    return vehicle

# Endpoint to get a vehicle by vehicle_id
@app.get("/api/get_vehicle/{vehicle_id}")
async def get_vehicle(vehicle_id: int):
    data = read_database()
    for vehicle in data["vehicles"]:
        if vehicle["vehicle_id"] == vehicle_id:
            return vehicle
    raise HTTPException(status_code=404, detail="Vehicle not found")

# Endpoint to delete a vehicle by vehicle_id
@app.delete("/api/vehicles/{vehicle_id}")
async def delete_vehicle(vehicle_id: int):
    data = read_database()

    # Find the vehicle by vehicle_id and remove it
    data["vehicles"] = [vehicle for vehicle in data["vehicles"] if vehicle["vehicle_id"] != vehicle_id]

    # Write the updated data back to the JSON file
    write_database(data)

    return {"message": "Vehicle deleted successfully"}

# --- New GET endpoint to fetch all vehicles ---
@app.get("/api/vehicles/")
async def get_all_vehicles():
    data = read_database()
    return {"vehicles": data["vehicles"]}


# Endpoint to add a new vehicle manager
@app.post("/api/load_vehicle_manager/")
async def add_vehicle_manager(manager: VehicleManager):
    data = read_database()

    # Check if vehicle_id already exists in the vehicle managers list
    for existing_manager in data["vehicle_managers"]:
        if existing_manager["vehicle_id"] == manager.vehicle_id:
            raise HTTPException(status_code=400, detail="Vehicle Manager for this vehicle ID already exists.")

    # Add the new vehicle manager to the list
    data["vehicle_managers"].append(manager.dict())

    # Write the updated data back to the JSON file
    write_database(data)

    return manager


# Endpoint to fetch all vehicle managers from the database
@app.get("/api/vehicle_managers/")
async def get_all_vehicle_managers():
    data = read_database()
    return {"vehicle_managers": data["vehicle_managers"]}


# Endpoint to get a vehicle manager by vehicle ID
@app.get("/api/vehicle_managers/{vehicle_id}")
async def get_vehicle_manager(vehicle_id: int):
    data = read_database()
    for manager in data["vehicle_managers"]:
        if manager["vehicle_id"] == vehicle_id:
            return manager
    raise HTTPException(status_code=404, detail="Vehicle Manager not found")


# Endpoint to update a vehicle manager by vehicle ID
@app.put("/api/vehicle_managers/{vehicle_id}")
async def update_vehicle_manager(vehicle_id: int, updated_manager: VehicleManager):
    data = read_database()
    for index, manager in enumerate(data["vehicle_managers"]):
        if manager["vehicle_id"] == vehicle_id:
            data["vehicle_managers"][index] = updated_manager.dict()  # Update the vehicle manager
            write_database(data)  # Save the updated data back to the JSON file
            return updated_manager
    raise HTTPException(status_code=404, detail="Vehicle Manager not found")


# Endpoint to delete a vehicle manager by vehicle ID
@app.delete("/api/vehicle_managers/{vehicle_id}")
async def delete_vehicle_manager(vehicle_id: int):
    data = read_database()

    # Find the vehicle manager by vehicle_id and remove it
    data["vehicle_managers"] = [manager for manager in data["vehicle_managers"] if manager["vehicle_id"] != vehicle_id]

    # Write the updated data back to the JSON file
    write_database(data)

    return {"message": "Vehicle Manager deleted successfully"}

