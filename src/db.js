// user: 'K2023-003\\Ariake',
//   password: '',
//   server: 'K2023-003\\SQLEXPRESS',
//   database: 'car_demo',

import sql from 'mssql';

// Database configuration
const config = {
  user: 'K2023-003\\Ariake',
  password: '',
  server: 'K2023-003\\SQLEXPRESS',
  database: 'car_demo',
  options: {
    encrypt: true, // For Azure SQL, you need encryption
    trustServerCertificate: true // Change to false for production
  },
  connectionTimeout: 30000 // Increase connection timeout to 30 seconds
};

export const connectToSqlServer = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');

    const request = new sql.Request();
    const result = await request.query('SELECT * car_demo'); // Replace 'your_table' with your actual table name
    console.log(result.recordset); // Log the data
    return result.recordset;
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
};
