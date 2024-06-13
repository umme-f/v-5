const webpush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const publicVapidKey = 'YOUR_PUBLIC_VAPID_KEY';
const privateVapidKey = 'YOUR_PRIVATE_VAPID_KEY';

webpush.setVapidDetails('mailto:your-email@example.com', publicVapidKey, privateVapidKey);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    title: 'Upcoming Update',
    body: req.body.message,
    tag: req.body.tag
  };

  const promises = subscriptions.map(subscription => 
    webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
  );

  Promise.all(promises).then(() => res.sendStatus(200));
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
