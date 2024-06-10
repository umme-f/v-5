import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import UpdateWarning from './UpdateWarning';


const EditButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carID: '',
    carName: '',
    year: '',
    role: ''
  });

  useEffect(() => {
    if (location.state && location.state.selectedData) {
      setFormData(location.state.selectedData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    navigate('/vehicle-manager'); // Navigate back to the main page after submission
  };

  const handleCancel = () => {
    navigate('/vehicle-manager');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Car</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 a" htmlFor="carID">
            Car ID
          </label>
          <input
            id="carID"
            type="text"
            name="carID"
            value={formData.carID}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            // readOnly----Add it when want to make it a read only field
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 a" htmlFor="carName">
            Car Name
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 a" htmlFor="year">
            Year
          </label>
          <input
            id="year"
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 a" htmlFor="role">
            Role
          </label>
          <input
            id="role"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className='pr-2' />
            登録
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            キャンセル
          </button>
        </div>
      </form>
      <UpdateWarning />
    </div>
  );
};

export default EditButton;
