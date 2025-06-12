# Dora Website - Deployment Package

A romantic, artistic website featuring Dora with chat functionality, photo gallery, and interactive features.

## 🌟 Features

- **Photo Gallery**: Beautiful hero section with artistic photos
- **Chat with Dora**: AI-powered personality simulation
- **Love Story Section**: Timeline, Poetry Corner, Memory Box
- **Creative Features**: Music Player, Art Gallery, Dream Journal, Mood Tracker
- **Conversation Starters**: Deep questions for meaningful conversations

## 📁 Project Structure

```
dora_deployment_package/
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── package.json  # Dependencies
│   ├── vercel.json   # Vercel deployment config
│   └── .env.example  # Environment variables template
├── backend/          # Flask backend API
│   ├── src/          # Source code
│   ├── requirements.txt
│   └── vercel.json   # Vercel deployment config
└── README.md         # This file
```

## 🚀 Deployment Instructions

### Step 1: Upload to GitHub

1. Create a new repository on GitHub
2. Upload all files from this package to your repository
3. Commit and push the files

### Step 2: Deploy Backend on Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project" and import your GitHub repository
3. Select the `backend` folder as the root directory
4. Vercel will automatically detect it's a Python project
5. Deploy and note the backend URL (e.g., `https://your-backend.vercel.app`)

### Step 3: Deploy Frontend on Vercel

1. Create another new project on Vercel
2. Import the same GitHub repository
3. Select the `frontend` folder as the root directory
4. Add environment variable:
   - Name: `VITE_BACKEND_URL`
   - Value: Your backend URL from Step 2
5. Deploy the frontend

### Step 4: Update Environment Variables

If you need to update the backend URL later:
1. Go to your frontend project settings on Vercel
2. Navigate to "Environment Variables"
3. Update `VITE_BACKEND_URL` with your new backend URL
4. Redeploy the frontend

## 🛠️ Local Development

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

### Environment Variables

Copy `.env.example` to `.env` in the frontend directory and update the backend URL:

```bash
cd frontend
cp .env.example .env
# Edit .env and set VITE_BACKEND_URL to your local backend URL
```

## 🎨 Customization

### Updating Photos

Replace images in `frontend/public/images/` with your own photos. Update the photo data in `frontend/src/App.tsx` in the `photos` array.

### Modifying Dora's Personality

Edit the personality responses in `backend/src/main.py` in the `DORA_RESPONSES` object.

### Styling Changes

Modify the CSS and styling in `frontend/src/App.tsx` and `frontend/src/App.css`.

## 📝 Features Overview

### Frontend (React + TypeScript)
- Responsive design with romantic purple gradients
- Photo gallery with grid layout
- Real-time chat interface
- Interactive timeline and poetry sections
- Music player and mood tracker
- Conversation themes with auto-chat population

### Backend (Flask + Python)
- RESTful API for chat functionality
- Personality simulation with themed responses
- CORS enabled for cross-origin requests
- Session management for conversations
- Health check endpoint

## 🔧 Technical Details

### Frontend Technologies
- React 18 with TypeScript
- Vite for build tooling
- CSS3 with gradients and animations
- Responsive design

### Backend Technologies
- Flask web framework
- Python 3.11+
- Simple personality simulation
- JSON API responses

## 📞 Support

If you encounter any issues during deployment:

1. Check Vercel deployment logs for errors
2. Ensure environment variables are set correctly
3. Verify the backend URL is accessible
4. Check CORS settings if having connection issues

## 🎉 Enjoy Your Romantic Website!

Your Dora website is now ready to deploy! The romantic design with photo gallery, chat functionality, and love-focused features will create a beautiful and intimate experience.

---

*Created with love for a mysterious, artistic relationship* 💜

