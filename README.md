# 🤖 AI-Powered Portfolio Website

An advanced personal portfolio website that integrates AI features to create an interactive and engaging experience for visitors. This portfolio showcases my skills, projects, and experience while providing AI-powered tools like chatbots, resume analysis, and voice navigation.

## ✨ Features

### 🎯 Core Portfolio Features
- **Modern Design**: Beautiful, responsive UI with smooth animations
- **Multi-page Layout**: Home, About, Skills, Projects, Resume, Contact, Blog
- **Interactive Elements**: Hover effects, scroll animations, and micro-interactions
- **Mobile-First**: Fully responsive design for all devices

### 🤖 AI-Powered Features
- **AI Chatbot Assistant**: Intelligent conversation about your skills and projects
- **Resume Analyzer**: Upload resumes and get AI-powered feedback
- **Project Recommender**: Get personalized project suggestions
- **Voice Navigation**: Navigate the portfolio using voice commands
- **Analytics Dashboard**: Track visits, interactions, and user behavior
- **Feedback Generator**: AI-powered feedback analysis and insights

### 🛠️ Technical Features
- **PWA Support**: Installable as a mobile app
- **SEO Optimized**: Meta tags, structured data, and performance optimization
- **Real-time Analytics**: Track user interactions and generate insights
- **File Upload**: Resume analysis with PDF/DOC support
- **Email Integration**: Contact form with email notifications

## 🚀 Tech Stack

### Frontend
- **React.js** - UI development
- **Tailwind CSS** - Styling and responsive design
- **Framer Motion** - Animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Notifications
- **Lucide React** - Modern icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - AI integration (GPT-3.5/4)
- **MongoDB** - Database (with Mongoose ODM)
- **Multer** - File upload handling
- **Nodemailer** - Email functionality
- **Winston** - Logging
- **JWT** - Authentication (optional)

### Deployment
- **Vercel/Netlify** - Frontend hosting
- **Render/Railway** - Backend hosting
- **MongoDB Atlas** - Cloud database
- **GitHub** - Version control

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- OpenAI API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-portfolio.git
cd ai-portfolio
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install

# Return to root
cd ..
```

### 3. Environment Setup
```bash
# Copy environment example
cp env.example .env

# Edit .env file with your configuration
nano .env
```

### 4. Configure Environment Variables
```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_FROM=your_email@gmail.com

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ai-portfolio

# JWT Configuration (optional)
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
```

### 5. Start Development Servers
```bash
# Start both client and server
npm run dev

# Or start individually
npm run dev:client  # Frontend on http://localhost:3000
npm run dev:server  # Backend on http://localhost:5000
```

## 🎨 Customization

### Personal Information
Update your personal information in the following files:
- `client/src/pages/Home.js` - Hero section and skills
- `server/controllers/aiController.js` - AI chatbot context
- `client/src/components/Footer.js` - Contact information

### Styling
- **Colors**: Modify `client/tailwind.config.js` for custom color schemes
- **Fonts**: Update Google Fonts in `client/public/index.html`
- **Components**: Edit individual component files in `client/src/components/`

### AI Features
- **Chatbot**: Customize responses in `server/controllers/aiController.js`
- **Resume Analysis**: Modify analysis prompts for different criteria
- **Project Recommendations**: Update recommendation logic

## 📱 PWA Features

The portfolio is configured as a Progressive Web App with:
- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Basic offline functionality
- **App-like Experience**: Full-screen mode and native feel

## 🔧 API Endpoints

### AI Endpoints
- `POST /api/ai/chat` - AI chatbot conversation
- `POST /api/ai/analyze-resume` - Resume analysis
- `POST /api/ai/recommend-projects` - Project recommendations
- `POST /api/ai/analyze-feedback` - Feedback analysis
- `GET /api/ai/capabilities` - AI features overview

### Contact Endpoints
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/submissions` - Get contact submissions (admin)

### Analytics Endpoints
- `POST /api/analytics/page-view` - Track page views
- `POST /api/analytics/interaction` - Track user interactions
- `POST /api/analytics/download` - Track downloads
- `GET /api/analytics/dashboard` - Get analytics data
- `GET /api/analytics/insights` - Get AI-generated insights

### Project Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/build`
4. Add environment variables in Vercel dashboard

### Backend Deployment (Render)
1. Connect your GitHub repository to Render
2. Set build command: `cd server && npm install`
3. Set start command: `cd server && npm start`
4. Add environment variables in Render dashboard

### Database Setup (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in environment variables

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - API request throttling
- **Input Validation** - Request data validation
- **CORS Configuration** - Cross-origin resource sharing
- **File Upload Security** - File type and size validation

## 📊 Analytics & Insights

The portfolio includes comprehensive analytics:
- **Page Views**: Track which pages are most popular
- **User Interactions**: Monitor button clicks and form submissions
- **AI Usage**: Track chatbot conversations and feature usage
- **Performance Metrics**: Load times and user experience data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing the AI capabilities
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **React Community** for the amazing ecosystem

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Email: lakkireddyvarshithareddy@gmail.com
- LinkedIn: www.linkedin.com/in/varshithareddy-lakkireddy-1b1326290
- Github: www.github.com/varshitha127

---

**Made with ❤️ and AI** 🤖 
