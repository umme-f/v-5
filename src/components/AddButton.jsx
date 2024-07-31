import React, { useState, useEffect, useRef } from "react";
import {
  faTimes,
  faCaretUp,
  faCaretDown,
  faCalendarDays,
  faAngleDown,
  faPlus,
  faBan,
  faFloppyDisk,
  faUpload,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTable } from "react-table";

const AddButton = () => {
  const maxLength = 20;
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("jp");
  const [carDetails, setCarDetails] = useState({
    carId: "",
    carName: "",
    carMaker: "",
    year: new Date().getFullYear(),
    lastMileage: 0,
    carType: "",
    date: new Date(),
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState("");
  const [selectedCarMaker, setSelectedCarMaker] = useState("");
  const [showCarMakers, setShowCarMakers] = useState(false);
  const [showCarNames, setShowCarNames] = useState(false);
  const [fileDetails, setFileDetails] = useState([]);
  const [fileCalendars, setFileCalendars] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [validation, setValidation] = useState({
    carId: true,
    carName: true,
    carMaker: true,
    carType: true,
    date: true,
    fileDates: true,
    year: true,
  });
  const [isYearChanged, setIsYearChanged] = useState(false);
  const [isSavePressed, setIsSavePressed] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [addingFiles, setAddingFiles] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const carNames = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW"];
  const columnNames = [
    "Compulsory Insurance Certificate",
    "Vehicle Inspection Certificate",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );
  const fileInputRefs = useRef([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }

    const savedFiles = localStorage.getItem("fileDetails");
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      parsedFiles.sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date) - new Date(a.date);
        } else if (a.date) {
          return -1;
        } else if (b.date) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log("Loaded files from local storage:", parsedFiles);
      setFileDetails(parsedFiles);
    }
  }, [i18n]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setIsSavePressed(true);
    const isFileDateMissing =
      fileDetails.length > 0 && fileDetails.some((file) => !file.date);

    const newValidation = {
      carId: !!carDetails.carId,
      carName: !!carDetails.carName,
      carMaker: !!carDetails.carMaker,
      carType: !!carDetails.carType,
      date: isChecked ? !!carDetails.date : true,
      fileDates: !isFileDateMissing,
      year: !!carDetails.year,
    };

    setValidation(newValidation);

    const isValid = Object.values(newValidation).every(Boolean);

    if (!isValid) {
      toast.error(t("toastAddWarning"));
      return;
    }

    if (!isChecked) {
      setValidation((prev) => ({ ...prev, date: false }));
      toast.error(t("toastAddWarning"));
      return;
    }

    toast.success(t("toastAddSuccessfulSaving"));
    console.log({ carDetails, fileDetails });
  };

  const handleCarMakerSelect = (maker) => {
    setSelectedCarMaker(maker);
    setShowCarMakers(false);
  };

  const handleCarNameSelect = (name) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, carName: name }));
    setShowCarNames(false);
  };

  const handleCancel = () => {
    setCarDetails({
      carId: "",
      carName: "",
      carMaker: "",
      year: new Date().getFullYear(),
      lastMileage: 0,
      carType: "",
      date: new Date(),
    });
    setFileDetails([]);
    setValidation({
      carId: true,
      carName: true,
      carMaker: true,
      carType: true,
      date: true,
      fileDates: true,
      year: true,
    });
    setIsYearChanged(false);
    setIsSavePressed(false);
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, date }));
    setShowCalendar(false);
  };

  const clearDate = () => {
    setCarDetails((prevDetails) => ({ ...prevDetails, date: null }));
    setShowCalendar(false);
  };

  const deleteSelectedFiles = () => {
    const updatedFileDetails = fileDetails.filter(
      (file, index) =>
        !selectedCells.includes(`compulsoryInsuranceCertificate-${index}`) &&
        !selectedCells.includes(`vehicleInspectionCertificate-${index}`)
    );
    setFileDetails(updatedFileDetails);
    setSelectedCells([]);
    localStorage.setItem("fileDetails", JSON.stringify(updatedFileDetails)); // Update local storage
    toast.success(t("toastDeleteSuccess"));
  };

  const incrementYear = () => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      year: Math.min(prevDetails.year + 1, 2100),
    }));
    setIsYearChanged(true);
  };

  const decrementYear = () => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      year: Math.max(prevDetails.year - 1, 1900),
    }));
    setIsYearChanged(true);
  };

  const handleYearChange = (e) => {
    const value = Math.max(1900, Math.min(2100, Number(e.target.value)));
    setCarDetails((prevDetails) => ({ ...prevDetails, year: value }));
    setIsYearChanged(true);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "lastMileage") {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value ? parseInt(value).toLocaleString("en-US") : "",
      }));
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (name === "lastMileage") {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        [name]: prevDetails[name].toString().replace(/,/g, ""),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowCarMakers(false), 200);
    setTimeout(() => setShowCarNames(false), 200);
  };

  const handleCarMakerButtonClick = () => {
    setShowCarMakers((prev) => !prev);
  };

  const handleCarNameButtonClick = () => {
    setShowCarNames((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setTextBoxInput(input);
  };

  // Adding a defensive check before accessing the 'target' property
  const handleFileChange = (e, index, column) => {
    if (!e || !e.target) {
      console.error("Event or event target is undefined");
      return;
    }

    const newFiles = Array.from(e.target.files);
    const currentTime = new Date().toLocaleString("ja-JP");

    const newFileDetails = newFiles.map((file) => ({
      originalName: file.name,
      date: null,
      fileUrl: URL.createObjectURL(file),
      uploadTime: currentTime,
      column: column,
    }));

    setFileDetails((prevFileDetails) => {
      const updatedFileDetails = [...prevFileDetails];
      if (index !== null) {
        const row = updatedFileDetails[index];
        newFileDetails.forEach((fileDetail) => {
          if (fileDetail.column === "Compulsory Insurance Certificate") {
            row.compulsoryInsuranceCertificate = fileDetail;
          } else if (fileDetail.column === "Vehicle Inspection Certificate") {
            row.vehicleInspectionCertificate = fileDetail;
          }
        });
      } else {
        // Ensure we are not adding a new empty row if index is null
        if (selectedRowIndex !== null) {
          const row = updatedFileDetails[selectedRowIndex];
          newFileDetails.forEach((fileDetail) => {
            if (fileDetail.column === "Compulsory Insurance Certificate") {
              row.compulsoryInsuranceCertificate = fileDetail;
            } else if (fileDetail.column === "Vehicle Inspection Certificate") {
              row.vehicleInspectionCertificate = fileDetail;
            }
          });
        } else {
          // Only add a new row if necessary
          const newRow = {
            compulsoryInsuranceCertificate:
              column === "Compulsory Insurance Certificate"
                ? newFileDetails[0]
                : null,
            vehicleInspectionCertificate:
              column === "Vehicle Inspection Certificate"
                ? newFileDetails[0]
                : null,
            date: null,
          };
          updatedFileDetails.push(newRow);
        }
      }
      localStorage.setItem("fileDetails", JSON.stringify(updatedFileDetails));
      return updatedFileDetails;
    });
  };

  const handleAddRow = () => {
    const newRow = {
      compulsoryInsuranceCertificate: null,
      vehicleInspectionCertificate: null,
      date: null,
    };
    setFileDetails((prevDetails) => {
      const updatedDetails = [...prevDetails, newRow];
      setSelectedRowIndex(updatedDetails.length - 1); // Set the index of the newly added row
      localStorage.setItem("fileDetails", JSON.stringify(updatedDetails));
      console.log("Added new row:", updatedDetails);
      return updatedDetails;
    });
  };

  const handleDeleteRowToggle = () => {
    if (selectedCells.length > 0) {
      deleteSelectedFiles();
    } else {
      toast.error(t("toastSelectCells"));
    }
  };

  const handleCellSelect = (column, index) => {
    const cellKey = `${column}-${index}`;
    if (selectedCells.includes(cellKey)) {
      setSelectedCells(selectedCells.filter((key) => key !== cellKey));
    } else {
      setSelectedCells([...selectedCells, cellKey]);
    }
  };

  const handleCellDoubleClick = (column, index) => {
    fileInputRefs.current[`${column}-${index}`].click();
  };

  const handleFileDateChange = (index, date) => {
    const updatedFileDetails = [...fileDetails];
    updatedFileDetails[index].date = date;
    updatedFileDetails.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      } else if (a.date) {
        return -1;
      } else if (b.date) {
        return 1;
      } else {
        return 0;
      }
    });
    setFileDetails(updatedFileDetails);
    setFileCalendars((prev) => ({ ...prev, [index]: false }));
    localStorage.setItem("fileDetails", JSON.stringify(updatedFileDetails)); // Update local storage
  };

  const toggleFileCalendar = (index) => {
    setFileCalendars((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getRemainingColor = (remaining) => {
    return remaining <= 10
      ? "text-red-500 font-bold"
      : "text-green-500 font-bold";
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Check if there are any empty cells in the table
    const allCellsFilled = fileDetails.every(
      (file) =>
        file.compulsoryInsuranceCertificate !== null &&
        file.vehicleInspectionCertificate !== null
    );

    if (allCellsFilled) {
      toast.info(t("addNewRowMessage"));
    } else {
      setShowDropdown(true);
    }
  };

  const handleColumnSelect = (column) => {
    setSelectedColumn(column);
    setShowDropdown(false);
    fileInputRefs.current["bulkUpload"].click();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: t("compulsoryInsuranceCertificate"),
        accessor: "compulsoryInsuranceCertificate",
        Cell: ({ cell: { value }, row: { index } }) =>
          value ? (
            <a
              href={value.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {value.originalName}
            </a>
          ) : (
            <div
              className={`w-full h-full ${
                selectedCells.includes(`compulsoryInsuranceCertificate-${index}`)
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() =>
                handleCellSelect("compulsoryInsuranceCertificate", index)
              }
              onDoubleClick={() =>
                handleCellDoubleClick("compulsoryInsuranceCertificate", index)
              }
            >
              <input
                type="file"
                ref={(el) =>
                  (fileInputRefs.current[
                    `compulsoryInsuranceCertificate-${index}`
                  ] = el)
                }
                style={{ display: "none" }}
                onChange={(e) =>
                  handleFileChange(e, index, "Compulsory Insurance Certificate")
                }
              />
            </div>
          ),
      },
      {
        Header: t("vehicleInspectionCertificate"),
        accessor: "vehicleInspectionCertificate",
        Cell: ({ cell: { value }, row: { index } }) =>
          value ? (
            <a
              href={value.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {value.originalName}
            </a>
          ) : (
            <div
              className={`w-full h-full ${
                selectedCells.includes(`vehicleInspectionCertificate-${index}`)
                  ? "bg-gray-200"
                  : ""
              }`}
              onClick={() =>
                handleCellSelect("vehicleInspectionCertificate", index)
              }
              onDoubleClick={() =>
                handleCellDoubleClick("vehicleInspectionCertificate", index)
              }
            >
              <input
                type="file"
                ref={(el) =>
                  (fileInputRefs.current[
                    `vehicleInspectionCertificate-${index}`
                  ] = el)
                }
                style={{ display: "none" }}
                onChange={(e) =>
                  handleFileChange(e, index, "Vehicle Inspection Certificate")
                }
              />
            </div>
          ),
      },
      {
        Header: t("inspectiondate"),
        accessor: "date",
        Cell: ({ cell: { value }, row: { index } }) => (
          <div className="relative">
            <div
              onClick={() => toggleFileCalendar(index)}
              className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 flex items-center justify-between ${
                !value ? "border-red-500" : ""
              }`}
            >
              <span className={`${!validation.fileDates ? "text-red-500" : ""}`}>
                {value
                  ? new Date(value).toLocaleDateString("ja-JP")
                  : t("selectdate")}
              </span>
              <button type="button">
                <FontAwesomeIcon icon={faCalendarDays} />
              </button>
            </div>
            {fileCalendars[index] && (
              <div className="absolute left-0 mt-2 z-20">
                <Calendar
                  onChange={(date) => handleFileDateChange(index, date)}
                  value={value ? new Date(value) : new Date()}
                  locale="ja"
                  calendarType="gregory"
                  formatShortWeekday={(locale, date) =>
                    ["日", "月", "火", "水", "木", "金", "土"][date.getDay()]
                  }
                  formatDay={(locale, date) => date.getDate()}
                  className="border rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        ),
      },
    ],
    [fileDetails, fileCalendars, validation, t, selectedCells]
  );

  const data = React.useMemo(
    () =>
      fileDetails.map((file, index) => ({
        ...file,
        compulsoryInsuranceCertificate: file.compulsoryInsuranceCertificate
          ? { ...file.compulsoryInsuranceCertificate, index }
          : null,
        vehicleInspectionCertificate: file.vehicleInspectionCertificate
          ? { ...file.vehicleInspectionCertificate, index }
          : null,
        date: file.date,
      })),
    [fileDetails]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="absolute top-4 right-4 border border-black rounded">
        <button
          onClick={() => handleLanguageChange("jp")}
          className={`p-2 ${
            i18n.language === "jp" ? "bg-blue-600 text-white" : "bg-gray-400"
          } text-xs uppercase font-bold rounded-l`}
        >
          日本語
        </button>
        <button
          onClick={() => handleLanguageChange("en")}
          className={`p-2 ${
            i18n.language === "en" ? "bg-blue-600 text-white" : "bg-gray-400"
          } text-xs uppercase font-bold rounded-r`}
        >
          En
        </button>
      </div>

      <form
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleAdd}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("carAddForm")}
        </h2>

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

        {/* Car Maker Name */}
        <div className="mb-4 relative">
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
              onBlur={handleInputBlur}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                !validation.carName ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={handleCarMakerButtonClick}
              className="px-3 py-2 bg-gray-200 border-l border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
          {showCarMakers && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {["Toyota", "Honda", "Ford", "Chevrolet", "BMW"].map(
                (maker, index) => (
                  <li
                    key={index}
                    onMouseDown={() => handleCarMakerSelect(maker)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {maker}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        {/* Car Name */}
        <div className="mb-4 relative">
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
              onBlur={handleInputBlur}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 ${
                !validation.carName ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={handleCarNameButtonClick}
              className="px-3 py-2 bg-gray-200 border-l border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
          {showCarNames && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {carNames.map((name, index) => (
                <li
                  key={index}
                  onMouseDown={() => handleCarNameSelect(name)}
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
              onChange={handleYearChange}
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
                onClick={incrementYear}
                className="up-button px-2 py-1"
              >
                <FontAwesomeIcon icon={faCaretUp} />
              </button>
              <button
                type="button"
                onClick={decrementYear}
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
              onBlur={handleBlur}
              onFocus={handleFocus}
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
        <div className="mb-4 relative">
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="updateCheckbox"
              checked={isChecked}
              onChange={handleCheckBox}
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
              onClick={toggleCalendar}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer ${
                isChecked ? "" : "bg-gray-400 cursor-not-allowed"
              } ${isChecked && !validation.date ? "border-red-500" : ""}`}
              readOnly
              disabled={!isChecked}
            />
            <button
              type="button"
              onClick={clearDate}
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
              onChange={handleDateChange}
              value={carDetails.date}
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

        {/* Table */}
        <div className="mt-4 border-2 border-gray-300 rounded p-4 mb-2">
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup) => {
                const { key, ...rest } = headerGroup.getHeaderGroupProps();
                return (
                  <tr key={key} {...rest}>
                    {headerGroup.headers.map((column) => {
                      const { key, ...rest } = column.getHeaderProps();
                      return (
                        <th key={key} {...rest} className="border p-2">
                          {column.render("Header")}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                const { key, ...rest } = row.getRowProps();
                return (
                  <tr key={key} {...rest}>
                    {row.cells.map((cell) => {
                      let cellProps = { ...cell.getCellProps() };
                      const { key, ...rest } = cellProps;
                      return (
                        <td
                          key={key}
                          {...rest}
                          className={`border p-2 cursor-pointer ${
                            selectedCells.includes(
                              `${cell.column.id}-${row.index}`
                            )
                              ? "bg-gray-200"
                              : ""
                          }`}
                          onClick={() =>
                            handleCellSelect(cell.column.id, row.index)
                          }
                          onDoubleClick={() =>
                            handleCellDoubleClick(cell.column.id, row.index)
                          }
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Add buttons */}
          <div className="grid grid-cols-1 gap-4 my-5">
            <div className="relative w-full">
              <button
                onClick={handleClick}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded"
              >
                <FontAwesomeIcon icon={faUpload} className="pr-2" />
                {t("choosefiles")}
              </button>
              {showDropdown && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                  {columnNames.map((column, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleColumnSelect(column)}
                    >
                      {column}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, null, selectedColumn)}
              ref={(el) => (fileInputRefs.current["bulkUpload"] = el)}
              className="hidden"
            />
          </div>
          <div className="flex justify-between my-5">
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              {t("addRow")}
            </button>
            <button
              type="button"
              onClick={handleDeleteRowToggle}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              <FontAwesomeIcon icon={faMinus} className="mr-2" />
              {t("removeRow")}
            </button>
          </div>
          <hr></hr>
          <p className="text-gray-400 pt-2">
            {t("explanationAdd")}
            <br></br>
            {t("explanationDelete")}
          </p>
        </div>

        {/* Details box */}
        <div className="p-2 mt-4">
          <label
            htmlFor="message"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {t("writedetails")}
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={textBoxInput}
            onChange={handleInputChange}
            maxLength={maxLength}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none border-gray-300"
          />
          <p className={getRemainingColor(maxLength - textBoxInput.length)}>
            {t("remainingcharacters")} {maxLength - textBoxInput.length}
          </p>
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
            onClick={handleCancel}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faBan} className="pr-2" />
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddButton;
