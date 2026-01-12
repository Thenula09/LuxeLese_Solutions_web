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

## Dev Notes
- Admin backend endpoints should be protected by RBAC (role-based access control)
- Admin users have role `admin` in `User` model
- Admin UI should call `/api/admin/*` endpoints or use role-checked common routes

## Deployment
- Build admin frontend and deploy to your static host or serve from admin backend
- Ensure admin backend has environment variables configured similar to web backend

---

Add or modify these files as needed.