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
    const newFileName = `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`;
    const newPath = path.join('uploads', newFileName);

    // Rename the file
    fs.rename(file.path, newPath, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
        return res.status(500).json({ error: 'Error renaming file' });
      }

      uploadedFiles.push({
        originalName: newFileName,
        date: new Date().toISOString().split('T')[0], // Default date to current date
      });

      if (uploadedFiles.length === req.files.length) {
        res.status(200).json(uploadedFiles);
      }
    });
  });
});

app.get('/files', (req, res) => {
  res.status(200).json(uploadedFiles);
});

app.post('/delete', async (req, res) => {
  const { files } = req.body;
  try {
    console.log('Files to delete:', files); // Log the files to be deleted
    for (const file of files) {
      const filePath = path.join(__dirname, 'uploads', file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } else {
        console.error(`File not found: ${filePath}`);
        throw new Error(`File not found: ${filePath}`);
      }
    }
    uploadedFiles = uploadedFiles.filter(file => !files.includes(file.originalName));
    res.status(200).json({ message: 'Files deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).send(`Error deleting file: ${error.message}`);
  }
});

app.post('/clear', (req, res) => {
  uploadedFiles = [];
  res.status(200).json({ message: 'Data cleared' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
