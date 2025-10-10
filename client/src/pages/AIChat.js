import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Send, 
  Bot, 
  User, 
  Trash2, 
  Sparkles,
  Loader2,
  MessageCircle,
  Brain,
  Code,
  Briefcase
} from 'lucide-react';
import { useAI } from '../utils/AIContext';
import { useAnalytics } from '../utils/AnalyticsContext';
import { toast } from 'react-toastify';

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { 
    chatHistory, 
    sendMessage, 
    isLoading, 
    clearChat 
  } = useAI();
  const { trackInteraction } = useAnalytics();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    trackInteraction('page_view', { page: 'ai_chat' });
  }, [trackInteraction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsTyping(true);

    try {
      trackInteraction('chat_message', { message: userMessage });
      await sendMessage(userMessage);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    clearChat();
    trackInteraction('chat_clear', {});
    toast.info('Chat history cleared');
  };

  const suggestedQuestions = [
    "Tell me about your background and experience",
    "What are your strongest technical skills?",
    "Show me your recent projects",
    "What technologies do you work with?",
    "How do you approach problem-solving?",
    "What are your career goals?",
    "Tell me about your AI/ML experience",
    "What makes you unique as a developer?"
  ];

  const handleSuggestedQuestion = (question) => {
    setMessage(question);
    trackInteraction('suggested_question', { question });
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-secondary-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br />');
  };

  return (
    <>
      <Helmet>
        <title>AI Chat - Talk to My Portfolio</title>
        <meta name="description" content="Chat with an AI assistant trained on my portfolio data. Ask about my skills, projects, and experience." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom section-padding">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
                AI Portfolio Assistant
              </h1>
            </div>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              I'm an AI assistant trained on my portfolio data. Ask me anything about my skills, 
              projects, experience, or background!
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Chat Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Portfolio AI Assistant</h2>
                      <p className="text-primary-100 text-sm">
                        {isLoading ? 'Thinking...' : 'Online and ready to help'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleClearChat}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    title="Clear chat history"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-secondary-600 mb-6">
                      Ask me about my skills, projects, experience, or anything else!
                    </p>
                    
                    {/* Suggested Questions */}
                    <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                      {suggestedQuestions.map((question, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="text-left p-3 bg-secondary-50 hover:bg-primary-50 border border-secondary-200 rounded-lg transition-all duration-200 hover:border-primary-300"
                        >
                          <p className="text-sm text-secondary-600">{question}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <AnimatePresence>
                    {chatHistory.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.type === 'user' 
                              ? 'bg-primary-600' 
                              : 'bg-gradient-to-r from-primary-600 to-accent-600'
                          }`}>
                            {msg.type === 'user' ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className={`rounded-2xl px-4 py-3 ${
                            msg.type === 'user'
                              ? 'bg-primary-600 text-white'
                              : 'bg-secondary-100 text-secondary-600'
                          }`}>
                            <div 
                              className="prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ 
                                __html: formatMessage(msg.content) 
                              }}
                            />
                            <p className={`text-xs mt-2 ${
                              msg.type === 'user' ? 'text-primary-100' : 'text-secondary-400'
                            }`}>
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-secondary-100 rounded-2xl px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-secondary-600" />
                          <span className="text-sm text-secondary-600">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-secondary-200 p-6">
                <form onSubmit={handleSubmit} className="flex space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask me about my skills, projects, or experience..."
                      className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                      disabled={isLoading}
                    />
                    {message && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Sparkles className="w-4 h-4 text-primary-500" />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={!message.trim() || isLoading}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Features Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: Brain,
                  title: 'AI-Powered',
                  description: 'Trained on my portfolio data for accurate responses'
                },
                {
                  icon: Code,
                  title: 'Technical Expertise',
                  description: 'Ask about my programming skills and technologies'
                },
                {
                  icon: Briefcase,
                  title: 'Professional Experience',
                  description: 'Learn about my work history and achievements'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg border border-secondary-200">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-secondary-600 mb-2">{feature.title}</h3>
                  <p className="text-sm text-secondary-600">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat; 