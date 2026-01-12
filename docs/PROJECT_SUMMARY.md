# Project Summary — LuxeLese Solutions (Full)

## Overview
LuxeLese Solutions is a two-part web platform:

1. Customer website (`LuxeLese_Solutions_Web`): booking, payments, profiles, and public content.
2. Admin panel (`LuxeLese_Solutions_Admin`): manage bookings, vehicles, users, reports and analytics.

Both parts include separate frontend and backend services and share similar tech (React + Vite for frontends, Node/Express + MongoDB for backends).

## Architecture
- Frontends are built with Vite + React; they consume APIs from their corresponding backend.
- Backends are Node.js/Express apps using MongoDB (Mongoose models present) and typical route/controller patterns.
- Static assets are kept inside each frontend's `public` or `assets` folders.

## How to run locally
- Install dependencies in each subproject: `cd LuxeLese_Solutions_Web/frontend && npm install`
- Start dev servers: `npm run dev` for frontend, `npm run dev` for backend (in its folder).
- Provide `.env` files for DB connection, JWT secrets, email, etc.

## Deployment notes
- Build frontends with `npm run build` and serve from a static host (Netlify, Vercel) or serve static files from the backend.
- For backends: environment variables, secure DB access, and CORS configuration are required.

## Suggestions / Next steps
- Add `start-all.sh` to start web + admin dev servers concurrently (optional).
- Add `README` sections in each subproject with per-app commands and env examples.
- Add GitHub Actions for building/testing each project on push.

---

If you want I can also add a `CONTRIBUTING.md` and update each subproject's README with more specific startup instructions (env var examples).