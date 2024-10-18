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
<<<<<<< HEAD
=======
  const { t, i18n } = useTranslation();
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a
  const navigate = useNavigate();

  // State hooks for vehicle details
  const [carDetails, setCarDetails] = useState({
    vehicleId: "",
    vehicleNo: "",
    licensePlate: "",
    supplierId: "",
    makerId: "",
    carName: "",
<<<<<<< HEAD
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
=======
    carMaker: "",
    year: new Date().getFullYear(),
    lastMileage: 0,
    carType: "",
    date: new Date(),
    licensePlate: "", // New field for License Plate
    managerName: "", // New field for Manager Name
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState("");
  const [selectedCarMaker, setSelectedCarMaker] = useState("");
  const [showCarMakers, setShowCarMakers] = useState(false);
  const [showCarNames, setShowCarNames] = useState(false);
  const [fileCalendars, setFileCalendars] = useState({});
  const carMakerRef = useRef(null);
  const carNameRef = useRef(null);
  const fileCalendarRef = useRef({});
  const fileInputRefs = useRef([]);

  const [validation, setValidation] = useState({
    carId: true,
    carName: true,
    carMaker: true,
    carType: true,
    date: true,
    fileDates: true,
    year: true,
    licensePlate: true, // Validation for License Plate
    managerName: true,  // Validation for Manager Name
  });

  const [isSavePressed, setIsSavePressed] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [fileDetails, setFileDetails] = useState(() => {
    const savedDetails = localStorage.getItem("fileDetails");
    return savedDetails
      ? JSON.parse(savedDetails)
      : [
          {
            compulsoryInsuranceCertificate: null,
            vehicleInspectionCertificate: null,
            date: null,
          },
        ];
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    localStorage.setItem("fileDetails", JSON.stringify(fileDetails));
  }, [fileDetails]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setIsSavePressed(true);
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };
<<<<<<< HEAD
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
=======
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a

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

<<<<<<< HEAD
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
=======
        {/* License Plate */}
        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block ${
              !validation.licensePlate ? "text-red-500" : ""
            }`}
            htmlFor="licensePlate"
          >
            {t("licensePlate")}
          </label>
          <input
            id="licensePlate"
            name="licensePlate"
            type="text"
            value={carDetails.licensePlate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
              !validation.licensePlate ? "border-red-500" : ""
            }`}
          />
        </div>

        {/* Manager Name */}
        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block ${
              !validation.managerName ? "text-red-500" : ""
            }`}
            htmlFor="managerName"
          >
            {t("managerName")}
          </label>
          <input
            id="managerName"
            name="managerName"
            type="text"
            value={carDetails.managerName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
              !validation.managerName ? "border-red-500" : ""
            }`}
          />
        </div>

        {/* Car Maker Name */}
        <div className="mb-4 relative" ref={carMakerRef}>
          <label
            className={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 text-sm font-bold mb-2 ${
              !validation.carName ? "text-red-500" : ""
            }`}
          >
            {t("carmakername")}
          </label>
          <div className="flex">
            <input
              type="text"
              name="carName"
              value={selectedCarMaker}
              onChange={handleChange}
              onFocus={() => setShowCarMakers(true)}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                !validation.carName ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowCarMakers((prev) => !prev)}
              className="px-3 py-2 bg-gray-200 border-l border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
          {showCarMakers && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {CAR_MAKER.map((maker, index) => (
                <li
                  key={index}
                  onMouseDown={() => setSelectedCarMaker(maker)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {maker}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Car Name */}
        <div className="mb-4 relative" ref={carNameRef}>
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block ${
              !validation.carName ? "text-red-500" : ""
            }`}
            htmlFor="carName"
          >
            {t("carname")}
          </label>
          <div className="flex">
            <input
              id="carName"
              type="text"
              value={carDetails.carName}
              onChange={(e) =>
                setCarDetails((prevDetails) => ({
                  ...prevDetails,
                  carName: e.target.value,
                }))
              }
              onFocus={() => setShowCarNames(true)}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                !validation.carName ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowCarNames((prev) => !prev)}
              className="px-3 py-2 bg-gray-200 border-l border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
          {showCarNames && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {CAR_NAME.map((name, index) => (
                <li
                  key={index}
                  onMouseDown={() =>
                    setCarDetails((prevDetails) => ({
                      ...prevDetails,
                      carName: name,
                    }))
                  }
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Year */}
        <div className="mb-4 relative">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block ${
              !validation.year ? "text-red-500" : ""
            }`}
            htmlFor="year"
          >
            {t("year")}
          </label>
          <div className="flex">
            <input
              id="year"
              name="year"
              type="number"
              value={carDetails.year}
              onChange={(e) =>
                setCarDetails((prevDetails) => ({
                  ...prevDetails,
                  year: e.target.value,
                }))
              }
              min="1900"
              max="2100"
              step="1"
              className={`w-full px-3 py-2 border rounded-l text-gray-700 focus:outline-none focus:border-blue-500 ${
                !validation.year ? "border-red-500" : ""
              }`}
            />
            <div className="spin-buttons flex flex-col border rounded">
              <button
                type="button"
                onClick={() =>
                  setCarDetails((prevDetails) => ({
                    ...prevDetails,
                    year: Math.min(prevDetails.year + 1, 2100),
                  }))
                }
                className="up-button px-2 py-1"
              >
                <FontAwesomeIcon icon={faCaretUp} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCarDetails((prevDetails) => ({
                    ...prevDetails,
                    year: Math.max(prevDetails.year - 1, 1900),
                  }))
                }
                className="down-button px-2 py-1"
              >
                <FontAwesomeIcon icon={faCaretDown} />
              </button>
            </div>
          </div>
        </div>

        {/* Last Mileage */}
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Car Name
          </label>
<<<<<<< HEAD
          <input
            name="carName"
            type="text"
            value={carDetails.carName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
=======
          <div className="flex justify-between">
            <input
              type="text"
              name="lastMileage"
              value={carDetails.lastMileage}
              onChange={handleChange}
              style={{ textAlign: "right" }}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <h1 className="p-2 font-bold">km</h1>
          </div>
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a
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

<<<<<<< HEAD
        {/* Purchase Date */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Purchase Date
          </label>
=======
        {/* Next Update Date */}
        <div className="mb-4 relative" ref={fileCalendarRef}>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="updateCheckbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="mr-2 mb-2"
            />
            <label
              className={`after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 text-sm font-bold mb-2 ${
                !validation.date ? "text-red-500" : ""
              }`}
            >
              {t("nextupdatedate")}
            </label>
          </div>
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a
          <div className="flex">
            <input
              type="text"
              value={
                carDetails.purchaseDate
                  ? carDetails.purchaseDate.toLocaleDateString("ja-JP")
                  : ""
              }
<<<<<<< HEAD
              onClick={() => handleCalendarToggle("purchaseDate")}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 cursor-pointer"
=======
              onClick={() => setShowCalendar(!showCalendar)}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer ${
                isChecked ? "" : "bg-gray-400 cursor-not-allowed"
              } ${isChecked && !validation.date ? "border-red-500" : ""}`}
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a
              readOnly
            />
<<<<<<< HEAD
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="text-gray-500 cursor-pointer ml-2 pt-2"
              onClick={() => handleCalendarToggle("purchaseDate")}
            />
=======
            <button
              type="button"
              onClick={() =>
                setCarDetails((prevDetails) => ({ ...prevDetails, date: null }))
              }
              className={`px-3 py-2 bg-gray-200 border-l border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                isChecked ? "" : "cursor-not-allowed"
              }`}
              disabled={!isChecked}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a
          </div>
          {showCalendar.purchaseDate && (
            <Calendar
<<<<<<< HEAD
              onChange={(date) => handleDateChange("purchaseDate", date)}
              value={carDetails.purchaseDate}
=======
              onChange={(date) =>
                setCarDetails((prevDetails) => ({ ...prevDetails, date }))
              }
              value={carDetails.date}
              locale="ja-JP"
              calendarType="gregory"
              formatDay={(locale, date) => date.getDate()}
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

<<<<<<< HEAD
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
=======
        {/* Table */}
        <div className="mt-4 border-2 border-gray-300 rounded p-4 mb-2">
          {/* Table rendering code goes here */}
>>>>>>> 91bc56d8c2d990cc47e5196fc285740c0e77138a
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
