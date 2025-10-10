import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  ExternalLink, 
  Github, 
  Eye,
  Code,
  Sparkles,
  Star,
  Calendar
} from 'lucide-react';
import { useAnalytics } from '../utils/AnalyticsContext';
import { useAI } from '../utils/AIContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const { trackInteraction } = useAnalytics();
  const { getProjectRecommendations } = useAI();

  // Sample projects data
  const sampleProjects = [
    {
      id: 1,
      title: 'DSAlytics',
      description: 'A MERN-stack platform to practice and visualize DSA with a built-in code editor, analytics dashboard, and AI chatbot assistant.',
      image: require('../assets/Dsalytics.png'),
      category: 'Full Stack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AI Chatbot'],
      github: 'https://github.com/varshitha127/DSAlytics',
      live: '',
      featured: true,
      stars: 0,
      views: 0
    },
    {
      id: 2,
      title: 'Drug Traceability using Blockchain',
      description: 'A decentralized Ethereum-based solution that ensures transparent and tamper-proof tracking of pharmaceutical drugs in the supply chain.',
      image: require('../assets/Drug_traceability.png'),
      category: 'Blockchain',
      technologies: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js'],
      github: 'https://github.com/varshitha127/drug_traceability',
      live: '',
      featured: true,
      stars: 0,
      views: 0
    },
    {
      id: 3,
      title: 'AI-Based Video Recommendation System',
      description: 'A deep learning-powered engine that recommends motivational video content based on user mood and engagement patterns.',
      image: require('../assets/Video_recommendation.png'),
      category: 'AI/ML',
      technologies: ['Deep Learning', 'Python', 'NLP'],
      github: 'https://github.com/varshitha127/Video_Recommendation',
      live: '',
      featured: true,
      stars: 0,
      views: 0
    },
    {
      id: 4,
      title: 'Advanced Paint App',
      description: 'A feature-rich Python desktop app using Tkinter, offering brush options, color picker, canvas save, and undo/redo functionalities.',
      image: require('../assets/Paint_image.png'),
      category: 'Desktop App',
      technologies: ['Python', 'Tkinter'],
      github: 'https://github.com/varshitha127/Paint_App',
      live: '',
      featured: false,
      stars: 0,
      views: 0
    },
    {
      id: 5,
      title: 'iAccelerate Hackathon Project',
      description: 'A full-stack innovation built during the iAccelerate hackathon, focused on solving social problems using AI tools and Firebase.',
      image: '',
      category: 'Hackathon',
      technologies: ['React', 'Firebase', 'OpenAI API'],
      github: 'https://github.com/varshitha127/iAccelerateH',
      live: '',
      featured: false,
      stars: 0,
      views: 0
    },
    {
      id: 6,
      title: 'Blood Bank Management System',
      description: 'A web application to manage blood donor records, requests, and inventory across hospitals using simple frontend tech.',
      image: require('../assets/Blood_management.png'),
      category: 'Web App',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/varshitha127/Bloodbank_Project',
      live: '',
      featured: false,
      stars: 0,
      views: 0
    },
    {
      id: 7,
      title: 'OIBSIP Projects',
      description: 'Includes Python-based mini tools like a voice assistant, BMI calculator, and weather app built during internship.',
      image: '',
      category: 'Python',
      technologies: ['Python', 'Tkinter', 'SpeechRecognition'],
      github: 'https://github.com/varshitha127/OIBSIP',
      live: '',
      featured: false,
      stars: 0,
      views: 0
    }
  ];
  

  const categories = [
    { id: 'all', name: 'All Projects', count: sampleProjects.length },
    { id: 'Full Stack', name: 'Full Stack', count: sampleProjects.filter(p => p.category === 'Full Stack').length },
    { id: 'AI/ML', name: 'AI/ML', count: sampleProjects.filter(p => p.category === 'AI/ML').length },
    { id: 'Blockchain', name: 'Blockchain', count: sampleProjects.filter(p => p.category === 'Blockchain').length },
    { id: 'Web App', name: 'Web App', count: sampleProjects.filter(p => p.category === 'Web App').length },
    { id: 'Desktop App', name: 'Desktop App', count: sampleProjects.filter(p => p.category === 'Desktop App').length },
    { id: 'Hackathon', name: 'Hackathon', count: sampleProjects.filter(p => p.category === 'Hackathon').length },
    { id: 'Python', name: 'Python', count: sampleProjects.filter(p => p.category === 'Python').length },
    { id: 'Miscellaneous', name: 'Miscellaneous', count: sampleProjects.filter(p => p.category === 'Miscellaneous').length }
  ];
  

  useEffect(() => {
    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedCategory]);

  const handleProjectClick = (project, action) => {
    trackInteraction('project_click', { 
      project: project.title, 
      action: action 
    });
  };

  return (
    <>
      <Helmet>
        <title>Projects - Portfolio Showcase</title>
        <meta name="description" content="Explore my latest projects showcasing full-stack development, AI/ML, and modern web technologies." />
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
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
                My Projects
              </h1>
            </div>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
              A collection of my latest work showcasing full-stack development, AI/ML projects, 
              and modern web applications.
            </p>

          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                    {/* Project Image */}
                    <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20"></div>
                      {project.featured && (
                        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Code className="w-16 h-16 text-primary-600/30" />
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-secondary-600 group-hover:text-primary-600 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{project.stars}</span>
                        </div>
                      </div>

                      <p className="text-secondary-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-secondary-400 mb-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.category}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleProjectClick(project, 'github')}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-secondary-100 text-secondary-600 rounded-lg hover:bg-secondary-200 transition-colors duration-200"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm font-medium">Code</span>
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleProjectClick(project, 'live')}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm font-medium">Live</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Code className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                No projects found
              </h3>
              <p className="text-secondary-600">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects; 