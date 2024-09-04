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
import { CAR_MAKER, CAR_NAME, DAY_OF_THE_WEEK_JP } from "../variables/variable";

const AddButton = () => {
  const maxLength = 20;
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
  const [selectedCells, setSelectedCells] = useState([]); // Allows multiple cells to be selected
  const [fileDetails, setFileDetails] = useState(() => {
    const savedDetails = localStorage.getItem('fileDetails');
    return savedDetails ? JSON.parse(savedDetails) : [{
      compulsoryInsuranceCertificate: null,
      vehicleInspectionCertificate: null,
      date: null,
    }];
  });
  
  const fileInputRefs = useRef([]);  // Reference for multiple file inputs

  // useEffect to load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  //useEffect to save fileDetails to localStorage on change
  useEffect(() => {
    localStorage.setItem('fileDetails', JSON.stringify(fileDetails));
  }, [fileDetails]);

  // This function handles language change
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  // This function handles form submission (Add button)
  const handleAdd = (e) => {
    e.preventDefault();
    if (selectedCells.length === 0) {
      toast.error(t("pleaseSelectCell"));
      return;
    }
    setIsSavePressed(true);
    console.log({ carDetails });
  };

  const handleCarMakerSelect = (maker) => {
    setSelectedCarMaker(maker);
    setShowCarMakers(false);
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

  // This function adds a new row to the table
  const handleAddRow = () => {
    setFileDetails((prevDetails) => [
      ...prevDetails,
      {
        compulsoryInsuranceCertificate: null,
        vehicleInspectionCertificate: null,
        date: null,
      },
    ]);
  };

  // When there are multiple rows but you want to delete one
  const handleDeleteRowToggle = () => {
    if (selectedCells.length > 0) {
      const rowIndex = parseInt(selectedCells[0].split('-')[1]);
      deleteRow(rowIndex);
      setSelectedCells([]);
    } else {
      toast.error(t("toastSelectRow"));
    }
  };

  // Delete a row
  const deleteRow = (rowIndex) => {
    console.log("Deleting row at index:", rowIndex);
    setFileDetails((prevDetails) =>
      prevDetails.filter((_, index) => index !== rowIndex)
    );
    toast.success(t("deleteRowMessage"));
  };
  

  const handleFileChange = (e, rowIndex) => {
    const files = e.target.files;
    if (selectedCells.length > 0) { 
      if (files && files.length > 0) {
        setFileDetails((prevDetails) => {
          const newDetails = [...prevDetails];
          newDetails[rowIndex][column] = {
            fileUrl: URL.createObjectURL(files[0]),
            originalName: files[0].name,
          };
          return newDetails;
        });
        toast.success(`${files.length} file(s) selected`);
      } else {
        toast.error("No files selected");
      }
    } else {
      toast.error("No cell selected"); // for when no cell is selected
    }
  };
  

  // Define the getRemainingColor function
  const getRemainingColor = (remaining) => {
    return remaining <= 10
      ? "text-red-500 font-bold"
      : "text-green-500 font-bold";
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

  // This function handles file input click
  const handleClick = () => {
    if (selectedCells.length === 0) {
      toast.error(t("pleaseSelectCell"));
      return;
    }

    // Get the first selected cell and the corresponding row index
    const [column, index] = selectedCells[0]?.split("-");
    
    // // Trigger the click event on the corresponding file input element
    // if (fileInputRefs.current[index]) {
    //   fileInputRefs.current[index].click();
    // }
    if (column && fileInputRefs.current[index]){
      fileInputRefs.current[index].click();
    }else{
      toast.error("Invalid cell selection.");
    }
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

  // This function handles input focus for the last mileage field
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

  // Cell single select
  const handleCellSelect = (column, index) => {
    const cellKey = `${column}-${index}`;
    
    setSelectedCells([cellKey]); // Only allow one cell to be selected at a time
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
  

  // Update data to be based on fileDetails
  const data = React.useMemo(() => fileDetails, [fileDetails]);

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
            <div className="w-full h-full">
              <input
                type="file"
                ref={(el) => (fileInputRefs.current[index] = el)}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, index)}
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
            <div className="w-full h-full">
              <input
                type="file"
                ref={(el) => (fileInputRefs.current[index] = el)}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, index)}
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
    [fileCalendars, t]
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
              {CAR_MAKER.map(
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
              {CAR_NAME.map(
                (name, index) => (
                  <li
                    key={index}
                    onMouseDown={() => handleCarNameSelect(name)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {name}
                  </li>
                )
              )}
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
                DAY_OF_THE_WEEK_JP[date.getDay()]
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
                      selectedCells.some(cellKey => cellKey.endsWith(`-${row.index}`)) ? "bg-blue-300" : ""
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
                              ? " bg-slate-300 "
                              : ""
                          }`}
                          onClick={() =>
                            handleCellSelect(cell.column.id, row.index)
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
                  selectedCells.length > 0
                    ? "bg-red-500"
                    : "bg-red-400 cursor-not-allowed"
                } text-white py-2 px-1 rounded`}
                disabled={selectedCells.length === 0}
              >
                <FontAwesomeIcon icon={faMinus} className="mr-2" />
                {t("deleteRow")}
              </button>
            </div>
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
