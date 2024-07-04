import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faTimes, faCaretUp, faCaretDown, faFloppyDisk, faBan, faAngleDown } from '@fortawesome/free-solid-svg-icons';
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
  const [carId, setCarId] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState('');
  const [carName, setCarName] = useState('');
  const [year, setYear] = useState(new Date().getFullYear()); // Initialize with current year
  const [role, setRole] = useState('');
  const [date, setDate] = useState(new Date()); // Initialize date with current date
  const [selectedCarMaker, setSelectedCarMaker] = useState('');
  const [showCarMakers, setShowCarMakers] = useState(false); // New state for car makers dropdown
  const [showCarNames, setShowCarNames] = useState(false); // New state for car names dropdown
  const [file, setFile] = useState(null); // New state for file upload
  const [fileName, setFileName] = useState(''); // New state for file name
  const navigate = useNavigate();
  const car = location.state ? location.state.car : {};
  const [carDetails, setCarDetails] = useState({
    ...car,
    date: car.date ? new Date(car.date) : new Date(),
    lastMileage: car.lastMileage || 0,
  });

  // Sample car names
  const carNames = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW'];

  // Language
  const setLanguageToEnglish = () => {
    i18n.changeLanguage('en');
    setLanguage('en');
    localStorage.setItem('selectedLanguage', 'en');
  };

  const setLanguageToJapanese = () => {
    i18n.changeLanguage('jp');
    setLanguage('jp');
    localStorage.setItem('selectedLanguage', 'jp');
  };

  // Save language to local storage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  // Add info warning
  const handleAdd = (e) => {
    e.preventDefault();
    if (!carId || !carName || !role || (isChecked && !date) || !file) {
      toast.error(t('toastAddWarning'));
      return;
    }
    console.log({ carId, carName, year, role, date });
    // Navigate to the VehicleManager page after form submission
    navigate('/vehicle-manager');
  };

  const handleCarMakerSelect = (maker) => {
    setSelectedCarMaker(maker);
    setShowCarMakers(false);
  };

  const handleCarNameSelect = (name) => {
    setCarName(name);
    setShowCarNames(false);
  };

  // Cancel and navigate
  const handleCancel = () => {
    setCarId('');
    setCarName('');
    setYear(new Date().getFullYear());
    setRole('');
    setDate(new Date());
    setFile(null);
    setFileName('');
    navigate('/vehicle-manager');
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setDate(date);
    setShowCalendar(false); // Hide calendar after date selection
  };

  const clearDate = () => {
    setDate(null);
    setShowCalendar(false);
  };

  const incrementYear = () => {
    setYear((prevYear) => Math.min(prevYear + 1, 2100));
  };

  const decrementYear = () => {
    setYear((prevYear) => Math.max(prevYear - 1, 1900));
  };

  const handleYearChange = (e) => {
    const value = Math.max(1900, Math.min(2100, Number(e.target.value)));
    setYear(value);
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

    // Handle changes specifically for the 'lastMileage' field
    if (name === 'lastMileage') {
        // Regular expression to check if the input is numeric
        const reg = /^[0-9\b]+$/;

        // If the field is empty or matches the numeric regex, update the state
        if (value === '' || reg.test(value)) {
            setCarDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        }
    } else {
        // For all other inputs, update the state as usual
        setCarDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowCarMakers(false), 200); // to prevent immediate hide on click
    setTimeout(() => setShowCarNames(false), 200); // to prevent immediate hide on click
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

  const handleCarIdChange = (e) => {
    const value = e.target.value;
    // Only allow numeric input
    if (/^\d*$/.test(value)) {
      setCarId(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFileName(file ? file.name : '');
  };

  const clearFile = () => {
    setFile(null);
    setFileName('');
  };

  const getRemainingColor = (remaining) => {
    return remaining <= 10 ? 'text-red-500 font-bold' : 'text-green-500 font-bold';
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="absolute top-4 right-4 border border-black rounded">
        <button onClick={setLanguageToJapanese} className={`p-2 ${i18n.language === 'jp' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-l`}>
          日本語
        </button>
        <button onClick={setLanguageToEnglish} className={`p-2 ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-r`}>
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
            value={carId}
            onChange={handleCarIdChange}
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
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
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
              value={year}
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

        {/* Last Mileage input field */}
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

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block" htmlFor="role">
            {t("role")}
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="vehicleManager"
              name="role"
              value="Vehicle Manager"
              checked={role === 'Vehicle Manager'}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="vehicleManager" className="mr-4">Vehicle Manager (VM)</label>
            <input
              type="radio"
              id="user"
              name="role"
              value="User"
              checked={role === 'User'}
              onChange={(e) => setRole(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="user" className="mr-4">User</label>
          </div>
        </div>

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
              value={date ? date.toLocaleDateString('ja-JP') : ''}
              onClick={toggleCalendar}
              className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer ${isChecked ? '' : 'bg-gray-400 cursor-not-allowed'}`}
              readOnly
              disabled={!isChecked}
            />
            <button
              type="button"
              onClick={clearDate}
              className={`px-3 py-2 bg-gray-200 border-l border border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500 ${isChecked ? '' : 'cursor-not-allowed'}`}
              disabled={!isChecked}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          {showCalendar && isChecked && (
            <Calendar
              onChange={handleDateChange}
              value={date}
              locale="ja"
              calendarType="gregory"
              formatShortWeekday={(locale, date) => ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}
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
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
            {file && (
              <button
                type="button"
                onClick={clearFile}
                className="px-3 py-3 bg-gray-200 border-l border border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          {fileName && (
            <div className="mt-2 text-gray-700">
              {t("uploadedFile")}: {fileName}
            </div>
          )}
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
            className='border border-gray-300 focus:outline-none focus:border-blue-500 rounded p-2'
          ></textarea>
          <p className={getRemainingColor(maxLength - textBoxInput.length)}>
            {t("remainingcharacters")} {maxLength - textBoxInput.length}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="border border-slate-700 font-bold border-rounded px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className='pr-2' />
            {t("save")}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="border border-slate-700 font-bold border-rounded px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
          >
            <FontAwesomeIcon icon={faBan} className='pr-2' />
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddButton;
