const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

let uploadedFiles = [];

// Function to load existing files from the uploads directory
const loadExistingFiles = () => {
  const files = fs.readdirSync('uploads');
  uploadedFiles = files.map(file => ({
    originalName: file,
    date: new Date().toISOString().split('T')[0], // Default date to current date
  }));
};

// Load existing files on server start
loadExistingFiles();

app.post('/upload', upload.array('files'), (req, res) => {
  req.files.forEach(file => {
    uploadedFiles.push({
      originalName: file.originalname,
      date: new Date().toISOString().split('T')[0], // Default date to current date
    });
  });
  res.status(200).json(uploadedFiles);
});

app.get('/files', (req, res) => {
  res.status(200).json(uploadedFiles);
});

app.post('/delete', async (req, res) => {
  const { files } = req.body;
  try {
    files.forEach(file => {
      fs.unlinkSync(path.join('uploads', file));
      uploadedFiles = uploadedFiles.filter(f => f.originalName !== file);
    });
    res.status(200).send({ message: 'Files deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete files', error });
  }
});

app.post('/clear', (req, res) => {
  uploadedFiles = [];
  res.status(200).json({ message: 'Data cleared' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
