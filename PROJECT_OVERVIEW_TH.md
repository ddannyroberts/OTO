# OTO Revenue Analytics Mini 📊

โปรเจกต์นี้คือ **MVP (Minimum Viable Product)** สำหรับระบบวิเคราะห์รายได้ (Revenue Intelligence) ที่ออกแบบมาเพื่อธุรกิจในกลุ่ม Ticketing, F&B (อาหารและเครื่องดื่ม), Merchandise (ของที่ระลึก) และงาน Event ต่างๆ

## 🎯 เป้าหมายของโปรเจกต์ (Project Goals)
1. **Intelligence Dashboard:** ให้เจ้าของธุรกิจเห็นภาพรวมรายได้และจำนวนลูกค้าในแต่ละวันได้ทันที
2. **Data-Driven Insights:** คำนวณความคุ้มค่า (Revenue per Guest) และแจ้งเตือนเมื่อข้อมูลผิดปกติ (เช่น จำนวนลูกค้าเพิ่มแต่รายได้ลด)
3. **Quick Data Entry:** มีระบบคีย์ข้อมูลที่ง่ายและรวดเร็ว เพื่อลดภาระงานหน้าบ้าน
4. **Flexible Themes:** รองรับการปรับเปลี่ยนหน้าตา (UI) ตามความชอบของผู้ใช้

---

## 🏗️ โครงสร้างระบบ (Architecture)
### 1. Backend (โฟลเดอร์ `/backend`)
ทำหน้าที่เป็นหัวใจในการจัดการข้อมูล
- **Tech Stack:** Node.js, Express.js
- **Database:** SQLite (ผ่าน Prisma ORM) ซึ่งง่ายต่อการติดตั้งและไม่ต้องใช้ Server แยก
- **Authentication:** ระบบ Login พื้นฐานโดยใช้ Token-based เพื่อป้องกันข้อมูล
- **หน้าที่หลัก:**
    - ให้บริการ API สำหรับดึงข้อมูลรายได้ (`GET /api/revenue` - *ต้องการ Login*)
    - จัดการการเข้าสู่ระบบ (`POST /api/login`) และตรวจสอบสถานะผู้ใช้ (`GET /api/me`)
    - รับข้อมูลรายได้ใหม่เข้าสู่ฐานข้อมูล (`POST /api/revenue` - *ต้องการ Login*)
    - มีระบบ **Cache** ภายใน (60 วินาที) เพื่อลดภาระการดึงข้อมูลซ้ำๆ

### 2. Frontend (โฟลเดอร์ `/frontend`)
ทำหน้าที่แสดงผลและโต้ตอบกับผู้ใช้
- **Tech Stack:** React, Vite, Vanilla CSS
- **หน้าที่หลัก:**
    - **Login Page:** หน้าจอเข้าสู่ระบบเพื่อความปลอดภัย
    - **Revenue Chart:** แสดงกราฟเส้นเปรียบเทียบรายได้และส่วนลด
---

## 🔐 ระบบความปลอดภัย (Security)
แอปพลิเคชันมีระบบ Login เพื่อจำกัดการเข้าถึงข้อมูล:
- **Default User:** `admin` / **Password:** `password123`
- **Session:** ใช้ Token บันทึกลงใน LocalStorage เพื่อใช้ยืนยันตัวตนกับ API ทุกครั้ง

## 💾 การจัดการข้อมูล (Data Management)
- **การเพิ่มข้อมูล:** สามารถทำได้ผ่านฟอร์ม "Quick Data Entry" ในหน้าเว็บ (บันทึกลง SQLite)
- **แหล่งข้อมูลในอนาคต:** ระบบถูกออกแบบมาให้รองรับการเชื่อมต่อกับ **Pisell/Funtovia POS API** โดยสามารถแก้ไขที่ไฟล์ `backend/src/services/revenue-source.js`
- **การแก้ไขฐานข้อมูล:** หากต้องการเพิ่มตารางข้อมูลใหม่ ให้แก้ไขที่ `backend/prisma/schema.prisma` แล้วรัน `npx prisma migrate dev`

---

## 🛠️ วิธีการใช้งานสำหรับนักพัฒนา

    - **KPI Cards:** สรุปยอดรวมรายได้, จำนวนลูกค้า, และค่าเฉลี่ยต่อหัว
    - **Insight Cards:** วิเคราะห์แนวโน้ม (Trend) และแจ้งเตือนจุดที่ควรระวัง
    - **Data Entry Form:** ส่วนสำหรับกรอกข้อมูลรายได้รายวัน
    - **Theme Switcher:** ระบบเปลี่ยนสีหน้าจอ (Candy, Ocean, Sunset, Crystal)

---

## 🛠️ วิธีการใช้งานสำหรับนักพัฒนา
1. **การติดตั้ง:** รัน `npm install` ในทั้ง 2 โฟลเดอร์
2. **การรัน Backend:** เข้าไปที่ `/backend` แล้วรัน `npm run dev` (พอร์ต 4000)
3. **การรัน Frontend:** เข้าไปที่ `/frontend` แล้วรัน `npm run dev` (พอร์ต 5173)

---

## 📂 สรุปไฟล์สำคัญ
- `backend/src/server.js`: ตัวจัดการ API หลัก
- `backend/prisma/schema.prisma`: โครงสร้างฐานข้อมูล
- `frontend/src/App.jsx`: จุดรวม Component ทั้งหมดของหน้าเว็บ
- `frontend/src/hooks.js`: ส่วนติดต่อกับ API (Logic การดึงข้อมูล)
- `frontend/src/lib/revenue-rules.js`: สูตรคำนวณทางธุรกิจ (Business Logic)
