import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditManagerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { manager } = location.state; // Get passed manager data

  const [vehicleManagerData, setVehicleManagerData] = useState(manager); // Pre-fill data
  const [vehicles, setVehicles] = useState([]); // Keep vehicle data for the dropdown

  // Fetch vehicles data from backend API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/vehicles/");
        const data = await response.json();
        setVehicles(data.vehicles); // Set fetched vehicles data
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []); // Runs only once when component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleManagerData({
      ...vehicleManagerData,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/vehicle_managers/${vehicleManagerData.manager_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleManagerData),
      });

      if (response.ok) {
        alert("Vehicle manager updated successfully!");
        navigate("/vehicle-managers");
      } else {
        alert("Failed to update vehicle manager.");
      }
    } catch (error) {
      console.error("Error updating vehicle manager:", error);
    }
  };

  return (
    <div>
      <h2>Edit Vehicle Manager</h2>
      <form>
        <div>
          <label>Vehicle No</label>
          <select
            id="vehicle_no"
            name="vehicle_no"
            value={vehicleManagerData.vehicle_no}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              ---Select Vehicle---
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.vehicle_id} value={vehicle.vehicle_no}>
                {vehicle.vehicle_no}
              </option>
            ))}
          </select>
        </div>
        {/* Other input fields */}
        <button type="button" onClick={handleSaveClick}>
          Save Vehicle Manager
        </button>
      </form>
    </div>
  );
};

export default EditManagerDetails;
