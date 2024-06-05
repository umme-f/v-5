// const express = require('express');
// const sql = require('mssql');
// const cors = require('cors'); // Import the cors middleware

// const app = express();

// // Configuration for SQL Server connection
// const config = {
//   user: 'K2023-003\\Ariake',
//   password: 'your_password',
//   server: 'K2023-003\\SQLEXPRESS', // You may need to specify the port here as well, like 'your_server_name,5173'
//   database: 'car-demo',
// };

// // Use the cors middleware to enable CORS
// const corsOptions = {
//     origin: 'http://localhost:5173', // Allow requests from this origin
//     optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
//   };
  
//   app.use(cors(corsOptions));
  

// // API endpoint to fetch data
// app.get('/api/data', cors(corsOptions), async (req, res) => {
//   try {
//     // Connect to the SQL Server
//     await sql.connect(config);

//     // Query to retrieve data from a table (replace 'YourTableName' with your actual table name)
//     const result = await sql.query`SELECT * FROM car_demo`;

//     // Close the connection
//     await sql.close();

//     // Send the retrieved data as a JSON response
//     res.json(result.recordset);
//   } catch (error) {
//     // If an error occurs, send an error response
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Start the server on port 5000
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
