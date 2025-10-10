const express = require('express');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const aiController = require('../controllers/aiController');
const validate = require('../middleware/validate');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// AI Chat endpoint
router.post('/chat', [
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  body('history')
    .optional()
    .isArray()
    .withMessage('History must be an array')
], validate, aiController.chat);

// Resume analysis endpoint
router.post('/analyze-resume', 
  upload.single('resume'),
  aiController.analyzeResume
);

// Project recommendations endpoint
router.post('/recommend-projects', [
  body('interests')
    .isArray({ min: 1 })
    .withMessage('At least one interest is required'),
  body('skills')
    .isArray({ min: 1 })
    .withMessage('At least one skill is required')
], validate, aiController.recommendProjects);

// Feedback analysis endpoint
router.post('/analyze-feedback', [
  body('feedback')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Feedback must be between 1 and 2000 characters')
], validate, aiController.analyzeFeedback);

// Get AI capabilities
router.get('/capabilities', aiController.getCapabilities);

module.exports = router; 