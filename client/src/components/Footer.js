import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Heart,
  ArrowUp,
  Code // Added Code icon for LeetCode
} from 'lucide-react';
import { useAnalytics } from '../utils/AnalyticsContext';

const Footer = () => {
  const { trackInteraction } = useAnalytics();

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/varshitha127',
      color: 'hover:text-gray-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'http://www.linkedin.com/in/varshithareddy-lakkireddy-1b1326290',
      color: 'hover:text-blue-600'
    },
    {
      name: 'LeetCode',
      icon: Code, // Use Code icon for LeetCode
      href: 'https://leetcode.com/u/varshithareddy876/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:lakkireddyvarshithareddy@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  const handleSocialClick = (platform) => {
    trackInteraction('footer_social_click', { platform });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackInteraction('footer_scroll_top', {});
  };

  return (
    <footer className="bg-secondary-600 text-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600"></div>
      </div>

      <div className="container-custom section-padding relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
      
                </div>
                <span className="font-display font-bold text-xl gradient-text">
                  Portfolio
                </span>
              </div>
              <p className="text-secondary-400 mb-6 max-w-md">
                An advanced AI-powered portfolio showcasing skills, projects, and experience. 
                Built with modern technologies and cutting-edge AI features.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-secondary-600 rounded-lg transition-all duration-300 hover:scale-110 ${social.color}`}
                    onClick={() => handleSocialClick(social.name.toLowerCase())}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Projects', href: '/projects' },
                { name: 'Skills', href: '/skills' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-400 hover:text-white transition-colors duration-200"
                    onClick={() => trackInteraction('footer_link_click', { page: link.name })}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AI Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">AI Features</h3>
            <ul className="space-y-2">
              {[
                { name: 'AI Chat', href: '/ai-chat' },
                { name: 'Resume Analyzer', href: '/resume-analyzer' },
                { name: 'Project Recommender', href: '/projects' },
                { name: 'Analytics', href: '/analytics' }
              ].map((feature) => (
                <li key={feature.name}>
                  <a
                    href={feature.href}
                    className="text-secondary-400 hover:text-white transition-colors duration-200"
                    onClick={() => trackInteraction('footer_ai_feature_click', { feature: feature.name })}
                  >
                    {feature.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-secondary-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-2 text-secondary-200 mb-4 md:mb-0">
            <span>© {currentYear} Varshitha Reddy</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>All rights reserved </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="/privacy"
              className="text-secondary-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-secondary-400 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        onClick={handleScrollToTop}
        className="fixed bottom-6 left-6 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 hover:scale-110 z-40"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer; 