# 🎯 Step-by-Step Demo Guide - AI Resume Analyzer

## 🚀 Quick Overview

This project has **two ways to run**:
1. **Flask Backend Only** (Simple, works immediately) - Port 5000
2. **Full Stack** (Flask + React Frontend) - Flask on 5000, React on 8080

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ Python 3.9+ installed (`python3 --version`)
- ✅ pip3 installed (`pip3 --version`)
- ✅ Node.js 18+ installed (`node --version`) - for React frontend
- ✅ Docker installed (optional, for containerization demo)

---

## 🎬 DEMO OPTION 1: Flask Backend Only (Fastest - 5 minutes)

### Step 1: Install Python Dependencies

```bash
# Navigate to project directory
cd /Users/loki/Documents/linuxproject/skill-score-generator

# Install Python packages
pip3 install -r requirements.txt

# Download spaCy English NLP model (required for AI analysis)
python3 -m spacy download en_core_web_sm
```

**Expected Output:**
```
✓ Successfully installed Flask-3.0.0 flask-cors-4.0.0 spacy-3.7.2 PyPDF2-3.0.1
✓ Successfully installed en_core_web_sm
```

### Step 2: Start Flask Backend

```bash
# Run Flask application
python3 app.py
```

**Expected Output:**
```
✓ spaCy model loaded successfully
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

**Note:** If port 5000 is busy (common on macOS due to AirPlay), use:
```bash
PORT=5001 python3 app.py
```

### Step 3: Access the Web Interface

Open your browser and go to:
- **http://localhost:5000** (or http://localhost:5001 if you used PORT=5001)

You should see the resume analyzer interface!

### Step 4: Test the API (Optional - for verification)

**Open a NEW terminal window** and run:

```bash
# Health check
curl http://localhost:5000/health

# Test analysis (copy-paste this entire command)
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Software Engineer with 5 years experience in Python, Flask, Docker. Strong problem-solving and communication skills. Developed REST APIs and microservices.",
    "jobRequirements": "Python, Flask, Docker, REST API, Problem-solving, Communication"
  }'
```

**Expected Response:**
```json
{
  "extractedSkills": ["Python", "Flask", "Docker", "REST API", "Problem-solving", "Communication"],
  "matchedSkills": ["Python", "Flask", "Docker", "REST API", "Problem-solving", "Communication"],
  "missingSkills": [],
  "matchPercentage": 100.0,
  "suggestions": [
    "Great match! Highlight your relevant skills more prominently.",
    "Ensure all relevant skills are clearly mentioned in your resume."
  ],
  "experienceSummary": "...",
  "educationSummary": "..."
}
```

### Step 5: Try a Demo Resume

1. **Go to http://localhost:5000** in your browser
2. **Paste this sample resume text:**
```
John Doe
Software Engineer
Email: john@example.com
Phone: (555) 123-4567

EXPERIENCE
Senior Software Engineer | Tech Corp | 2020-Present
- Developed REST APIs using Python and Flask
- Containerized applications with Docker
- Built microservices architecture
- Led team of 5 developers

Software Engineer | Startup Inc | 2018-2020
- Built web applications using React and TypeScript
- Implemented CI/CD pipelines
- Worked with AWS cloud services

SKILLS
- Programming: Python, JavaScript, TypeScript, Java
- Frameworks: Flask, React, Node.js
- Tools: Docker, Git, AWS, Linux
- Soft Skills: Leadership, Problem-solving, Communication, Teamwork

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2018
```

3. **Enter job requirements:**
```
Python, Flask, Docker, REST API, Problem-solving, Leadership, Communication
```

4. **Click "Analyze Resume"** and watch the AI analysis!

---

## 🎨 DEMO OPTION 2: Full Stack with React Frontend (Beautiful UI - 10 minutes)

### Step 1: Install Backend Dependencies (Same as Option 1)

```bash
# Install Python packages
pip3 install -r requirements.txt
python3 -m spacy download en_core_web_sm
```

### Step 2: Start Flask Backend

```bash
# Terminal 1: Start Flask backend
python3 app.py
```

Keep this terminal open! Flask should be running on port 5000.

### Step 3: Install Frontend Dependencies

**Open a NEW terminal** and run:

```bash
# Navigate to project directory
cd /Users/loki/Documents/linuxproject/skill-score-generator

