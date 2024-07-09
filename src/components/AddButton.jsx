import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { faTimes, faCaretUp, faCaretDown, faFloppyDisk, faBan, faAngleDown, faCalendarDays, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddButton = () => {
  const maxLength = 20;
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('jp');
  const [carDetails, setCarDetails] = useState({
    carId: '',
    carName: '',
    year: new Date().getFullYear(),
    lastMileage: 0,
    carType: '',
    date: new Date(),
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState('');
  const [selectedCarMaker, setSelectedCarMaker] = useState('');
  const [showCarMakers, setShowCarMakers] = useState(false);
  const [showCarNames, setShowCarNames] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [fileDetails, setFileDetails] = useState([]);
  const [fileCalendars, setFileCalendars] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  const carNames = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW'];
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }

    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/files');
        setFileDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch files:', error);
      }
    };

    fetchFiles();
  }, [i18n]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!carDetails.carId || !carDetails.carName || !carDetails.carType || (isChecked && !carDetails.date) || files.length === 0) {
      toast.error(t('toastAddWarning'));
      return;
    }
    console.log({ carDetails, files });
  };

  const handleCarMakerSelect = (maker) => {
    setSelectedCarMaker(maker);
    setShowCarMakers(false);
  };

  const handleCarNameSelect = (name) => {
    setCarDetails(prevDetails => ({ ...prevDetails, carName: name }));
    setShowCarNames(false);
  };

  const handleCancel = () => {
    setCarDetails({
      carId: '',
      carName: '',
      year: new Date().getFullYear(),
      lastMileage: 0,
      carType: '',
      date: new Date(),
    });
    setFiles([]);
    setFileNames([]);
    setFileDetails([]);
    setSelectedFiles([]);
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setCarDetails(prevDetails => ({ ...prevDetails, date }));
    setShowCalendar(false);
  };

  const clearDate = () => {
    setCarDetails(prevDetails => ({ ...prevDetails, date: null }));
    setShowCalendar(false);
  };

  const incrementYear = () => {
    setCarDetails(prevDetails => ({ ...prevDetails, year: Math.min(prevDetails.year + 1, 2100) }));
  };

  const decrementYear = () => {
    setCarDetails(prevDetails => ({ ...prevDetails, year: Math.max(prevDetails.year - 1, 1900) }));
  };

  const handleYearChange = (e) => {
    const value = Math.max(1900, Math.min(2100, Number(e.target.value)));
    setCarDetails(prevDetails => ({ ...prevDetails, year: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'lastMileage') {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value ? parseInt(value).toLocaleString('en-US') : '',
      }));
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (name === 'lastMileage') {
      setCarDetails((prevDetails) => ({
        ...prevDetails,
        [name]: prevDetails[name].toString().replace(/,/g, ''),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails(prevDetails => ({ ...prevDetails, [name]: value }));
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

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const existingFileNames = new Set(fileNames);

    const duplicateFiles = newFiles.filter(file => existingFileNames.has(file.name));
    const filteredNewFiles = newFiles.filter(file => !existingFileNames.has(file.name));
    const filteredNewFileNames = filteredNewFiles.map(file => file.name);

    if (duplicateFiles.length > 0) {
      toast.error(t('duplicateFileWarning'));
    }

    setFiles([...files, ...filteredNewFiles]);
    setFileNames([...fileNames, ...filteredNewFileNames]);
    const newFileDetails = filteredNewFiles.map(file => ({
      originalName: file.name,
      date: null,
    }));
    setFileDetails([...fileDetails, ...newFileDetails]);

    // Send files to the backend
    const formData = new FormData();
    filteredNewFiles.forEach(file => formData.append('files', file));
    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        setFileDetails(response.data);
      })
      .catch(error => {
        console.error('Failed to upload files:', error);
        toast.error(t('toastUploadError'));
      });
  };

  const handleFileDateChange = (index, date) => {
    const updatedFileDetails = [...fileDetails];
    updatedFileDetails[index].date = date;
    setFileDetails(updatedFileDetails);
    setFileCalendars(prev => ({ ...prev, [index]: false }));
  };

  const toggleFileCalendar = (index) => {
    setFileCalendars(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleFileSelection = (index) => {
    setSelectedFiles(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const deleteSelectedFiles = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (selectedFiles.length === 0) {
      toast.error(t('toastDeleteWarning'));
      return;
    }

    const filesToDelete = fileDetails.filter((_, index) => selectedFiles.includes(index)).map(file => file.originalName);
    try {
      const response = await axios.post('http://localhost:5000/delete', { files: filesToDelete });
      if (response.status === 200) {
        const updatedFileDetails = fileDetails.filter((_, index) => !selectedFiles.includes(index));
        setFileDetails(updatedFileDetails);
        setSelectedFiles([]);
        toast.success(t('toastDeleteSuccess'));
      } else {
        throw new Error('Failed to delete files');
      }
    } catch (error) {
      console.error('Error deleting files:', error);
      toast.error(t('toastDeleteError'));
    }
  };

  const getRemainingColor = (remaining) => {
    return remaining <= 10 ? 'text-red-500 font-bold' : 'text-green-500 font-bold';
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="absolute top-4 right-4 border border-black rounded">
        <button onClick={() => handleLanguageChange('jp')} className={`p-2 ${i18n.language === 'jp' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-l`}>
          日本語
        </button>
        <button onClick={() => handleLanguageChange('en')} className={`p-2 ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-r`}>
          En
        </button>
      </div>

      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleAdd}>
        <h2 className="text-2xl font-bold mb-6 text-center">{t("carAddForm")}</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block " htmlFor="carId">
            {t("carID")}
          </label>
          <input
            id="carId"
            type="text"
            value={carDetails.carId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Car Maker Name */}
        <div className="mb-4 relative">
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 text-sm font-bold mb-2">{t("carmakername")}</label>
          <div className="flex">
            <input
              type="text"
              name="carMaker"
              value={selectedCarMaker}
              onChange={handleChange}
              onFocus={() => setShowCarMakers(true)}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
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
              {['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW'].map((maker, index) => (
                <li
                  key={index}
                  onMouseDown={() => handleCarMakerSelect(maker)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {maker}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Car Name */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block " htmlFor="carName">
            {t("carname")}
          </label>
          <div className="flex">
            <input
              id="carName"
              type="text"
              value={carDetails.carName}
              onChange={(e) => setCarDetails(prevDetails => ({ ...prevDetails, carName: e.target.value }))}
              onFocus={() => setShowCarNames(true)}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
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
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 text-sm font-bold mb-2">{t("year")} </label>
          <div className="flex">
            <input
              type="number"
              name="year"
              value={carDetails.year}
              onChange={handleYearChange}
              min="1900"
              max="2100"
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
        </div>

        {/* Last Mileage */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("lastmileage")}</label>
          <input
            type="text"
            name="lastMileage"
            value={carDetails.lastMileage}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            style={{ textAlign: 'right' }}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Car Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block" htmlFor="carType">
            {t("carType")}
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="purchase"
              name="carType"
              value="purchase"
              checked={carDetails.carType === 'purchase'}
              onChange={(e) => setCarDetails(prevDetails => ({ ...prevDetails, carType: e.target.value }))}
              className="mr-2"
            />
            <label htmlFor="purchase" className="mr-4">{t("purchase")}</label>
            <input
              type="radio"
              id="lease"
              name="carType"
              value="lease"
              checked={carDetails.carType === 'lease'}
              onChange={(e) => setCarDetails(prevDetails => ({ ...prevDetails, carType: e.target.value }))}
              className="mr-2"
            />
            <label htmlFor="lease" className="mr-4">{t("lease")}</label>
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
              value={carDetails.date ? carDetails.date.toLocaleDateString('ja-JP') : ''}
              onClick={toggleCalendar}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer ${isChecked ? '' : 'bg-gray-400 cursor-not-allowed'}`}
              readOnly
              disabled={!isChecked}
            />
            <button
              type="button"
              onClick={clearDate}
              className={`px-3 py-2 bg-gray-200 border-l border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500 ${isChecked ? '' : 'cursor-not-allowed'}`}
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
              formatShortWeekday={(locale, date) => ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}
              formatDay={(locale, date) => date.getDate()}
              className="border rounded-lg shadow-lg custom-calendar mt-2"
            />
          )}
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-gray-700 text-sm font-bold mb-2">
            {t("fileupload")}
          </label>
          <div className="flex items-center">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* File Details Table */}        
          <div className="mt-4 border-2 border-gray-300 rounded">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b-2">
                  <th className="py-2 px-4"></th>
                  <th className="py-2 px-4 border-r-2">{t("fileName")}</th>
                  <th className="py-2 px-4">{t("date")}</th>
                </tr>
              </thead>
              <tbody>
                {fileDetails.map((file, index) => (
                  <tr
                    key={index}
                    className={`border-b-2 ${selectedFiles.includes(index) ? 'bg-gray-200' : ''}`}
                  >
                    
                    <td className="py-2 px-4 border-r-2">
                      <a href={`http://localhost:5000/uploads/${file.originalName}`} target="_blank" rel="noopener noreferrer">
                        {file.originalName}
                      </a>
                    </td>
                    <td className="py-2 px-4">
                      <div
                        onClick={() => toggleFileCalendar(index)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 flex items-center justify-between"
                      >
                        <span>
                          {file.date
                            ? new Date(file.date).toLocaleDateString('ja-JP')
                            : 'Select Date'}
                        </span>
        
                        {/* Button to show calendar */}
                        <button type="button" className="mt-2">
                          <FontAwesomeIcon icon={faCalendarDays} />
                        </button>
                      </div>
                      {fileCalendars[index] && (
                        <Calendar
                          onChange={(date) => handleFileDateChange(index, date)}
                          value={file.date ? new Date(file.date) : new Date()}
                          locale="ja"
                          calendarType="gregory"
                          formatShortWeekday={(locale, date) =>
                            ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
                          }
                          formatDay={(locale, date) => date.getDate()}
                          className="border rounded-lg shadow-lg custom-calendar mt-2"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Deletes file name from the table */}
            <div className="grid grid-cols-3">
            <div className="text-right m-4">
              <button
                className="bg-green-500 p-1 text-white rounded font-semibold"
                onClick={deleteSelectedFiles}
              >
                <FontAwesomeIcon icon={faTrashCan} className="pr-1" />
                {t("delete")}
              </button>
            </div>
            <div className="text-right m-4">
              <button
                className="bg-orange-500 p-1 text-white rounded font-semibold"
                onClick={deleteSelectedFiles}
              >
                <FontAwesomeIcon icon={faTrashCan} className="pr-1" />
                {t("delete")}
              </button>
            </div>
            <div className="text-right m-4">
              <button
                className="bg-red-500 p-1 text-white rounded font-semibold"
                onClick={deleteSelectedFiles}
              >
                <FontAwesomeIcon icon={faTrashCan} className="pr-1" />
                {t("delete")}
              </button>
            </div>
            </div>
          </div>
        

        {/* Write Details */}
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
            className="border border-gray-300 focus:outline-none focus:border-blue-500 rounded p-2"
          ></textarea>
          <p className={getRemainingColor(maxLength - textBoxInput.length)}>
            {t("remainingcharacters")} {maxLength - textBoxInput.length}
          </p>
        </div>

        {/* Save and Cancel Button */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="border border-slate-700 font-bold border-rounded px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="pr-2" />
            {t("save")}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="border border-slate-700 font-bold border-rounded px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
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
