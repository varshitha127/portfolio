import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  Code,
  Palette,
  Database
} from 'lucide-react';
import { useAnalytics } from '../utils/AnalyticsContext';

const featuredProjects = [
  {
    title: 'DSAlytics',
    description: 'A MERN-stack platform to practice and visualize DSA with a built-in code editor, analytics dashboard, and AI chatbot assistant.'
  },
  {
    title: 'Drug Traceability using Blockchain',
    description: 'A decentralized Ethereum-based solution that ensures transparent and tamper-proof tracking of pharmaceutical drugs in the supply chain.'
  },
  {
    title: 'AI-Based Video Recommendation System',
    description: 'A deep learning-powered engine that recommends motivational video content based on user mood and engagement patterns.'
  },
  {
    title: 'Advanced Paint App',
    description: 'A feature-rich Python desktop app using Tkinter, offering brush options, color picker, canvas save, and undo/redo functionalities.'
  },
  {
    title: 'iAccelerate Hackathon Project',
    description: 'A full-stack innovation built during the iAccelerate hackathon, focused on solving social problems using AI tools and Firebase.'
  },
  {
    title: 'Blood Bank Management System',
    description: 'A web application to manage blood donor records, requests, and inventory across hospitals using simple frontend tech.'
  },
  {
    title: 'OIBSIP Projects',
    description: 'Includes Python-based mini tools like a voice assistant, BMI calculator, and weather app built during internship.'
  }
];

const Home = () => {
  const { trackInteraction } = useAnalytics();

  useEffect(() => {
    trackInteraction('page_view', { page: 'home' });
  }, [trackInteraction]);

  const skills = [
    { name: 'React.js', icon: Code, level: 90 },
    { name: 'Node.js', icon: Code, level: 85 },
    { name: 'Python', icon: Code, level: 80 },
    { name: 'AI/ML', icon: Sparkles, level: 75 },
    { name: 'UI/UX', icon: Palette, level: 70 },
    { name: 'Database', icon: Database, level: 85 }
  ];

  return (
    <>
      <Helmet>
        <title>Lakkireddy Varshitha - Full Stack Developer | AI & Blockchain Enthusiast</title>
        <meta name="description" content="Portfolio of Lakkireddy Varshitha, Full Stack Developer, AI & Blockchain Enthusiast. Projects, education, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        <div className="container-custom section-padding relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0"
            >
              <img
                src={process.env.PUBLIC_URL + '/varsh_image.jpg'}
                alt="Lakkireddy Varshitha"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-primary-200 shadow-lg"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center md:text-left max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                Lakkireddy Varshitha
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-primary-600 mb-6">
                Full Stack Developer | AI & Blockchain Enthusiast
              </h2>
              <p className="text-lg md:text-xl text-secondary-600 mb-6">
                I’m a passionate and versatile developer with hands-on experience in full-stack web development, artificial intelligence, and blockchain technology. With a strong academic foundation in Computer Science and Engineering (AI & ML) from St. Martin's Engineering College, I’ve built multiple real-world projects ranging from DSA platforms and video recommendation engines to blockchain-based drug traceability systems. I'm actively exploring open source, hackathons, and internships to solve real-world problems with scalable, smart, and secure solutions.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start mb-4">
                <Link
                  to="/projects"
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                  onClick={() => trackInteraction('cta_click', { type: 'view_projects' })}
                >
                  <span>View Projects</span>
                  <ExternalLink className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
                  onClick={() => trackInteraction('cta_click', { type: 'contact' })}
                >
                  <span>Contact Me</span>
                  <Mail className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex justify-center md:justify-start space-x-6 mt-4">
                {[
                  { icon: Github, href: 'https://github.com/varshitha127', label: 'GitHub' },
                  { icon: Linkedin, href: 'http://www.linkedin.com/in/varshithareddy-lakkireddy-1b1326290', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:lakkireddyvarshithareddy@gmail.com', label: 'Email' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-secondary-600 hover:text-primary-600"
                    onClick={() => trackInteraction('social_click', { platform: social.label.toLowerCase() })}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              A selection of my favorite and most impactful projects.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-6 hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-primary-700 mb-2">{project.title}</h3>
                <p className="text-secondary-600 mb-4">{project.description}</p>
                <Link
                  to="/projects"
                  className="text-primary-600 hover:underline font-medium flex items-center gap-1"
                  onClick={() => trackInteraction('cta_click', { type: 'view_projects' })}
                >
                  View All Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <skill.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-600">{skill.name}</h3>
                    <p className="text-sm text-secondary-600">{skill.level}% proficiency</p>
                  </div>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/skills"
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto w-fit"
              onClick={() => trackInteraction('cta_click', { type: 'view_skills' })}
            >
              <span>View All Skills</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Connect?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Let's discuss opportunities, collaborate on projects, or just have a chat about technology and AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-600 hover:bg-secondary-50 font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                onClick={() => trackInteraction('cta_click', { type: 'contact' })}
              >
                <Mail className="w-5 h-5" />
                <span>Get in Touch</span>
              </Link>
              <a
                href="/resume_N1.pdf"
                download
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home; 