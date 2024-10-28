import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCalendarDays,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
const AddVehicleManager = () => {
  const navigate = useNavigate();
  const [vehicleManagerData, setVehicleManagerData] = useState({
    vehicle_no: "",
    company_id: "",
    company_name: "",
    employee_no: "",
    employee_name: "",
    vehicle_number_plate: "",
    start_date: "",
    end_date: "",
  });

  const [vehicles, setVehicles] = useState([]); // Keep vehicle data for the dropdown
  const [showCalendar, setShowCalendar] = useState({});

  const handleCalendarToggle = (field) => {
    // Close all calendars before opening the current one
    setShowCalendar({
      start_date: false,
      end_date: false,
      [field]: !showCalendar[field], // Only toggle the selected calendar
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleManagerData({
      ...vehicleManagerData,
      [name]: value,
    });
  };

  const handleDateChange = (field, date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setVehicleManagerData((prev) => ({
      ...prev,
      [field]: formattedDate,
    }));
    setShowCalendar((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(vehicleManagerData);
  // Ensure numbers are passed correctly
  const updatedVehicleManagerData = {
    ...vehicleManagerData,
    vehicle_no: parseInt(vehicleManagerData.vehicle_no, 10),
    company_id: parseInt(vehicleManagerData.company_id, 10),
    employee_no: parseInt(vehicleManagerData.employee_no, 10),
  };
    try {
      const response = await fetch(
        "http://localhost:8000/api/load_vehicle_manager/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicleManagerData),
        }
      );

      if (response.ok) {
        alert("Vehicle manager added successfully!");
        setVehicleManagerData({
          vehicle_no: "",
          company_id: "",
          company_name: "",
          employee_no: "",
          employee_name: "",
          vehicle_number_plate: "",
          start_date: "",
          end_date: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error adding vehicle manager:", errorData);
        alert("Failed to add vehicle manager.");
      }
    } catch (error) {
      console.error("Error adding vehicle manager:", error);
      alert("Failed to add vehicle manager.");
    }
  };

  const handleBackClick = () => {
    navigate("/vehicle-manager-details");
  };

  //----!!! Fetch vehicles using new API: http://localhost:8000/api/vehicles/
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/vehicles/");
        const data = await response.json();
        setVehicles(data.vehicles);
      } catch (error) {
        console.error("Error fetching vehicles: ", error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="p-8 ">
      {/* Form to Add Vehicle Manager */}
      <h2 className="text-2xl font-bold mb-4">Add Vehicle Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Vehicle Number Dropdown */}
        <div>
          <label htmlFor="vehicle_no" className="block text-sm font-medium">
            Vehicle No
          </label>
          <select
            id="vehicle_no"
            name="vehicle_no"
            value={vehicleManagerData.vehicle_no}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="" disabled>
              ---Select Vehicle---
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.vehicle_no} value={vehicle.vehicle_no}>
                {vehicle.vehicle_no}
              </option>
            ))}
          </select>
        </div>

        {/* Company ID with Spin Button */}
        <div>
          <label htmlFor="company_id" className="block text-sm font-medium">
            Company ID
          </label>
          <div className="flex justify-between">
            <input
              type="number"
              id="company_id"
              name="company_id"
              value={vehicleManagerData.company_id}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg p-2 w-full"
              min="1"
              step="1"
            />
            <div className="pl-2">
              <FontAwesomeIcon
                icon={faChevronUp}
                className="bg-gray-300 p-1 rounded"
              />
              <FontAwesomeIcon
                icon={faChevronDown}
                className="bg-gray-300 p-1 rounded"
              />
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="company_name" className="block text-sm font-medium">
            Company Name
          </label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={vehicleManagerData.company_name}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        {/* Employee Number */}
        <div>
          <label htmlFor="employee_no" className="block text-sm font-medium">
            Employee Number
          </label>
          <input
            type="number"
            id="employee_no"
            name="employee_no"
            value={vehicleManagerData.employee_no}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        {/* Employee Name */}
        <div>
          <label htmlFor="employee_name" className="block text-sm font-medium">
            Employee Name
          </label>
          <input
            type="text"
            id="employee_name"
            name="employee_name"
            value={vehicleManagerData.employee_name}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        {/* vehicle_number_plate */}
        <div>
          <label
            htmlFor="vehicle_number_plate"
            className="block text-sm font-medium"
          >
            Vehicle Number Plate
          </label>
          <input
            type="text"
            id="vehicle_number_plate"
            name="vehicle_number_plate"
            value={vehicleManagerData.vehicle_number_plate}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        {/* Start Date */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Lease Start Date
          </label>
          <div className="flex">
            <input
              type="text"
              value={
                vehicleManagerData.start_date
                  ? new Date(vehicleManagerData.start_date).toLocaleDateString(
                      "ja-JP"
                    )
                  : ""
              }
              onClick={() => handleCalendarToggle("start_date")}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
              readOnly
            />
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-gray-500 cursor-pointer ml-2 pt-2"
              onClick={() => handleCalendarToggle("start_date")}
            />
          </div>
          {showCalendar.start_date && (
            <Calendar
              onChange={(date) => handleDateChange("start_date", date)}
              value={
                vehicleManagerData.start_date
                  ? new Date(vehicleManagerData.start_date)
                  : new Date()
              }
              locale="ja"
              calendarType="gregory"
              formatShortWeekday={(locale, date) =>
                ["日", "月", "火", "水", "木", "金", "土"][date.getDay()]
              }
              formatDay={(locale, date) => date.getDate()}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

        {/* End Date */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Lease End Date
          </label>
          <div className="flex">
            <input
              type="text"
              value={
                vehicleManagerData.end_date
                  ? new Date(vehicleManagerData.end_date).toLocaleDateString(
                      "ja-JP"
                    )
                  : ""
              }
              onClick={() => handleCalendarToggle("end_date")}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
              readOnly
            />
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-gray-500 cursor-pointer ml-2 pt-2"
              onClick={() => handleCalendarToggle("end_date")}
            />
          </div>
          {showCalendar.end_date && (
            <Calendar
              onChange={(date) => handleDateChange("end_date", date)}
              value={
                vehicleManagerData.end_date
                  ? new Date(vehicleManagerData.end_date)
                  : new Date()
              }
              locale="ja"
              calendarType="gregory"
              formatShortWeekday={(locale, date) =>
                ["日", "月", "火", "水", "木", "金", "土"][date.getDay()]
              }
              formatDay={(locale, date) => date.getDate()}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>
        <div className="flex justify-between">
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Vehicle Manager
          </button>
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBackClick}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="pr-2" />
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleManager;
