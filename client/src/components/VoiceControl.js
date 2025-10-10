import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X } from 'lucide-react';
import { useVoice } from '../utils/VoiceContext';

const VoiceControl = () => {
  const { 
    isListening, 
    transcript, 
    isSupported, 
    error, 
    toggleListening,
    stopListening 
  } = useVoice();

  if (!isSupported) return null;

  return (
    <>
      {/* Floating Voice Control Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          onClick={toggleListening}
          className={`relative p-4 rounded-full shadow-lg transition-all duration-300 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-110'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice control'}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          
          {/* Pulse animation when listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </button>
      </motion.div>

      {/* Voice Transcript Panel */}
      <AnimatePresence>
        {(isListening || transcript) && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 w-80 max-w-sm"
          >
            <div className="bg-white rounded-xl shadow-xl border border-secondary-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
                  <span className="font-medium">
                    {isListening ? 'Listening...' : 'Voice Control'}
                  </span>
                </div>
                <button
                  onClick={stopListening}
                  className="p-1 hover:bg-white/20 rounded transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {error && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {transcript && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-secondary-600">Transcript:</p>
                    <p className="text-secondary-600 bg-secondary-50 p-3 rounded-lg text-sm">
                      "{transcript}"
                    </p>
                  </div>
                )}

                {isListening && !transcript && (
                  <div className="flex items-center space-x-2 text-secondary-600">
                    <div className="loading-dots">Listening</div>
                  </div>
                )}

                {/* Voice Commands Help */}
                <div className="mt-4 pt-4 border-t border-secondary-200">
                  <p className="text-xs text-secondary-400 mb-2">Try saying:</p>
                  <div className="space-y-1">
                    {[
                      '"Go home"',
                      '"Go to projects"',
                      '"Scroll up"',
                      '"Stop listening"'
                    ].map((command, index) => (
                      <p key={index} className="text-xs text-secondary-600 bg-secondary-50 px-2 py-1 rounded">
                        {command}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Status Indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-6 z-40"
          >
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">Voice Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceControl; 