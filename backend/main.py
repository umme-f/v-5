import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Add CORS middleware to allow your frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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

# Endpoint to load supplier data
@app.post("/api/load_supplier/")
async def add_supplier(supplier: Supplier):
    data = read_database()

    # Check if supplier_no already exists or not
    for s in data["suppliers"]:
        if s["supplier_no"] == supplier.supplier_no:
            raise HTTPException(status_code=400, detail="Supplier number already exists.")
    
    # Add the new supplier to the list
    data["suppliers"].append(supplier.dict())  
    
    # Save the updated data back to the JSON file
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
