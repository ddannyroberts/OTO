# OTO Revenue Analytics Mini 📊

โปรเจกต์นี้คือ **MVP (Minimum Viable Product)** ระบบวิเคราะห์รายได้อัจฉริยะที่พัฒนาขึ้นสำหรับ **OTO Kid Park (Phuket)** เพื่อเชื่อมต่อและวิเคราะห์ข้อมูลจากระบบ POS (Pisell/Funtovia) โดยเน้นความเร็วในการพัฒนาด้วยเทคนิค **AI-Driven Development (Vibe Coding)**

---

## 🎯 ฟีเจอร์หลัก (Core Features)

### 1. Intelligence Dashboard
- **Visual Analytics:** แสดงกราฟเส้นเปรียบเทียบรายได้และส่วนลดรายวัน
- **KPI Summary:** สรุปยอดรวมรายได้, จำนวนลูกค้า, ส่วนลด และค่าเฉลี่ยการใช้จ่ายต่อหัว (Revenue per Guest)
- **Actionable Insights:** ระบบวิเคราะห์ข้อมูลอัตโนมัติ เช่น การแจ้งเตือนเมื่อส่วนลดสูงเกินไป หรือเมื่อจำนวนลูกค้าไม่สัมพันธ์กับรายได้

### 2. Operational Tools
- **Quick Data Entry:** แบบฟอร์มบันทึกข้อมูลรายได้ประจำวันที่ใช้งานง่าย (บันทึกลง SQLite)
- **Data Export:** สามารถส่งออกข้อมูล (Export) เป็นไฟล์ CSV เพื่อนำไปใช้ในรายงานการประชุมได้ทันที
- **Flexible Filters:** เลือกดูข้อมูลตามช่วงวันที่ต้องการได้

### 3. Advanced Business Logic
- **Dynamic Discount Mapping:** จัดกลุ่มระดับความเสี่ยงของส่วนลด (Low, Medium, High) เพื่อตรวจสอบความผิดปกติ
- **School Holiday Overlay:** ระบบตรวจสอบและแสดงผลข้อมูลโดยอ้างอิงกับช่วงวันหยุดโรงเรียน
- **Data Quality Check:** คำนวณความสมเหตุสมผลของจำนวนลูกค้าเทียบกับรายได้ที่ได้รับ

---

## 🏗️ โครงสร้างทางเทคนิค (Tech Stack)

### Backend (`/backend`)
- **Runtime:** Node.js (Express)
- **Database:** SQLite (จัดการผ่าน Prisma ORM)
- **Security:** ระบบ Authentication (Username/Password) พร้อม Token-based security
- **Performance:** ระบบ In-memory Caching (60 วินาที) เพื่อลดภาระของ Database และทำให้แอปตอบสนองไว

### Frontend (`/frontend`)
- **Framework:** React (Vite)
- **Styling:** Vanilla CSS พร้อมดีไซน์แบบ **Crystal Clear Theme** (Glassmorphism)
- **State Management:** Custom Hooks สำหรับจัดการข้อมูลและการยืนยันตัวตน

---

## 📂 โครงสร้างโฟลเดอร์ (Folder Structure)

- `backend/src/server.js`: ศูนย์กลางการจัดการ API และ Authentication
- `backend/prisma/schema.prisma`: โครงสร้างฐานข้อมูล (Database Schema)
- `backend/src/lib/revenue-rules.js`: หัวใจของ Business Logic และสูตรคำนวณต่างๆ
- `frontend/src/App.jsx`: ส่วนควบคุมหน้าจอหลักและระบบ Routing เบื้องต้น
- `frontend/src/hooks.js`: ส่วนเชื่อมต่อ API (Fetch) และจัดการ Login Session

---

## 🔐 ข้อมูลการเข้าใช้งาน (Credentials)

สำหรับการทดสอบระบบในเครื่อง (Local Development):
- **Username:** `admin`
- **Password:** `password123`

---

## 💾 การจัดการฐานข้อมูล (Database)

โปรเจกต์นี้ใช้ **Prisma** ในการจัดการฐานข้อมูล:
- **แก้ไขตาราง:** แก้ไขที่ `backend/prisma/schema.prisma`
- **อัปเดตฐานข้อมูล:** รันคำสั่ง `npx prisma migrate dev`
- **สร้างข้อมูลเริ่มต้น:** รัน `node backend/prisma/seed.js`

---

## 🚀 แผนพัฒนาในอนาคต (Roadmap)

1. **POS Integration:** เชื่อมต่อ API จริงกับระบบ Pisell/Funtovia
2. **Multi-location Support:** แยกดูข้อมูลรายได้ตามสาขา (Chalong / Central Floresta)
3. **Anomaly Detection:** ระบบแจ้งเตือนผ่าน Line/Email เมื่อพบยอดเงินที่ผิดปกติมาก
4. **Automated Sync:** ระบบดึงข้อมูลจาก POS อัตโนมัติทุกสิ้นวัน

---

## 🛠️ วิธีติดตั้งและรันโปรเจกต์

### 1. ติดตั้ง Dependencies
```bash
# ในโฟลเดอร์ backend
cd backend && npm install

# ในโฟลเดอร์ frontend
cd frontend && npm install
```

### 2. เตรียมฐานข้อมูล (ทำครั้งแรก)
```bash
cd backend
npx prisma migrate dev --name init
node prisma/seed.js
```

### 3. เริ่มทำงาน (เปิด 2 Terminal)
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

เข้าใช้งานผ่าน: [http://localhost:5173](http://localhost:5173)
