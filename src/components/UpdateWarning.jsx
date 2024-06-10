import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faker from 'faker';

const UpdateWarning = () => {
  const [notifications, setNotifications] = useState(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    return storedNotifications;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Generate a fake notification after 1 second
      const newNotification = {
        id: Date.now(),
        message: faker.lorem.sentence(),
      };
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, newNotification];
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        return updatedNotifications;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleNotificationClick = (id, link) => {
    // Remove the notification from the list
    setNotifications(notifications.filter((notif) => notif.id !== id));
    // Navigate to the VehicleManagerTableView page
    navigate(link);
  };

  const handleNotificationClose = () => {
    // Remove the notification from the list and clear storage
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  return (
    <div>
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded ">
          <div className="flex justify-between items-center mb-2">
            <FontAwesomeIcon icon={faBell} className='animate-ping text-red-500 p-2'/>
            <h2 className="text-xl font-bold p-1">Notifications (お知らせ)</h2>
            <button
              onClick={handleNotificationClose}
              className="text-red-600 hover:text-red-800"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <ul>
            {notifications.map((notif, index) => (
              <li key={notif.id} className="mb-2">
                <div className="flex justify-between items-center">
                  <span>{index + 1}. </span>
                  <a
                    href="#"
                    onClick={() => handleNotificationClick(notif.id, `/vehicle-manager/`)}
                    className="underline text-blue-600 hover:text-blue-800 flex-grow"
                  >
                    {notif.message}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UpdateWarning;
