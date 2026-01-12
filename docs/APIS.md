# API Reference — Overview

This document summarizes the main API endpoints for the customer (web) backend and admin backend.

Authentication
- POST /api/auth/register
  - Body: { name, email, password }
  - Response: { user, token }
- POST /api/auth/login
  - Body: { email, password }
  - Response: { token }
- GET /api/auth/me
  - Header: Authorization: Bearer <token>
  - Response: { user }

Bookings
- GET /api/bookings
  - Query: ?page=&limit=&status=
  - Returns list of bookings (admin or user depending on auth)
- POST /api/bookings
  - Body: { carId, startDate, endDate, extras }
  - Requires auth
- GET /api/bookings/:id
- PUT /api/bookings/:id
- DELETE /api/bookings/:id

Vehicles / Cars
- GET /api/cars
  - Query: filters (location, date range, price, type)
- GET /api/cars/:id
- POST /api/cars  (admin)
- PUT /api/cars/:id (admin)
- DELETE /api/cars/:id (admin)

Payments
- POST /api/payments/charge
  - Body: { bookingId, paymentMethod, amount }
- POST /api/payments/webhook
  - Payment provider webhook

Profile
- GET /api/profile/:id
- PUT /api/profile/:id

Reviews
- POST /api/reviews
  - Body: { carId, rating, comment }
- GET /api/reviews/car/:carId

Contact
- POST /api/contact
  - Body: { name, email, message }

Admin specifics
- Admin routes often have `/admin/*` or use role-based access control.
- Example: GET /api/admin/reports/income?from=&to=

Security & Auth
- All state changing endpoints require an Authorization header with a valid JWT: `Authorization: Bearer <token>`.

Examples (curl)
- Register:
  curl -X POST https://example.com/api/auth/register -H "Content-Type: application/json" -d '{"name":"Jane","email":"jane@example.com","password":"secret"}'

- Create booking (user):
  curl -X POST https://example.com/api/bookings -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"carId":"abc123","startDate":"2026-02-01","endDate":"2026-02-03"}'


> For full, per-endpoint request/response details and validations, I can add a more exhaustive OpenAPI / Swagger file.