import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  const [analytics, setAnalytics] = useState({
    pageViews: {},
    interactions: [],
    downloads: {},
    contactSubmissions: [],
    feedback: [],
    sessionStart: new Date(),
    totalVisits: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Track page view
  const trackPageView = useCallback(async (page) => {
    try {
      const pageData = {
        page,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        // eslint-disable-next-line no-restricted-globals
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language
      };

      await axios.post('/api/analytics/page-view', pageData);
      
      setAnalytics(prev => ({
        ...prev,
        pageViews: {
          ...prev.pageViews,
          [page]: (prev.pageViews[page] || 0) + 1
        },
        totalVisits: prev.totalVisits + 1
      }));
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, []);

  // Track user interaction
  const trackInteraction = useCallback(async (type, details) => {
    try {
      const interactionData = {
        type,
        details,
        timestamp: new Date(),
        page: location.pathname
      };

      await axios.post('/api/analytics/interaction', interactionData);
      
      setAnalytics(prev => ({
        ...prev,
        interactions: [...prev.interactions, interactionData]
      }));
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }
  }, [location.pathname]);

  // Track download
  const trackDownload = useCallback(async (fileType, fileName) => {
    try {
      const downloadData = {
        fileType,
        fileName,
        timestamp: new Date(),
        page: location.pathname
      };

      await axios.post('/api/analytics/download', downloadData);
      
      setAnalytics(prev => ({
        ...prev,
        downloads: {
          ...prev.downloads,
          [fileType]: (prev.downloads[fileType] || 0) + 1
        }
      }));
    } catch (error) {
      console.error('Failed to track download:', error);
    }
  }, [location.pathname]);

  // Track contact form submission
  const trackContactSubmission = useCallback(async (contactData) => {
    try {
      const submissionData = {
        ...contactData,
        timestamp: new Date(),
        page: location.pathname
      };

      await axios.post('/api/analytics/contact', submissionData);
      
      setAnalytics(prev => ({
        ...prev,
        contactSubmissions: [...prev.contactSubmissions, submissionData]
      }));
    } catch (error) {
      console.error('Failed to track contact submission:', error);
    }
  }, [location.pathname]);

  // Track feedback
  const trackFeedback = useCallback(async (feedbackData) => {
    try {
      const feedback = {
        ...feedbackData,
        timestamp: new Date(),
        page: location.pathname
      };

      await axios.post('/api/analytics/feedback', feedback);
      
      setAnalytics(prev => ({
        ...prev,
        feedback: [...prev.feedback, feedback]
      }));
    } catch (error) {
      console.error('Failed to track feedback:', error);
    }
  }, [location.pathname]);

  // Get analytics data
  const getAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/analytics/dashboard');
      setAnalytics(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get analytics data:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get analytics insights
  const getAnalyticsInsights = useCallback(async () => {
    try {
      const response = await axios.get('/api/analytics/insights');
      return response.data;
    } catch (error) {
      console.error('Failed to get analytics insights:', error);
      throw error;
    }
  }, []);

  // Track page view on route change
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname, trackPageView]);

  // Track session start
  useEffect(() => {
    const sessionData = {
      sessionStart: new Date(),
      userAgent: navigator.userAgent,
      // eslint-disable-next-line no-restricted-globals
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language
    };

    axios.post('/api/analytics/session', sessionData).catch(error => {
      console.error('Failed to track session:', error);
    });
  }, []);

  const value = {
    analytics,
    isLoading,
    trackPageView,
    trackInteraction,
    trackDownload,
    trackContactSubmission,
    trackFeedback,
    getAnalyticsData,
    getAnalyticsInsights
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}; 