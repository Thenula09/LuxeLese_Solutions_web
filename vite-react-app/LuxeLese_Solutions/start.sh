#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting LuxeLese Solutions...${NC}\n"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if backend dependencies are installed
if [ ! -d "$SCRIPT_DIR/backend/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
    cd "$SCRIPT_DIR/backend"
    npm install
fi

# Check if frontend dependencies are installed
if [ ! -d "$SCRIPT_DIR/frontend/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
    cd "$SCRIPT_DIR/frontend"
    npm install
fi

echo -e "${GREEN}✅ Dependencies ready!${NC}\n"

# Start backend in background
echo -e "${BLUE}🔧 Starting Backend Server...${NC}"
cd "$SCRIPT_DIR/backend"
npm run dev > backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend started (PID: $BACKEND_PID)${NC}"
echo -e "${GREEN}   Backend: http://localhost:5000${NC}\n"

# Wait a bit for backend to start
sleep 2

# Start frontend
echo -e "${BLUE}🎨 Starting Frontend Server...${NC}"
cd "$SCRIPT_DIR/frontend"
echo -e "${GREEN}   Frontend: http://localhost:5173${NC}\n"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

# Trap Ctrl+C to kill both processes
trap "echo -e '\n${YELLOW}Stopping servers...${NC}'; kill $BACKEND_PID 2>/dev/null; exit" INT TERM

npm run dev

# If frontend stops, kill backend too
kill $BACKEND_PID 2>/dev/null
