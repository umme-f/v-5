import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faker from 'faker';

const UpdateWarning = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Generate a fake notification after 3 seconds
      const newNotification = {
        id: Date.now(),
        message: faker.lorem.sentence(),
      };
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    }, 3000);

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

  const handleNotificationClose = (id) => {
    // Close the notification list
    setNotifications([]);
  };

  return (
    <div>
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Notifications (お知らせ)</h2>
            <button
              onClick={() => handleNotificationClose(notifications[0].id)} // Close the notification
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
                    onClick={() => handleNotificationClick(notif.id, `/vehicle-manager/${index + 1}`)}
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
