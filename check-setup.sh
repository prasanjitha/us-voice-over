#!/bin/bash

echo "Voice Cloning App - Setup Checker"
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Python
echo -n "Checking Python 3... "
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    echo -e "${GREEN}✓${NC} Found Python $PYTHON_VERSION"
else
    echo -e "${RED}✗${NC} Python 3 not found"
    echo "  Install: sudo apt install python3 python3-pip"
    exit 1
fi

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Found Node.js $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    echo "  Install from: https://nodejs.org/"
    exit 1
fi

# Check pip
echo -n "Checking pip... "
if command -v pip3 &> /dev/null; then
    PIP_VERSION=$(pip3 --version | cut -d' ' -f2)
    echo -e "${GREEN}✓${NC} Found pip $PIP_VERSION"
else
    echo -e "${RED}✗${NC} pip not found"
    echo "  Install: sudo apt install python3-pip"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} Found npm $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

echo ""
echo "Directory Structure:"
echo "-------------------"

# Check directories
for dir in backend frontend uploads generated; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir/"
    else
        echo -e "${RED}✗${NC} $dir/ (missing)"
    fi
done

echo ""
echo "Backend Files:"
echo "-------------"
for file in backend/main.py backend/database.py backend/requirements.txt; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (missing)"
    fi
done

echo ""
echo "Frontend Files:"
echo "--------------"
for file in frontend/package.json frontend/app/page.tsx frontend/lib/api.ts; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (missing)"
    fi
done

echo ""
echo "Checking installed dependencies..."
echo "---------------------------------"

# Check Python dependencies
echo -n "Python dependencies... "
if [ -d "backend/venv" ]; then
    echo -e "${GREEN}✓${NC} Virtual environment exists"
else
    echo -e "${YELLOW}○${NC} Not installed yet"
    echo "  Run: cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
fi

# Check Node dependencies
echo -n "Node dependencies... "
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}○${NC} Not installed yet"
    echo "  Run: cd frontend && npm install"
fi

echo ""
echo "Disk Space:"
echo "----------"
AVAILABLE=$(df -h . | awk 'NR==2 {print $4}')
echo "Available: $AVAILABLE (Need: ~3GB for models)"

echo ""
echo "Next Steps:"
echo "----------"
if [ ! -d "backend/venv" ]; then
    echo "1. Install backend dependencies:"
    echo "   cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
fi
if [ ! -d "frontend/node_modules" ]; then
    echo "2. Install frontend dependencies:"
    echo "   cd frontend && npm install"
fi
echo ""
echo "3. Start the app:"
echo "   Terminal 1: ./start-backend.sh"
echo "   Terminal 2: ./start-frontend.sh"
echo ""
echo "See QUICKSTART.md for detailed instructions!"
