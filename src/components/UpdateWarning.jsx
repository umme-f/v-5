import React, { useEffect, useState } from 'react';

const UpdateWarning = () => {
  const [showUpdatePending, setShowUpdatePending] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUpdatePending(true);
    }, 3000); 

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (showUpdatePending && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Update Information', {
            body: '更新が保留中です。',
            requireInteraction: true
          });
        }
      });
    }
  }, [showUpdatePending]);

  // return null; 
};

export default UpdateWarning;
