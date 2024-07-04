import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';

const CarNotification = ({ notifications, rows, setIsModalVisible }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsModalVisible(true); // Modal is visible initially
    const timer = setInterval(() => {
      setIsVisible(true);
      setIsModalVisible(true);
    }, 100000); // Reappear every 100 seconds

    return () => clearInterval(timer);
  }, [setIsModalVisible]);

  const closeModal = () => {
    setIsVisible(false);
    setIsModalVisible(false);
  };

  const handleNotificationClick = (carID) => {
    const selectedData = rows.find(row => row.carID === carID);
    navigate('/car-details', { state: { car: selectedData } });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white border-4 border-red-500 p-6 rounded shadow-md max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upcoming Updates  <FontAwesomeIcon icon={faBell} className='pl-2 shadow-2xl animate-ping'/></h2>
              <button onClick={closeModal} className='font-bold'>
                <FontAwesomeIcon icon={faTimes} className='font-bold' />
              </button>
            </div>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="mb-2">
                  <button
                    onClick={() => handleNotificationClick(notification.carID)}
                    className="text-blue-500 underline"
                  >
                    {index + 1}. Car {notification.carID}: {notification.date}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CarNotification;
