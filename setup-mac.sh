#!/bin/bash

echo "Voice Cloning App - macOS Setup"
echo "================================"
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew not found!"
    echo "Install Homebrew first:"
    echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    exit 1
fi

echo "✅ Homebrew found"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "Installing Python 3..."
    brew install python@3.10
fi

echo "✅ Python 3 installed: $(python3 --version)"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    brew install node
fi

echo "✅ Node.js installed: $(node --version)"
echo ""

# Install backend dependencies
echo "📦 Installing Backend Dependencies..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
touch venv/installed
cd ..

echo "✅ Backend dependencies installed!"
echo ""

# Install frontend dependencies
echo "📦 Installing Frontend Dependencies..."
cd frontend
npm install
cd ..

echo "✅ Frontend dependencies installed!"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "To run the app:"
echo "  Terminal 1: ./start-backend.sh"
echo "  Terminal 2: ./start-frontend.sh"
echo "  Browser: http://localhost:3000"
echo ""
echo "Note: First run will download XTTS model (~1.8GB)"
