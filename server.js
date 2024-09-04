const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const metadataFilePath = path.join(__dirname, 'fileMetadata.json');

// Read existing metadata from JSON file or initialize empty array
let fileMetadata = [];
if (fs.existsSync(metadataFilePath)) {
  const rawData = fs.readFileSync(metadataFilePath);
  fileMetadata = JSON.parse(rawData);
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// API route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  const { filename, size, path: filepath } = req.file;
  const uploadTime = new Date().toISOString();

  const fileEntry = {
    id: Date.now(),
    filename,
    size,
    filepath,
    uploadTime,
  };

  fileMetadata.push(fileEntry);

  // Save updated metadata to JSON file
  fs.writeFileSync(metadataFilePath, JSON.stringify(fileMetadata, null, 2));

  res.status(201).json(fileEntry);
});

// API route to fetch all files metadata
app.get('/files', (req, res) => {
  res.status(200).json(fileMetadata);
});

// API route to download a file
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const file = fileMetadata.find(f => f.filename === filename);
  if (file) {
    res.download(path.join(__dirname, file.filepath));
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// Serve files statically from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
