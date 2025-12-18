# CAR_WEB_ - LuxeLese Car Rental System

A complete car rental management system with separate customer-facing and admin applications.

## Project Structure

```
CAR_WEB_/
├── vite-react-app/
│   └── projects/
│       ├── admin/                      (Admin Dashboard Project)
│       │   ├── src/
│       │   │   ├── frontend/
│       │   │   │   ├── pages/
│       │   │   │   │   ├── AdminDashboard.jsx
│       │   │   │   │   ├── AdminDashboard.css
│       │   │   │   │   └── Dashboard.jsx
│       │   │   │   ├── main.jsx
│       │   │   │   └── index.css
│       │   │   └── backend/
│       │   │       ├── server.js
│       │   │       ├── controllers/
│       │   │       │   └── adminController.js
│       │   │       ├── models/
│       │   │       │   └── Admin.js
│       │   │       └── routes/
│       │   │           └── adminRoutes.js
│       │   ├── index.html
│       │   ├── package.json
│       │   ├── vite.config.js
│       │   └── README.md
│       │
│       └── LuxeLese_Solutions/         (Main Car Rental Project)
│           ├── frontend/
│           │   ├── src/
│           │   │   ├── main.jsx
│           │   │   ├── setupTests.js
│           │   │   ├── App.jsx
│           │   │   ├── index.css
│           │   │   ├── assets/          (Images & static files)
│           │   │   ├── components/
│           │   │   │   ├── Navbar/
│           │   │   │   ├── Footer/
│           │   │   │   ├── WelcomeBox/
│           │   │   │   ├── ServiceBar/
│           │   │   │   ├── VehicleTypes/
│           │   │   │   ├── Tranding/
│           │   │   │   ├── MemorableMoments/
│           │   │   │   ├── ReviewBox/
│           │   │   │   ├── UserStats/
│           │   │   │   └── homepagecard/
│           │   │   └── pages/
│           │   │       ├── Home.jsx
│           │   │       ├── About.jsx
│           │   │       ├── Contact.jsx
│           │   │       ├── booking.jsx
│           │   │       └── Auth/
│           │   │           ├── SignIn.jsx
│           │   │           └── Register.jsx
│           │   ├── assets/              (Videos: rent.mp4, hire.mp4, etc.)
│           │   ├── public/
│           │   ├── index.html
│           │   ├── package.json
│           │   └── vite.config.js
│           │
│           └── backend/
│               ├── server.js
│               ├── app.js
│               ├── config/
│               │   └── database.js
│               ├── controllers/
│               │   ├── authController.js
│               │   └── carController.js
│               ├── models/
│               │   ├── User.js
│               │   └── Car.js
│               ├── routes/
│               │   ├── authRoutes.js
│               │   └── carRoutes.js
│               ├── middlewares/
│               │   └── authMiddleware.js
│               ├── services/
│               │   └── carService.js
│               ├── package.json
│               └── .env.example
```

## Applications

### 1. LuxeLese_Solutions (Main Car Rental Application)
The customer-facing application for browsing and booking luxury cars.

**Features:**
- Browse available vehicles
- User authentication and registration
- Car booking system
- Contact and about pages
- Responsive design

**Ports:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### 2. Admin Dashboard
Administrative interface for managing the car rental business.

**Features:**
- Dashboard with statistics
- Manage car inventory
- View and manage bookings
- User management
- Revenue tracking

**Ports:**
- Frontend: http://localhost:5174
- Backend: http://localhost:5001

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Setup Instructions

#### 1. LuxeLese_Solutions Frontend
```bash
cd vite-react-app/LuxeLese_Solutions/frontend
npm install
npm run dev
```

#### 2. LuxeLese_Solutions Backend
```bash
cd vite-react-app/LuxeLese_Solutions/backend
npm install
# Create .env file from .env.example and configure
npm run dev
```

#### 3. Admin Dashboard Frontend
```bash
cd vite-react-app/admin
npm install
npm run dev
```

#### 4. Admin Dashboard Backend
```bash
cd vite-react-app/admin/src/backend
# Create .env file from .env.example and configure
node server.js
```

## Environment Variables

### LuxeLese Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luxelese_car_rental
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Admin Backend (.env)
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/luxelese_admin
JWT_SECRET=your_admin_jwt_secret_key_here
NODE_ENV=development
```

## Technologies Used

### Frontend
- React 19
- Vite
- React Router DOM
- Bootstrap & Reactstrap
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt.js

## Development

### Running All Services
You can run all services simultaneously using separate terminal windows:

1. Terminal 1: LuxeLese Frontend
2. Terminal 2: LuxeLese Backend
3. Terminal 3: Admin Frontend
4. Terminal 4: Admin Backend

## Project Status
✅ Project structure created
✅ Frontend applications set up
✅ Backend APIs configured
✅ All necessary files in place

## Next Steps
1. Install dependencies for each application
2. Configure environment variables
3. Set up MongoDB database
4. Run and test all applications

## License
Private - All rights reserved

## Support
For support, contact the development team.
