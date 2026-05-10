## OTO Revenue Analytics Mini

Revenue analytics MVP for OTO Kid Park (Phuket), built to demonstrate AI-assisted development, business-rule implementation, and integration readiness for real POS data pipelines.

### Why this project exists

This prototype is designed to show practical fit for an **AI-Assisted Developer & Prompt Engineer** role:

- Rapid feature delivery using AI-assisted workflows.
- Ability to translate business questions into backend logic.
- Clean API structure ready for Pisell/Funtovia POS ingestion.
- Communication-ready output in both Thai and English.

### Tech stack

- Frontend: `React` + `Vite`
- Backend: `Node.js` + `Express`
- Data layer: `Prisma` + `SQLite`
- Performance: query-aware in-memory cache (`60s` TTL)

### System architecture

`Frontend -> /api/revenue -> Prisma -> SQLite -> business-rule enrichment -> JSON response`

### Core capabilities

#### 1) API endpoints

- `GET /health`: backend health check
- `GET /api/revenue`: returns daily rows, summary, and insights

Optional query params:

- `startDate=YYYY-MM-DD`
- `endDate=YYYY-MM-DD`

#### 2) Dashboard UI

- KPI cards: total revenue, guests, discount, avg spend/guest
- Insight cards: discount risk, holiday impact, guest quality checks
- Date filter with apply/reset
- Daily operations table with risk/action context

#### 3) Business rules

- **Dynamic discount mapping**
  - `HIGH` (`>= 12%`): review campaign / coupon abuse risk
  - `MEDIUM` (`>= 7%`): monitor daily
  - `LOW` (`> 0%`): healthy level
  - `NONE` (`= 0%`): no discount
- **School holiday overlay**
  - Adds `isSchoolHoliday` for seasonal analysis
- **Guest headcount quality rule**
  - Computes `estimatedGuests = revenue / expectedSpendPerGuest`
  - Compares with actual guests to output `guestDelta` and `guestDataQuality`

### Response model

The `/api/revenue` response includes:

- `rows`: enriched daily records
- `summary`: aggregated KPIs
- `insights`: management-level indicators
- `meta`: rule configuration and cache metadata
- `filters`: requested date range
- `source`: `fresh` or `cache`

### Reliability and quality practices

- Input validation for date format and range boundaries
- Standardized error responses
- Query-keyed cache (`all_all`, `2026-05-01_2026-05-05`, etc.)
- Defensive calculations for zero/empty edge cases

### Local setup

#### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`  
Backend default URL: `http://localhost:4000`

### Interview positioning (TH)

ระบบนี้เป็น Revenue Analytics MVP สำหรับ OTO Kid Park โดยใช้ React + Node.js + Prisma/SQLite  
ผมใส่ business rules ที่ใช้ได้จริง 3 ส่วน: dynamic discount mapping, school-holiday overlay, และ guest headcount quality check  
ผลลัพธ์คือทีม operation ได้ทั้ง “ตัวเลข” และ “action” พร้อมใช้งาน  
ระบบรองรับ date filtering, caching, และ validation เพื่อ performance + reliability  
โครงสร้าง backend ถูกออกแบบให้เปลี่ยนจาก local/mock data ไป POS ingestion จริงได้โดยกระทบ UI น้อยที่สุด

### Interview positioning (EN)

This is a Revenue Analytics MVP for OTO Kid Park built with React, Node.js, and Prisma/SQLite.  
I implemented three practical business-rule layers: dynamic discount mapping, school-holiday overlay, and guest headcount quality checks, so operations teams get both metrics and actions.  
The API supports date filtering, caching, and validation for performance and reliability.  
The backend is structured to be integration-ready for real Pisell/Funtovia POS ingestion with minimal frontend impact.

### Current gaps and next steps

- Current data source is local/mock-first (POS ingestion pending)
- Auth/role model not implemented yet
- Test coverage is still minimal

Planned improvements:

1. Add POS ingestion adapter (Pisell/Funtovia)
2. Add scheduled sync jobs
3. Add anomaly detection for revenue drops/spikes
4. Expand API + rule unit/integration tests
5. Add charts and drill-down by outlet/category

### Integration-ready source modes

Backend now supports swappable revenue source adapters:

- `REVENUE_SOURCE=database` (default): reads from Prisma/SQLite
- `REVENUE_SOURCE=mock-pos`: uses a mock POS adapter to simulate integration behavior

This keeps business rules and API response contracts stable while changing only the ingestion/source layer.

### Tests

Backend includes lightweight automated tests using Node's built-in test runner:

```bash
cd backend
npm test
```

Coverage focus:

- Date input validation for `/api/revenue`
- Enriched payload contract (`rows`, `summary`, `insights`, `meta`)
- Rule-layer behavior (discount band mapping, summary/insight calculations)
