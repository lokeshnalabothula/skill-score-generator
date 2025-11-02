# 📥 Setup Instructions After Cloning from GitHub

## Step-by-Step Guide to Run the Project

---

## 📋 Prerequisites Check

First, verify you have the required tools:

```bash
# Check Python
python3 --version  # Should be 3.9 or higher

# Check pip
pip3 --version

# Check Docker (optional, for containerization)
docker --version

# Check Git
git --version
```

---

## 🚀 Installation Steps

### Step 1: Clone Repository (if not already cloned)

```bash
git clone <your-repo-url>
cd skill-score-generator
```

### Step 2: Install Python Dependencies

```bash
# Install Flask, spaCy, and other packages
pip3 install -r requirements.txt
```

**Expected output:**
```
Collecting Flask==3.0.0
Collecting flask-cors==4.0.0
Collecting spacy==3.7.2
...
Successfully installed Flask-3.0.0 flask-cors-4.0.0 spacy-3.7.2 ...
```

### Step 3: Download spaCy English Model

```bash
python3 -m spacy download en_core_web_sm
```

**Expected output:**
```
✔ Download and installation successful
You can now load the package via spacy.load('en_core_web_sm')
```

---

## 🏃 Running the Application

### Method 1: Local Python (Recommended for Development)

```bash
python3 app.py
```

**You should see:**
```
✓ spaCy model loaded successfully
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5001
 * Running on http://192.168.x.x:5001
```

**Then open browser:**
```
http://localhost:5001
```

### Method 2: Docker Container (Recommended for Production)

#### Build Docker Image:
```bash
docker build -t ai-resume-analyzer .
```

**This will:**
- Download Python base image (Linux)
- Install all dependencies
- Download spaCy model
- Copy application files

#### Run Container:
```bash
docker run -d -p 5001:5001 --name resume-analyzer ai-resume-analyzer
```

**Verify it's running:**
```bash
docker ps
```

**View logs:**
```bash
docker logs resume-analyzer
```

**Access application:**
```
http://localhost:5001
```

### Method 3: Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## ✅ Verification

### Test the Application:

```bash
# Health check
curl http://localhost:5001/health

# Should return:
# {"status":"healthy","spacy_loaded":true,"pdf_support":true,...}
```

### Test Resume Analysis:

```bash
curl -X POST http://localhost:5001/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Software Engineer with Python and Flask experience.",
    "jobRequirements": "Python, Flask, Docker"
  }'
```

---

## 🐛 Troubleshooting

### Issue: Python not found

**Solution:**
```bash
# On Ubuntu/Debian
sudo apt-get update
sudo apt-get install python3 python3-pip

# On CentOS/RHEL
sudo yum install python3 python3-pip

# On macOS
brew install python3
```

### Issue: pip not found

**Solution:**
```bash
# Install pip
python3 -m ensurepip --upgrade

# Or
sudo apt-get install python3-pip
```

### Issue: spaCy model not found

**Solution:**
```bash
python3 -m spacy download en_core_web_sm

# If that fails:
pip3 install --upgrade spacy
python3 -m spacy download en_core_web_sm
```

### Issue: Port 5001 already in use

**Solution:**
```bash
# Find what's using the port
sudo lsof -i :5001
# or
sudo netstat -tulpn | grep 5001

# Kill the process
sudo kill -9 <PID>

# Or use a different port
# Edit app.py, change port number
```

### Issue: Docker not found

**Solution:**
```bash
# Install Docker
# Ubuntu/Debian:
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group (optional)
sudo usermod -aG docker $USER
# Then logout and login again
```

### Issue: Permission denied errors

**Solution:**
```bash
# For Python packages
pip3 install --user -r requirements.txt

# For Docker
sudo docker build -t ai-resume-analyzer .
sudo docker run -d -p 5001:5001 ai-resume-analyzer
```

---

## 📁 File Structure After Clone

```
skill-score-generator/
├── app.py                    # ✅ Main Flask application
├── requirements.txt          # ✅ Python dependencies
├── Dockerfile                # ✅ Docker image definition
├── docker-compose.yml        # ✅ Docker Compose config
├── static/
│   └── index.html           # ✅ Web interface
├── README.md                # ✅ This file
└── ...
```

---

## 🎯 Quick Start (TL;DR)

```bash
# 1. Clone
git clone <repo-url>
cd skill-score-generator

# 2. Install
pip3 install -r requirements.txt
python3 -m spacy download en_core_web_sm

# 3. Run
python3 app.py

# 4. Open
# Browser: http://localhost:5001
```

---

## 🌐 Network Access

### From Same Computer:
```
http://localhost:5001
http://127.0.0.1:5001
```

### From Other Devices (Same Network):
```
http://192.168.x.x:5001
```
(Replace `x.x` with your computer's IP address)

**Find your IP:**
```bash
# Linux
hostname -I
# or
ip addr show

# macOS
ifconfig | grep "inet "

# Windows
ipconfig
```

---

## 📝 Next Steps

1. ✅ Application is running
2. ✅ Open `http://localhost:5001`
3. ✅ Upload or paste your resume
4. ✅ Enter job requirements
5. ✅ Click "Analyze Resume"
6. ✅ View results!

---

**Project is ready to use! 🚀**

