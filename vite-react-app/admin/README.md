# LuxeLese Admin Dashboard

Admin dashboard for managing the LuxeLese Car Rental System.

## Project Structure

```
admin/
├── src/
│   ├── frontend/              # React admin frontend
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminDashboard.css
│   │   │   └── Dashboard.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── backend/               # Admin API backend
│       ├── server.js
│       ├── controllers/
│       │   └── adminController.js
│       ├── models/
│       │   └── Admin.js
│       └── routes/
│           └── adminRoutes.js
├── index.html
├── package.json
└── vite.config.js
```

## Setup Instructions

### Frontend Setup
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Access at: http://localhost:5174

### Backend Setup
1. Navigate to backend: `cd src/backend`
2. Create `.env` file based on `.env.example`
3. Start the API server: `node server.js`
4. API runs on: http://localhost:5001

## Features
- Dashboard overview with statistics
- Manage cars inventory
- View and manage bookings
- User management
- Revenue reports
- Admin authentication

## Technologies Used
- **Frontend**: React, Vite, React Router
- **Backend**: Node.js, Express
- **Styling**: Custom CSS
