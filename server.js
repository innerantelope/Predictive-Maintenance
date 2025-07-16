const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'machine-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

// API Routes
app.post('/api/analyses', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { topPrediction, topConfidence, predictions } = req.body;
    
    // For now, just return the analysis data since database integration is complex
    const analysis = {
      id: Date.now(),
      imagePath: `/uploads/${req.file.filename}`,
      topPrediction,
      topConfidence: parseFloat(topConfidence),
      predictions: typeof predictions === 'string' ? predictions : JSON.stringify(predictions),
      createdAt: new Date().toISOString()
    };

    console.log('📊 Machine analysis saved:', analysis);
    res.json(analysis);
  } catch (error) {
    console.error('Error saving analysis:', error);
    res.status(500).json({ error: 'Failed to save analysis' });
  }
});

app.get('/api/analyses', async (req, res) => {
  try {
    // Return empty array for now
    res.json([]);
  } catch (error) {
    console.error('Error fetching analyses:', error);
    res.status(500).json({ error: 'Failed to fetch analyses' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Predictive Maintenance API server running on port ${port}`);
});

module.exports = app;
