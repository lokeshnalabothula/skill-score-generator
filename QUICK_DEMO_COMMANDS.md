# ⚡ Quick Demo Commands

## Important: Use `pip3` and `python3` (not `pip` or `python`)

---

## ✅ Setup (Already Done!)
```bash
pip3 install -r requirements.txt
python3 -m spacy download en_core_web_sm
```

---

## 🚀 Run the Application

```bash
python3 app.py
```

**Expected Output**:
```
✓ spaCy model loaded successfully
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
```

**Note**: If port 5000 is busy (macOS AirPlay), use port 5001:
```bash
PORT=5001 python3 app.py
```

---

## 🧪 Test the API

**Open a NEW terminal window** and run:

### 1. Health Check
```bash
# Default port 5000
curl http://localhost:5000/health

# Or if using port 5001
curl http://localhost:5001/health
```

### 2. Test Resume Analysis
```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Software Engineer with 5 years experience in Python, Flask, Docker. Strong problem-solving and communication skills.",
    "jobRequirements": "Python, Flask, Docker, Problem-solving"
  }'
```

---

## 🐳 Docker Commands

### Build Docker Image
```bash
docker build -t ai-resume-analyzer .
```

### Run Container
```bash
# Map host port 5001 to container port 5000 (avoids macOS AirPlay conflict)
docker run -d -p 5001:5000 --name analyzer ai-resume-analyzer
```

### Test Container
```bash
# Access on host port 5001
curl http://localhost:5001/health
```

---

## 📝 Key Commands Summary

| Command | What it does |
|---------|-------------|
| `python3 app.py` | Run Flask application |
| `pip3 install ...` | Install Python packages |
| `python3 -m spacy download ...` | Download spaCy model |
| `docker build ...` | Build Docker image |
| `docker run ...` | Run Docker container |

---

**Remember**: Always use `python3` and `pip3` on macOS!

