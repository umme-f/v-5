import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import UpdateWarning from './UpdateWarning';

const AddButton = () => {
  const [carId, setCarId] = useState('');
  const [carName, setCarName] = useState('');
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState(new Date()); // Initialize date with current date
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    // Handle add logic here
    console.log({ carId, carName, year, role, date });
    // Navigate to the VehicleManager page after form submission
    navigate('/vehicle-manager');
  };

  const handleCancel = () => {
    // Handle cancel logic here
    setCarId('');
    setCarName('');
    setYear('');
    setRole('');
    setDate(new Date());
    navigate('/vehicle-manager');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleAdd}>
        <h2 className="text-2xl font-bold mb-6 text-center">Car Form</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block " htmlFor="carId">
            Car ID
          </label>
          <input
            id="carId"
            type="text"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block " htmlFor="carName">
            Car Name
          </label>
          <input
            id="carName"
            type="text"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block " htmlFor="year">
            Year
          </label>
          <input
            id="year"
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 block " htmlFor="role">
            Role
          </label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block  block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => setDate(date)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="border border-b-4 border-r-4 border-black font-bold border-rounded px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            <FontAwesomeIcon icon={faCarSide} className='pr-2'/>
            登録
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="border border-b-4 border-r-4 border-black font-bold border-rounded px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
       >
            キャンセル
          </button>
        </div>
      </form>
      {/* <UpdateWarning /> */}
    </div>
  );
};

export default AddButton;
