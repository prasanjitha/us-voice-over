# Installation Guide

Complete installation instructions for the Voice Cloning App.

## System Requirements

- **OS**: Linux (Ubuntu/Debian recommended), macOS, or Windows with WSL2
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 3GB free
- **Internet**: Required for initial setup and model downloads

## Step-by-Step Installation

### 1. Install System Dependencies

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-venv nodejs npm git
```

#### Fedora/RHEL:
```bash
sudo dnf install -y python3 python3-pip nodejs npm git
```

#### macOS (using Homebrew):
```bash
brew install python3 node git
```

#### Check installations:
```bash
python3 --version  # Should be 3.9+
node --version     # Should be 18+
npm --version
pip3 --version
```

### 2. Clone or Navigate to Project

If you haven't already:
```bash
cd /home/nirmal/Desktop/voiceover
```

### 3. Install Python Dependencies

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Linux/Mac
# OR
venv\Scripts\activate     # On Windows

# Upgrade pip
pip install --upgrade pip

# Install dependencies (this will take 5-10 minutes)
pip install -r requirements.txt

cd ..
```

**Common Issues:**

- **"No module named pip"**: Run `sudo apt install python3-pip`
- **"No module named venv"**: Run `sudo apt install python3-venv`
- **Torch installation fails**: Make sure you have enough disk space (2GB+)

### 4. Install Node.js Dependencies

```bash
cd frontend
npm install
cd ..
```

This will install all Next.js dependencies (~200MB).

### 5. Verify Installation

```bash
./check-setup.sh
```

This will verify all dependencies are installed correctly.

## First Run

### Start Backend (Terminal 1)

```bash
./start-backend.sh
```

**First run will**:
- Download XTTS v2 model (~1.8GB) - takes 5-10 minutes
- Initialize SQLite database
- Start FastAPI server on port 8000

**Wait for**: `TTS model loaded successfully!`

### Start Frontend (Terminal 2)

Open a new terminal:

```bash
./start-frontend.sh
```

This starts Next.js on port 3000.

### Access the App

Open browser: **http://localhost:3000**

## Manual Installation (Alternative)

If the scripts don't work, follow these manual steps:

### Backend:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn python-multipart TTS pydantic sqlalchemy aiosqlite numpy torch torchaudio
python main.py
```

### Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Port Already in Use

**Backend (8000):**
```bash
sudo lsof -ti:8000 | xargs kill -9
```

**Frontend (3000):**
```bash
sudo lsof -ti:3000 | xargs kill -9
```

### Virtual Environment Issues

If activation fails:
```bash
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Model Download Fails

If XTTS download fails:
```bash
# Clear cache
rm -rf ~/.local/share/tts

# Try manual download
python3 -c "from TTS.api import TTS; TTS('tts_models/multilingual/multi-dataset/xtts_v2')"
```

### Memory Issues

If you run out of memory:
- Close other applications
- Restart your computer
- Upgrade to 8GB+ RAM

### Permission Denied on Scripts

```bash
chmod +x start-backend.sh start-frontend.sh check-setup.sh
```

### Import Errors

```bash
# Reinstall with --force-reinstall
cd backend
source venv/bin/activate
pip install --force-reinstall -r requirements.txt
```

## Updating

To update dependencies:

```bash
# Backend
cd backend
source venv/bin/activate
pip install --upgrade -r requirements.txt

# Frontend
cd frontend
npm update
```

## Uninstalling

To remove everything:

```bash
# Remove Python virtual environment
rm -rf backend/venv

# Remove Node modules
rm -rf frontend/node_modules

# Remove generated files
rm -rf uploads generated
rm voiceover.db

# Remove model cache
rm -rf ~/.local/share/tts
```

## Next Steps

Once installed, see [QUICKSTART.md](QUICKSTART.md) for usage instructions!
