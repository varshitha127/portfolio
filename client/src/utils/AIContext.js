import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const AIContext = createContext();

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [projectRecommendations, setProjectRecommendations] = useState([]);

  // AI Chatbot
  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/ai/chat', {
        message,
        history: chatHistory
      });
      
      const newMessage = {
        id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date()
      };
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.data.response,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, newMessage, aiResponse]);
      return aiResponse;
    } catch (error) {
      console.error('AI Chat error:', error);
      throw new Error('Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  }, [chatHistory]);

  // Resume Analysis
  const analyzeResume = useCallback(async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await axios.post('/api/ai/analyze-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setResumeAnalysis(response.data);
      return response.data;
    } catch (error) {
      console.error('Resume analysis error:', error);
      throw new Error('Failed to analyze resume');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Project Recommendations
  const getProjectRecommendations = useCallback(async (interests, skills) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/ai/recommend-projects', {
        interests,
        skills
      });
      
      setProjectRecommendations(response.data.recommendations);
      return response.data.recommendations;
    } catch (error) {
      console.error('Project recommendations error:', error);
      throw new Error('Failed to get project recommendations');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Feedback Analysis
  const analyzeFeedback = useCallback(async (feedback) => {
    try {
      const response = await axios.post('/api/ai/analyze-feedback', {
        feedback
      });
      
      return response.data;
    } catch (error) {
      console.error('Feedback analysis error:', error);
      throw new Error('Failed to analyze feedback');
    }
  }, []);

  // Clear chat history
  const clearChat = useCallback(() => {
    setChatHistory([]);
  }, []);

  // Clear resume analysis
  const clearResumeAnalysis = useCallback(() => {
    setResumeAnalysis(null);
  }, []);

  const value = {
    isLoading,
    chatHistory,
    resumeAnalysis,
    projectRecommendations,
    sendMessage,
    analyzeResume,
    getProjectRecommendations,
    analyzeFeedback,
    clearChat,
    clearResumeAnalysis
  };

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  );
}; 