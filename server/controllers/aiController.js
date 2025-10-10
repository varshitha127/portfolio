const OpenAI = require('openai');
const fs = require('fs');
const pdf = require('pdf-parse');
const logger = require('../utils/logger');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Portfolio data for AI context
const PORTFOLIO_DATA = {
  name: "Lakkireddy Varshitha",
  title: "Full Stack Developer | AI & Blockchain Enthusiast",
  skills: [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js",
    "Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL",
    "Python", "Tkinter", "Java", "JDBC",
    "Git", "GitHub", "REST APIs", "Firebase",
    "AI/ML", "TensorFlow", "NLP", "OpenAI API", "Computer Vision",
    "Solidity", "Ethereum", "Smart Contracts", "Web3.js",
    "Salesforce Basics", "Postman", "VS Code", "Responsive Design"
  ],
  experience: [
    {
      company: "CodeAlpha",
      position: "Java Programming Intern",
      duration: "Jun 2024 – Sep 2024",
      description: "Worked on real-world Java projects like Hotel Reservation System, Word Counter, and Travel Booking. Gained hands-on experience with MySQL, JDBC, and core Java."
    },
    {
      company: "Synexoo",
      position: "Frontend Developer Intern",
      duration: "Apr 2024 – May 2024",
      description: "Developed responsive UIs using HTML5, CSS3, and basic JavaScript. Focused on clean design and component structuring for an enhanced user experience."
    },
    {
      company: "Devskillhub Training and Consultancy",
      position: "Python Developer Intern",
      duration: "Mar 2024 – May 2024",
      description: "Worked on Python-based backend applications. Enhanced understanding of data structures, file handling, and OOP concepts in Python."
    },
    {
      company: "Oasis Infobyte",
      position: "Python Programming Intern",
      duration: "Mar 2024 – Apr 2024",
      description: "Created mini projects like a Voice Assistant, Weather App, and BMI Calculator using Tkinter and SpeechRecognition."
    },
    {
      company: "SmartInternz",
      position: "Salesforce Developer Intern",
      duration: "Nov 2023 – Jan 2024",
      description: "Completed training on Salesforce fundamentals. Gained knowledge of CRM workflows and basic automation using Salesforce tools."
    }
  ],
  projects: [
    {
      id: 1,
      title: 'DSAlytics',
      description: 'An advanced MERN-stack platform for mastering Data Structures and Algorithms. Features include visualizations, code editor, analytics, and AI chatbot support.',
      image: '/api/placeholder/400/300',
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
      description: 'A blockchain-based system for tracking pharmaceutical drugs in the supply chain using Ethereum Smart Contracts.',
      image: '/api/placeholder/400/300',
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
      description: 'Recommends motivational video content using deep neural networks. Integrates mood-based suggestions and engagement analytics.',
      image: '/api/placeholder/400/300',
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
      title: 'Paint App with Advanced Features',
      description: 'Tkinter-based desktop paint application with brush size, color options, save functionality, and undo/redo logic.',
      image: '/api/placeholder/400/300',
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
      title: 'iAccelerateH - Hackathon Project',
      description: 'A comprehensive solution built for iAccelerate Hackathon using innovative tech stacks to address real-world problems.',
      image: '/api/placeholder/400/300',
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
      description: 'A web-based system for managing donors, blood requests, and hospital inventory.',
      image: '/api/placeholder/400/300',
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
      title: 'Python Projects from OIBSIP',
      description: 'Includes mini-projects like Weather App, BMI Calculator, and Voice Assistant built during the OIBSIP internship.',
      image: '/api/placeholder/400/300',
      category: 'Python',
      technologies: ['Python', 'Tkinter', 'SpeechRecognition'],
      github: 'https://github.com/varshitha127/OIBSIP',
      live: '',
      featured: false,
      stars: 0,
      views: 0
    },
    {
      id: 8,
      title: 'All Mini Projects Repository',
      description: 'A collection of various mini projects built across different domains including Java, DSA, and DBMS.',
      image: '/api/placeholder/400/300',
      category: 'Miscellaneous',
      technologies: ['Java', 'MySQL', 'C++'],
      github: 'https://github.com/varshitha127/projects',
      live: '',
      featured: false,
      stars: 0,
      views: 0
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology (B.Tech) in Computer Science and Engineering - AI & ML",
      school: "St. Martin's Engineering College, Hyderabad",
      year: "Nov 2022 – Aug 2026",
      description: "Pursuing CSE with specialization in AI & ML. Current CGPA: 8.5. Key subjects include Data Structures, Machine Learning, MySQL, and Software Engineering."
    },
    {
      degree: "Intermediate (Junior College)",
      school: "Narayana Junior College, India",
      year: "Jun 2020 – May 2022",
      description: "Completed Intermediate education with 95.5% in core subjects including Mathematics, Physics, and Chemistry."
    }
  ]
};

// AI Chat Controller
const chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // Create conversation context
    const systemPrompt = `You are an AI assistant for ${PORTFOLIO_DATA.name}'s portfolio website. 
    You have access to the following information about ${PORTFOLIO_DATA.name}:

    Name: ${PORTFOLIO_DATA.name}
    Title: ${PORTFOLIO_DATA.title}
    Skills: ${PORTFOLIO_DATA.skills.join(', ')}
    
    Experience: ${PORTFOLIO_DATA.experience.map((exp) => 
      `${exp.position} at ${exp.company} (${exp.duration}): ${exp.description}`
    ).join('; ')}
    
    Projects: ${PORTFOLIO_DATA.projects.map((proj) => 
      `${proj.title}: ${proj.description} (Tech: ${proj.technologies.join(', ')})`
    ).join('; ')}
    
    Education: ${PORTFOLIO_DATA.education.map((edu) => 
      `${edu.degree} from ${edu.school} (${edu.year})`
    ).join('; ')}

    Your role is to:
    1. Answer questions about ${PORTFOLIO_DATA.name}'s skills, experience, and projects
    2. Provide helpful and accurate information based on the portfolio data
    3. Be conversational and engaging
    4. If asked about something not in the portfolio data, politely redirect to relevant information
    5. Use markdown formatting for better readability (bold with **, italic with *, code with \`)
    6. If asked about something not in the portfolio data, politely redirect to relevant information

    Your response should be clear and concise, and should not exceed 150 words.

    Remember, you are an AI assistant created by ${PORTFOLIO_DATA.name} to help answer questions and provide information about their skills, experience, and projects.

    If you have any questions or need further information, please ask!`;

    // ... existing code ...
  } catch (error) {
    // ... existing code ...
  }
};

// Placeholder for Resume Analysis
const analyzeResume = (req, res) => {
  res.status(200).json({ message: 'Resume analysis is not implemented yet.' });
};

// Placeholder for Project Recommendations
const recommendProjects = (req, res) => {
  res.status(200).json({ message: 'Project recommendation is not implemented yet.' });
};

// Placeholder for Feedback Analysis
const analyzeFeedback = (req, res) => {
  res.status(200).json({ message: 'Feedback analysis is not implemented yet.' });
};

// Placeholder for AI Capabilities
const getCapabilities = (req, res) => {
  res.status(200).json({
    capabilities: [
      'Chat about portfolio',
      'Analyze resume (coming soon)',
      'Recommend projects (coming soon)',
      'Analyze feedback (coming soon)'
    ]
  });
};

module.exports = {
  chat,
  analyzeResume,
  recommendProjects,
  analyzeFeedback,
  getCapabilities
};