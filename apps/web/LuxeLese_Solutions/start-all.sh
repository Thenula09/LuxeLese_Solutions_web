#!/bin/bash

# LuxeLese Solutions - Complete Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting LuxeLese Solutions..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
    return $?
}

# Check and start Backend
echo -e "${BLUE}📦 Checking Backend (Port 5002)...${NC}"
if check_port 5002; then
    echo -e "${GREEN}✅ Backend is already running on port 5002${NC}"
else
    echo -e "${YELLOW}⚙️  Starting Backend Server...${NC}"
    cd backend
    npm start &
    BACKEND_PID=$!
    sleep 3
    cd ..
    echo -e "${GREEN}✅ Backend started on port 5002${NC}"
fi

echo ""

# Check and start Frontend
echo -e "${BLUE}🎨 Checking Frontend (Port 5174)...${NC}"
if check_port 5174; then
    echo -e "${GREEN}✅ Frontend is already running on port 5174${NC}"
elif check_port 5173; then
    echo -e "${GREEN}✅ Frontend is already running on port 5173${NC}"
else
    echo -e "${YELLOW}⚙️  Starting Frontend Server...${NC}"
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    sleep 3
    cd ..
    echo -e "${GREEN}✅ Frontend started${NC}"
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 LuxeLese Solutions is Ready!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📡 Backend API:${NC}  http://localhost:5002"
echo -e "${BLUE}🌐 Frontend:${NC}     http://localhost:5174"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "   • Press Ctrl+C to stop all servers"
echo "   • Visit http://localhost:5174 to start using the app"
echo "   • Check logs in terminals for any issues"
echo ""

# Wait for user to stop
wait
