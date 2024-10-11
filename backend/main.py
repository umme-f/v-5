from fastapi import FastAPI

app = FastAPI()

# Example API endpoint
@app.get("/")
async def read_root():
    return {"message": "Hello World"}

# Custom OpenAPI definition to add the `servers` field explicitly
@app.get("/openapi.json", include_in_schema=False)
async def custom_openapi():
    openapi_schema = app.openapi()
    
    # Define the `servers` key to specify `http` or `https` schemes
    openapi_schema["servers"] = [
        {"url": "http://localhost:8000", "description": "Development server"},
        {"url": "https://myapi.example.com", "description": "Production server"}
    ]
    
    return openapi_schema

# Apply the custom OpenAPI modification
def custom_openapi_schema():
    openapi_schema = app.openapi()
    
    # Modify the servers field to include multiple URLs
    openapi_schema["servers"] = [
        {"url": "http://localhost:8000", "description": "Development server"},
        {"url": "https://myapi.example.com", "description": "Production server"}
    ]
    
    app.openapi_schema = openapi_schema  # Override the default OpenAPI schema
    return app.openapi_schema

# Assign the custom OpenAPI method to the app
app.openapi = custom_openapi_schema
