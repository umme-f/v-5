const express = require('express');
const { ConnectionPool } = require('mssql');

const app = express();

// Database configuration
const config = {
  user: 'K2023-003\\Ariake',
  password: '',
  server: 'K2023-003\\SQLEXPRESS', // or IP address
  database: 'car-demo',
  options: {
    enableArithAbort: true, // enable/disable the arithabort option (default: false)
  },
};

// Initialize the connection pool
const pool = new ConnectionPool(config);

// Endpoint to fetch data from the database
app.get('/api/data', async (req, res) => {
  try {
    // Connect to the database
    await pool.connect();

    // Query the database
    const result = await pool.request().query('SELECT * FROM your_table');

    // Send the query result as the response
    res.json(result.recordset);
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the database connection
    pool.close();
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
