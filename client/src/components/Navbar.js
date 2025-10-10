import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Mic, 
  MicOff, 
  Bot, 
  BarChart3,
  Download,
  Mail
} from 'lucide-react';
import { useVoice } from '../utils/VoiceContext';
import { useAnalytics } from '../utils/AnalyticsContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isListening, toggleListening, isSupported } = useVoice();
  const { trackInteraction } = useAnalytics();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  const aiFeatures = [
    { path: '/ai-chat', label: 'AI Chat', icon: Bot },
    { path: '/resume-analyzer', label: 'Resume Analyzer', icon: Download },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const handleVoiceToggle = () => {
    toggleListening();
    trackInteraction('voice_toggle', { action: isListening ? 'stop' : 'start' });
  };

  const handleNavClick = (item) => {
    trackInteraction('navigation', { page: item.path, label: item.label });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-secondary-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => handleNavClick({ path: '/', label: 'Logo' })}
          >
            <span className="font-display font-bold text-xl gradient-text">
              Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-600'
                    : 'text-secondary-600 hover:text-primary-600'
                }`}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* AI Features & Voice Control */}
          <div className="hidden md:flex items-center space-x-4">
            {/* AI Features Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                <Bot className="w-5 h-5" />
                <span className="font-medium">AI Tools</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {aiFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <Link
                        key={feature.path}
                        to={feature.path}
                        className="flex items-center space-x-2 px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                        onClick={() => handleNavClick(feature)}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{feature.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Voice Control */}
            {isSupported && (
              <button
                onClick={handleVoiceToggle}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isListening
                    ? 'bg-red-100 text-red-600 animate-pulse'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-primary-100 hover:text-primary-600'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice control'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}

            {/* Contact Button */}
            <Link
              to="/contact"
              className="btn-primary flex items-center space-x-2"
              onClick={() => handleNavClick({ path: '/contact', label: 'Contact Button' })}
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-secondary-200"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-100'
                    }`}
                    onClick={() => handleNavClick(item)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* AI Features in Mobile */}
                <div className="border-t border-secondary-200 pt-2 mt-2">
                  <div className="px-4 py-2 text-sm font-medium text-secondary-400">
                    AI Tools
                  </div>
                  {aiFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <Link
                        key={feature.path}
                        to={feature.path}
                        className="flex items-center space-x-2 px-4 py-2 text-secondary-600 hover:bg-secondary-100 transition-colors duration-200"
                        onClick={() => handleNavClick(feature)}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{feature.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Voice Control in Mobile */}
                {isSupported && (
                  <button
                    onClick={handleVoiceToggle}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isListening
                        ? 'bg-red-100 text-red-600'
                        : 'bg-secondary-100 text-secondary-600'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isListening ? 'Stop Listening' : 'Voice Control'}</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 