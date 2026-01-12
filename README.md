# LuxeLese Solutions

**Short summary / සාරාංශය**

LuxeLese Solutions කියන්නේ ගනුදෙනුකරුවන්ට (customer-facing) සහ admin team එකට (admin panel) වේබ් යෙදුම් දෙකක් සහ ඒවාට අදාළ backend සේවා සන්වේදනය කරලා තිබෙන monorepo එකක්. මේ repo එකේ ද්විත්ව project structure එක පහතින් දැක්වේ.

## Project structure

- `LuxeLese_Solutions_Web/` – Customer-facing website
  - `frontend/` – React (Vite) app
  - `backend/` – Node.js / Express API

- `LuxeLese_Solutions_Admin/` – Admin panel
  - `frontend/` – Admin React app
  - `backend/` – Admin backend (optional)

## Start locally (development)

- Web frontend (from `LuxeLese_Solutions_Web/frontend`):
  - npm install
  - npm run dev

- Web backend (from `LuxeLese_Solutions_Web/backend`):
  - npm install
  - npm run dev

- Admin frontend (from `LuxeLese_Solutions_Admin/frontend`):
  - npm install
  - npm run dev

- Admin backend (from `LuxeLese_Solutions_Admin/backend`):
  - npm install
  - npm run dev

> Note: use `.env` files in each backend folder and ensure MongoDB / other services are configured.

## Full summary / විස්තර

See `docs/PROJECT_SUMMARY.md` for a longer project description, architecture notes, and deployment recommendations.

---

If you want, I can also add a single `start-all.sh` to start both apps together and/or set up GitHub Actions for CI. Tell me which you'd like next.