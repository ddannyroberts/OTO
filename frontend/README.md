# OTO Revenue Analytics Mini - "Vibe Coder" Portfolio Edition

## 📖 What is this project?

**OTO Revenue Analytics Mini** is a specialized Business Intelligence (BI) dashboard designed for **OTO Park Management** in Phuket. It serves as a proof-of-concept for the digital transformation of premium family entertainment centers.

The application is built to solve a specific business problem: **How to turn daily operational data (ticketing, F&B, merchandise, and events) into visual, actionable insights.**

This dashboard allows management to:
- **Monitor Revenue Trends:** Track daily performance of revenue vs. promotional discounts.
- **Analyze Guest Behavior:** Automatically calculate average spend per guest and identify data deltas.
- **Manage Operational Risk:** Detect "High Risk" days where guest headcount doesn't align with revenue patterns.
- **Understand Seasonal Impacts:** Visualize the influence of school and public holidays on Phuket's tourism-driven economy.

This isn't just a coding exercise; it's a **strategic business tool** built with a "Vibe Coder" mindset—leveraging AI to deliver high-value features with speed, precision, and a premium aesthetic.

## 🚀 The Mission
To transform raw revenue data from ticketing, F&B, merchandise, and events into actionable intelligence using cutting-edge Generative AI (Gemini/ChatGPT) for rapid development and deployment.

## 🛠 Tech Stack & "Vibe"
- **Frontend:** React 19 (Vite) with a custom Glassmorphism "Crystal Clear" UI.
- **Styling:** Modern Vanilla CSS with dynamic themes (Phuket Sunset, Ocean Play, Candy Land).
- **Architecture:** Modular component-based design with custom hooks for state and data management.
- **AI-Driven:** Developed using advanced prompting for rapid refactoring, bug fixing, and feature implementation.

## 📈 Key Features (Aligned with OTO Requirements)
- **Revenue vs. Discount Analytics:** Interactive SVG charts visualizing trend and promo impacts.
- **Dynamic Business Logic:** 
    - **Guest Headcount Logic:** Automated estimation and delta verification.
    - **Risk Banding:** Intelligent mapping of discount rates to risk levels (HIGH/MEDIUM/LOW).
    - **Holiday Overlays:** Identification of holiday revenue impact (Essential for Phuket tourism cycles).
- **Executive KPI Dashboard:** Real-time summary of total revenue, avg spend per guest, and data source status (CACHE vs FRESH).
- **Data Portability:** One-click CSV Export for international management reporting.

## 🧪 Advanced Implementations
- **API Ready:** Structured to easily connect with Pisell/Funtovia POS APIs.
- **Optimized Caching:** Simulated caching layer logic to ensure high responsiveness.
- **Analytical Mindset:** Includes insights on "High Risk Days" and "Guest Data Quality" rather than just displaying raw numbers.

## 👤 Developer Profile
This project demonstrates fluency in:
- **Rapid AI Prompting:** Building complex UI and logic in record time.
- **Analytical Thinking:** Understanding the "Why" behind the data.
- **English Proficiency:** Built with international stakeholders in mind.

---
*Phuket's Most Premium Revenue Intelligence Tool.*

## 🏗 Detailed Project Structure

The project follows a modern, decoupled architecture designed for scalability and rapid AI-assisted development.

```text
frontend/
├── src/
│   ├── components/       # Atomic UI Components
│   │   ├── Forms.jsx        # Filters & Quick Entry forms
│   │   ├── Grids.jsx        # KPI & Insight card layouts
│   │   ├── RevenueChart.jsx # Interactive SVG Data Visualization
│   │   └── RevenueTable.jsx # Detailed Data Grid with Risk Banding
│   ├── hooks.js          # Custom React Hooks (Data Fetching & Logic)
│   ├── utils.js          # Business Logic & Helper Functions
│   ├── App.jsx           # Main Orchestrator / Root Layout
│   ├── App.css           # Global Styles & Dynamic Theming (Crystal/Ocean/Sunset)
│   └── main.jsx          # Entry point
├── public/               # Static Assets
└── package.json          # Dependencies & Scripts
```

## 🧠 System Architecture & Data Flow

### 1. Data Layer (`hooks.js`)
- **`useRevenueData`**: Manages the lifecycle of fetching analytics from the API. Implements a caching logic (FRESH vs. CACHE) to optimize performance.
- **`useSaveRevenue`**: Handles asynchronous POST requests for manual data entry with comprehensive error handling.

### 2. Business Intelligence Logic (`utils.js`)
This is where the "Why" behind the data lives:
- **Risk Banding**: Logic to categorize discount rates based on profitability thresholds.
- **Data Formatting**: Standardizing currency and localization for international management.
- **Export Engine**: Logic for generating dynamically structured CSV reports on the fly.

### 3. Presentation Layer (`components/`)
- **SVG Engine (`RevenueChart.jsx`)**: A custom-built visualization engine that renders revenue trends and **Holiday Overlays**. It uses raw SVG for maximum performance without heavy charting libraries.
- **Insight Engine (`Grids.jsx`)**: Proactive logic that checks thresholds and provides real-time "Recommendations" (e.g., Status: Warning -> Action: Review Staffing).

## ⚡ The "Vibe Coder" Workflow
This project was built using an **AI-First Development** methodology:
1. **Prompt Engineering**: Used structured prompts to generate modular UI skeletons.
2. **Iterative Refactoring**: AI-assisted migration from a monolithic structure to the current decoupled architecture.
3. **Rapid Debugging**: Utilizing AI to identify and fix edge cases in SVG coordinate math and data normalization.

## 🎨 Theming System
The dashboard supports dynamic CSS variable-based theming:
- **Crystal Clear**: Glassmorphism effect with backdrop-blur.
- **Phuket Sunset**: Warm tones inspired by Kamala beach.
- **Ocean Play**: Professional blue tones for deep data focus.

