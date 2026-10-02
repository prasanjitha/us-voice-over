#!/bin/bash

echo "Starting Voice Cloning Frontend..."
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

# Navigate to frontend directory
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies... This may take a few minutes."
    npm install
fi

echo ""
echo "Starting Next.js server on http://localhost:3000"
echo "Press Ctrl+C to stop"
echo ""

npm run dev
