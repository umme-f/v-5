import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faFloppyDisk, faBan, faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css'; // Import the custom CSS file
import ja from 'date-fns/locale/ja'; // Import Japanese locale

const CarDetails = () => {
  const location = useLocation();
  const { car } = location.state;
  const [carDetails, setCarDetails] = useState({
    ...car,
    date: car.date ? new Date(car.date) : null,
  });
  const [, setFile] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [carNames, setCarNames] = useState(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW']);
  const [showCarNames, setShowCarNames] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.car) {
      const { car } = location.state;
      setCarDetails({
        ...car,
        date: car.date ? new Date(car.date) : null,
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleDateChange = (date) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, date: date }));
    setShowCalendar(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Handle save logic 
    alert('車の詳細が保存されました！');
    navigate('/vehicle-manager'); // Redirect to the main table view
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const clearDate = () => {
    setCarDetails((prevDetails) => ({ ...prevDetails, date: null }));
  };

  const clearRole = () => {
    setCarDetails((prevDetails) => ({ ...prevDetails, role: '' }));
  };

  const removeCarName = (nameToRemove) => {
    setCarNames(carNames.filter((name) => name !== nameToRemove));
    if (carDetails.carName === nameToRemove) {
      setCarDetails({ ...carDetails, carName: '' });
    }
  };

  const handleCancel =()=>{
    navigate('/vehicle-manager');
  };

  const handleInputFocus = () => {
    setShowCarNames(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowCarNames(false), 200); // Delay to allow click selection
  };

  const handleCarNameSelect = (name) => {
    setCarDetails((prevDetails) => ({ ...prevDetails, carName: name }));
    setShowCarNames(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSave}>
        <h2 className="text-2xl font-bold mb-6 text-center">Car Details (車の詳細)</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Car (車両)ID:</label>
          <input
            type="text"
            name="carID"
            value={carDetails.carID}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Car Name(車名):</label>
          <div className="flex">
            <input
              type="text"
              name="carName"
              value={carDetails.carName}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => removeCarName(carDetails.carName)}
              className="px-3 py-2 bg-gray-200 border-l border border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500"
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
        {/* ------------------Year spin button------------------ */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Year (年式):</label>
          <input
            type="number"
            name="year"
            value={carDetails.year}
            onChange={handleChange}
            min="1900"
            max="2100"
            step="1"
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* ----------------Role radio buttons--------------- */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role (役割):</label>
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
        {/* --------------Next Update Date----------------- */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Next update date (次の更新日):
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={carDetails.date ? carDetails.date.toLocaleDateString('ja-JP') : ''}
              onClick={toggleCalendar}
              onChange={(e) => setCarDetails({ ...carDetails, date: e.target.value ? new Date(e.target.value) : null })}
              className="w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer"
              readOnly
            />
            <button
              type="button"
              onClick={clearDate}
              className="px-3 py-2 bg-gray-200 border-l border border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {showCalendar && (
            <div className="absolute z-10 mt-2">
              <Calendar
                onChange={handleDateChange}
                value={carDetails.date}
                locale="ja"
                calendarType="gregory"
                formatShortWeekday={(locale, date) => ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}
                className="border rounded-lg shadow-lg custom-calendar"
                tileClassName={({ date, view }) => {
                  if (view === 'month') {
                    const day = date.getDay();
                    return day === 0 || day === 6 ? 'text-red-500' : null;
                  }
                  return null;
                }}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">File Upload (ファイルをアップロード):</label>
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
            保存
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700 border border-slate-700"
          >
            <FontAwesomeIcon icon={faBan} className="pr-2" />キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarDetails;
