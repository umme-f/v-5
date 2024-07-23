import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan,faTimes, faFloppyDisk, faCaretUp, faCaretDown, faCalendarDays, faArrowUpFromBracket, faArrowUpRightFromSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import 'react-calendar/dist/Calendar.css';

const EditButton = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [fileDetails, setFileDetails] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showFileCalendar, setShowFileCalendar] = useState({});
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
  const [showYearList, setShowYearList] = useState(false);
  const [textBoxInput, setTextBoxInput] = useState('');
  const maxLength = 20;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

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
    const newFile = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64File = reader.result;
      const newFileDetails = [...fileDetails, { originalName: newFile.name, date: null, fileUrl: base64File }];
      setFileDetails(newFileDetails);
      localStorage.setItem('fileDetails', JSON.stringify(newFileDetails));
    };

    if (newFile) {
      reader.readAsDataURL(newFile);
    }
  };

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleFileDateChange = (index, date) => {
    const updatedFileDetails = [...fileDetails];
    updatedFileDetails[index].date = date;
    setFileDetails(updatedFileDetails);
    localStorage.setItem('fileDetails', JSON.stringify(updatedFileDetails));
    setShowFileCalendar((prev) => ({ ...prev, [index]: false }));
  };

  const toggleFileCalendar = (index) => {
    setShowFileCalendar((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleOpenLink = () => {
    if (selectedRow !== null) {
      const selectedFileUrl = fileDetails[selectedRow].fileUrl;
      if (selectedFileUrl) {
        window.open(selectedFileUrl, '_blank');
      }
    }
  };

  const deleteSelectedFiles = () => {
    if (selectedRow !== null) {
      const updatedFileDetails = fileDetails.filter((_, index) => index !== selectedRow);
      setFileDetails(updatedFileDetails);
      localStorage.setItem('fileDetails', JSON.stringify(updatedFileDetails));
      setSelectedRow(null);
    }
  };

  const handleYearButtonClick = () => {
    setShowYearList((prev) => !prev);
  };

  const handleYearSelect = (year) => {
    setFormData((prevData) => ({ ...prevData, year }));
    setShowYearList(false);
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

        {/* File upload table */}
        <div className="mt-4 border-2 border-gray-300 rounded">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b-2">
                <th className="py-2 px-4 border-r-2">{t("fileName")}</th>
                <th className={`py-2 px-4`}>{t("inspectiondate")}</th>
              </tr>
            </thead>
            <tbody>
              {fileDetails.map((file, index) => (
                <tr
                  key={index}
                  className={`border-b-2 cursor-pointer ${selectedRow === index ? 'bg-gray-200' : ''}`}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="py-2 px-4 border-r-2">
                    <a
                      href={`#`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenLink();
                      }}
                    >
                      {file.originalName}
                    </a>
                  </td>
                  <td className="py-2 px-4">
                    <div
                      onClick={() => toggleFileCalendar(index)}
                      className={`w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 flex items-center justify-between ${!file.date ? 'border-red-500' : ''}`}
                    >
                      <span className={`${!file.date ? 'text-red-500' : ''}`}>
                        {file.date ? new Date(file.date).toLocaleDateString('ja-JP') : 'Select Date'}
                      </span>
                      <button type="button" className="mt-2">
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </button>
                    </div>
                    {showFileCalendar[index] && (
                      <Calendar
                        onChange={(date) => handleFileDateChange(index, date)}
                        value={file.date ? new Date(file.date) : new Date()}
                        locale="ja"
                        calendarType="gregory"
                        formatShortWeekday={(locale, date) => ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}
                        className="border rounded-lg shadow-lg custom-calendar mt-2"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid grid-cols-3 gap-4 p-2">
            <div className="text-right">
              <button
                className={`w-full px-4 py-2 rounded font-semibold flex items-center justify-center ${file ? 'bg-green-700' : 'bg-green-500'} text-white hover:bg-green-700`}
                onClick={() => document.getElementById('fileUpload').click()}
              >
                <FontAwesomeIcon icon={faArrowUpFromBracket} className="pr-2 text-white" />
                {t("choosefiles")}
              </button>
              <input
                id="fileUpload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="text-right">
              <button
                className="w-full px-4 py-2 bg-orange-500 text-white rounded font-semibold flex items-center justify-center hover:bg-orange-700"
                onClick={handleOpenLink}
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="pr-2" />
                {t("openlink")}
              </button>
            </div>
            <div className="text-right">
              <button
                className={`w-full px-4 py-2 bg-red-500 text-white rounded font-semibold flex items-center justify-center hover:bg-red-700 ${i18n.language === 'en' ? '' : 'py-3 text-sm'}`}
                onClick={deleteSelectedFiles}
              >
                <FontAwesomeIcon icon={faTrashCan} className="pr-2" />
                {t("deletefile")}
              </button>
            </div>
          </div>
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
