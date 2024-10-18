import React, { useState } from "react";
import {
  faTimes,
  faCaretUp,
  faUpload,
  faFloppyDisk,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddButton = () => {
  const navigate = useNavigate();

  // State hooks for vehicle details
  const [carDetails, setCarDetails] = useState({
    vehicleId: "",
    vehicleNo: "",
    licensePlate: "",
    supplierId: "",
    makerId: "",
    carName: "",
    shape: "",
    spec: "",
    introduceType: "purchase", // purchase or lease
    purchaseDate: new Date(),
    leaseStartDate: null,
    leaseEndDate: null,
    firstInspectionDate: null,
    registrationDate: null,
    nextInspectionDate: null,
    etcCardNo: "",
    fuelCardNoTOKO: "",
    fuelCardNoEneos: "",
    lastMaintenanceMilage: "",
    lastMaintenanceDate: null,
    maintenanceIntervalMilage: "",
    maintenanceIntervalMonth: "",
    lastDrivingDate: null,
    lastMilage: "",
    compulsoryInsuranceCertificate: null,
    vehicleInspectionCertificate: null,
  });

  const [showCalendar, setShowCalendar] = useState({});

  const handleCalendarToggle = (field) => {
    setShowCalendar((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleDateChange = (field, date) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, [field]: date }));
    setShowCalendar((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target; // Get the input field name and files array
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: files[0], // Store the first file selected in the corresponding state field
    }));
  };
  const handleFileDrop = (e, fieldName) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: file, // Store the dropped file
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    toast.success("Vehicle data saved successfully");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    toast.success("Vehicle data saved successfully");
  };

  const handlePreviousPage = () => {
    navigate("/vehicle-details");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <form
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleAdd}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Vehicle Add Form
        </h2>

        {/* Vehicle ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vehicle ID
          </label>
          <input
            name="vehicleId"
            type="text"
            value={carDetails.vehicleId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Vehicle No */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vehicle No
          </label>
          <input
            name="vehicleNo"
            type="text"
            value={carDetails.vehicleNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* License Plate */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            License Plate
          </label>
          <input
            name="licensePlate"
            type="text"
            value={carDetails.licensePlate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Supplier ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Supplier ID
          </label>
          <input
            name="supplierId"
            type="text"
            value={carDetails.supplierId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Maker ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Maker ID
          </label>
          <input
            name="makerId"
            type="text"
            value={carDetails.makerId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Car Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Car Name
          </label>
          <input
            name="carName"
            type="text"
            value={carDetails.carName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Shape */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Shape
          </label>
          <input
            name="shape"
            type="text"
            value={carDetails.shape}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Spec */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Spec
          </label>
          <input
            name="spec"
            type="text"
            value={carDetails.spec}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Introduce Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Introduce Type
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="purchase"
              name="introduceType"
              value="purchase"
              checked={carDetails.introduceType === "purchase"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="purchase" className="mr-4">
              Purchase
            </label>
            <input
              type="radio"
              id="lease"
              name="introduceType"
              value="lease"
              checked={carDetails.introduceType === "lease"}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="lease" className="mr-4">
              Lease
            </label>
          </div>
        </div>

        {/* Purchase Date */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Purchase Date
          </label>
          <div className="flex">
            <input
              type="text"
              value={
                carDetails.purchaseDate
                  ? carDetails.purchaseDate.toLocaleDateString("ja-JP")
                  : ""
              }
              onClick={() => handleCalendarToggle("purchaseDate")}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
              readOnly
            />
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-gray-500 cursor-pointer ml-2 pt-2"
              onClick={() => handleCalendarToggle("purchaseDate")}
            />
          </div>
          {showCalendar.purchaseDate && (
            <Calendar
              onChange={(date) => handleDateChange("purchaseDate", date)}
              value={carDetails.purchaseDate}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
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
                carDetails.leaseStartDate
                  ? carDetails.leaseStartDate.toLocaleDateString("ja-JP")
                  : ""
              }
              onClick={() => handleCalendarToggle("leaseStartDate")}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
              readOnly
            />{" "}
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-gray-500 cursor-pointer ml-2 pt-2"
              onClick={() => handleCalendarToggle("leaseStartDate")}
            />
          </div>
          {showCalendar.leaseStartDate && (
            <Calendar
              onChange={(date) => handleDateChange("leaseStartDate", date)}
              value={carDetails.leaseStartDate}
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
                carDetails.leaseEndDate
                  ? carDetails.leaseEndDate.toLocaleDateString("ja-JP")
                  : ""
              }
              onClick={() => handleCalendarToggle("leaseEndDate")}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
              readOnly
            />{" "}
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-gray-500 cursor-pointer ml-2 pt-2"
              onClick={() => handleCalendarToggle("leaseEndDate")}
            />
          </div>
          {showCalendar.leaseEndDate && (
            <Calendar
              onChange={(date) => handleDateChange("leaseEndDate", date)}
              value={carDetails.leaseEndDate}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

        {/* 1st Inspection Date */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            1st Inspection Date
          </label>
          <input
            type="text"
            value={
              carDetails.firstInspectionDate
                ? carDetails.firstInspectionDate.toLocaleDateString("ja-JP")
                : ""
            }
            onClick={() => handleCalendarToggle("firstInspectionDate")}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
            readOnly
          />
          {showCalendar.firstInspectionDate && (
            <Calendar
              onChange={(date) => handleDateChange("firstInspectionDate", date)}
              value={carDetails.firstInspectionDate}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

        {/* Registration Date */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Registration Date
          </label>
          <input
            type="text"
            value={
              carDetails.registrationDate
                ? carDetails.registrationDate.toLocaleDateString("ja-JP")
                : ""
            }
            onClick={() => handleCalendarToggle("registrationDate")}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
            readOnly
          />
          {showCalendar.registrationDate && (
            <Calendar
              onChange={(date) => handleDateChange("registrationDate", date)}
              value={carDetails.registrationDate}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

        {/* Next Inspection Date */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Next Inspection Date
          </label>
          <input
            type="text"
            value={
              carDetails.nextInspectionDate
                ? carDetails.nextInspectionDate.toLocaleDateString("ja-JP")
                : ""
            }
            onClick={() => handleCalendarToggle("nextInspectionDate")}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
            readOnly
          />
          {showCalendar.nextInspectionDate && (
            <Calendar
              onChange={(date) => handleDateChange("nextInspectionDate", date)}
              value={carDetails.nextInspectionDate}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

        {/* ETC Card No */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ETC Card No
          </label>
          <input
            name="etcCardNo"
            type="text"
            value={carDetails.etcCardNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Fuel Card No TOKO */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fuel Card No TOKO
          </label>
          <input
            name="fuelCardNoTOKO"
            type="text"
            value={carDetails.fuelCardNoTOKO}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Fuel Card No ENEOS */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fuel Card No ENEOS
          </label>
          <input
            name="fuelCardNoEneos"
            type="text"
            value={carDetails.fuelCardNoEneos}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Last Maintenance Milage */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Maintenance Milage
          </label>
          <input
            name="lastMaintenanceMilage"
            type="number"
            value={carDetails.lastMaintenanceMilage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Last Maintenance Date */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Maintenance Date
          </label>
          <input
            type="text"
            value={
              carDetails.lastMaintenanceDate
                ? carDetails.lastMaintenanceDate.toLocaleDateString("ja-JP")
                : ""
            }
            onClick={() => handleCalendarToggle("lastMaintenanceDate")}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
            readOnly
          />
          {showCalendar.lastMaintenanceDate && (
            <Calendar
              onChange={(date) => handleDateChange("lastMaintenanceDate", date)}
              value={carDetails.lastMaintenanceDate}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

        {/* Maintenance Interval Milage */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Maintenance Interval Milage
          </label>
          <input
            name="maintenanceIntervalMilage"
            type="number"
            value={carDetails.maintenanceIntervalMilage}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Maintenance Interval Month */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Maintenance Interval Month
          </label>
          <input
            name="maintenanceIntervalMonth"
            type="number"
            value={carDetails.maintenanceIntervalMonth}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Last Driving Date */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Driving Date
          </label>
          <input
            type="text"
            value={
              carDetails.lastDrivingDate
                ? carDetails.lastDrivingDate.toLocaleDateString("ja-JP")
                : ""
            }
            onClick={() => handleCalendarToggle("lastDrivingDate")}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
            readOnly
          />
          {showCalendar.lastDrivingDate && (
            <Calendar
              onChange={(date) => handleDateChange("lastDrivingDate", date)}
              value={carDetails.lastDrivingDate}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

        {/* Last Milage */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Milage
          </label>
          <div className="flex pr-2">
            <input
              name="lastMilage"
              type="number"
              value={carDetails.lastMilage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <h1 className="pl-2 pt-2 font-bold">km</h1>
          </div>
        </div>
        {/* File upload- Open folder or Drag and drop */}
        {/* Compulsory Insurance Certificate */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Compulsory Insurance Certificate
          </label>
          <div
            className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
            onDrop={(e) => handleFileDrop(e, "compulsoryInsuranceCertificate")}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              name="compulsoryInsuranceCertificate"
              onChange={handleFileChange}
              className="hidden"
              id="compulsoryInsuranceInput"
            />
            <label htmlFor="compulsoryInsuranceInput">
              <FontAwesomeIcon icon={faUpload} className="text-gray-500" />
              <p>Drag and drop or click to upload</p>
            </label>
            {carDetails.compulsoryInsuranceCertificate && (
              <p className="text-green-500 mt-2">
                {carDetails.compulsoryInsuranceCertificate.name} uploaded
              </p>
            )}
          </div>
        </div>

        {/* Vehicle Inspection Certificate */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vehicle Inspection Certificate
          </label>
          <div
            className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer"
            onDrop={(e) => handleFileDrop(e, "vehicleInspectionCertificate")}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              name="vehicleInspectionCertificate"
              onChange={handleFileChange}
              className="hidden"
              id="vehicleInspectionInput"
            />
            <label htmlFor="vehicleInspectionInput">
              <FontAwesomeIcon icon={faUpload} className="text-gray-500" />
              <p>Drag and drop or click to upload</p>
            </label>
            {carDetails.vehicleInspectionCertificate && (
              <p className="text-green-500 mt-2">
                {carDetails.vehicleInspectionCertificate.name} uploaded
              </p>
            )}
          </div>
        </div>
        {/* Add notes */}
        <div className="grid">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Add notes
          </label>
          <textarea className="border border-black"></textarea>
        </div>

        {/* Save & Back Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="pr-2" />
            Save
          </button>
          <button
            type="button"
            onClick={handlePreviousPage}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="pr-2" />
            Back to Previous Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddButton;
