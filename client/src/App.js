import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AnalyticsProvider } from './utils/AnalyticsContext';
import { VoiceProvider } from './utils/VoiceContext';
import { AIProvider } from './utils/AIContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VoiceControl from './components/VoiceControl';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AIChat from './pages/AIChat';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Analytics from './pages/Analytics';
import About from './pages/About';

function App() {
  return (
    <Router>
      <AnalyticsProvider>
        <VoiceProvider>
          <AIProvider>
            <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
              <Navbar />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/ai-chat" element={<AIChat />} />
                  <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </main>
              <Footer />
              <VoiceControl />
            </div>
            
            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </AIProvider>
        </VoiceProvider>
      </AnalyticsProvider>
    </Router>
  );
}

export default App; 