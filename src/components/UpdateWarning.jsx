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

    // Initial check for upcoming dates
    checkUpcomingDates();

    // Set up an interval to check for upcoming dates every 5 minutes
    const intervalId = setInterval(() => {
      checkUpcomingDates();
    }, 300000); // 300000 ms = 5 minutes

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
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
        requireInteraction: true // Notification stays until clicked or closed
      });

      notificationInstance.onclick = () => {
        navigate('./vehicle-manager');
        notificationInstance.close();
      };
    }
  };

  return null; // No need to render anything
};

export default UpdateWarning;
