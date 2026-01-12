# Admin Authentication Documentation

This document explains authentication and admin-specific considerations for the LuxeLese Admin Panel.

## Overview
- Admin accounts use the same auth system (JWT) as customers but must have the `admin` role.
- Admin endpoints must be protected with role checks and RBAC middleware.

## Admin Endpoints (examples)
- `POST /api/auth/login` — same login endpoint used for admin, returns token with `role: 'admin'` when applicable
- `GET /api/admin/reports/income` — requires admin role
- `POST /api/admin/cars` — requires admin role (create new car)
- `PUT /api/admin/cars/:id` — update car (admin)
- `DELETE /api/admin/cars/:id` — delete car (admin)

## Best Practices
- Ensure `admin` role is only assigned manually or via secure admin creation endpoints
- Use middleware to check `req.user.role === 'admin'` before serving admin routes
- Log admin actions for auditability

## Protecting Routes (Express middleware example)
```js
function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden' });
  next();
}
```

## Frontend
- Admin frontend should use `isAdmin()` helper and redirect non-admins away from admin routes
- Use `ProtectedRoute` with `adminOnly` prop to render admin pages

## Environment & Security
- Same env variables as web backend
- Harden admin endpoints: rate limit, strict validation, and logging

---

If you want, I can add a short `CREATE_ADMIN.md` explaining how to create initial admin users safely (via script or seed file).