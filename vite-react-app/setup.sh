#!/bin/bash

# LuxeLese Solutions - Project Setup Script
# This script helps set up all components of the project

echo "🚗 LuxeLese Car Rental System - Setup Script"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Setup LuxeLese Frontend
echo "${BLUE}1. Setting up LuxeLese Solutions Frontend...${NC}"
cd LuxeLese_Solutions/frontend
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo "${YELLOW}⚠️  Dependencies already installed${NC}"
fi
cd ../..
echo ""

# Setup LuxeLese Backend
echo "${BLUE}2. Setting up LuxeLese Solutions Backend...${NC}"
cd LuxeLese_Solutions/backend
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo "${YELLOW}⚠️  Dependencies already installed${NC}"
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "${YELLOW}⚠️  Please configure your .env file with proper values${NC}"
fi
cd ../..
echo ""

# Setup Admin Frontend
echo "${BLUE}3. Setting up Admin Dashboard Frontend...${NC}"
cd admin
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo "${GREEN}✅ Admin frontend dependencies installed${NC}"
else
    echo "${YELLOW}⚠️  Dependencies already installed${NC}"
fi

if [ ! -f ".env" ]; then
    cp .env.example .env 2>/dev/null || true
fi
cd ..
echo ""

# Summary
echo "${GREEN}=============================================="
echo "✅ Setup Complete!"
echo "==============================================${NC}"
echo ""
echo "📚 Next Steps:"
echo ""
echo "1️⃣  Configure environment variables:"
echo "   - LuxeLese_Solutions/backend/.env"
echo "   - admin/.env"
echo ""
echo "2️⃣  Start MongoDB:"
echo "   ${YELLOW}mongod${NC}"
echo ""
echo "3️⃣  Start LuxeLese Backend:"
echo "   ${YELLOW}cd LuxeLese_Solutions/backend && npm run dev${NC}"
echo ""
echo "4️⃣  Start LuxeLese Frontend:"
echo "   ${YELLOW}cd LuxeLese_Solutions/frontend && npm run dev${NC}"
echo ""
echo "5️⃣  Start Admin Backend:"
echo "   ${YELLOW}cd admin/src/backend && node server.js${NC}"
echo ""
echo "6️⃣  Start Admin Frontend:"
echo "   ${YELLOW}cd admin && npm run dev${NC}"
echo ""
echo "🌐 Access URLs:"
echo "   Customer App: ${BLUE}http://localhost:5173${NC}"
echo "   Admin Dashboard: ${BLUE}http://localhost:5174${NC}"
echo "   Main API: ${BLUE}http://localhost:5000${NC}"
echo "   Admin API: ${BLUE}http://localhost:5001${NC}"
echo ""
echo "📖 For more information, see docs/PROJECT_STRUCTURE.md"