# Install Node.js dependencies
npm install
```

**Expected Output:**
```
added 500+ packages in 30s
```

### Step 4: Configure Frontend to Use Flask Backend

The React frontend is currently configured for Supabase. To use Flask backend, we need to modify it:

**Option A: Quick Fix - Modify ResumeUploader Component**

Edit `src/components/ResumeUploader.tsx` and replace the `analyzeResume` function (around line 59) with:

```typescript
const analyzeResume = async () => {
  if (!resumeText.trim()) {
    toast.error("Please enter or upload your resume text");
    return;
  }

  if (!jobRequirements.trim()) {
    toast.error("Please enter job requirements");
    return;
  }

  setIsAnalyzing(true);

  try {
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText,
        jobRequirements
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.extractedSkills) {
      throw new Error("Invalid response from server. Please try again.");
    }

    toast.success("Resume analyzed successfully!");
    onAnalysisComplete(data);
  } catch (error) {
    console.error('Analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to analyze resume. Please try again.";
    toast.error(errorMessage);
  } finally {
    setIsAnalyzing(false);
  }
};
```

**Option B: Use Flask backend directly (simpler for demo)**

Actually, for the demo, you can just use the Flask backend's built-in web interface at http://localhost:5000 which works perfectly!

### Step 5: Start React Frontend

```bash
# Terminal 2: Start React development server
npm run dev
```

**Expected Output:**
```
  VITE v5.4.19  ready in 500 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://0.0.0.0:8080/
```

### Step 6: Access the Application

Open your browser and go to:
- **React Frontend:** http://localhost:8080
- **Flask Backend UI:** http://localhost:5000

Both should work! The React frontend has a beautiful modern UI.

---

## 🐳 DEMO OPTION 3: Docker Containerization (Advanced - 8 minutes)

### Step 1: Build Docker Image

```bash
# Build the Docker image
docker build -t ai-resume-analyzer .
```

**Expected Output:**
```
[+] Building 45.2s (12/12) FINISHED
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 2.45kB
 => [1/8] FROM docker.io/library/python:3.11-slim
 => ...
 => => naming to docker.io/library/ai-resume-analyzer
```

### Step 2: Verify Image Created

```bash
docker images | grep ai-resume-analyzer
```

**Expected Output:**
```
ai-resume-analyzer    latest    abc123def456    2 minutes ago    500MB
```

### Step 3: Run Container

```bash
# Run container (maps host port 5001 to container port 5000)
docker run -d -p 5001:5000 --name resume-analyzer ai-resume-analyzer
```

**Expected Output:**
```
abc123def456789...
```

### Step 4: Check Container Status

```bash
# View running containers
docker ps

# View logs
docker logs resume-analyzer
```

**Expected Logs:**
```
✓ spaCy model loaded successfully
 * Running on all addresses (0.0.0.0)
 * Running on http://0.0.0.0:5000
```

### Step 5: Test Containerized Application

```bash
# Test health endpoint
curl http://localhost:5001/health

# Open in browser
open http://localhost:5001
```

### Step 6: Stop Container (when done)

```bash
docker stop resume-analyzer
docker rm resume-analyzer
```

---

## 🎤 DEMO SCRIPT FOR PRESENTATION

### Introduction (30 seconds)
"This is an AI-Powered Resume Analyzer that uses Flask, spaCy NLP, and Docker. It automatically analyzes resumes and provides skill matching scores with AI-powered suggestions."

### Show Flask Backend (1 minute)
1. Open `app.py` in editor
2. Point out:
   - `from flask import Flask` - Flask framework
   - `nlp = spacy.load("en_core_web_sm")` - AI/NLP component
   - `@app.route('/analyze')` - RESTful API endpoint
3. Say: "This is a pure Flask backend with NLP processing"

### Run Application (2 minutes)
1. Start Flask: `python3 app.py`
2. Show terminal output: "✓ spaCy model loaded successfully"
3. Open browser: http://localhost:5000
4. Demonstrate: Upload a resume and analyze it
5. Show results: Skills extracted, match percentage, suggestions

### Show Docker (2 minutes)
1. Show `Dockerfile` - explain containerization
2. Build image: `docker build -t ai-resume-analyzer .`
3. Run container: `docker run -d -p 5001:5000 ai-resume-analyzer`
4. Test: `curl http://localhost:5001/health`
5. Say: "Same application, now running in an isolated container"

