import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
const AddVehicleManager = () => {
  const [vehicleManagerData, setVehicleManagerData] = useState({
    vehicle_no: "",
    company_id: "",
    company_name: "",
    employee_no: "",
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
    setVehicleManagerData((prev) => ({
      ...prev,
      [field]: date.toISOString().split("T")[0], // Store date in YYYY-MM-DD format
    }));
    setShowCalendar((prev) => ({
      ...prev,
      [field]: false, // Close the calendar after selecting the date
    }));
  };

  // Handle form submission for adding a new vehicle manager
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(vehicleManagerData); // Check if the form data is correct before submission
    try {
      // Update the local state with new vehicle manager
      setVehicleManagers([...vehicleManagers, vehicleManagerData]);

      alert("Vehicle manager added successfully!");
      setVehicleManagerData({
        manager_id:"",
        vehicle_no: "",
        company_id: "",
        company_name: "",
        employee_no: "",
        start_date: "",
        end_date: "",
      });
    } catch (error) {
      console.error("Error adding vehicle manager:", error);
      alert("Failed to add vehicle manager.");
    }
  };
  return (
    <div className="p-8 ">
      {/* Form to Add Vehicle Manager */}
      <h2 className="text-2xl font-bold mb-4">Add Vehicle Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Vehicle Number Dropdown */}
        <div>
          <label htmlFor="vehicle_no" className="block text-sm font-medium">
            Vehicle Number
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
              Select Vehicle
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Vehicle Manager
        </button>
      </form>
    </div>
  );
};

export default AddVehicleManager;
