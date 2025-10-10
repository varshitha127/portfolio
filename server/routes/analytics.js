const express = require('express');
const analyticsController = require('../controllers/analyticsController');

const router = express.Router();

// Track page view
router.post('/page-view', analyticsController.trackPageView);

// Track user interaction
router.post('/interaction', analyticsController.trackInteraction);

// Track download
router.post('/download', analyticsController.trackDownload);

// Track contact submission
router.post('/contact', analyticsController.trackContactSubmission);

// Track feedback
router.post('/feedback', analyticsController.trackFeedback);

// Track session
router.post('/session', analyticsController.trackSession);

// Get analytics dashboard data
router.get('/dashboard', analyticsController.getDashboard);

// Get analytics insights
router.get('/insights', analyticsController.getInsights);

module.exports = router; 