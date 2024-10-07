// app.js or server.js

const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from your frontend (http://localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173',  // Specify the frontend URL
  methods: ['GET', 'POST'],         // Specify allowed methods
  credentials: true,                // Allow credentials (cookies, authorization headers, etc.)
}));

// Your routes go here
app.post('http://192.168.1.171:8000/docs/auth', (req, res) => {
  // Handle authentication logic here
  const { username, password } = req.body;

  // Example validation (replace with real authentication logic)
  if (username === 'pochi@example.com' && password === '123') {
    return res.json({ access_token: '', token_type: 'bearer' });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://192.168.1.171:8000');
});
