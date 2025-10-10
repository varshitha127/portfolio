# Portfolio Deployment Guide

## 🚀 Deploy to Vercel

Your portfolio is now ready for deployment on Vercel! Here's how to deploy it:

### Step 1: Deploy Frontend (Client)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `https://github.com/varshitha127/portfolio`
4. **Root Directory**: Set to `client`
5. **Build Command**: `npm run build`
6. **Output Directory**: `build`
7. **Install Command**: `npm install`

### Step 2: Deploy Backend (Server)
1. Create another Vercel project
2. Import the same repository: `https://github.com/varshitha127/portfolio`
3. **Root Directory**: Set to `server`
4. **Build Command**: `npm install`
5. **Output Directory**: Leave empty
6. **Install Command**: `npm install`

### Step 3: Environment Variables
Add these environment variables in both Vercel projects:

#### Frontend Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

#### Backend Environment Variables:
```
NODE_ENV=production
PORT=5000
OPENAI_API_KEY=your_actual_openai_api_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Step 4: Update Client API URL
After deploying the backend, update the client's API URL:
1. Go to your frontend Vercel project settings
2. Add environment variable: `REACT_APP_API_URL=https://your-backend-url.vercel.app`
3. Redeploy the frontend

### Alternative: Single Vercel Deployment
You can also deploy both frontend and backend together:
1. Import repository: `https://github.com/varshitha127/portfolio`
2. Use the root `vercel.json` configuration
3. Add all environment variables
4. Deploy!

## 🔧 Local Development
```bash
# Install dependencies
npm run install:all

# Start both client and server
npm run dev

# Or start individually
npm run dev:client  # Frontend on http://localhost:3000
npm run dev:server  # Backend on http://localhost:5000
```

## 📁 Project Structure
```
Portfolio/
├── client/          # React frontend
├── server/          # Node.js backend
├── vercel.json      # Vercel configuration
└── package.json     # Root package.json
```

## 🌐 Live URLs
- **Frontend**: https://your-frontend-url.vercel.app
- **Backend API**: https://your-backend-url.vercel.app/api

## 🎯 Features Deployed
- ✅ Responsive React frontend with Tailwind CSS
- ✅ AI Chat functionality
- ✅ Analytics dashboard
- ✅ Contact form
- ✅ Resume analyzer
- ✅ Voice control
- ✅ Project showcase
- ✅ Modern animations with Framer Motion

## 🔐 Security Notes
- Never commit real API keys to GitHub
- Use environment variables for all sensitive data
- The `env.example` file shows required variables
- Copy it to `.env` and fill in your actual values

## 📞 Support
If you encounter any issues during deployment, check:
1. Environment variables are set correctly
2. Build commands are working locally
3. API endpoints are accessible
4. CORS settings allow your frontend domain
