import { faChevronDown, faChevronUp, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

const VehicleManagerDetails = () => {
  const [vehicleManagerData, setVehicleManagerData] = useState({
    vehicle_no: "",
    company_id: "",
    company_name: "",
    employee_no: "",
    start_date: "",
    end_date: "",
  });

  const [vehicleManagers, setVehicleManagers] = useState([]); // Keep local copy of vehicle managers
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

  // Fetch vehicles and managers from the backend (i.e., database.json in public folder)
  useEffect(() => {
    fetch("/backend/database.json") // Assuming the file is in public folder
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setVehicles(data.vehicles || []); // Set vehicles array
        setVehicleManagers(data.vehicle_managers || []); // Set vehicle_managers array
      })
      .catch((error) => {
        console.error("Unable to fetch data:", error);
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleManagerData({
      ...vehicleManagerData,
      [name]: value,
    });
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

  // Log vehicleManagers state to check if it's updating
  useEffect(() => {
    console.log("Current vehicleManagers state:", vehicleManagers); // Check if vehicleManagers state is updating
  }, [vehicleManagers]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Vehicle Manager Details</h2>

      {/* Existing Vehicle Managers Table */}
      <h3 className="text-lg font-bold mb-2">Existing Vehicle Managers</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
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
              vehicleManagers.map((manager, index) => {
                const vehicle = vehicles.find((v) => v.vehicle_no === manager.vehicle_no); // Match vehicle if available
                return (
                  <tr key={index} className="text-center">
                    <td className="border px-4 py-2">
                      {vehicle ? vehicle.vehicle_no : "N/A"}
                    </td>
                    <td className="border px-4 py-2">{manager.company_id}</td>
                    <td className="border px-4 py-2">{manager.company_name}</td>
                    <td className="border px-4 py-2">{manager.employee_no}</td>
                    <td className="border px-4 py-2">{manager.start_date}</td>
                    <td className="border px-4 py-2">{manager.end_date || "N/A"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-2">
                  No vehicle managers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <hr className="h-1 mx-auto my-4 bg-gray-200 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

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
            <option value="" disabled>Select Vehicle</option>
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
              <FontAwesomeIcon icon={faChevronUp} className="bg-gray-300 p-1 rounded" />
              <FontAwesomeIcon icon={faChevronDown} className="bg-gray-300 p-1 rounded" />
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
                  ? new Date(vehicleManagerData.start_date).toLocaleDateString("ja-JP")
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
              value={vehicleManagerData.start_date ? new Date(vehicleManagerData.start_date) : new Date()}
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
                  ? new Date(vehicleManagerData.end_date).toLocaleDateString("ja-JP")
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
              value={vehicleManagerData.end_date ? new Date(vehicleManagerData.end_date) : new Date()}
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

export default VehicleManagerDetails;