### Highlight Key Features (1 minute)
1. **AI/NLP**: spaCy extracts skills intelligently
2. **Automation**: No manual data entry needed
3. **Containerization**: Docker for portability
4. **Free Tools**: Flask, spaCy, Docker - all free!

**Total Demo Time: ~7 minutes**

---

## 📊 Sample Demo Data

### Sample Resume Text
```
Jane Smith
Software Engineer
Email: jane@example.com

EXPERIENCE
Full Stack Developer | Tech Startup | 2021-Present
- Built web applications using React, TypeScript, and Node.js
- Developed REST APIs and microservices
- Implemented Docker containerization
- Used Git for version control and CI/CD

SKILLS
Technical: Python, JavaScript, TypeScript, React, Node.js, Docker, Git, AWS
Soft: Problem-solving, Communication, Teamwork, Leadership

EDUCATION
BS Computer Science | State University | 2021
```

### Sample Job Requirements
```
React, TypeScript, Node.js, Docker, REST API, Problem-solving, Communication
```

### Expected Results
- **Match Percentage:** ~85-95%
- **Matched Skills:** React, TypeScript, Node.js, Docker, REST API, Problem-solving, Communication
- **Extracted Skills:** All skills from resume
- **Suggestions:** Personalized improvement tips

---

## 🎯 Key Points to Emphasize

1. **✅ All Free Tools**
   - Flask: Free, open-source
   - spaCy: Free, open-source
   - Docker: Free tier available

2. **✅ Real AI/NLP**
   - Not just keyword matching
   - Uses linguistic analysis
   - Named entity recognition
   - Pattern matching

3. **✅ Production Ready**
   - Containerized with Docker
   - Scalable architecture
   - RESTful API design
   - Error handling

4. **✅ Real-World Application**
   - Solves HR/recruitment problem
   - Practical use case
   - Industry-relevant stack

---

## 🐛 Troubleshooting

### Problem: Port 5000 already in use
**Solution:**
```bash
PORT=5001 python3 app.py
# Then access at http://localhost:5001
```

### Problem: spaCy model not found
**Solution:**
```bash
python3 -m spacy download en_core_web_sm
```

### Problem: Module not found errors
**Solution:**
```bash
pip3 install -r requirements.txt
```

### Problem: Docker build fails
**Solution:**
```bash
# Check Docker is running
docker info

# Rebuild without cache
docker build --no-cache -t ai-resume-analyzer .
```

### Problem: React frontend can't connect to Flask
**Solution:**
1. Make sure Flask is running on port 5000
2. Check CORS is enabled (it should be in app.py)
3. Verify Flask backend is accessible: `curl http://localhost:5000/health`

---

## ✅ Checklist Before Demo

- [ ] Python 3.9+ installed
- [ ] Dependencies installed (`pip3 install -r requirements.txt`)
- [ ] spaCy model downloaded (`python3 -m spacy download en_core_web_sm`)
- [ ] Flask backend runs without errors
- [ ] Health check works (`curl http://localhost:5000/health`)
- [ ] Web interface accessible in browser
- [ ] Sample resume analysis works
- [ ] Docker image builds (if doing Docker demo)
- [ ] Container runs successfully (if doing Docker demo)

---

## 🎉 You're Ready!

Follow any of the three options above:
- **Option 1** for fastest setup (Flask only)
- **Option 2** for beautiful UI (Flask + React)
- **Option 3** for containerization demo (Docker)

**Good luck with your demo! 🚀**

