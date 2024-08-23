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
import { useFileContext } from "../FileContext"; // Import the context hook

const AddButton = () => {
  const maxLength = 20;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    fileDetails,
    addFile,
    deleteFile,
    addRow,
    deleteRow,
  } = useFileContext(); // Use context for file details management

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
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState("");
  const [selectedCarMaker, setSelectedCarMaker] = useState("");
  const [showCarMakers, setShowCarMakers] = useState(false);
  const [showCarNames, setShowCarNames] = useState(false);
  const [fileCalendars, setFileCalendars] = useState({});
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
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const carNames = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW"];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );
  const fileInputRefs = useRef({});

  // useEffect to load saved language and files from localStorage
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
    }
  }, [i18n]);

  // This function handles language change
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  // This function handles form submission (Add button)
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

    if (isSavePressed && !isValid) {
      toast.error(t("toastAddWarning"));
      return;
    }

    if (isSavePressed && !isChecked) {
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

  // This function handles car name selection from dropdown
  const handleCarNameSelect = (name) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, carName: name }));
    setShowCarNames(false);
  };

  // This function handles checkbox toggle
  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  // This function toggles calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // This function handles date selection from the calendar
  const handleDateChange = (date) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, date }));
    setShowCalendar(false);
  };

  // This function clears selected date
  const clearDate = () => {
    setCarDetails((prevDetails) => ({ ...prevDetails, date: null }));
    setShowCalendar(false);
  };

  // This function deletes selected files
  const deleteSelectedFiles = () => {
    if (selectedCells.length === 0) {
      toast.error(t("noDataInCell"));
      return;
    }
    selectedCells.forEach((cellKey) => {
      const [column, index] = cellKey.split("-");
      deleteFile(Number(index), column);
    });
    setSelectedCells([]);
    toast.success(t("toastDeleteSuccess"));
  };

  // This function increments year
  const incrementYear = () => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      year: Math.min(prevDetails.year + 1, 2100),
    }));
    setIsYearChanged(true);
  };

  // This function decrements year
  const decrementYear = () => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      year: Math.max(prevDetails.year - 1, 1900),
    }));
    setIsYearChanged(true);
  };

  // This function handles changes of manual input of year
  const handleYearChange = (e) => {
    const value = Math.max(1900, Math.min(2100, Number(e.target.value)));
    setCarDetails((prevDetails) => ({ ...prevDetails, year: value }));
    setIsYearChanged(true);
  };

  // This function handles input blur for the last mileage field
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "lastMileage") {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value ? parseInt(value).toLocaleString("en-US") : "",
      }));
    }
  };

  // This function handles input blur for the last mileage field
  const handleFocus = (e) => {
    const { name } = e.target;
    if (name === "lastMileage") {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        [name]: prevDetails[name].toString().replace(/,/g, ""),
      }));
    }
  };

  // This function handles changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Function to handle input blur for car maker and name dropdowns
  const handleInputBlur = () => {
    setTimeout(() => setShowCarMakers(false), 200);
    setTimeout(() => setShowCarNames(false), 200);
  };

  // This function shows the dropdown list of car maker
  const handleCarMakerButtonClick = () => {
    setShowCarMakers((prev) => !prev);
  };

  // This function shows the dropdown list of car name
  const handleCarNameButtonClick = () => {
    setShowCarNames((prev) => !prev);
  };

  // This function handles the input change
  const handleInputChange = (e) => {
    const input = e.target.value;
    setTextBoxInput(input);
  };

  const handlePreviousPage = () => {
    navigate("/vehicle-manager");
  };

  const handleFileChange = (e, index, column) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("No files selected");
      return;
    }

    const file = e.target.files[0];
    const newFileDetail = {
      originalName: file.name,
      fileUrl: URL.createObjectURL(file),
      uploadTime: new Date().toLocaleString("ja-JP"),
      date: null,
    };

    addFile(index, column, newFileDetail); // Use context function

    // Reset selected cells after file upload
    setSelectedCells([]);
  };

  const handleAddRow = () => {
    addRow(); // Use context function
    setSelectedRowIndex(fileDetails.length);
  };

  const handleDeleteRowToggle = () => {
    if (selectedRowIndex !== null) {
      deleteRow(selectedRowIndex); // Use context function
      setSelectedRowIndex(null);
      setSelectedCells([]);
      toast.success(t("toastDeleteRowSuccess"));
    } else {
      toast.error(t("toastSelectRow"));
    }
  };

  // Cell single select
  const handleCellSelect = (column, index) => {
    const cellKey = `${column}-${index}`;

    if (selectedRowIndex !== index) {
      setSelectedCells([cellKey]);
      setSelectedRowIndex(index);
    } else {
      if (selectedCells.includes(cellKey)) {
        setSelectedCells(selectedCells.filter((key) => key !== cellKey));
      } else {
        setSelectedCells([...selectedCells, cellKey]);
      }
    }
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
    setFileCalendars((prev) => ({ ...prev, [index]: false }));
    localStorage.setItem("fileDetails", JSON.stringify(updatedFileDetails));
  };

  // Toggle calendar
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
    if (selectedCells.length === 0) {
      toast.error(t("pleaseSelectCell"));
      return;
    }
    fileInputRefs.current[selectedCells[0]].click();
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
              className="w-full h-full"
              onClick={() =>
                handleCellSelect("compulsoryInsuranceCertificate", index)
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
              className="w-full h-full"
              onClick={() =>
                handleCellSelect("vehicleInspectionCertificate", index)
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
              className="w-full px-3 py-2 border rounded-lg text-gray-700 flex items-center justify-between"
            >
              <span>
                {value ? new Date(value).toLocaleDateString("ja-JP") : t("selectdate")}
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
                  locale="ja-JP"
                  calendarType="gregory"
                  className="border rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        ),
      },
    ],
    [fileDetails, fileCalendars, t]
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
              locale="ja-JP"
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
                  <tr
                    key={key}
                    {...rest}
                    className={`cursor-pointer ${
                      selectedRowIndex === row.index ? "bg-blue-300" : ""
                    }`}
                  >
                    {row.cells.map((cell) => {
                      let cellProps = { ...cell.getCellProps() };
                      const { key, ...rest } = cellProps;
                      return (
                        <td
                          key={key}
                          {...rest}
                          className={`border p-2 bg-gray-200${
                            selectedCells.includes(
                              `${cell.column.id}-${row.index}`
                            )
                              ? "bg-slate-300 "
                              : ""
                          }`}
                          onClick={() =>
                            handleCellSelect(cell.column.id, row.index)
                          }
                        >
                          {cell.render("Cell")}
                          <input
                            type="file"
                            ref={(el) =>
                              (fileInputRefs.current[
                                `${cell.column.id}-${row.index}`
                              ] = el)
                            }
                            style={{ display: "none" }}
                            onChange={(e) =>
                              handleFileChange(
                                e,
                                row.index,
                                cell.column.id
                              )
                            }
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Add buttons */}
          <div className="my-5">
            <div className="relative w-full grid grid-cols-4 gap-4 my-5">
              {/* Upload Button */}
              <button
                onClick={handleClick}
                className="bg-blue-500 text-white py-2 px-2 rounded"
              >
                <FontAwesomeIcon icon={faUpload} className="pr-2" />
                {t("choosefiles")}
              </button>

              {/* Delete File Button */}
              <button
                type="button"
                onClick={deleteSelectedFiles}
                className="bg-orange-500 text-white py-2 px-2  rounded"
              >
                <FontAwesomeIcon icon={faMinus} className="pr-2" />
                {t("deleteFile")}
              </button>

              {/* Add Row Button */}
              <button
                type="button"
                onClick={handleAddRow}
                className="bg-green-500 text-white py-2 px-1 rounded"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                {t("addRow")}
              </button>

              {/* Delete Row Button (conditionally enabled) */}
              <button
                type="button"
                onClick={handleDeleteRowToggle}
                className={`${
                  fileDetails.length > 0 && selectedCells.length > 0
                    ? "bg-red-500"
                    : "bg-red-400 cursor-not-allowed"
                } text-white py-2 px-1 rounded`}
                disabled={fileDetails.length === 0 || selectedCells.length === 0}
              >
                <FontAwesomeIcon icon={faMinus} className="mr-2" />
                {t("deleteRow")}
              </button>
            </div>
            <input
              type="file"
              multiple
              onChange={(e) => {
                handleFileChange(e, selectedRowIndex, selectedCells[0]);
              }}
              ref={(el) => (fileInputRefs.current["bulkUpload"] = el)}
              className="hidden"
            />
          </div>
          <hr></hr>
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
            className="bg-blue-500  text-white py-2 px-4 rounded"
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
