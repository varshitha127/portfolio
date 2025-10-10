import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  MessageSquare,
  User,
  FileText,
  Loader2,
  Sparkles
} from 'lucide-react';
import { useAnalytics } from '../utils/AnalyticsContext';
import { useAI } from '../utils/AIContext';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const { trackInteraction, trackContactSubmission } = useAnalytics();
  const { analyzeFeedback } = useAI();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track contact submission
      await trackContactSubmission(formData);
      
      // Analyze feedback with AI
      const feedbackAnalysis = await analyzeFeedback(formData.message);
      setFeedback(feedbackAnalysis.analysis);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFeedback(null);
      
      trackInteraction('contact_success', { subject: formData.subject });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      trackInteraction('contact_error', { error: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'lakkireddyvarshithareddy@gmail.com',
      href: 'mailto:lakkireddyvarshithareddy@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 9703881073',
      href: 'tel:+919703881073'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'kompally, hyderabad, telangana, india',
      href: '#'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'http://www.linkedin.com/in/varshithareddy-lakkireddy-1b1326290' },
    { name: 'GitHub', href: 'https://github.com/varshitha127' },
    { name: 'Leetcode', href: 'https://leetcode.com/u/varshithareddy876/' }
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Get in Touch</title>
        <meta name="description" content="Get in touch with me for collaborations, opportunities, or just to say hello. I'd love to hear from you! Thank you for visiting my website." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom section-padding">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
                Get in Touch
              </h1>
            </div>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and AI.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <MessageSquare className="w-6 h-6 text-primary-600" />
                    <h2 className="text-2xl font-bold text-secondary-600">Send a Message</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-secondary-600 mb-2">
                          Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-200" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                            placeholder="Your name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-600 mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-200" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-600 mb-2">
                        Subject *
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-200" />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                          placeholder="What's this about?"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-600 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                        placeholder="Tell me more about your project, opportunity, or just say hello!"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* AI Feedback Analysis */}
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-200"
                    >
                      <div className="flex items-center space-x-2 mb-3">
                        <Sparkles className="w-5 h-5 text-primary-600" />
                        <h3 className="font-semibold text-primary-800">AI Feedback Analysis</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-secondary-600">
                          <strong>Sentiment:</strong> {feedback.sentiment}
                        </p>
                        <p className="text-sm text-secondary-600">
                          <strong>Summary:</strong> {feedback.summary}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Contact Info Cards */}
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-lg border border-secondary-200 hover:shadow-xl transition-all duration-300 group"
                      onClick={() => trackInteraction('contact_info_click', { type: info.title })}
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                        <info.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary-600">{info.title}</h3>
                        <p className="text-secondary-600">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-white rounded-xl shadow-lg border border-secondary-200 p-6"
                >
                  <h3 className="text-xl font-semibold text-secondary-600 mb-4">Connect With Me</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-secondary-100 rounded-lg hover:bg-primary-100 transition-all duration-200 hover:scale-110"
                        onClick={() => trackInteraction('social_click', { platform: social.name })}
                      >
                        <span className="text-secondary-600 hover:text-primary-600 font-medium">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Response Time */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold text-green-800">Quick Response</h3>
                  </div>
                  <p className="text-green-700">
                    I typically respond to messages within 24 hours. For urgent matters, 
                    feel free to reach out through any of the contact methods above.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact; 