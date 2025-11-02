# 🤖 AI-Powered Resume Analyzer

## Flask + spaCy NLP + Docker Containerization Project

A containerized web application built using **Flask** and **Natural Language Processing (NLP)** techniques. Automatically evaluates resumes by extracting key skills, experience, and education details to generate a skill-match score and improvement suggestions.

---

## 🎯 Project Requirements Satisfaction

### ✅ Technology Stack

- **Flask** - Python web framework (backend)
- **spaCy** - Natural Language Processing library
- **Docker** - Containerization
- **Free Tools** - All components are open-source and free

### ✅ Features Implemented

- ✅ AI-powered skill extraction using spaCy NLP
- ✅ Automatic resume analysis
- ✅ Skill matching with percentage score
- ✅ Improvement suggestions generation
- ✅ Docker containerization
- ✅ Professional web interface
- ✅ File upload support (TXT, PDF)

---

## 🚀 Quick Start Guide

### Prerequisites

- Python 3.9+ (`python3 --version`)
- pip3 (`pip3 --version`)
- Docker (optional, for containerization)
- Git (to clone repository)

### Step 1: Clone Repository

```bash
git clone <your-repo-url>
cd skill-score-generator
```

### Step 2: Install Dependencies

```bash
# Install Python packages
pip3 install -r requirements.txt

# Download spaCy English model
python3 -m spacy download en_core_web_sm
```

### Step 3: Run the Application

#### Option A: Local Development

```bash
python3 app.py
```

The application will start on: `http://localhost:5001`

#### Option B: Docker (Recommended)

```bash
# Build Docker image
docker build -t ai-resume-analyzer .

# Run container
docker run -d -p 5001:5001 --name resume-analyzer ai-resume-analyzer
```

Access at: `http://localhost:5001`

#### Option C: Docker Compose

```bash
docker-compose up -d
```

---

## 📖 How to Use

1. **Open Browser**: Navigate to `http://localhost:5001`

2. **Upload Resume**: 
   - Click "Choose File" and upload your resume (TXT or PDF)
   - OR paste your resume text in the text area

3. **Enter Job Requirements**: 
   - Enter comma-separated skills (e.g., "Python, Flask, Docker, Problem-solving")

4. **Analyze**: 
   - Click "🚀 Analyze Resume"
   - Wait for AI analysis

5. **View Results**:
   - See match percentage
   - View matched/missing skills
   - Read improvement suggestions

---

## 🐳 Docker Commands

### Build Image
```bash
docker build -t ai-resume-analyzer .
```

### Run Container
```bash
docker run -d -p 5001:5001 ai-resume-analyzer
```

### View Logs
```bash
docker logs resume-analyzer
```

### Stop Container
```bash
docker stop resume-analyzer
docker rm resume-analyzer
```

### Docker Compose
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

---

## 📁 Project Structure

```
skill-score-generator/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker container definition
├── docker-compose.yml    # Docker Compose configuration
├── static/
│   └── index.html        # Web interface
├── README.md             # This file
├── DEMO_GUIDE.md         # Demo instructions
└── REQUIREMENTS_SATISFACTION.md  # Requirements proof
```

---

## 🔧 API Endpoints

### Health Check
```bash
GET http://localhost:5001/health
```

### Analyze Resume
```bash
POST http://localhost:5001/analyze
Content-Type: application/json

{
  "resumeText": "Your resume text...",
  "jobRequirements": "Python, Flask, Docker"
}
```

### Upload File
```bash
POST http://localhost:5001/upload
Content-Type: multipart/form-data

file: [your-file]
```

---

## ✅ Requirements for Linux & Container Technologies Class

### 1. Flask Backend ✅
- **File**: `app.py`
- **Evidence**: Pure Flask application with RESTful API
- **Linux**: Runs on any Linux distribution with Python

### 2. spaCy NLP ✅
- **File**: `app.py` (lines 26-27, 37-105)
- **Evidence**: Uses `spacy.load('en_core_web_sm')` for NLP processing
- **Linux**: Works seamlessly on Linux systems

