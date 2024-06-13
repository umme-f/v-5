import React, { useState } from 'react';

const SubscribeButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY'
    });

    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setIsSubscribed(true);
  };

  return (
    <button onClick={subscribe} disabled={isSubscribed}>
      {isSubscribed ? 'Subscribed' : 'Subscribe to Notifications'}
    </button>
  );
};

export default SubscribeButton;
