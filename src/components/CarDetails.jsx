import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faFloppyDisk,faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CarDetails = () => {
  const location = useLocation();
  const { car } = location.state;
  const [carDetails, setCarDetails] = useState(car);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    // Handle save logic here (e.g., update the car details in the database or state)
    alert('Car details saved!');
    navigate('/vehicle-manager'); // Redirect to the main table view
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSave}>
        <h2 className="text-2xl font-bold mb-6 text-center">Car Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Car ID:</label>
          <input
            type="text"
            name="carName"
            value={carDetails.carID}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Car Name:</label>
          <input
            type="text"
            name="carName"
            value={carDetails.carName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Year:</label>
          <input
            type="text"
            name="year"
            value={carDetails.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
          <input
            type="text"
            name="role"
            value={carDetails.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2"> Date:</label>
          <input
            type="text"
            name="date"
            value={carDetails.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Next Date:</label>
          <input
            type="date"
            name="date"
            value={carDetails.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Upload File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 border border-slate-700"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className='pr-2'/>
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate('/vehicle-manager')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700 border border-slate-700"
          >
            <FontAwesomeIcon icon={faBan} className='pr-2'/>Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarDetails;
