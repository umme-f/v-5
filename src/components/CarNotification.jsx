import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';

const CarNotification = ({ notifications }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(true);
    }, 5000); // Reappear every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white border-4 border-red-500 p-6 rounded shadow-md max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Upcoming Updates  <FontAwesomeIcon icon={faBell} className='pl-2 shadow-2xl animate-ping'/></h2>
              <button onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="mb-2">
                  Car {notification.carID}: {notification.date}
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
