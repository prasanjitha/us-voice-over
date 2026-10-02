# Quick Start Guide

Get your voice cloning app running in 3 steps!

## Step 1: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
cd ..
```

**Time**: 2-5 minutes  
**Download**: ~500MB

## Step 2: Start the Backend Server

**Option A: Using the script (Recommended)**
```bash
./start-backend.sh
```

**Option B: Manual**
```bash
cd backend
python main.py
```

**Wait for**: "TTS model loaded successfully!" message

⏱️ **First run**: 5-10 minutes (downloads XTTS model ~1.8GB)  
⏱️ **Subsequent runs**: 30-60 seconds

Leave this terminal running!

## Step 3: Start the Frontend Server

Open a **NEW terminal** and run:

**Option A: Using the script (Recommended)**
```bash
./start-frontend.sh
```

**Option B: Manual**
```bash
cd frontend
npm install  # Only needed first time
npm run dev
```

## Step 4: Use the App!

1. Open browser: **http://localhost:3000**
2. Upload a voice sample (6+ seconds audio)
3. Enter text to generate
4. Click generate and download!

## Common Issues

### "Port 8000 already in use"
```bash
# Kill the process using port 8000
sudo lsof -ti:8000 | xargs kill -9
```

### "Port 3000 already in use"
```bash
# Kill the process using port 3000
sudo lsof -ti:3000 | xargs kill -9
```

### Backend won't start
```bash
# Make sure you have Python 3.9+
python3 --version

# Reinstall dependencies
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Model download is slow
Just be patient! The XTTS model is 1.8GB and only downloads once.

## Tips

- **First generation takes longer** (20-30 seconds) as model loads into memory
- **Use clear audio** samples without background noise
- **6-10 second samples** work best for voice cloning
- **WAV format** is preferred over MP3

## System Requirements

- **RAM**: 4GB minimum, 8GB recommended
- **Disk**: 3GB free space
- **CPU**: Modern multi-core processor
- **GPU**: Optional (will use if available via PyTorch)

## Architecture

```
Browser (localhost:3000)
    ↓
Next.js Frontend
    ↓
FastAPI Backend (localhost:8000)
    ↓
Coqui TTS (XTTS v2)
    ↓
Generated Audio Files
```

Enjoy your voice cloning app! 🎤✨
