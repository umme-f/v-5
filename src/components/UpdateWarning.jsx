import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import faker from 'faker';

const UpdateWarning = () => {
  const [notifications, setNotifications] = useState(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    return storedNotifications;
  });
  const navigate = useNavigate();
  let notificationInstance = null;

  useEffect(() => {
    // Request permission for notifications
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const timer = setTimeout(() => {
      // Generate a fake notification after 1 second
      const newNotification = {
        id: Date.now(),
        message: faker.lorem.sentence(),
      };
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, newNotification];
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

        // Show the notification
        if (Notification.permission === 'granted') {
          showDesktopNotification(updatedNotifications);
        }

        return updatedNotifications;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const showDesktopNotification = (notificationsList) => {
    const notificationBody = notificationsList.map((notif, index) => `${index + 1}. ${notif.message}`).join('\n');

    if (notificationInstance) {
      notificationInstance.close();
    }

    notificationInstance = new Notification('New Notifications (お知らせ)', {
      body: notificationBody,
    });

    notificationInstance.onclick = () => {
      handleNotificationClick(notificationsList);
      notificationInstance.close();
    };
  };

  const handleNotificationClick = (notificationsList) => {
    // Navigate to the VehicleManagerTableView page
    navigate('/vehicle-manager');
    // Clear all notifications
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  return null; // No need to render anything
};

export default UpdateWarning;
