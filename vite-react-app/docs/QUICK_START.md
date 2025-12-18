# 🚀 Quick Start Guide

## Project Overview
This project contains two separate applications:
1. **LuxeLese_Solutions** - Customer-facing car rental website
2. **admin** - Administrative dashboard for managing the business

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Run Setup Script
```bash
cd /Users/thenulahansaja/Documents/CAR_WEB_/vite-react-app
./setup.sh
```

### Step 2: Configure Environment Variables

**LuxeLese Backend** (`projects/LuxeLese_Solutions/backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luxelese_car_rental
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
```

**Admin Backend** (`projects/admin/.env`):
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/luxelese_admin
JWT_SECRET=your_admin_secret_key_change_this
NODE_ENV=development
```

### Step 3: Start All Services

Open 4 terminal windows:

**Terminal 1 - LuxeLese Backend:**
```bash
cd projects/LuxeLese_Solutions/backend
npm run dev
```

**Terminal 2 - LuxeLese Frontend:**
```bash
cd projects/LuxeLese_Solutions/frontend
npm run dev
```

**Terminal 3 - Admin Backend:**
```bash
cd projects/admin/src/backend
node server.js
```

**Terminal 4 - Admin Frontend:**
```bash
cd projects/admin
npm run dev
```

---

## 🌐 Access Your Applications

| Application | URL | Port |
|------------|-----|------|
| **Customer Website** | http://localhost:5173 | 5173 |
| **Admin Dashboard** | http://localhost:5174 | 5174 |
| **Main API** | http://localhost:5000 | 5000 |
| **Admin API** | http://localhost:5001 | 5001 |

---

## 📁 Project Structure Summary

```
vite-react-app/
│
├── projects/                 # All applications
│   ├── LuxeLese_Solutions/   # Main car rental application
│   │   ├── frontend/         # React customer app (Port 5173)
│   │   └── backend/          # Node.js API (Port 5000)
│   │
│   └── admin/                # Admin dashboard
│       ├── src/
│       │   ├── frontend/    # React admin app (Port 5174)
│       │   └── backend/     # Node.js admin API (Port 5001)
│
├── setup.sh                 # Automated setup script
├── PROJECT_STRUCTURE.md     # Detailed documentation
└── QUICK_START.md          # This file
```

---

## 🔧 Common Commands

### Install Dependencies
```bash
# LuxeLese Frontend
cd projects/LuxeLese_Solutions/frontend && npm install

# LuxeLese Backend
cd projects/LuxeLese_Solutions/backend && npm install

# Admin
cd projects/admin && npm install
```

### Development Mode
```bash
# All frontends use:
npm run dev

# All backends use:
npm run dev  # (with nodemon)
# OR
node server.js
```

### Build for Production
```bash
# Frontends
npm run build

# Backends (no build needed, run directly)
npm start
```

---

## ✅ Checklist

- [ ] Node.js installed (v18+)
- [ ] MongoDB installed and running
- [ ] Dependencies installed for all 4 projects
- [ ] Environment variables configured
- [ ] All 4 services running
- [ ] Can access customer website at localhost:5173
- [ ] Can access admin dashboard at localhost:5174

---

## 🆘 Troubleshooting

### Port Already in Use
If you get "port already in use" error:
```bash
# Kill process on port (example for 5173)
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Error
Make sure MongoDB is running:
```bash
# Start MongoDB
mongod

# Or if using brew:
brew services start mongodb-community
```

### Module Not Found Error
Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Need Help?

1. Check [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed documentation
2. Review individual README files:
   - `projects/LuxeLese_Solutions/README.md`
   - `projects/admin/README.md`

---

## 🎯 Next Steps After Setup

1. **Customize the applications** - Update branding, colors, content
2. **Add features** - Implement additional functionality
3. **Configure database** - Set up collections and indexes
4. **Test thoroughly** - Ensure all features work correctly
5. **Deploy** - Prepare for production deployment

---

**Happy Coding! 🚗✨**
