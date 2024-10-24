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

# Define Pydantic model for Supplier
class Supplier(BaseModel):
    supplier_no: int
    supplier_name: str
    receptionist_name: str
    telephone_number: str

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

# Pydantic model for Employee
class Employee(BaseModel):
    employee_no: int
    firstname: str
    lastname: str
    department: str
    license: str

# Function to read from the JSON file
def read_database():
    if os.path.exists('database.json'):
        with open('database.json', 'r') as file:
            return json.load(file)
    else:
        return {"suppliers": [],"vehicles": [], "vehicle_managers": [], "employees" : [],}

# Function to write to the JSON file
def write_database(data):
    try:
        with open('database.json', 'w') as file:
            json.dump(data, file, indent=4)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write data: {e}")



# Endpoint to load supplier data
@app.post("/api/load_supplier/")
async def add_supplier(supplier: Supplier):
    data = read_database()

    # Check if supplier_id already exists
    for existing_supplier in data["suppliers"]:
        if existing_supplier["supplier_no"] == supplier.supplier_no:
            raise HTTPException(status_code=400, detail="Supplier ID already exists.")

    # Add the new supplier to the list
    data["suppliers"].append(supplier.dict())

    # Write the updated data back to the JSON file
    write_database(data)

    return supplier

# Endpoint to get all suppliers
@app.get("/api/suppliers/")
async def get_suppliers():
    data = read_database()
    return {"suppliers": data["suppliers"]}

# Endpoint to get supplier by supplier number
@app.get("/api/suppliers/{supplier_no}")
async def get_supplier(supplier_no: int):
    data = read_database()
    for supplier in data["suppliers"]:
        if supplier["supplier_no"] == supplier_no:
            return supplier
    raise HTTPException(status_code=404, detail="Supplier not found")

# Endpoint to update supplier by supplier number
@app.put("/api/suppliers/{supplier_no}")
async def update_supplier(supplier_no: int, updated_supplier: Supplier):
    data = read_database()
    for index, supplier in enumerate(data["suppliers"]):
        if supplier["supplier_no"] == supplier_no:
            data["suppliers"][index] = updated_supplier.dict()  # Update the supplier
            write_database(data)  # Save the updated data back to the JSON file
            return updated_supplier
    raise HTTPException(status_code=404, detail="Supplier not found")

# Endpoint to delete a supplier by supplier number
@app.delete("/api/suppliers/{supplier_no}")
async def delete_supplier(supplier_no: int):
    data = read_database()
    for index, supplier in enumerate(data["suppliers"]):
        if supplier["supplier_no"] == supplier_no:
            del data["suppliers"][index]  # Remove the supplier from the list
            write_database(data)  # Save the updated data back to the JSON file
            return {"message": f"Supplier {supplier_no} deleted successfully"}
    raise HTTPException(status_code=404, detail="Supplier not found")


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

# Endpoint to get all employees
@app.get("/api/employees")
async def get_all_employees():
    data = read_database()
    if "employees" in data:
        return {"employees": data["employees"]}
    else:
        raise HTTPException(status_code=404, detail="Employee data not found")

# Endpoint to get a single employee by employee_no
@app.get("/api/get_employee/{employee_no}")
async def get_employee(employee_no: int):
    data = read_database()

    # Check if the 'employees' key exists
    if "employees" not in data:
        raise HTTPException(status_code=404, detail="Employee data not found")

    # Find the employee by employee_no
    for employee in data["employees"]:
        if employee["employee_no"] == employee_no:
            return employee

    # If no matching employee is found
    raise HTTPException(status_code=404, detail="Employee not found")

# --- Other Endpoints for Vehicle and Vehicle Manager ---

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

# Endpoint to fetch all vehicle managers
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

# Endpoint to update a vehicle manager
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