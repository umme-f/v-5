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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // State hooks
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
  const [showCarMakers, setShowCarMakers] = useState(false);
  const [showCarNames, setShowCarNames] = useState(false);
  const [fileCalendars, setFileCalendars] = useState({});
  const [selectedCells, setSelectedCells] = useState([]); 
  const [fileDetails, setFileDetails] = useState(() => {
    const savedDetails = localStorage.getItem('fileDetails');
    return savedDetails
      ? JSON.parse(savedDetails)
      : [{ compulsoryInsuranceCertificate: null, vehicleInspectionCertificate: null, date: null }];
  });

  const fileInputRefs = useRef([]);
  const carMakerDropDownRef = useRef(null);
  const carNameDropDownRef = useRef(null);

  // Save file details to localStorage on change
  useEffect(() => {
    localStorage.setItem("fileDetails", JSON.stringify(fileDetails));
  }, [fileDetails]);

  // Detect and close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        carMakerDropDownRef.current &&
        !carMakerDropDownRef.current.contains(event.target)
      ) {
        setShowCarMakers(false);
      }
      if (
        carNameDropDownRef.current &&
        !carNameDropDownRef.current.contains(event.target)
      ) {
        setShowCarNames(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  // Handle language change
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  // Handle form submission
  const handleAdd = (e) => {
    e.preventDefault();
    if (!carDetails.carId || !carDetails.carName || !carDetails.carMaker) {
      toast.error(t("Please fill all required fields"));
    } else {
      toast.success(t("Form submitted successfully"));
    }
  };

  // Handle car maker and car name selection
  const handleCarMakerSelect = (maker) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, carMaker: maker }));
    setSelectedCarMaker(maker);
    setShowCarMakers(false);
  };
  const handleCarNameSelect = (name) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, carName: name }));
    setShowCarNames(false);
  };
  
  
  const handleCarMakerButtonClick = () => {
    setShowCarMakers((prev) => !prev);
  };
  const handleCarNameButtonClick = () => {
    setShowCarNames((prev) => !prev);
  };
  

  const handleClick = () => {
    if (selectedCells.length === 0) {
      toast.error(t("pleaseSelectCell"));
      return;
    }
  
    // Get the row index from the selected cell
    const [, index] = selectedCells[0]?.split("-");
  
    // Trigger the click event for the correct file input
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click(); // Trigger file input click
    } else {
      toast.error("Invalid cell selection.");
    }
  };
  

  // Handle file change for file uploads
  const handleFileChange = (e, rowIndex) => {
    const files = e.target.files;
    if (selectedCells.length > 0 && files && files.length > 0) {
      const columnKey = selectedCells[0]?.split("-")[0];
      setFileDetails((prevDetails) => {
        const newDetails = [...prevDetails];
        newDetails[rowIndex][columnKey] = {
          fileUrl: URL.createObjectURL(files[0]),
          originalName: files[0].name,
        };
        return newDetails;
      });
      toast.success(`${files.length} file(s) selected`);
    } else {
      toast.error("No cell selected");
    }
  };
  

  // Handle file date change in the table
  const handleFileDateChange = (index, date) => {
    const updatedFileDetails = [...fileDetails];
    updatedFileDetails[index].date = date;
    setFileCalendars((prev) => ({ ...prev, [index]: false }));
    localStorage.setItem("fileDetails", JSON.stringify(updatedFileDetails));
  };

  // Add new row to file table
  const handleAddRow = () => {
    setFileDetails((prevDetails) => [
      ...prevDetails,
      { compulsoryInsuranceCertificate: null, vehicleInspectionCertificate: null, date: null },
    ]);
  };

  // Select cell in file table
  const handleCellSelect = (column, index) => {
    const cellKey = `${column}-${index}`;
    setSelectedCells([cellKey]); 
  };

  // Toggle calendar
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const columns = React.useMemo(
    () => [
      {
        Header: t("compulsoryInsuranceCertificate"),
        accessor: "compulsoryInsuranceCertificate",
        Cell: ({ cell: { value }, row: { index } }) =>
          value ? (
            <a href={value.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
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
            <a href={value.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
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
              onClick={() => setFileCalendars((prev) => ({ ...prev, [index]: !prev[index] }))}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 flex items-center justify-between"
            >
              <span>{value ? new Date(value).toLocaleDateString("ja-JP") : t("selectdate")}</span>
              <FontAwesomeIcon icon={faCalendarDays} />
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: fileDetails });

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="absolute top-4 right-4">
        <button onClick={() => handleLanguageChange("jp")} className={`p-2 ${i18n.language === "jp" ? "bg-blue-600 text-white" : "bg-gray-400"} text-xs uppercase font-bold rounded-l`}>
          日本語
        </button>
        <button onClick={() => handleLanguageChange("en")} className={`p-2 ${i18n.language === "en" ? "bg-blue-600 text-white" : "bg-gray-400"} text-xs uppercase font-bold rounded-r`}>
          EN
        </button>
      </div>

      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleAdd}>
        <h2 className="text-2xl font-bold mb-6 text-center">{t("carAddForm")}</h2>

        {/* Car ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("carID")}</label>
          <input
            id="carId"
            name="carId"
            type="text"
            value={carDetails.carId}
            onChange={(e) => setCarDetails({ ...carDetails, carId: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Car Maker Dropdown */}
        <div className="mb-4 relative" ref={carMakerDropDownRef}>
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("carmakername")}</label>
          <div className="flex">
            <input
              type="text"
              value={carDetails.carMaker}
              onClick={() => setShowCarMakers(!showCarMakers)}
              className="w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button type="button" 
            onClick={handleCarMakerButtonClick}
            className="px-3 py-2 bg-gray-200 border-l border-gray-300 rounded-r-lg text-gray-700 focus:outline-none">
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
          {showCarMakers && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {CAR_MAKER.map((maker, index) => (
                <li key={index} onClick={() => handleCarMakerSelect(maker)} className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                  {maker}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Car Name Dropdown */}
        <div className="mb-4 relative" ref={carNameDropDownRef}>
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("carname")}</label>
          <div className="flex">
            <input
              type="text"
              value={carDetails.carName}
              onClick={() => setShowCarNames(!showCarNames)}
              className="w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button type="button" 
            onClick={handleCarNameButtonClick}
            className="px-3 py-2 bg-gray-200 border-l border-gray-300 rounded-r-lg text-gray-700 focus:outline-none">
              <FontAwesomeIcon icon={faAngleDown} />
            </button>
          </div>
          {showCarNames && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {CAR_NAME.map((name, index) => (
                <li key={index} onClick={() => handleCarNameSelect(name)} className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Year */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("year")}</label>
          <div className="flex">
            <input
              id="year"
              name="year"
              type="number"
              value={carDetails.year}
              onChange={(e) => setCarDetails({ ...carDetails, year: e.target.value })}
              min="1900"
              max="2100"
              step="1"
              className="w-full px-3 py-2 border rounded-l text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <div className="spin-buttons flex flex-col border rounded">
              <button type="button" onClick={() => setCarDetails({ ...carDetails, year: Math.min(carDetails.year + 1, 2100) })} className="up-button px-2 py-1">
                <FontAwesomeIcon icon={faCaretUp} />
              </button>
              <button type="button" onClick={() => setCarDetails({ ...carDetails, year: Math.max(carDetails.year - 1, 1900) })} className="down-button px-2 py-1">
                <FontAwesomeIcon icon={faCaretDown} />
              </button>
            </div>
          </div>
        </div>

        {/* Last Mileage */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("lastmileage")}</label>
          <div className="flex">
            <input
              type="text"
              name="lastMileage"
              value={carDetails.lastMileage}
              onChange={(e) => setCarDetails({ ...carDetails, lastMileage: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <span className="p-2 font-bold">km</span>
          </div>
        </div>

        {/* Car Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("carType")}</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="purchase"
              name="carType"
              value="purchase"
              checked={carDetails.carType === "purchase"}
              onChange={(e) => setCarDetails({ ...carDetails, carType: e.target.value })}
              className="mr-2"
            />
            <label htmlFor="purchase" className="mr-4">{t("purchase")}</label>
            <input
              type="radio"
              id="lease"
              name="carType"
              value="lease"
              checked={carDetails.carType === "lease"}
              onChange={(e) => setCarDetails({ ...carDetails, carType: e.target.value })}
              className="mr-2"
            />
            <label htmlFor="lease" className="mr-4">{t("lease")}</label>
          </div>
        </div>

        {/* Next Update Date */}
        <div className="mb-4">
          <input
            type="checkbox"
            name="updateCheckbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2 mb-2"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("nextupdatedate")}</label>
          <div className="flex">
            <input
              type="text"
              value={carDetails.date ? carDetails.date.toLocaleDateString("ja-JP") : ""}
              onClick={toggleCalendar}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 ${isChecked ? "cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
              readOnly
              disabled={!isChecked}
            />
            <button
              type="button"
              onClick={() => setCarDetails({ ...carDetails, date: null })}
              className={`px-3 py-2 bg-gray-200 border-l border-gray-300 rounded-r-lg text-gray-700`}
              disabled={!isChecked}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          {showCalendar && isChecked && (
            <Calendar
              onChange={(date) => setCarDetails({ ...carDetails, date })}
              value={carDetails.date}
              locale="ja-JP"
              calendarType="gregory"
              className="border rounded-lg shadow-lg mt-2"
            />
          )}
        </div>

        {/* Table */}
        <div className="mt-4 border-2 border-gray-300 rounded p-4">
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="border p-2">{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className={`border p-2 ${selectedCells.includes(`${cell.column.id}-${row.index}`) ? "bg-blue-300" : "bg-gray-200"}`}
                        onClick={() => handleCellSelect(cell.column.id, row.index)}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Add Buttons */}
          <div className="grid grid-cols-4 gap-4 mt-5">
            <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-2 rounded">
              <FontAwesomeIcon icon={faUpload} className="pr-2" />
              {t("choosefiles")}
            </button>
            <button type="button" onClick={handleAddRow} className="bg-green-500 text-white py-2 px-1 rounded">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              {t("addRow")}
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              <FontAwesomeIcon icon={faFloppyDisk} className="pr-2" />
              {t("save")}
            </button>
            <button type="button" onClick={() => navigate("/vehicle-manager")} className="bg-gray-500 text-white py-2 px-4 rounded">
              <FontAwesomeIcon icon={faArrowLeft} className="pr-2" />
              {t("backToPreviousPage")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddButton;
