# ⚡ Quick Start Guide - AI Resume Analyzer

## For Demo/Presentation

### Step 1: Setup (2 minutes)

```bash
# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm
```

### Step 2: Run Flask App (30 seconds)

```bash
python app.py
```

**Expected Output**:
```
✓ spaCy model loaded successfully
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

**Note**: If port 5000 is in use (e.g., macOS AirPlay), set `PORT=5001` environment variable:
```bash
PORT=5001 python3 app.py
```

### Step 3: Test API (1 minute)

**Open new terminal** and run:

```bash
# Test health (use 5000 or 5001 depending on what port you used)
curl http://localhost:5000/health

# Test analysis
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Software Engineer with 5 years experience in Python, Flask, Docker. Strong problem-solving skills.",
    "jobRequirements": "Python, Flask, Docker, Problem-solving"
  }'
```

### Step 4: Docker Demo (2 minutes)

```bash
# Build image
docker build -t ai-resume-analyzer .

# Run container (maps host port 5001 to container port 5000)
docker run -d -p 5001:5000 --name analyzer ai-resume-analyzer

# Test (access on host port 5001)
curl http://localhost:5001/health
```

---

## 📋 What to Say During Demo

1. **"This uses Flask for the backend"** → Show `app.py` Flask imports
2. **"spaCy NLP for intelligent analysis"** → Show `nlp = spacy.load(...)`
3. **"Docker containerized"** → Show Dockerfile, build and run
4. **"All free tools"** → Show requirements.txt
5. **"Automated AI analysis"** → Show API response with extracted skills
6. **"Production ready"** → Show Docker container running

**Total Demo Time**: ~5-7 minutes

