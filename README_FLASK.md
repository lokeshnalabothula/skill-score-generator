# AI-Powered Resume Analyzer - Flask + spaCy + Docker

## 🎯 Project Overview

This is a containerized web application built using **Flask** and **Natural Language Processing (NLP)** techniques. The application automatically evaluates resumes by extracting key skills, experience, and education details to generate a skill-match score and improvement suggestions.

## ✨ Features

- **AI-Powered Analysis**: Uses spaCy NLP library for intelligent resume parsing
- **Skill Extraction**: Automatically identifies technical and soft skills
- **Match Scoring**: Calculates percentage match between resume and job requirements
- **Smart Suggestions**: Provides actionable improvement recommendations
- **Docker Containerized**: Fully packaged for portability and deployment
- **RESTful API**: Clean API endpoints for easy integration

## 🛠️ Technology Stack

- **Backend**: Flask (Python)
- **NLP**: spaCy (en_core_web_sm model)
- **Containerization**: Docker
- **API**: RESTful endpoints with CORS support

## 📋 Prerequisites

- Python 3.11+
- Docker & Docker Compose
- Git

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

1. **Build the Docker image:**
   ```bash
   docker build -t ai-resume-analyzer .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 5000:5000 --name resume-analyzer ai-resume-analyzer
   ```

3. **Or use Docker Compose:**
   ```bash
   docker-compose up -d
   ```

### Option 2: Local Development

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   python -m spacy download en_core_web_sm
   ```

2. **Run the Flask application:**
   ```bash
   python app.py
   ```

## 📡 API Endpoints

### Health Check
```bash
GET http://localhost:5000/health
```

### Analyze Resume
```bash
POST http://localhost:5000/analyze
Content-Type: application/json

{
  "resumeText": "Your resume text here...",
  "jobRequirements": "Python, Flask, Docker, Machine Learning"
}
```

### API Information
```bash
GET http://localhost:5000/
```

## 📤 Response Format

```json
{
  "extractedSkills": ["Python", "Flask", "Docker", "Git"],
  "matchedSkills": ["Python", "Flask", "Docker"],
  "missingSkills": ["Machine Learning"],
  "matchPercentage": 75.0,
  "suggestions": [
    "Focus on learning: Machine Learning",
    "Good match. Consider adding a few more relevant skills..."
  ],
  "experienceSummary": "3+ years of software development...",
  "educationSummary": "Bachelor's in Computer Science..."
}
```

## 🐳 Docker Hub Deployment

### Build and Push to Docker Hub

1. **Login to Docker Hub:**
   ```bash
   docker login
   ```

2. **Tag your image:**
   ```bash
   docker tag ai-resume-analyzer yourusername/ai-resume-analyzer:latest
   ```

3. **Push to Docker Hub:**
   ```bash
   docker push yourusername/ai-resume-analyzer:latest
   ```

4. **Pull and run from Docker Hub:**
   ```bash
   docker pull yourusername/ai-resume-analyzer:latest
   docker run -d -p 5000:5000 yourusername/ai-resume-analyzer:latest
   ```

## 📊 Project Structure

```
.
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker container configuration
├── docker-compose.yml     # Docker Compose configuration
└── README_FLASK.md       # This file
```

## 🧪 Testing

Test the API using curl:

```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Software Engineer with 5 years of experience in Python and Flask...",
    "jobRequirements": "Python, Flask, Docker, REST API"
  }'
```

## 🔧 Configuration

- **Port**: Default 5000 (configurable in `app.py`)
- **Host**: `0.0.0.0` (accessible from all network interfaces)
- **Debug Mode**: Enabled in development

## 📝 Abstract for Project Documentation

> The "AI-Powered Resume Analyzer" is a containerized web application built using Flask and Natural Language Processing (NLP) techniques. Its main goal is to automatically evaluate resumes by extracting key skills, experience, and education details to generate a skill-match score and improvement suggestions. The backend uses the spaCy library for text processing and is fully packaged inside a custom Docker container for portability and deployment. This project demonstrates the integration of AI with DevOps by pushing the container image to a personal Docker repository, showcasing automation, scalability, and real-world HR technology innovation.

## ✅ Requirements Met

- ✅ Flask backend
- ✅ spaCy NLP library
- ✅ Docker containerization
- ✅ Skill extraction and matching
- ✅ Match percentage calculation
- ✅ Improvement suggestions
- ✅ RESTful API design

## 📚 Key Learning Outcomes

- Integration of NLP with web applications
- Containerization with Docker
- RESTful API design
- DevOps practices (Docker Hub deployment)
- Real-world AI application development

## 🤝 Contributing

This is an academic project demonstrating Flask, NLP, and Docker integration.

## 📄 License

Educational project - free to use and modify.

