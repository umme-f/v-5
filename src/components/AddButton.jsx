import React, { useState, useEffect, useRef } from "react";
import {
  faTimes,
  faCaretUp,
  faCaretDown,
  faCalendarDays,
  faAngleDown,
  faPlus,
  faMinus,
  faFloppyDisk,
  faUpload,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import { CAR_MAKER, CAR_NAME, maxLength } from "../variables/variable";

const AddButton = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // State hooks
  const [language, setLanguage] = useState("jp");
  const [carDetails, setCarDetails] = useState({
    carId: "",
    carName: "",
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePreviousPage = () => {
    navigate("/vehicle-manager");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <form
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleAdd}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("carAddForm")}
        </h2>

        {/* Car ID */}
        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block ${
              !validation.carId ? "text-red-500" : ""
            }`}
            htmlFor="carId"
          >
            {t("carID")}
          </label>
          <input
            id="carId"
            name="carId"
            type="text"
            value={carDetails.carId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
              !validation.carId ? "border-red-500" : ""
            }`}
          />
        </div>

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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {t("lastmileage")}
          </label>
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
        </div>

        {/* Car Type */}
        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block ${
              !validation.carType ? "text-red-500" : ""
            }`}
            htmlFor="carType"
          >
            {t("carType")}
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="purchase"
              name="carType"
              value="purchase"
              checked={carDetails.carType === "purchase"}
              onChange={(e) =>
                setCarDetails((prevDetails) => ({
                  ...prevDetails,
                  carType: e.target.value,
                }))
              }
              className="mr-2"
            />
            <label htmlFor="purchase" className="mr-4">
              {t("purchase")}
            </label>
            <input
              type="radio"
              id="lease"
              name="carType"
              value="lease"
              checked={carDetails.carType === "lease"}
              onChange={(e) =>
                setCarDetails((prevDetails) => ({
                  ...prevDetails,
                  carType: e.target.value,
                }))
              }
              className="mr-2"
            />
            <label htmlFor="lease" className="mr-4">
              {t("lease")}
            </label>
          </div>
        </div>

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
          <div className="flex">
            <input
              type="text"
              value={
                carDetails.date
                  ? carDetails.date.toLocaleDateString("ja-JP")
                  : ""
              }
              onClick={() => setShowCalendar(!showCalendar)}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer ${
                isChecked ? "" : "bg-gray-400 cursor-not-allowed"
              } ${isChecked && !validation.date ? "border-red-500" : ""}`}
              readOnly
              disabled={!isChecked}
            />
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
          </div>
          {showCalendar && isChecked && (
            <Calendar
              onChange={(date) =>
                setCarDetails((prevDetails) => ({ ...prevDetails, date }))
              }
              value={carDetails.date}
              locale="ja-JP"
              calendarType="gregory"
              formatDay={(locale, date) => date.getDate()}
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

        {/* Table */}
        <div className="mt-4 border-2 border-gray-300 rounded p-4 mb-2">
          {/* Table rendering code goes here */}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="pr-2" />
            {t("save")}
          </button>
          <button
            type="button"
            onClick={handlePreviousPage}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="pr-2" />
            {t("backToPreviousPage")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddButton;
