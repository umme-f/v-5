import express from 'express';
import cors from 'cors';
import { connectToSqlServer } from './db.js'; // Ensure the correct path

const app = express();
const PORT = 5000;

app.use(cors());

app.get('http://localhost:5000/api/data', async (req, res) => {
  try {
    const data = await connectToSqlServer();
    if (data.length === 0) {
      res.status(404).json({ message: 'No data found' });
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching data from database' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// http://localhost:5173/api/data