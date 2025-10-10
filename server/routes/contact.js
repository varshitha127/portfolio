const express = require('express');
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');
const validate = require('../middleware/validate');

const router = express.Router();

// Contact form submission
router.post('/submit', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
], validate, contactController.submitContact);

// Get contact submissions (admin only)
router.get('/submissions', contactController.getSubmissions);

module.exports = router; 