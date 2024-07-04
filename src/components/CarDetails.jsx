import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faFloppyDisk, faBan, faTimes, faAngleDown, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css'; // Import the custom CSS file

const CarDetails = () => {
  const [language, setLanguage] = useState('jp');
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state ? location.state.car : {}; // Safe handling for car state

  // State declarations
  const [carDetails, setCarDetails] = useState({
    ...car,
    date: car.date ? new Date(car.date) : new Date(),
    lastMileage: car.lastMileage || 0,
  });
  const [selectedCarMaker, setSelectedCarMaker] = useState('');
  const [, setFile] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [carNames, setCarNames] = useState(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW']);
  const [showCarNames, setShowCarNames] = useState(false);
  const [showCarMakers, setShowCarMakers] = useState(false); // New state for car makers dropdown
  const [isChecked, setIsChecked] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState('');
  const maxLength = 20;
  useEffect(() => {
    if (car) {
      console.log("Car data from location:", car); // Debug
      setCarDetails(current => ({
        ...current,
        ...car,
        date: car.date ? new Date(car.date) : new Date(),
      }));
    }
  }, [location.state]);

  // Language change
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

 // Language change from the vehicle-manager component
 const setJapaneseLanguage = () => {
  i18n.changeLanguage('jp');
};

const setEnglishLanguage = () => {
  i18n.changeLanguage('en');
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('車の詳細が保存されました！');
    navigate('/vehicle-manager'); // Redirect to the main table view
  };

  const handleDateChange = (date) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, date }));
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
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

  const clearDate = () => {
    setCarDetails((prevDetails) => ({ ...prevDetails, date: null }));
  };

  const handleCancel = () => {
    navigate('/vehicle-manager');
  };

  const handleCarNameSelect = (name) => {
    setCarDetails({ ...carDetails, carName: name });
    setShowCarNames(false);
  };

  const handleCarMakerSelect = (maker) => {
    setSelectedCarMaker(maker);
    setShowCarMakers(false);
  };

  const handleCarMakerButtonClick = () => {
    setShowCarMakers(prev => !prev);
  };

  const handleCarNameButtonClick = () => {
    setShowCarNames(prev => !prev);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowCarNames(false);
      setShowCarMakers(false);
    }, 200); // Delay to allow click selection
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setTextBoxInput(input);
  };

  const incrementYear = () => {
    setCarDetails((prevDetails) => ({ ...prevDetails, year: parseInt(prevDetails.year) + 1 }));
  };

  const decrementYear = () => {
    setCarDetails((prevDetails) => ({ ...prevDetails, year: parseInt(prevDetails.year) - 1 }));
  };

  const getRemainingColor = (remaining) => {
    return remaining <= 10 ? 'text-red-500 font-bold' : 'text-green-500 font-bold';
  };
  

  // JSX 
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Language toggle buttons */}
      <div className="absolute top-4 right-4 border border-black rounded">
        <button onClick={setJapaneseLanguage} className={`p-2 ${i18n.language === 'jp' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-l`}>
          日本語
        </button>
        <button onClick={setEnglishLanguage} className={`p-2 ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-r`}>
          En
        </button>
      </div>

      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("cardetails")}</h2>
        <form onSubmit={handleSave}>
          {/* Car ID field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t("carID")}</label>
            <input
              type="text"
              name="carID"
              value={carDetails.carID}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Car Maker Name field */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t("carmakername")}</label>
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

          {/* Car Name field */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t("carname")}</label>
            <div className="flex">
              <input
                type="text"
                name="carName"
                value={carDetails.carName}
                onChange={handleChange}
                onFocus={() => setShowCarNames(true)}
                onBlur={handleInputBlur}
                className="flex-grow px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
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

          {/* Year spin button */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t("year")} </label>
            <div className="flex">
              <input
                type="number"
                name="year"
                value={carDetails.year}
                onChange={handleChange}
                min="1900"
                max="2100"
                step="1"
                className="w-full px-3 py-2 border rounded-l text-gray-700 focus:outline-none focus:border-blue-500"
              />
              <div className="spin-buttons border rounded">
                <button
                  type="button"
                  onClick={incrementYear}
                  className="up-button"
                >
                  <FontAwesomeIcon icon={faCaretUp} />
                </button>
                <button
                  type="button"
                  onClick={decrementYear}
                  className="down-button"
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

          {/* Role radio buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t("role")}</label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="vehicleManager"
                  name="role"
                  value="Vehicle Manager"
                  checked={carDetails.role === 'Vehicle Manager'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="vehicleManager" className="mr-4">Vehicle Manager (VM)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="user"
                  name="role"
                  value="User"
                  checked={carDetails.role === 'User'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="user" className="mr-4">User</label>
              </div>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("nextupdatedate")}
              </label>
            </div>
            <div className="flex">
              <input
                type="text"
                value={carDetails.date ? carDetails.date.toLocaleDateString('ja-JP') : ''}
                onClick={toggleCalendar}
                className={`w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer ${!isChecked ? 'bg-gray-100 text-gray-400' : ''}`}
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
                value={carDetails.date}
                locale="ja"
                calendarType="gregory"
                formatShortWeekday={(locale, date) => ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}
                className="border rounded-lg shadow-lg custom-calendar"
              />
            )}
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

          {/* File upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            {t("fileupload")} 
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 border border-slate-700"
            >
              <FontAwesomeIcon icon={faFloppyDisk} className="pr-2" />
              {t("save")} 
              
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700 border border-slate-700"
            >
              <FontAwesomeIcon icon={faBan} className="pr-2" />
              {t("cancel")}              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;
