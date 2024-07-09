const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

let uploadedFiles = [];

app.post('/upload', upload.array('files'), (req, res) => {
  req.files.forEach(file => {
    uploadedFiles.push({
      originalName: file.originalname,
      date: new Date().toISOString().split('T')[0], // Default date to current date
    });
  });
  res.status(200).json(uploadedFiles);
});

app.post('/delete', (req, res) => {
  const { files } = req.body;
  try {
    files.forEach(file => {
      const filePath = path.join(__dirname, 'uploads', file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    uploadedFiles = uploadedFiles.filter(file => !files.includes(file.originalName));
    res.status(200).send({ message: 'Files deleted successfully' });
  } catch (error) {
    console.error('Error deleting files:', error);
    res.status(500).send({ message: 'Failed to delete files', error });
  }
});

app.get('/files', (req, res) => {
  res.status(200).json(uploadedFiles);
});

app.post('/clear', (req, res) => {
  uploadedFiles = [];
  res.status(200).json({ message: 'Data cleared' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
