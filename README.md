# Voice Cloning & Text-to-Speech Web App

A free, local voice cloning and text-to-speech application using Next.js and Coqui TTS (XTTS model).

## Features

- 🎤 **Voice Cloning**: Upload audio samples to create custom voice profiles
- 🗣️ **Text-to-Speech**: Generate natural speech from text in multiple languages
- 💾 **Database Integration**: SQLite database for storing voice profiles
- 🆓 **100% Free**: No API keys required, runs completely offline
- 🏠 **Local First**: Everything runs on your machine

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: FastAPI (Python)
- **TTS Engine**: Coqui TTS with XTTS v2 model
- **Database**: SQLite
- **Audio Processing**: PyTorch, TorchAudio

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+ and pip
- At least 4GB RAM (8GB recommended for better performance)
- ~2GB disk space for model downloads

## Installation

### Prerequisites Check

First, install system dependencies:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y python3 python3-pip python3-venv nodejs npm

# Verify installations
python3 --version  # Should be 3.9+
node --version     # Should be 18+
```

For detailed installation instructions, see [INSTALL.md](INSTALL.md)

### Quick Install

```bash
# 1. Install backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# 2. Install frontend
cd frontend
npm install
cd ..
```

## Running the Application

You need to run both the backend and frontend servers:

### Terminal 1 - Start Backend (FastAPI)

```bash
cd backend
python main.py
```

The backend will start on `http://localhost:8000`

**First run**: The XTTS model will be downloaded automatically. This may take 5-10 minutes depending on your internet speed.

### Terminal 2 - Start Frontend (Next.js)

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage

1. **Open your browser** and go to `http://localhost:3000`

2. **Clone a Voice**:
   - Enter a name for your voice profile
   - Optionally add a description
   - Upload an audio file (WAV or MP3, at least 6-10 seconds)
   - Click "Create Voice Profile"

3. **Generate Speech**:
   - Select a voice profile (or use default)
   - Choose a language
   - Enter your text
   - Click "Generate Speech"
   - Listen and download the generated audio

## Supported Languages

English, Spanish, French, German, Italian, Portuguese, Polish, Turkish, Russian, Dutch, Czech, Arabic, Chinese, Japanese, Korean, and more!

## Tips for Best Results

- Use clear, high-quality audio samples (16kHz or higher)
- Record at least 6-10 seconds of speech for voice cloning
- Avoid background noise in your samples
- Use natural, conversational speech
- The first generation may take 20-30 seconds as the model loads

## Project Structure

```
voiceover/
├── backend/              # FastAPI backend
│   ├── main.py          # Main API server
│   ├── database.py      # Database models
│   └── requirements.txt # Python dependencies
├── frontend/            # Next.js frontend
│   ├── app/            # App router pages
│   ├── components/     # React components
│   ├── lib/           # API client
│   └── package.json   # Node dependencies
├── uploads/           # Voice sample storage
├── generated/         # Generated audio files
└── voiceover.db      # SQLite database
```

## API Endpoints

- `POST /api/voice-profiles` - Create voice profile
- `GET /api/voice-profiles` - List all voice profiles
- `DELETE /api/voice-profiles/{id}` - Delete voice profile
- `POST /api/generate` - Generate speech from text
- `GET /api/audio/{id}` - Get generated audio file

## Troubleshooting

### Backend won't start

- Make sure Python 3.9+ is installed: `python --version`
- Install dependencies: `pip install -r backend/requirements.txt`
- Check if port 8000 is available

### Frontend won't start

- Make sure Node.js 18+ is installed: `node --version`
- Install dependencies: `npm install` in frontend directory
- Check if port 3000 is available

### Model download fails

- Check your internet connection
- Try deleting `~/.local/share/tts` and restart the backend
- Manually download from Coqui TTS GitHub

### Poor voice quality

- Use longer audio samples (10-20 seconds)
- Ensure audio is clear without background noise
- Try different audio samples
- Use higher quality source audio (WAV preferred)

## Performance

- First generation: 20-30 seconds (model loading)
- Subsequent generations: 5-10 seconds
- Voice cloning upload: Instant
- Memory usage: ~2-3GB during generation

## License

This project uses Coqui TTS which is licensed under MPL 2.0. Check individual dependencies for their licenses.

## Credits

- Coqui TTS for the amazing XTTS model
- Next.js team for the framework
- FastAPI for the backend framework

## Development

To contribute or modify:

1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Disclaimer

This tool is for personal and educational use. Ensure you have permission before cloning someone's voice. Do not use for malicious purposes or to impersonate others.
