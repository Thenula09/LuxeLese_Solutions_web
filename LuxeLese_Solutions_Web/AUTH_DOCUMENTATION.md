# Authentication System Documentation

## ✅ Overview
Complete and production-ready authentication system implemented for LuxeLese Solutions (customer web and admin panel). The system supports secure registration, sign-in, role-based access control (user/admin), token-based authentication (JWT), and utilities for protecting routes and making authenticated API calls.

---

## 📦 What was implemented

### Backend (Express.js + MongoDB)
- Authentication controller: registration, login, JWT issuance, password validation, email validation, and error handling.
- User model: password hashing (bcrypt), unique email constraint, role field (`user`/`admin`), and helper methods for password comparison.
- Routes: `POST /api/auth/register`, `POST /api/auth/login`.
- Configuration: DB connection, CORS, environment-based JWT config.

### Frontend (React + Vite)
- Register and SignIn pages with form validation, token storage, success/error messaging, and redirects.
- `auth.js` utility with helpers: `isAuthenticated`, `getCurrentUser`, `getToken`, `logout`, `getAuthHeaders`, `isAdmin`.
- `ProtectedRoute` component that blocks access to protected pages and supports admin-only routes.

---

## 🔐 API Endpoints (examples)

### Register
```
POST /api/auth/register
Content-Type: application/json

{ "name":"John Doe", "email":"john@example.com", "password":"password123" }
```
Success (201) returns JWT and user object.

### Login
```
POST /api/auth/login
Content-Type: application/json

{ "email":"john@example.com", "password":"password123" }
```
Success (200) returns JWT and user object.

---

## 🧭 Usage examples

### Protecting a route
```jsx
<Route path="/booking" element={<ProtectedRoute><Booking/></ProtectedRoute>} />

// Admin-only
<Route path="/admin" element={<ProtectedRoute adminOnly><Admin/></ProtectedRoute>} />
```

### Authenticated fetch
```js
fetch('/api/bookings', { headers: getAuthHeaders() })
```

---

## ⚙️ Environment variables (backend)
```
MONGODB_URI=...
PORT=5000
JWT_SECRET=...
JWT_EXPIRE=30d
```

---

## ✅ Testing checklist
- Register, login flows work
- Token stored in localStorage
- Protected routes block unauthorized access
- Admin-only routes require `admin` role

---

## 🔒 Security notes
- bcrypt password hashing
- JWT token usage (Bearer token)
- Input validation & error handling
- CORS configured for frontend origin

---

## ➕ Next steps (recommended)
1. Password reset + email verification
2. Refresh tokens and short-lived access tokens
3. OAuth login providers
4. 2FA (TOTP)

---

For full details and examples, see the project-level auth docs and the per-app README sections.