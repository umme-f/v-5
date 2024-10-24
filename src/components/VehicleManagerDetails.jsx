import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const VehicleManagerDetails = () => {
  const navigate = useNavigate();
  const [vehicleManagers, setVehicleManagers] = useState([]); // Keep local copy of vehicle managers
  const [selectedManager, setSelectedManager] = useState(null); // Track selected manager

  // Fetch vehicles and managers from the backend API
  useEffect(() => {
    fetch("http://localhost:8000/api/vehicle_managers/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setVehicleManagers(data.vehicle_managers || []);
      })
      .catch((error) => {
        console.error("Unable to fetch data:", error);
      });
  }, []);
   // Empty dependency array ensures this runs once on component mount

  // Function to handle row click and store the selected manager
  const handleRowClick = (manager) => {
    setSelectedManager(manager); // Store the clicked manager
  };

  // Function to handle the Edit button click
  const handleEditClick = () => {
    if (selectedManager) {
      navigate("/edit-vehicleManagerDetails", { state: { manager: selectedManager } });
    } else {
      alert("Please select a manager to edit.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">Vehicle Manager Details</h2>

      {/* Existing Vehicle Managers Table */}

      <div className="flex justify-between">
        <h3 className="text-lg font-bold mb-2">Existing Vehicle Managers</h3>
        <div className="flex items-center justify-between mb-6">
          {/* Add Button */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/add-vehicleManager")}
              className="rounded p-2 bg-blue-500 text-white"
            >
              <FontAwesomeIcon icon={faAdd} className="pr-2" />
              Add Manager
            </button>
            {/* Edit button */}
            <button
              onClick={handleEditClick} // Navigate to edit page with selected manager data
              className="rounded p-2 bg-orange-500 text-white"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="pr-2" />
              Edit Manager Details
            </button>
            <button
              // onClick={handleDeleteSupplierClick} // Handle delete click (open confirmation modal)
              className="rounded p-2 bg-red-500 text-white"
            >
              <FontAwesomeIcon icon={faTrash} className="pr-2" />
              Delete Manager
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Manager ID</th>
              <th className="px-4 py-2 border">Vehicle No</th>
              <th className="px-4 py-2 border">Company ID</th>
              <th className="px-4 py-2 border">Company Name</th>
              <th className="px-4 py-2 border">Employee No</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
            </tr>
          </thead>
          <tbody>
            {vehicleManagers.length > 0 ? (
              vehicleManagers.map((manager, index) => (
                <tr
                  key={index}
                  className={`text-center ${selectedManager === manager ? "bg-blue-200 border" : ""}`}
                  onClick={() => handleRowClick(manager)} // Select manager on row click
                >
                  <td className="border px-4 py-2">{manager.manager_id}</td>
                  <td className="border px-4 py-2">{manager.vehicle_no}</td>
                  <td className="border px-4 py-2">{manager.company_id}</td>
                  <td className="border px-4 py-2">{manager.company_name}</td>
                  <td className="border px-4 py-2">{manager.employee_no}</td>
                  <td className="border px-4 py-2">{manager.start_date}</td>
                  <td className="border px-4 py-2">{manager.end_date || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-2">
                  No vehicle managers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleManagerDetails;
