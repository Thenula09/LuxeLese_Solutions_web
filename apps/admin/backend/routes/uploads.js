const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure multer for memory storage (to get base64)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 10 // Maximum 10 files
  }
});

// Upload single image
router.post('/single', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Convert buffer to base64
    const base64 = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    const base64Image = `data:${mimeType};base64,${base64}`;

    res.json({
      success: true,
      image: base64Image,
      size: req.file.size,
      filename: req.file.originalname
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload multiple images
router.post('/multiple', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No image files provided' });
    }

    const images = req.files.map(file => {
      const base64 = file.buffer.toString('base64');
      const mimeType = file.mimetype;
      return `data:${mimeType};base64,${base64}`;
    });

    res.json({
      success: true,
      images: images,
      count: images.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;