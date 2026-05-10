# OTO Revenue Analytics Mini 📊

A high-performance, AI-driven Revenue Intelligence MVP designed for **OTO Kid Park (Phuket)**. This system bridges the gap between raw POS data (Pisell/Funtovia) and actionable business insights.

---

## 🌟 Key Features

### 1. Advanced Analytics Dashboard
- **Interactive Visuals:** Responsive line charts comparing Revenue vs. Discounts.
- **Smart KPIs:** Real-time calculation of Total Revenue, Guest Counts, and **Avg. Spend per Guest**.
- **Automated Insights:** Logic-driven management indicators for discount risks and data anomalies.

### 2. Operational Efficiency
- **Quick Data Entry:** Streamlined form for daily revenue logging (backed by SQLite).
- **Secure Access:** Built-in authentication system with session management.
- **CSV Export:** One-click data portability for executive reporting.
- **Date Filtering:** Drill down into specific performance periods.

### 3. Business Intelligence Logic
- **Dynamic Discount Mapping:** Categorizes discount levels (Low, Medium, High) to flag potential revenue leaks.
- **School Holiday Context:** Overlays seasonal holiday data to explain traffic spikes.
- **Data Quality Assurance:** Cross-references guest counts with revenue to ensure data integrity.

---

## 🏗️ Tech Stack

### Backend (`/backend`)
- **Engine:** Node.js + Express
- **Database Layer:** Prisma ORM + SQLite (Portable and fast)
- **Security:** Token-based Authentication & Protected API Routes
- **Optimization:** 60-second In-memory Caching for snappy performance.

### Frontend (`/frontend`)
- **Framework:** React + Vite
- **Design:** Modern **Crystal Clear Theme** using Vanilla CSS & Glassmorphism.
- **Logic:** Custom React Hooks for centralized API interaction and Auth state.

---

## 📂 Project Anatomy

- `backend/src/server.js`: API entry point and Auth middleware.
- `backend/prisma/schema.prisma`: Data models and DB structure.
- `backend/src/lib/revenue-rules.js`: Core business logic and enrichment rules.
- `frontend/src/App.jsx`: Main UI orchestrator and view switching logic.
- `frontend/src/hooks.js`: Specialized hooks for API fetching and session security.

---

## 🔐 Credentials (Local Dev)

To access the dashboard in development mode:
- **Username:** `admin`
- **Password:** `password123`

---

## 💾 Database Operations

Managed via **Prisma**:
- **Modify Schema:** Update `backend/prisma/schema.prisma`.
- **Apply Changes:** Run `npx prisma migrate dev`.
- **Seed Data:** Run `node backend/prisma/seed.js`.

---

## 🚀 Roadmap

1. **Production POS Integration:** Connecting live Pisell/Funtovia API endpoints.
2. **Multi-Park Support:** Dedicated views for Robinson Chalong and Central Floresta locations.
3. **Smart Alerts:** Automated notifications (Line/Email) for revenue anomalies.
4. **Historical Sync:** Batch ingestion of past fiscal year data.

---

## 🛠️ Quick Start

### 1. Installation
```bash
# Backend setup
cd backend && npm install

# Frontend setup
cd frontend && npm install
```

### 2. Database Initialization
```bash
cd backend
npx prisma migrate dev --name init
node prisma/seed.js
```

### 3. Launch (Two Terminals Required)
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

URL: [http://localhost:5173](http://localhost:5173)