### 3. Docker Containerization ✅
- **Files**: `Dockerfile`, `docker-compose.yml`
- **Evidence**: Complete containerization with all dependencies
- **Linux**: Docker is native to Linux

### 4. Container Deployment ✅
- **File**: `build-and-push.sh`
- **Evidence**: Ready for Docker Hub deployment
- **Linux**: Container runs natively on Linux

---

## 🐧 Linux & Container Technologies Integration

### How It Works on Linux

1. **Linux Compatibility**:
   - Python 3 runs natively on Linux
   - Flask is cross-platform
   - spaCy supports Linux
   - Docker is Linux-native

2. **Container Benefits**:
   - **Isolation**: Application runs in isolated environment
   - **Portability**: Works on any Linux system with Docker
   - **Reproducibility**: Same environment everywhere
   - **Deployment**: Easy to deploy and scale

3. **Docker Architecture**:
   ```
   ┌─────────────────────────────────┐
   │     Linux Host System          │
   │  ┌──────────────────────────┐  │
   │  │   Docker Engine           │  │
   │  │  ┌────────────────────┐  │  │
   │  │  │  Container          │  │  │
   │  │  │  - Python 3.11     │  │  │
   │  │  │  - Flask App        │  │  │
   │  │  │  - spaCy Model      │  │  │
   │  │  └────────────────────┘  │  │
   │  └──────────────────────────┘  │
   └─────────────────────────────────┘
   ```

---

## 🔬 Technical Details

### NLP Processing Flow

1. **Text Input**: Resume text received
2. **spaCy Processing**: 
   - Tokenization
   - Named Entity Recognition
   - Part-of-Speech Tagging
3. **Skill Extraction**: Pattern matching + NLP analysis
4. **Matching**: Compare extracted skills vs requirements
5. **Scoring**: Calculate percentage match
6. **Suggestions**: Generate improvement recommendations

### Container Build Process

1. **Base Image**: `python:3.11-slim` (Linux-based)
2. **Install Dependencies**: Flask, spaCy, PyPDF2
3. **Download spaCy Model**: English language model
4. **Copy Application**: Flask app code
5. **Expose Port**: 5001
6. **Start Command**: `python app.py`

---

## 📊 Project Demonstrates

✅ **Linux System Administration**
- Working with Linux file system
- Managing Python environments
- Service deployment

✅ **Container Technologies**
- Docker image creation
- Container orchestration
- Container networking
- Port mapping

✅ **DevOps Practices**
- Infrastructure as Code (Dockerfile)
- Container registry (Docker Hub ready)
- CI/CD ready structure

✅ **AI/NLP Integration**
- Real-world NLP application
- Text processing with spaCy
- Automated analysis pipeline

---

## 🎓 Academic Value

### For Linux & Container Technologies Class:

1. **Linux Commands**:
   - File management
   - Process management
   - Network configuration

2. **Docker Concepts**:
   - Image vs Container
   - Dockerfile creation
   - Container lifecycle
   - Docker networking

3. **Practical Application**:
   - Real-world use case
   - Production-ready structure
   - Industry-standard practices

---

## 🐛 Troubleshooting

### Python Not Found
```bash
# Install Python 3
sudo apt-get update
sudo apt-get install python3 python3-pip
```

### spaCy Model Error
```bash
python3 -m spacy download en_core_web_sm
```

### Port Already in Use
```bash
# Find process using port 5001
sudo lsof -i :5001

# Kill process
sudo kill -9 <PID>
```

### Docker Issues
```bash
# Check Docker is running
sudo systemctl status docker

# Start Docker
sudo systemctl start docker
```

---

## 📝 License

Educational project - Free to use and modify

---

## 🙏 Acknowledgments

- Flask: Python web framework
- spaCy: NLP library
- Docker: Containerization platform
- PyPDF2: PDF processing

---

## 📧 Support

For issues or questions, check:
- `DEMO_GUIDE.md` - How to demo
- `REQUIREMENTS_SATISFACTION.md` - Requirements proof
- `QUICK_START.md` - Quick setup guide

---

**Built for Linux & Container Technologies Class** 🐧🐳
