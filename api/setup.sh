#!/bin/bash

echo "🔧 Setting up OSINT Tools Integration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Python is installed
if ! command_exists python3; then
    echo -e "${RED}❌ Python 3 is not installed. Please install Python 3 first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Python 3 found${NC}"

# Install Sherlock dependencies
echo -e "${YELLOW}📦 Installing Sherlock dependencies...${NC}"
cd ../referance/sherlock
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt
else
    pip3 install requests requests-futures colorama
fi

# Install Inspector dependencies
echo -e "${YELLOW}📦 Installing Inspector dependencies...${NC}"
cd ../Inspector
pip3 install -r requirements.txt

# Go back to API directory
cd ../../snapshot-web-app/api

echo -e "${GREEN}✅ All dependencies installed successfully!${NC}"
echo -e "${YELLOW}🚀 You can now start the API server with: npm start${NC}"