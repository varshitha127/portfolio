// server/controllers/analyticsController.js

// Placeholder handlers for analytics routes

const trackPageView = (req, res) => {
  res.status(200).json({ message: 'Page view tracked (placeholder).' });
};

const trackInteraction = (req, res) => {
  res.status(200).json({ message: 'User interaction tracked (placeholder).' });
};

const trackDownload = (req, res) => {
  res.status(200).json({ message: 'Download tracked (placeholder).' });
};

const trackContactSubmission = (req, res) => {
  res.status(200).json({ message: 'Contact submission tracked (placeholder).' });
};

const trackFeedback = (req, res) => {
  res.status(200).json({ message: 'Feedback tracked (placeholder).' });
};

const trackSession = (req, res) => {
  res.status(200).json({ message: 'Session tracked (placeholder).' });
};

const getDashboard = (req, res) => {
  // Return a structure the client expects
  // This is static sample data; replace with real aggregation/stats if available
  const dashboard = {
    totalVisits: 1234,
    pageViews: {
      '/': 350,
      '/about': 210,
      '/skills': 180,
      '/projects': 240,
      '/resume': 120,
      '/contact': 80,
      '/ai': 54
    },
    interactions: [
      { type: 'cta_click', page: '/projects', timestamp: new Date().toISOString() },
      { type: 'page_view', page: '/ai', timestamp: new Date().toISOString() },
      { type: 'download', page: '/resume', timestamp: new Date().toISOString() },
    ],
    downloads: {
      resume: 42
    },
    contactSubmissions: [],
    feedback: []
  };

  res.status(200).json(dashboard);
};

const getInsights = (req, res) => {
  // Return an array of insights objects as expected by the client UI
  const insights = [
    {
      title: 'Rising Interest in Projects',
      description: 'Project page views increased 15% in the last 7 days compared to the prior period.'
    },
    {
      title: 'High Engagement with AI Chat',
      description: 'Users who open the AI Chat spend 2.3x longer on the site on average.'
    },
    {
      title: 'Resume Downloads Trend',
      description: 'Resume downloads peak on weekdays between 10:00 and 13:00 local time.'
    }
  ];

  res.status(200).json(insights);
};

module.exports = {
  trackPageView,
  trackInteraction,
  trackDownload,
  trackContactSubmission,
  trackFeedback,
  trackSession,
  getDashboard,
  getInsights
}; 