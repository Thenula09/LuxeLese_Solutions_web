# LuxeLese Solutions - Car Rental System

A full-stack car rental application built with React, Node.js, Express, and MongoDB.

## Project Structure

```
LuxeLese_Solutions/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Images and static files
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── backend/           # Node.js/Express backend API
    ├── config/        # Configuration files
    ├── controllers/   # Request handlers
    ├── models/        # Database models
    ├── routes/        # API routes
    ├── middlewares/   # Custom middlewares
    ├── services/      # Business logic
    ├── server.js      # Server entry point
    └── package.json
```

## Setup Instructions

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file based on `.env.example`
4. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Features
- User authentication and authorization
- Car browsing and filtering
- Booking management
- Admin dashboard
- Responsive design

## Technologies Used
- **Frontend**: React, Vite, React Router, Bootstrap, Reactstrap
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
