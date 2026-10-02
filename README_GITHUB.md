# 🎤 Voice Cloning & Text-to-Speech Web App

A free, local voice cloning and text-to-speech application using Next.js and Coqui TTS. No API keys required, runs 100% offline!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.9+-blue.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)
![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-lightgrey.svg)

## ✨ Features

- 🎤 **Voice Cloning**: Upload audio samples to create custom voice profiles
- 🗣️ **Text-to-Speech**: Generate natural speech from text in 15+ languages
- 💾 **Database Integration**: SQLite database for storing voice profiles and history
- 🆓 **100% Free**: No API keys, no subscriptions, completely free
- 🏠 **Privacy First**: Everything runs locally, your data never leaves your machine
- 🌍 **Multi-language**: English, Spanish, French, German, Italian, Portuguese, and more!

## 🚀 Quick Start

### Prerequisites

- Python 3.9+ and pip
- Node.js 18+ and npm
- 4GB RAM (8GB recommended)
- 3GB free disk space

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/voiceover.git
cd voiceover

# Install backend dependencies
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Running the App

**Terminal 1 - Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
./start-frontend.sh
```

**Browser:**
```
http://localhost:3000
```

**First run**: The XTTS model (~1.8GB) will be downloaded automatically. This takes 5-10 minutes.

## 📖 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[INSTALL.md](INSTALL.md)** - Detailed installation guide
- **[MAC_SETUP.md](MAC_SETUP.md)** - macOS specific setup
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling

### Backend
- **FastAPI** - Modern Python web framework
- **Coqui TTS (XTTS v2)** - State-of-the-art voice cloning
- **SQLite** - Lightweight database
- **PyTorch** - Deep learning framework

## 🎯 Use Cases

- Create audiobooks with custom voices
- Generate voiceovers for videos
- Accessibility tools (text to speech)
- Language learning
- Content creation
- Voice acting prototypes

## 📊 Performance

| Platform | Generation Time | Notes |
|----------|----------------|-------|
| CPU (4+ cores) | 10-20 seconds | Works great! |
| NVIDIA GPU | 3-5 seconds | Automatic detection |
| Apple M1/M2/M3 | 5-10 seconds | Neural Engine acceleration |

## 🔒 Privacy & Security

- ✅ **100% Local**: All processing happens on your machine
- ✅ **No Cloud**: No data sent to external servers
- ✅ **No Tracking**: No analytics or telemetry
- ✅ **Offline Capable**: Works without internet (after initial setup)

## 📸 Screenshots

### Voice Cloning Interface
Upload audio samples to create custom voice profiles.

### Text-to-Speech Generator
Generate speech in multiple languages with cloned or default voices.

### Audio Management
Save, play, and download generated audio files.

## 🌍 Supported Languages

English, Spanish, French, German, Italian, Portuguese, Polish, Turkish, Russian, Dutch, Czech, Arabic, Chinese (Mandarin), Japanese, Korean, and more!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Disclaimer

This tool is for **personal and educational use only**. 

**Important**:
- Get permission before cloning someone's voice
- Do not use for impersonation or malicious purposes
- Respect privacy and intellectual property rights
- Some uses may have legal implications

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- [Coqui TTS](https://github.com/coqui-ai/TTS) - Amazing open-source TTS engine
- [Next.js](https://nextjs.org/) - React framework
- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework

## 🐛 Issues

Found a bug? Have a feature request? [Open an issue](https://github.com/YOUR_USERNAME/voiceover/issues)

## ⭐ Star History

If you find this project useful, please consider giving it a star!

---

**Built with ❤️ using free and open-source technologies**
