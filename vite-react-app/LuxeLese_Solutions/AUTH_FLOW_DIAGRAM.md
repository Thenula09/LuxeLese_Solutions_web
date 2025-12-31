# 🔐 Authentication Flow Diagram

## Registration Flow

```
┌─────────────────┐
│  User visits    │
│  /register      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Fills Registration     │
│  Form:                  │
│  - Name                 │
│  - Email                │
│  - Password             │
│  - Confirm Password     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Frontend Validation    │
│  - Password match?      │
│  - Password length?     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  POST /api/auth/register│
│  {                      │
│    name,                │
│    email,               │
│    password             │
│  }                      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Backend Validation     │
│  - Email unique?        │
│  - Valid format?        │
│  - Password hash        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Save User to MongoDB   │
│  - Hashed password      │
│  - Default role: user   │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Generate JWT Token     │
│  - User ID              │
│  - Expires in 30 days   │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Return Response        │
│  {                      │
│    success: true,       │
│    token,               │
│    user: {...}          │
│  }                      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Store in localStorage  │
│  - token                │
│  - user                 │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Show Success Message   │
│  "Account created!"     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Redirect to Home (/)   │
└─────────────────────────┘
```

## Login Flow

```
┌─────────────────┐
│  User visits    │
│  /signin        │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Fills Login Form:      │
│  - Email                │
│  - Password             │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  POST /api/auth/login   │
│  {                      │
│    email,               │
│    password             │
│  }                      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Backend:               │
│  - Find user by email   │
│  - Compare password     │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐  ┌──────────┐
│ Valid │  │ Invalid  │
└───┬───┘  └────┬─────┘
    │           │
    │           ▼
    │      ┌─────────────────┐
    │      │ Return Error    │
    │      │ "Invalid creds" │
    │      └─────────────────┘
    │
    ▼
┌─────────────────────────┐
│  Generate JWT Token     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Return Response        │
│  {                      │
│    success: true,       │
│    token,               │
│    user: {...}          │
│  }                      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Store in localStorage  │
│  - token                │
│  - user                 │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Show Success Message   │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐  ┌──────────────┐
│ Admin? │  │ Regular User │
└───┬────┘  └──────┬───────┘
    │              │
    ▼              ▼
┌─────────────┐  ┌──────────┐
│ Redirect to │  │ Redirect │
│ /admin-     │  │ to /     │
│ dashboard   │  │ (Home)   │
└─────────────┘  └──────────┘
```

## Protected Route Access Flow

```
┌─────────────────────────┐
│  User navigates to      │
│  Protected Route        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  ProtectedRoute         │
│  Component checks       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Check localStorage     │
│  for token              │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐  ┌───────────┐
│ Token   │  │ No Token  │
│ exists  │  │           │
└────┬────┘  └─────┬─────┘
     │             │
     │             ▼
     │      ┌─────────────────┐
     │      │ Redirect to     │
     │      │ /signin         │
     │      └─────────────────┘
     │
     ▼
┌─────────────────────────┐
│  Admin-only route?      │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐  ┌───────────┐
│ No      │  │ Yes       │
└────┬────┘  └─────┬─────┘
     │             │
     │             ▼
     │      ┌─────────────────┐
     │      │ Check user.role │
     │      └─────┬───────────┘
     │            │
     │       ┌────┴────┐
     │       │         │
     │       ▼         ▼
     │   ┌───────┐  ┌──────┐
     │   │ Admin │  │ User │
     │   └───┬───┘  └───┬──┘
     │       │          │
     │       │          ▼
     │       │     ┌──────────┐
     │       │     │Redirect  │
     │       │     │to /      │
     │       │     └──────────┘
     │       │
     ▼       ▼
┌─────────────────────────┐
│  Allow access to        │
│  Protected Component    │
└─────────────────────────┘
```

## Making Authenticated API Requests

```
┌─────────────────────────┐
│  Component needs to     │
│  make API request       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Import getAuthHeaders()│
│  from utils/auth.js     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  fetch(url, {           │
│    method: 'GET',       │
│    headers:             │
│      getAuthHeaders()   │
│  })                     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Headers include:       │
│  {                      │
│    'Content-Type':      │
│      'application/json',│
│    'Authorization':     │
│      'Bearer <token>'   │
│  }                      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Backend receives       │
│  request with token     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  authMiddleware         │
│  validates token        │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐  ┌───────────┐
│ Valid   │  │ Invalid   │
└────┬────┘  └─────┬─────┘
     │             │
     │             ▼
     │      ┌─────────────────┐
     │      │ Return 401      │
     │      │ Unauthorized    │
     │      └─────────────────┘
     │
     ▼
┌─────────────────────────┐
│  Attach user to         │
│  req.user               │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Process request        │
│  with user context      │
└─────────────────────────┘
```

## Logout Flow

```
┌─────────────────────────┐
│  User clicks            │
│  Logout button          │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Call logout()          │
│  from utils/auth.js     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Clear localStorage:    │
│  - Remove 'token'       │
│  - Remove 'user'        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Redirect to /signin    │
└─────────────────────────┘
```

## Data Storage Structure

### localStorage
```javascript
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "67a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-12-31T10:30:00.000Z"
  }
}
```

### MongoDB User Document
```javascript
{
  "_id": ObjectId("67a1b2c3d4e5f6g7h8i9j0k1"),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$12$hashed_password_here...",
  "role": "user",
  "createdAt": ISODate("2025-12-31T10:30:00.000Z")
}
```

## Security Features

```
┌─────────────────────────────────────┐
│          Security Layers            │
├─────────────────────────────────────┤
│                                     │
│  1. Password Hashing (bcrypt)       │
│     - Salt rounds: 12               │
│     - One-way encryption            │
│                                     │
│  2. JWT Token                       │
│     - Signed with secret key        │
│     - Expires in 30 days            │
│     - Cannot be modified            │
│                                     │
│  3. CORS Protection                 │
│     - Configured origins            │
│     - Credential handling           │
│                                     │
│  4. Input Validation                │
│     - Email format check            │
│     - Password length (min 6)       │
│     - Sanitized inputs              │
│                                     │
│  5. Error Handling                  │
│     - Generic error messages        │
│     - No sensitive info leaked      │
│                                     │
│  6. MongoDB Injection Protection    │
│     - Mongoose sanitization         │
│     - Parameterized queries         │
│                                     │
└─────────────────────────────────────┘
```
