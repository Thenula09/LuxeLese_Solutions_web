# LuxeLese Solutions — Final Documentation

This repository contains the complete LuxeLese Solutions monorepo with the customer-facing website (`LuxeLese_Solutions_Web`) and the administrative panel (`LuxeLese_Solutions_Admin`). The following combined final README includes full details for both the web app and the admin panel, quick-start instructions, API references, troubleshooting, and development notes.

---

## Web — Final README (Customer site)

# 🚗 LuxeLese Solutions - Car Rental System

## ✅ Final Version - All Issues Fixed

### 🎯 Fixed Issues

1. **✅ Navbar Navigation Fixed**
   - Navigation buttons now properly refresh the page when clicked
   - When already on a page, clicking the nav link will reload it
   - Smooth navigation between pages when logged in

2. **✅ Performance Optimized**
   - Fixed animation frame memory leaks
   - Optimized mouse follower animation
   - Reduced CPU usage to prevent laptop overheating
   - Added proper cleanup for all event listeners

3. **✅ Backend Stability**
   - Running on port 5002
   - MongoDB connection stable
   - CORS properly configured
   - Error handling improved

4. **✅ Frontend Stability**
   - Running on port 5174
   - React Router working properly
   - Authentication flow smooth
   - Protected routes functioning

---

## 🚀 Quick Start (Web)

### Method 1: Automatic Startup (Recommended)
```bash
./start-all.sh
```

### Method 2: Manual Startup

**Terminal 1 - Backend:**
```bash
cd LuxeLese_Solutions_Web/backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd LuxeLese_Solutions_Web/frontend
npm run dev
```

---

## 🌐 Access URLs

- **Frontend:** http://localhost:5174
- **Backend API:** http://localhost:5002
- **API Docs:** http://localhost:5002/ (shows all endpoints)

---

## 📋 Features Working (Web)

### ✅ Authentication
- ✓ User Registration
- ✓ User Login
- ✓ JWT Token Authentication
- ✓ Protected Routes
- ✓ Automatic Login State Detection
- ✓ Logout Functionality

### ✅ Navigation
- ✓ Home Page
- ✓ About Page
- ✓ Booking Page
- ✓ Contact Page
- ✓ Smooth Page Transitions
- ✓ Page Refresh on Same-Page Click

### ✅ UI/UX
- ✓ Responsive Navbar
- ✓ User Profile Dropdown
- ✓ Custom Mouse Follower (Optimized)
- ✓ Loading Screen
- ✓ Smooth Animations
- ✓ Mobile Responsive Design

---

## 🛠️ Technical Stack (Web)

### Frontend
- React 19.1.1
- React Router DOM 7.8.2
- Vite 7.1.2
- Bootstrap 5.3.8

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Mongoose ODM

---

## 📁 Project Structure (Web)

```
LuxeLese_Solutions_Web/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Auth middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── .env            # Environment variables
│   └── server.js       # Main server file
│
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Utility functions
│   │   ├── config/     # API configuration
│   │   └── App.jsx     # Main app component
│   ├── .env            # Frontend environment
│   └── vite.config.js  # Vite configuration
```

---

## ⚡ Performance & Troubleshooting (Web)

### Port Already in Use
```bash
# Kill process on port 5002 (Backend)
lsof -ti:5002 | xargs kill -9

# Kill process on port 5174 (Frontend)
lsof -ti:5174 | xargs kill -9
```

### Frontend Not Starting
```bash
cd LuxeLese_Solutions_Web/frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend Not Connecting
```bash
cd LuxeLese_Solutions_Web/backend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 📝 API Endpoints (Web)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Add new car (Admin)
- `PUT /api/cars/:id` - Update car (Admin)
- `DELETE /api/cars/:id` - Delete car (Admin)
- `GET /api/cars/search?query=...` - Search cars

---

## ✨ Recent Updates (Web)

- ✅ Fixed navbar navigation and refresh functionality
- ✅ Optimized performance for laptop stability
- ✅ Fixed memory leaks in animations
- ✅ Improved authentication flow
- ✅ Added proper cleanup in all components
- ✅ Created comprehensive documentation
- ✅ Added automatic startup script

---

## Admin — Final README (Admin Panel)

# 🚗 LuxeLese Solutions - Admin Panel (Final README)

This is the admin panel companion README — contains the final notes and quick start specific to admin features.

## Quick Start (Admin)

**Backend:**
```bash
cd LuxeLese_Solutions_Admin/backend
npm install
npm run dev
```

**Frontend:**
```bash
cd LuxeLese_Solutions_Admin/frontend
npm install
npm run dev
```

## Admin Features
- Manage vehicles (CRUD)
- View and change booking statuses
- Generate income and booking reports
- Manage users and admin roles
- Upload vehicle assets and images

## Dev Notes (Admin)
- Admin backend endpoints should be protected by RBAC (role-based access control)
- Admin users have role `admin` in `User` model
- Admin UI should call `/api/admin/*` endpoints or use role-checked common routes

## Deployment (Admin)
- Build admin frontend and deploy to your static host or serve from admin backend
- Ensure admin backend has environment variables configured similar to web backend

---

## Full project docs
- API reference: `docs/APIS.md`
- Entity model: `docs/ER.md`
- Use cases: `docs/USE_CASES.md`

---

**Last updated:** January 12, 2026

---

If you'd like, I can add screenshots, badges (CI, license), and a LICENSE file; tell me what you prefer and I will include them.