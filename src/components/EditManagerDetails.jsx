import React, { useState, useEffect } from "react";
import  { toast, ToastContainer} from "react-toastify";
import EditOrChangeModal from "./EditOrChangeModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarDays,
  faArrowLeft,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";

const EditManagerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { manager } = location.state; // Get passed manager data
  const [isChangeDialogOpen, setIsChangeDialogOpen] = useState(false);

  const [vehicleManagerData, setVehicleManagerData] = useState(manager); // Pre-fill data
  const [vehicles, setVehicles] = useState([]); // Keep vehicle data for the dropdown
  const [employees, setEmployees] = useState([]); // Initialize as an empty array
  const [showCalendar, setShowCalendar] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleManagerData({
      ...vehicleManagerData,
      [name]: value,
    });
  };

  const handleCalendarToggle = (field) => {
    setShowCalendar({
      start_date: false,
      end_date: false,
      [field]: !showCalendar[field],
    });
  };

  const handleDateChange = (field, date) => {
    setVehicleManagerData((prev) => ({
      ...prev,
      [field]: date.toISOString().split("T")[0], // Store date in YYYY-MM-DD format
    }));
    setShowCalendar((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSaveClick = () => {
    setIsChangeDialogOpen(true); // open the modal when the user tries to save
  };
  const confirmChange = () => {
    setIsChangeDialogOpen(false); // close the modal
    handleConfirmSave(); // proceed with saving data
  };

  const cancelChange = () => {
    setIsChangeDialogOpen(false); // close the modal without saving
  };

  const handleBackClick = () => {
    navigate("/vehicle-manager-details");
  };

  // Save button function
  const handleConfirmSave = async () => {
    console.log("Sending Data:", vehicleManagerData); // Log the data being sent
    try {
      const response = await fetch(
        `http://localhost:8000/api/vehicle_manager/${vehicleManagerData.employee_no}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicleManagerData),
        }
      );

      if (response.ok) {
        
        toast.success("Vehicle Manager saved successfully!", {
          position: "top-right",
          autoClose: 3000, // Auto close after 3seconds
          onClose: () => navigate("/vehicle-manager-details"), // Navigate back to the previous page after toast closes
      });
      } else {
        const errorData = await response.json();
        alert(`Failed to update vehicle manager: ${errorData.detail}`);
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error updating vehicle manager:", error);
    }
  };

  // Fetch vehicles using the API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/vehicles/");
        const data = await response.json();
        setVehicles(data.vehicles || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching vehicles: ", error);
      }
    };
    fetchVehicles();
  }, []);

  // Fetch employee data using the correct endpoint---could use another API endpoints for retrieving all employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("./backend/database.json");
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();
        console.log("Employee Data:", data);

        // Check if the data is an array
        if (Array.isArray(data.employee)) {
          setEmployees(data.employee); // Set employees as the array
        }
        // Check if the data is an object (single employee)
        else if (typeof data.employee === "object" && data.employee !== null) {
          setEmployees([data.employee]); // Convert the object to an array
        }
        // Handle unexpected format
        else {
          console.error("Unexpected employee data format");
          setEmployees([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <div className="p-8 ">
        <h2 className="text-2xl font-bold mb-4">Edit Vehicle Manager</h2>
        <ToastContainer/>
        {
          vehicleManagerData ? (<>
          <form className="space-y-4">
          {/* Vehicle no*/}
          <div className="block text-sm font-medium">
             Vehicle Manager No
              <input
                type="number"
                name="employee_no"
                value={vehicleManagerData.employee_no}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
                readOnly
              />
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
            <label
              htmlFor="employee_name"
              className="block text-sm font-medium"
            >
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

          {/* Lease Start Date */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lease Start Date
            </label>
            <div className="flex">
              <input
                type="text"
                value={
                  vehicleManagerData.start_date
                    ? new Date(
                        vehicleManagerData.start_date
                      ).toLocaleDateString("ja-JP")
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

          {/* Lease End Date */}
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

          {/* The Buttons for submit and back to previous page */}
          <div className="flex justify-between">
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSaveClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faFloppyDisk} className="pr-2" />
              Save Edit Data
            </button>
            <button
              type="button"
              onClick={handleBackClick}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="pr-2" />
              Back
            </button>
          </div>
        </form>
        <EditOrChangeModal
            isOpen={isChangeDialogOpen}
            confirmChange={confirmChange}
            cancelChange={cancelChange}
          />
          </>):(
            <p>LLoading data</p>
          )
        }
      </div>
    </div>
  );
};

export default EditManagerDetails;
