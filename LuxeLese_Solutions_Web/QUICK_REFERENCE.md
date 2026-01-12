# 🚀 Quick Reference Card

## Start the Application

```bash
cd /Users/thenulahansaja/Documents/CAR_WEB_/vite-react-app/LuxeLese_Solutions
./start.sh
```

## Access URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Register: http://localhost:5173/register
- Sign In: http://localhost:5173/signin

## Test Credentials

Create a new account at /register or use these test endpoints:

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

## Common Commands

### Backend
```bash
cd backend
npm run dev      # Start development server
npm start        # Start production server
```

### Frontend
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
```

## Utility Functions

```javascript
import { 
  isAuthenticated,    // Check if logged in
  getCurrentUser,     // Get user data
  getToken,          // Get JWT token
  logout,            // Logout user
  getAuthHeaders,    // API request headers
  isAdmin            // Check admin role
} from './utils/auth';
```

## Protect Routes

```jsx
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Regular protected route
<Route path="/booking" element={
  <ProtectedRoute><Booking /></ProtectedRoute>
} />

// Admin-only route
<Route path="/admin" element={
  <ProtectedRoute adminOnly={true}>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

## Environment Variables

Located in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_12345
JWT_EXPIRE=30d
```

## localStorage Structure

```javascript
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

## Documentation Files

1. **SUMMARY.md** - Complete summary
2. **SETUP_COMPLETE.md** - Setup guide  
3. **AUTH_DOCUMENTATION.md** - API documentation
4. **AUTH_FLOW_DIAGRAM.md** - Flow diagrams
5. **QUICK_REFERENCE.md** - This file

---

**Need help? Check the documentation files above! 📚**
