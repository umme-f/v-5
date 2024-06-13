self.addEventListener('push', event => {
    let data;
    if (event.data) {
      data = event.data.json();
    } else {
      data = { title: 'New Notification', body: 'You have a new notification.' };
    }
  
    const options = {
      body: data.body,
      icon: 'icon.png', // Optional, ensure the icon path is correct if provided
      tag: data.tag,
      requireInteraction: true // Notification stays until clicked or closed
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        for (const client of clientList) {
          if (client.url.includes('/vehicle-manager') && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/vehicle-manager');
        }
      })
    );
  });
  