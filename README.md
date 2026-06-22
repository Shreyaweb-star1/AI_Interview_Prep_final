# AI Interview Preparation Platform

A full-stack web application designed to help freshers and students practice technical interviews with real-time AI feedback.

## ✨ Features

- Role-based technical interview simulation (Frontend, Backend, Full Stack, Software Engineer)
- Three difficulty levels: Easy, Medium, Hard
- Real-time AI-powered answer evaluation and scoring
- Toggle between Real AI Mode and Smart Mock Mode
- Live timer, progress tracking, and detailed feedback
- Responsive dark-themed user interface

## 🛠️ Tech Stack

**Frontend**
- React 19
- Vite
- Tailwind CSS v4
- React Router v7

**Backend**
- Node.js
- Express.js
- ES Modules

**AI Integration**
- Groq (Primary)
- Grok (xAI)
- Google Gemini
- OpenAI

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
Setup Backend

cd server
npm install
cp .env.example .env
# Add your GROQ_API_KEY (and other keys) in .env file
npm run dev

Setup Frontend
cd client
npm install
npm run dev

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-interview-platform.git
   cd ai-interview-platform

  PROJECT STRUCTURE

  AI-Interview-Platform/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── vite.config.js
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── data/
│   ├── answerBank.js
│   └── server.js
├── README.md
└── .gitignore

📌 Future Enhancements

User authentication and interview history
Resume-based personalized questions
Coding questions with code editor
Performance analytics dashboard
PDF report generation

👨‍💻 Author
Shreya Dutta
Fresher Software Engineer | Full Stack Developer
