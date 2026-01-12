# LuxeLese Solutions

## Short summary

LuxeLese Solutions is a monorepo that contains two related web applications:

- **LuxeLese_Solutions_Web** — The customer-facing website (frontend + backend).
- **LuxeLese_Solutions_Admin** — The admin panel used by staff to manage bookings, vehicles, users, and reports (frontend + backend).

This repository organizes both apps in a single workspace so shared concepts and docs can be maintained centrally.

---

## File & folder structure

Top-level layout:

- `LuxeLese_Solutions_Web/`
  - `frontend/` — React (Vite) application for customers
    - `src/` — React source code (components, pages, styles)
    - `public/` — static assets
    - `package.json`, `vite.config.js`
  - `backend/` — Node.js / Express API
    - `models/` — Mongoose schemas
    - `controllers/` — request handlers and business logic
    - `routes/` — Express routers
    - `services/` — reusable services (payment integration, email)
    - `config/` — DB and auth configuration
    - `server.js` / `app.js`

- `LuxeLese_Solutions_Admin/`
  - `frontend/` — Admin React application
  - `backend/` — Admin API (optional; for admin-specific endpoints)

- `docs/` — project-level documentation (this repo)
- `README.md` — this file (overview and quick start)

---

## Getting started (development)

1. Clone the repo and move into the relevant subfolder:
   - `cd LuxeLese_Solutions_Web/frontend` (customer frontend) or `cd LuxeLese_Solutions_Web/backend` (customer backend)

2. Install dependencies:
   - `npm install`

3. Start development servers:
   - Frontend: `npm run dev`
   - Backend: `npm run dev` (ensure `.env` is present)

4. Admin projects are started similarly in `LuxeLese_Solutions_Admin/*`.

> Note: Each backend requires a `.env` with values for DB connection, JWT secret, email credentials, and payment provider keys.

---

## API overview

This project contains REST APIs for both the customer website and the admin panel. The canonical API endpoints are documented in `docs/APIS.md` — open it for endpoint details, request/response examples and auth requirements.

Authentication: Most endpoints use JWT Bearer tokens sent in `Authorization: Bearer <token>`.

---

## Services and responsibilities

- **Authentication / Authorization** — register/login, token issuance, password reset.
- **Booking** — create/read/update/cancel bookings, check availability.
- **Payments** — create payment intents, confirm transactions, webhooks for status changes.
- **Vehicles/Cars** — list, search, and manage vehicles with metadata and images.
- **Profiles** — user profile CRUD, avatars, preferences.
- **Notifications / Email** — send booking confirmations and alerts.
- **Admin reports** — income reports, booking analytics (admin backend)

Detailed API and service descriptions are in `docs/APIS.md`.

---

## ER model summary

See `docs/ER.md` for an entity-relationship summary and notes. Main entities include:
- `User` (customers and admin users)
- `Car` (or `Vehicle`)
- `Booking` (links `User` and `Car`)
- `Payment` (linked to `Booking`)
- `Review`, `Contact` and `Notification`

---

## Use cases

See `docs/USE_CASES.md` for full user and admin use cases with flow steps and edge cases (register/login, book vehicle, pay, admin manage vehicles/bookings).

---

## Next steps (suggested)

- Add `start-all.sh` to run both frontends and backends concurrently for development.
- Add per-subproject `README` files with environment example `.env.example` values.
- Add GitHub Actions to run lint/build/test per push.

---

If you want more detail in any specific `docs/*` page (APIs, ER model, or use cases), tell me which area you want expanded and I will add more examples and diagrams.