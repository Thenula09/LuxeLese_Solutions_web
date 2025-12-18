# 🚗 LuxeLese Car Rental System

A complete car rental management system with separate customer-facing and admin applications.

## 📁 Project Structure

```
vite-react-app/
├── admin/                      # Admin Dashboard Application
│   ├── src/
│   │   ├── frontend/          # React admin UI (Port 5174)
│   │   └── backend/           # Admin API (Port 5001)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── LuxeLese_Solutions/        # Main Car Rental Application
│   ├── frontend/              # React customer UI (Port 5173)
│   │   ├── src/
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.js
│   └── backend/               # Main API (Port 5000)
│       ├── server.js
│       ├── package.json
│       └── .env.example
│
├── docs/                      # Documentation
│   ├── PROJECT_STRUCTURE.md
│   ├── QUICK_START.md
│   ├── COMPLETION_SUMMARY.md
│   └── CLEANUP_SUMMARY.md
│
├── setup.sh                   # Automated setup script
├── .env                       # Root environment config
└── .gitignore
```

## 🚀 Quick Start

### 1. Run Setup Script
```bash
./setup.sh
```

### 2. Configure Environment Variables
- `LuxeLese_Solutions/backend/.env`
- `admin/.env`

### 3. Start Services

**Terminal 1 - LuxeLese Backend:**
```bash
cd LuxeLese_Solutions/backend
npm run dev
```

**Terminal 2 - LuxeLese Frontend:**
```bash
cd LuxeLese_Solutions/frontend
npm run dev
```

**Terminal 3 - Admin Backend:**
```bash
cd admin/src/backend
node server.js
```

**Terminal 4 - Admin Frontend:**
```bash
cd admin
npm run dev
```

## 🌐 Access URLs

| Application | URL | Port |
|------------|-----|------|
| **Customer Website** | http://localhost:5173 | 5173 |
| **Admin Dashboard** | http://localhost:5174 | 5174 |
| **Main API** | http://localhost:5000 | 5000 |
| **Admin API** | http://localhost:5001 | 5001 |

## 📚 Documentation

For detailed documentation, see the [docs](docs/) folder:
- [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) - Complete project architecture
- [QUICK_START.md](docs/QUICK_START.md) - Quick setup guide
- [COMPLETION_SUMMARY.md](docs/COMPLETION_SUMMARY.md) - Implementation details
- [CLEANUP_SUMMARY.md](docs/CLEANUP_SUMMARY.md) - Cleanup and organization

## 🔧 Technologies

### Frontend
- React 19 with Vite
- React Router DOM
- Bootstrap & Reactstrap
- React Icons

### Backend
- Node.js with Express
- MongoDB & Mongoose
- JWT Authentication
- bcrypt.js

## ✅ Project Status

✅ Clean, organized structure  
✅ Two independent applications  
✅ Complete documentation  
✅ Ready for development

---

**Date:** December 15, 2025  
**Version:** 1.0.0
