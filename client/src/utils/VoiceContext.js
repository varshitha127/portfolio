import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceContext = createContext();

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

export const VoiceProvider = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    } catch (error) {
      return false;
    }
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Stop listening
  const stopListening = useCallback(() => {
    setIsListening(false);
    setTranscript('');
  }, []);

  // Show voice help
  const showVoiceHelp = useCallback(() => {
    const helpText = `
      Available voice commands:
      - "Go home" - Navigate to home page
      - "Go to about" - Navigate to about page
      - "Go to skills" - Navigate to skills page
      - "Go to projects" - Navigate to projects page
      - "Go to resume" - Navigate to resume page
      - "Go to contact" - Navigate to contact page
      - "Go to blog" - Navigate to blog page
      - "Open AI chat" - Open AI chatbot
      - "Analyze resume" - Open resume analyzer
      - "Show analytics" - Open analytics dashboard
      - "Scroll up" - Scroll to top
      - "Scroll down" - Scroll to bottom
      - "Stop listening" - Stop voice recognition
      - "Help" - Show this help message
    `;
    
    // You can implement a toast notification or modal here
    console.log(helpText);
  }, []);

  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (!isSupported) return null;

    const voiceCommands = {
      'go home': () => navigate('/'),
      'go to about': () => navigate('/about'),
      'go to skills': () => navigate('/skills'),
      'go to projects': () => navigate('/projects'),
      'go to resume': () => navigate('/resume'),
      'go to contact': () => navigate('/contact'),
      'go to blog': () => navigate('/blog'),
      'open ai chat': () => navigate('/ai-chat'),
      'analyze resume': () => navigate('/resume-analyzer'),
      'show analytics': () => navigate('/analytics'),
      'scroll up': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      'scroll down': () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
      'stop listening': () => stopListening(),
      'help': () => showVoiceHelp()
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    try {
      recognition = new SpeechRecognition();
    } catch (error) {
      console.error('SpeechRecognition constructor error:', error);
      setError('Speech recognition not supported in this browser');
      return null;
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript.toLowerCase();
      setTranscript(transcript);

      // Check for commands
      Object.keys(voiceCommands).forEach(command => {
        if (transcript.includes(command)) {
          voiceCommands[command]();
        }
      });
    };

    recognition.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  }, [isSupported, navigate, stopListening, showVoiceHelp]);

  // Start listening
  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    const recognition = initializeSpeechRecognition();
    if (recognition) {
      try {
        recognition.start();
      } catch (error) {
        setError('Failed to start speech recognition');
      }
    }
  }, [isSupported, initializeSpeechRecognition]);

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const value = {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    toggleListening,
    showVoiceHelp
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
}; 