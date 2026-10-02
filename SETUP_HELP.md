# Setup Help - You Need These Commands!

## ⚠️ Important: Install System Packages First

Your system is missing `pip` and `venv`. You need to install them first.

### Step 1: Open Terminal and Run This

```bash
sudo apt install -y python3-pip python3-venv
```

You'll be asked for your password. Type it and press Enter.

### Step 2: Verify Installation

```bash
python3 --version      # Should show Python 3.x.x
python3 -m pip --version   # Should show pip version
```

### Step 3: Install Backend Dependencies

Now you can run one of these:

#### Easy Way (Recommended):
```bash
cd /home/nirmal/Desktop/voiceover
./start-backend.sh
```

#### Manual Way:
```bash
cd /home/nirmal/Desktop/voiceover/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

This will take 5-10 minutes and download ~500MB of packages.

### Step 4: Start the Backend

If using manual way:
```bash
cd /home/nirmal/Desktop/voiceover/backend
source venv/bin/activate
python main.py
```

Wait for: **"TTS model loaded successfully!"** (first time takes 5-10 minutes)

### Step 5: Start Frontend (New Terminal)

```bash
cd /home/nirmal/Desktop/voiceover
./start-frontend.sh
```

Or manually:
```bash
cd /home/nirmal/Desktop/voiceover/frontend
npm install  # First time only
npm run dev
```

### Step 6: Open Browser

Go to: **http://localhost:3000**

---

## Quick Check: Are You Ready?

Run this to check what you have installed:

```bash
cd /home/nirmal/Desktop/voiceover
./check-setup.sh
```

---

## Why Do I Need sudo?

- `sudo apt install` installs system packages
- This is required only once
- After this, everything runs without sudo
- The app runs locally on your machine

---

## Still Having Issues?

### "pip: command not found"
- Run: `sudo apt install python3-pip`

### "No module named venv"
- Run: `sudo apt install python3-venv`

### "Permission denied on scripts"
- Run: `chmod +x *.sh`

### "Port already in use"
- Kill the process: `sudo lsof -ti:8000 | xargs kill -9`

---

## What Gets Installed?

### System (one-time):
- python3-pip (~10MB)
- python3-venv (~5MB)

### Backend (first time):
- Python packages (~500MB)
- XTTS model (~1.8GB downloaded on first run)

### Frontend (first time):
- Node packages (~200MB)

**Total disk space needed**: ~3GB

---

## Alternative: Docker (If You Prefer)

If you'd prefer to avoid installing Python packages directly, I can create a Docker setup instead. Let me know!
