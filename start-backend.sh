#!/bin/bash

echo "Starting Voice Cloning Backend..."
echo "=================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    echo "Install: sudo apt install python3"
    exit 1
fi

# Check if pip is available
if ! python3 -m pip --version &> /dev/null; then
    echo "Error: pip is not installed"
    echo "Install: sudo apt install python3-pip python3-venv"
    exit 1
fi

# Navigate to backend directory
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "Error: Failed to create virtual environment"
        echo "Try: sudo apt install python3-venv"
        exit 1
    fi
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
if [ ! -f "venv/installed" ]; then
    echo "Installing dependencies... This may take a few minutes."
    pip install --upgrade pip
    pip install -r requirements.txt
    if [ $? -eq 0 ]; then
        touch venv/installed
        echo "Dependencies installed successfully!"
    else
        echo "Error: Failed to install dependencies"
        exit 1
    fi
fi

echo ""
echo "Starting FastAPI server on http://localhost:8000"
echo "First run will download XTTS model (~1.8GB)"
echo "Press Ctrl+C to stop"
echo ""

python3 main.py
