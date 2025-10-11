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
  const hasBackend = Boolean(process.env.REACT_APP_ANALYTICS_ENDPOINT);
  const api = axios.create({ baseURL: process.env.REACT_APP_ANALYTICS_ENDPOINT || '' });

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

      // Only send to backend if a backend is configured or running locally in development
      if (hasBackend || process.env.NODE_ENV === 'development') {
        await api.post('/api/analytics/page-view', pageData);
      }

      setAnalytics(prev => ({
        ...prev,
        pageViews: {
          ...prev.pageViews,
          [page]: (prev.pageViews[page] || 0) + 1
        },
        totalVisits: prev.totalVisits + 1
      }));
    } catch (error) {
      // Silently handle analytics errors in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track page view:', error);
      }
    }
  }, [hasBackend, api]);

  // Track user interaction
  const trackInteraction = useCallback(async (type, details) => {

    try {
      const interactionData = {
        type,
        details,
        timestamp: new Date(),
        page: location.pathname
      };

      if (hasBackend || process.env.NODE_ENV === 'development') {
        await api.post('/api/analytics/interaction', interactionData);
      }

      setAnalytics(prev => ({
        ...prev,
        interactions: [...prev.interactions, interactionData]
      }));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track interaction:', error);
      }
    }
  }, [location.pathname, hasBackend, api]);

  // Track download
  const trackDownload = useCallback(async (fileType, fileName) => {

    try {
      const downloadData = {
        fileType,
        fileName,
        timestamp: new Date(),
        page: location.pathname
      };

      if (hasBackend || process.env.NODE_ENV === 'development') {
        await api.post('/api/analytics/download', downloadData);
      }

      setAnalytics(prev => ({
        ...prev,
        downloads: {
          ...prev.downloads,
          [fileType]: (prev.downloads[fileType] || 0) + 1
        }
      }));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track download:', error);
      }
    }
  }, [location.pathname, hasBackend, api]);

  // Track contact form submission
  const trackContactSubmission = useCallback(async (contactData) => {

    try {
      const submissionData = {
        ...contactData,
        timestamp: new Date(),
        page: location.pathname
      };

      if (hasBackend || process.env.NODE_ENV === 'development') {
        await api.post('/api/analytics/contact', submissionData);
      }

      setAnalytics(prev => ({
        ...prev,
        contactSubmissions: [...prev.contactSubmissions, submissionData]
      }));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track contact submission:', error);
      }
    }
  }, [location.pathname, hasBackend, api]);

  // Track feedback
  const trackFeedback = useCallback(async (feedbackData) => {

    try {
      const feedback = {
        ...feedbackData,
        timestamp: new Date(),
        page: location.pathname
      };

      if (hasBackend || process.env.NODE_ENV === 'development') {
        await api.post('/api/analytics/feedback', feedback);
      }

      setAnalytics(prev => ({
        ...prev,
        feedback: [...prev.feedback, feedback]
      }));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to track feedback:', error);
      }
    }
  }, [location.pathname, hasBackend, api]);

  // Get analytics data
  const getAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!(hasBackend || process.env.NODE_ENV === 'development')) {
        return analytics;
      }
      const response = await api.get('/api/analytics/dashboard');
      setAnalytics(response.data);
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to get analytics data:', error);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [hasBackend, api, analytics]);

  // Get analytics insights
  const getAnalyticsInsights = useCallback(async () => {
    try {
      if (!(hasBackend || process.env.NODE_ENV === 'development')) {
        return {};
      }
      const response = await api.get('/api/analytics/insights');
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to get analytics insights:', error);
      }
      throw error;
    }
  }, [hasBackend, api]);

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

    if (hasBackend || process.env.NODE_ENV === 'development') {
      api.post('/api/analytics/session', sessionData).catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to track session:', error);
        }
      });
    }
  }, [hasBackend, api]);

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