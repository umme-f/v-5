import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMagnifyingGlass, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // To handle navigation

const VehicleDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // To navigate between pages

  const [vehicleData, setVehicleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const fetchVehicleData = () => {
    fetch("../backend/database.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const vehicles = data.vehicles || [];
        const enrichedVehicles = vehicles.map((vehicle) => {
          const manager = data.vehicle_managers.find(
            (mgr) => mgr.vehicle_id === vehicle.vehicle_id
          );
          const supplier = data.suppliers.find(
            (sup) => sup.supplier_id === vehicle.supplier_id
          );
          const inspection = data.inspections.find(
            (ins) => ins.vehicle_id === vehicle.vehicle_id
          );
          const repair = data.vehicle_repairs.find(
            (rep) => rep.vehicle_id === vehicle.vehicle_id
          );
          const maintenance = data.vehicle_maintenance.find(
            (mnt) => mnt.vehicle_id === vehicle.vehicle_id
          );
          return {
            ...vehicle,
            manager,
            supplier,
            inspection,
            repair,
            maintenance,
          };
        });
        setVehicleData(enrichedVehicles);
        setFilteredVehicles(enrichedVehicles);
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  };
  

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterVehicleData(e.target.value);
  };

  const filterVehicleData = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredVehicles(vehicleData);
      return;
    }

    const filtered = vehicleData.filter(
      (vehicle) =>
        vehicle.vehicle_no.toString().includes(searchTerm) ||
        vehicle.license_plate
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        vehicle.supplier_id.toString().includes(searchTerm)
    );

    setFilteredVehicles(filtered);
  };

  // Handle click to add vehicle
  const handleAddVehicleClick = () => {
    navigate("/add-button"); // Navigate to the AddVehicle component
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-5">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">
          {t("Vehicle Details")}
        </h2>

        {/* Search box */}
        <div className="w-full md:max-w-4xl md:w-auto">
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-slate-200 rounded p-2 flex-grow mb-2 md:mb-0"
            />
            <button className="rounded p-2 bg-gray-500 text-white mb-2 md:mb-0">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="pr-2" />
              {t("search")}
            </button>
          </div>
        </div>
      </div>

      <hr className="h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

      {/* Display vehicle data */}
      <div className="mt-8">
        <div className="flex justify-between pb-3">
          <h3 className="text-lg font-bold mb-4">{t("Vehicle Data")}</h3>
          {/* Add Vehicle button */}
          <div className="flex gap-3">
            <button
              onClick={handleAddVehicleClick}
              className="rounded p-2 bg-blue-500 text-white"
            > 
              <FontAwesomeIcon icon={faAdd} className="pr-2"/>
              {t("Add Vehicle")}
            </button>
            <button
              className="rounded p-2 bg-red-500 text-white"
            > 
              <FontAwesomeIcon icon={faMinus} className="pr-2"/>
              {t("Delete Vehicle")}
            </button>
          </div>
        </div>
        {filteredVehicles && filteredVehicles.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-300">{t("Vehicle No")}</th>
                <th className="px-4 py-2 bg-gray-300">{t("License Plate")}</th>
                <th className="px-4 py-2 bg-gray-300">{t("Supplier Name")}</th>
                <th className="px-4 py-2 bg-gray-300">{t("Manager Name")}</th>
                <th className="px-4 py-2 bg-gray-300">{t("Last Maintenance Date")}</th>
                <th className="px-4 py-2 bg-gray-300">{t("Inspection Date")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="border px-4 py-2">{vehicle.vehicle_no}</td>
                  <td className="border px-4 py-2">{vehicle.license_plate}</td>
                  <td className="border px-4 py-2">{vehicle.supplier?.supplier_name || "N/A"}</td>
                  <td className="border px-4 py-2">{vehicle.manager?.employee_id || "N/A"}</td>
                  <td className="border px-4 py-2">{vehicle.maintenance?.maintenance_date || "N/A"}</td>
                  <td className="border px-4 py-2">{vehicle.inspection?.inspection_date || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{t("No vehicles found.")}</p>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
