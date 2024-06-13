import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from './data.json'; // Import your JSON data

const UpdateWarning = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Request permission for notifications
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // Check for upcoming dates
    checkUpcomingDates();
  }, []);

  const checkUpcomingDates = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const upcomingNotifications = data.filter(row => {
      const rowDate = new Date(row.date);
      return rowDate > today && rowDate < nextMonth;
    });

    setNotifications(upcomingNotifications);
    if (upcomingNotifications.length > 0) {
      showDesktopNotification(upcomingNotifications.length);
    }
  };

  const showDesktopNotification = (count) => {
    if (Notification.permission === 'granted') {
      const notificationInstance = new Notification('Upcoming Updates', {
        body: `There are ${count} updates coming in the next month. Click to view details.`,
      });

      notificationInstance.onclick = () => {
        navigate('/vehicle-manager');
        notificationInstance.close();
      };
    }
  };

  return null; // No need to render anything
};

export default UpdateWarning;
