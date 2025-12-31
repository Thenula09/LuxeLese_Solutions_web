# Authentication System Documentation

## Overview
Complete authentication system with JWT tokens for LuxeLese Car Rental Solutions.

## Features
- ✅ User Registration
- ✅ User Login
- ✅ JWT Token Authentication
- ✅ Password Encryption (bcrypt)
- ✅ Role-based Access (User/Admin)
- ✅ Protected Routes
- ✅ Token Storage (localStorage)

## Backend Structure

### Endpoints

#### Register User
```
POST /api/auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "ගිණුම සාර්ථකව නිර්මාණය කරන ලදී",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2025-12-31T..."
    }
  }
}
```

#### Login User
```
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "සාර්ථකව login විය",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2025-12-31T..."
    }
  }
}
```

## Frontend Structure

### Pages
- **Register.jsx** - User registration form
- **SignIn.jsx** - User login form

### Utilities
- **auth.js** - Authentication helper functions
  - `isAuthenticated()` - Check if user is logged in
  - `getCurrentUser()` - Get current user data
  - `getToken()` - Get JWT token
  - `logout()` - Logout user
  - `getAuthHeaders()` - Get headers for API requests
  - `isAdmin()` - Check if user is admin

### Components
- **ProtectedRoute.jsx** - Protected route wrapper for authenticated pages

## Usage

### Protecting Routes
```jsx
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// In App.jsx
<Route 
  path="/booking" 
  element={
    <ProtectedRoute>
      <Booking />
    </ProtectedRoute>
  } 
/>

// For admin-only routes
<Route 
  path="/admindashboard" 
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
```

### Making Authenticated API Requests
```jsx
import { getAuthHeaders } from './utils/auth';

const response = await fetch('/api/protected-endpoint', {
  method: 'GET',
  headers: getAuthHeaders()
});
```

### Logout
```jsx
import { logout } from './utils/auth';

// In your component
<button onClick={logout}>Logout</button>
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

## Running the Application

### Backend
```bash
cd LuxeLese_Solutions/backend
npm install
npm run dev
```
Server runs on: http://localhost:5000

### Frontend
```bash
cd LuxeLese_Solutions/frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

## Testing the Authentication

### 1. Register a New User
- Navigate to http://localhost:5173/register
- Fill in the registration form
- Click "Create Account"
- You should be automatically logged in and redirected to home

### 2. Login with Existing User
- Navigate to http://localhost:5173/signin
- Enter email and password
- Click "Sign In"
- You should be redirected to home (or admin dashboard if admin)

### 3. Check Local Storage
Open browser DevTools > Application > Local Storage:
- `token` - JWT token
- `user` - User information (JSON)

## Security Notes
- Passwords are hashed using bcrypt before storing
- JWT tokens expire after 30 days (configurable)
- Tokens are stored in localStorage
- All API requests can include the token in Authorization header
- CORS is configured to accept requests from frontend

## User Roles
- **user** (default) - Regular user with access to booking and basic features
- **admin** - Full access including admin dashboard

## Error Handling
All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error message in Sinhala/English"
}
```

## Next Steps
1. Add password reset functionality
2. Add email verification
3. Implement refresh tokens
4. Add session timeout warnings
5. Add OAuth providers (Google, Facebook)
