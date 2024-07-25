import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faTimes, faFloppyDisk, faCaretUp, faCaretDown, faCalendarDays, faPlus, faUpload, faMinus } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import 'react-calendar/dist/Calendar.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTable } from "react-table";

const EditButton = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [fileDetails, setFileDetails] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSavePressed, setIsSavePressed] = useState(false);

  const [file, setFile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    carID: '',
    carName: '',
    year: '',
    role: '',
    date: null,
    lastMileage: 0,
  });
  const [validation, setValidation] = useState({
    carId: true,
    carName: true,
    // carMaker: true,
    carType: true,
    date: true,
    fileDates: true,
    year: true,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showYearList, setShowYearList] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState('');
  const maxLength = 20;
  const [showDeleteCheckboxes, setShowDeleteCheckboxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [addingFiles, setAddingFiles] = useState(false); // New state to manage adding files
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // State to manage selected row for file addition
  const [fileCalendars, setFileCalendars] = useState({}); // State to manage calendar visibility for each file row
  const columnNames = [
    "Compulsory Insurance Certificate",
    "Vehicle Inspection Certificate",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  const fileInputRef = useRef(null);
  const [selectedColumn, setSelectedColumn] = useState(""); // State to manage selected column

  useEffect(() => {
    if (location.state && location.state.selectedData) {
      const selectedData = location.state.selectedData;
      setFormData({
        ...selectedData,
        date: selectedData.date ? new Date(selectedData.date) : null,
      });
    }

    const savedFiles = localStorage.getItem('fileDetails');
    if (savedFiles) {
      setFileDetails(JSON.parse(savedFiles));
    }
  }, [location.state]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lastMileage') {
      const reg = /^[0-9\b]+$/;
      if (value === '' || reg.test(value)) {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const clearDate = () => {
    setFormData({ ...formData, date: null });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setIsSavePressed(true);
    const isFileDateMissing =
      fileDetails.length > 0 && fileDetails.some((file) => !file.date);

    const newValidation = {
      carId: !!formData.carID,
      carName: !!formData.carName,
      // carMaker: !!formData.carMaker,
      carType: !!formData.carType,
      date: isChecked ? !!formData.date : true,
      fileDates: !isFileDateMissing,
      year: !!formData.year,
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
    console.log({ formData, fileDetails });
  };

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

  const handleDeleteRowToggle = () => {
    if (showDeleteCheckboxes && selectedRows.length > 0) {
      deleteSelectedFiles();
    } else {
      setShowDeleteCheckboxes(!showDeleteCheckboxes);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/vehicle-manager');
  };

  const handleCancel = () => {
    navigate('/vehicle-manager');
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (name === 'lastMileage') {
      setFormData((prevData) => ({ ...prevData, [name]: prevData[name].toString().replace(/,/g, '') }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'lastMileage') {
      setFormData((prevData) => ({ ...prevData, [name]: value ? parseInt(value).toLocaleString('en-US') : '' }));
    }
  };

  const incrementYear = () => {
    setFormData((prevData) => ({
      ...prevData,
      year: prevData.year < 2100 ? parseInt(prevData.year) + 1 : 2100,
    }));
  };

  const decrementYear = () => {
    setFormData((prevData) => ({
      ...prevData,
      year: prevData.year > 1900 ? parseInt(prevData.year) - 1 : 1900,
    }));
  };

  const setJapaneseLanguage = () => {
    i18n.changeLanguage('jp');
  };

  const setEnglishLanguage = () => {
    i18n.changeLanguage('en');
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setTextBoxInput(input);
  };

  const getRemainingColor = (remaining) => {
    return remaining <= 10 ? 'text-red-500 font-bold' : 'text-green-500 font-bold';
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const currentTime = new Date().toLocaleString("ja-JP");

    const newFileDetails = newFiles.map((file) => ({
      originalName: file.name,
      date: null,
      fileUrl: URL.createObjectURL(file),
      uploadTime: currentTime,
      column: selectedColumn,
      
    }));

    setFileDetails((prevFileDetails) => {
      const updatedFileDetails = [...prevFileDetails];
      if (selectedRowIndex !== null) {
        const row = updatedFileDetails[selectedRowIndex];
        if (selectedColumn === "Compulsory Insurance Certificate") {
          row.compulsoryInsuranceCertificate = newFileDetails[0];
        } else if (selectedColumn === "Vehicle Inspection Certificate") {
          row.vehicleInspectionCertificate = newFileDetails[0];
        }
      }
      return updatedFileDetails;
    });

    setShowDropdown(false);
    setAddingFiles(false);
    setSelectedRowIndex(null);
    setSelectedColumn("");
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
    localStorage.setItem("fileDetails", JSON.stringify(updatedFileDetails));
  };

  const toggleFileCalendar = (index) => {
    setFileCalendars((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const deleteSelectedFiles = () => {
    const updatedFileDetails = fileDetails.filter(
      (file, index) => !selectedRows.includes(index)
    );
    setFileDetails(updatedFileDetails);
    setSelectedRows([]);
    setShowDeleteCheckboxes(false);
    localStorage.setItem("fileDetails", JSON.stringify(updatedFileDetails));
    toast.success(t("toastDeleteSuccess"));
  };

  const handleYearButtonClick = () => {
    setShowYearList((prev) => !prev);
  };

  const handleYearSelect = (year) => {
    setFormData((prevData) => ({ ...prevData, year }));
    setShowYearList(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (fileDetails.length === 0) {
      toast.error(t("clickAddRowFirst"));
      return;
    }
    if (!addingFiles) {
      setShowDeleteCheckboxes(false);
      setSelectedRows([]);
      setAddingFiles(true);
    } else {
      setShowDropdown(true);
    }
  };

  const handleColumnSelect = (column) => {
    setSelectedColumn(column);
    setShowDropdown(false);
    fileInputRef.current.click();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "select",
        Cell: ({ row: { index } }) =>
          addingFiles ? (
            <input
              type="checkbox"
              checked={selectedRowIndex === index}
              onChange={() => setSelectedRowIndex(index)}
            />
          ) : showDeleteCheckboxes ? (
            <input
              type="checkbox"
              checked={selectedRows.includes(index)}
              onChange={() => handleRowSelect(index)}
            />
          ) : null,
      },
      {
        Header: t("compulsoryInsuranceCertificate"),
        accessor: "compulsoryInsuranceCertificate",
        Cell: ({ cell: { value } }) =>
          value ? (
            <a
              href={value.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {value.originalName}
            </a>
          ) : null,
      },
      {
        Header: t("vehicleInspectionCertificate"),
        accessor: "vehicleInspectionCertificate",
        Cell: ({ cell: { value } }) =>
          value ? (
            <a
              href={value.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {value.originalName}
            </a>
          ) : null,
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
              <span
                className={`${!validation.fileDates ? "text-red-500" : ""}`}
              >
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
    [
      fileDetails,
      fileCalendars,
      validation,
      t,
      showDeleteCheckboxes,
      selectedRows,
      addingFiles,
      selectedRowIndex,
    ]
  );

  const data = React.useMemo(
    () =>
      fileDetails.map((file) => ({
        ...file,
        compulsoryInsuranceCertificate: file.compulsoryInsuranceCertificate,
        vehicleInspectionCertificate: file.vehicleInspectionCertificate,
        date: file.date,
      })),
    [fileDetails]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="absolute top-4 right-4 border border-black rounded">
        <button onClick={setJapaneseLanguage} className={`p-2 ${i18n.language === 'jp' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-l`}>
          日本語
        </button>
        <button onClick={setEnglishLanguage} className={`p-2 ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-r`}>
          En
        </button>
      </div>

      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleAdd}>
        <h2 className="text-2xl font-bold mb-6 text-center">{t("editcar")}</h2>
        <div className="mb-4">
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 text-sm font-bold mb-2" htmlFor="carID">
            {t("carID")}
          </label>
          <input
            id="carID"
            type="text"
            name="carID"
            value={formData.carID}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 text-sm font-bold mb-2" htmlFor="carName">
            {t("carname")}
          </label>
          <input
            id="carName"
            type="text"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Year input with spin buttons */}
        <div className="mb-4 relative">
          <label
            className={`block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500`}
            htmlFor="year"
          >
            {t("year")}
          </label>
          <div className="flex">
            <input
              id="year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              onFocus={handleYearButtonClick}
              min="1900"
              max={currentYear}
              step="1"
              className="w-full px-3 py-2 border rounded-l text-gray-700 focus:outline-none focus:border-blue-500"
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
          {showYearList && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto grid grid-cols-5 gap-2 p-2">
              {years.map((year, index) => (
                <div
                  key={index}
                  onMouseDown={() => handleYearSelect(year)}
                  className="flex px-4 py-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded justify-center"
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Last Mileage input field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("lastmileage")}</label>
          <div className="flex justify-between"><input
            type="text"
            name="lastMileage"
            value={formData.lastMileage}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            style={{ textAlign: 'right' }}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
          <h1 className='p-2 font-bold'>km</h1></div>
        </div>

        {/* Car type */}
        <div className="mb-6">
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 text-sm font-bold mb-2" htmlFor="cartype">
            {t("carType")}
          </label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="cartype"
                value="purchase"
                checked={formData.carType === 'purchase'}
                onChange={handleChange}
                className="mr-2"
              />
              {t("purchase")}
            </label>
            <label>
              <input
                type="radio"
                name="cartype"
                value={"lease"}
                checked={formData.carType === 'lease'}
                onChange={handleChange}
                className="mr-2"
              />
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
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 text-sm font-bold mb-2">
              {t("nextupdatedate")}
            </label>
          </div>
          <div className="flex">
            <input
              type="text"
              value={formData.date ? formData.date.toLocaleDateString('ja-JP') : ''}
              onClick={toggleCalendar}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer ${!isChecked ? 'bg-gray-300 text-gray-400' : ''}`}
              readOnly
              disabled={!isChecked}
            />
            <button
              type="button"
              onClick={clearDate}
              className={`px-3 py-2 bg-gray-200 border-l border border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500 ${!isChecked ? 'bg-gray-100 text-gray-400' : ''}`}
              disabled={!isChecked}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          {showCalendar && isChecked && (
            <Calendar
              onChange={handleDateChange}
              value={formData.date}
              locale="ja"
              calendarType="gregory"
              formatShortWeekday={(locale, date) => ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}
              className="border rounded-lg shadow-lg custom-calendar"
            />
          )}
        </div>

        {/* File upload table */}
        <div className="mt-4 border-2 border-gray-300 rounded p-4 mb-2">
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="border p-2">
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      let cellProps = { ...cell.getCellProps() };
                      delete cellProps.key;

                      return (
                        <td
                          key={cell.getCellProps().key}
                          {...cellProps}
                          className="border p-2"
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
              onChange={handleFileChange}
              ref={fileInputRef}
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
          <p className="text-gray-400 pt-2">{t("explanationAdd")}<br></br>
          {t("explanationDelete")}
          </p>
        </div>

        {/* Details Input field */}
        <div className="p-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {t("writedetails")}
          </label>
          <textarea
            id="message"
            name="message"
            onChange={handleInputChange}
            rows="4"
            cols="57"
            value={textBoxInput}
            maxLength={maxLength}
            className='border border-gray-300 focus:outline-none focus:border-blue-500 rounded p-2'
          ></textarea>
          <p className={getRemainingColor(maxLength - textBoxInput.length)}>
            {t("remainingcharacters")}
            {maxLength - textBoxInput.length}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="rounded px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className='pr-2' />
            {i18n.language === 'en' ? 'Save' : '保存'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            <FontAwesomeIcon icon={faBan} className='pr-2'/>
            {i18n.language === 'en' ? 'Cancel' : 'キャンセル'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditButton;
