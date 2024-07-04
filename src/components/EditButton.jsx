import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFloppyDisk, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import 'react-calendar/dist/Calendar.css';

const EditButton = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    carID: '',
    carName: '',
    year: '',
    role: '',
    date: null,
    lastMileage: 0,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState('');
  const maxLength = 20;

  useEffect(() => {
    if (location.state && location.state.selectedData) {
      const selectedData = location.state.selectedData;
      setFormData({
        ...selectedData,
        date: selectedData.date ? new Date(selectedData.date) : null,
      });
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

    // Handle changes specifically for the 'lastMileage' field
    if (name === 'lastMileage') {
      // Regular expression to check if the input is numeric
      const reg = /^[0-9\b]+$/;

      // If the field is empty or matches the numeric regex, update the state
      if (value === '' || reg.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      }
    } else {
      // For all other inputs, update the state as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
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
      setFormData((prevData) => ({
        ...prevData,
        [name]: prevData[name].toString().replace(/,/g, ''),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'lastMileage') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value ? parseInt(value).toLocaleString('en-US') : '',
      }));
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
    setFile(e.target.files[0]);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="absolute top-4 right-4 border border-black rounded">
        <button onClick={setJapaneseLanguage} className={`p-2 ${i18n.language === 'jp' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-l`}>
          日本語
        </button>
        <button onClick={setEnglishLanguage} className={`p-2 ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-r`}>
          En
        </button>
      </div>

      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">{t("editcar")}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carID">
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carName">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">{t("year")} </label>
          <div className="flex">
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1900"
              max="2100"
              step="1"
              className="w-full px-3 py-2 border rounded-l text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <div className="flex flex-col border rounded-r">
              <button
                type="button"
                onClick={incrementYear}
                className="up-button px-1 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
              >
                <FontAwesomeIcon icon={faCaretUp} />
              </button>
              <button
                type="button"
                onClick={decrementYear}
                className="down-button px-1 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
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
            value={formData.lastMileage}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            style={{ textAlign: 'right' }}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            {t("role")}
          </label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="role"
                value="VM"
                checked={formData.role === 'VM'}
                onChange={handleChange}
                className="mr-2"
              />
              Vehicle Manager
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="User"
                checked={formData.role === 'user'}
                onChange={handleChange}
                className="mr-2"
              />
              User
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            className="border border-slate-700 rounded px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className='pr-2' />
            {i18n.language === 'en' ? 'Save' : '保存'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="border border-slate-700 rounded px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            {i18n.language === 'en' ? 'Cancel' : 'キャンセル'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditButton;
