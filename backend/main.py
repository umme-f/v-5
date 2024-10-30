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
    vehicle_no: int
    company_id: int
    company_name: Optional[str] = None
    employee_no: Optional[int] = None
    employee_name: Optional[str] = None
    vehicle_number_plate: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None


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




# --- Supplier endpoints ---
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

# --- Other Endpoints for Vehicle and Vehicle Manager ---

# Endpoint to add a new vehicle manager
@app.post("/api/load_vehicle_manager/")
async def add_vehicle_manager(manager: VehicleManager):
    data = read_database()

    # Check if vehicle_id already exists in the vehicle managers list
    for existing_manager in data["vehicle_managers"]:
        if existing_manager["vehicle_no"] == manager.vehicle_no:
            raise HTTPException(status_code=400, detail="Vehicle Manager for this vehicle ID already exists.")

    # Add the new vehicle manager to the list
    data["vehicle_managers"].append(manager.dict())

    # Write the updated data back to the JSON file
    write_database(data)

    return manager

@app.get("/api/vehicles/")
async def get_vehicles():
    data = read_database()
    if "vehicles" in data:
        return {"vehicles": data["vehicles"]}
    else:
        raise HTTPException(status_code=404, detail="Vehicle data not found")


# Endpoint to fetch all vehicle managers
@app.get("/api/vehicle_manager/")
async def get_all_vehicle_managers():
    data = read_database()
    return {"vehicle_managers": data["vehicle_managers"]}

# Endpoint to get a vehicle manager by vehicle ID
@app.get("/api/get_vehicle_manager/{employee_no}")
async def get_vehicle_manager(employee_no: int):
    data = read_database()
    for manager in data["vehicle_managers"]:
        if manager["employee_no"] == employee_no:
            return manager
    raise HTTPException(status_code=404, detail="Vehicle Manager not found")

# Endpoint to update a vehicle manager
@app.put("/api/vehicle_manager/{employee_no}")
async def update_vehicle_manager(employee_no: int, updated_manager: VehicleManager):
    data = read_database()
    for index, manager in enumerate(data["vehicle_managers"]):
        if manager["employee_no"] == employee_no:
            data["vehicle_managers"][index] = updated_manager.dict()  # Update data
            write_database(data)  # Save changes
            return updated_manager
    raise HTTPException(status_code=404, detail="Vehicle Manager not found")




# Endpoint to delete a vehicle manager by vehicle ID
@app.delete("/api/vehicle_managers/{vehicle_no}")
async def delete_vehicle_manager(vehicle_no: int):
    data = read_database()
    data["vehicle_managers"] = [
        manager for manager in data["vehicle_managers"] if manager["vehicle_no"] != vehicle_no
    ]
    write_database(data)
    return {"message": "Vehicle Manager deleted successfully"}



# --- Employee Endpoints ---

# 1. Get employee details by employee_id
@app.get("/api/get_employee/{employee_id}")
async def get_employee(employee_id: int):
    data = read_database()
    for employee in data["employees"]:
        if employee["employee_no"] == employee_id:
            return employee
    raise HTTPException(status_code=404, detail="Employee not found")

# 2. Add new employee data
@app.post("/api/load_employees/")
async def add_employee(employee: Employee):
    data = read_database()
    
    # Check if employee_no already exists
    for existing_employee in data["employees"]:
        if existing_employee["employee_no"] == employee.employee_no:
            raise HTTPException(status_code=400, detail="Employee ID already exists.")

    # Add the new employee to the list
    data["employees"].append(employee.dict())
    
    # Write the updated data back to the JSON file
    write_database(data)

    return employee

# 3. Delete employee by employee_id
@app.delete("/api/employees/{employee_id}")
async def delete_employee(employee_id: int):
    data = read_database()
    
    # Find and delete the employee by employee_no
    for index, employee in enumerate(data["employees"]):
        if employee["employee_no"] == employee_id:
            del data["employees"][index]
            write_database(data)  # Save the updated data back to the JSON file
            return {"message": f"Employee {employee_id} deleted successfully"}

    # If the employee is not found
    raise HTTPException(status_code=404, detail="Employee not found")

# 4. Endpoint to get all employees
@app.get("/api/employees/")
async def get_all_employees():
    data = read_database()
    if "employees" in data:
        return {"employees": data["employees"]}
    else:
        raise HTTPException(status_code=404, detail="Employee data not found")
    
# 5. Endpoint to update an employee by employee_no
@app.put("/api/employees/{employee_no}")
async def update_employee(employee_no: int, updated_employee: Employee):
    data = read_database()
    for index, employee in enumerate(data["employees"]):
        if employee["employee_no"] == employee_no:
            data["employees"][index] = updated_employee.dict()  # Update the employee
            write_database(data)  # Save the updated data back to the JSON file
            return updated_employee
    raise HTTPException(status_code=404, detail="Employee not found")

