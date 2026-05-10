import { useState } from "react";
import "./App.css";
import { RevenueDiscountChart } from "./components/RevenueChart";
import { KpiGrid, InsightGrid } from "./components/Grids";
import { RevenueTable } from "./components/RevenueTable";
import { Filters, EntryForm } from "./components/Forms";
import { useRevenueData, useSaveRevenue } from "./hooks";
import { exportToCSV } from "./utils";

const THEME_STORAGE_KEY = "oto-theme";
const THEMES = [
  { id: "candy", label: "Candy Land" },
  { id: "ocean", label: "Ocean Play" },
  { id: "sunset", label: "Sunset Park" },
  { id: "crystal", label: "Crystal Clear" }
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return THEMES.some((item) => item.id === savedTheme) ? savedTheme : "candy";
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ start: "", end: "" });

  const [entryDate, setEntryDate] = useState("");
  const [entryGuests, setEntryGuests] = useState("");
  const [entryRevenue, setEntryRevenue] = useState("");
  const [entryDiscount, setEntryDiscount] = useState("");

  const { data, source, loading, error, refetch } = useRevenueData(appliedFilters.start, appliedFilters.end);
  const { saveEntry, saveState } = useSaveRevenue();

  function handleApplyFilter(e) {
    e.preventDefault();
    setAppliedFilters({ start: startDate, end: endDate });
  }

  function handleResetFilter() {
    setStartDate("");
    setEndDate("");
    setAppliedFilters({ start: "", end: "" });
  }

  function handleChangeTheme(themeId) {
    setTheme(themeId);
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  }

  async function handleSaveEntry(e) {
    e.preventDefault();
    const success = await saveEntry({
      date: entryDate,
      guests: Number(entryGuests),
      revenue: Number(entryRevenue),
      discount: Number(entryDiscount)
    });

    if (success) {
      setEntryDate("");
      setEntryGuests("");
      setEntryRevenue("");
      setEntryDiscount("");
      refetch();
    }
  }

  const rows = data?.rows ?? [];
  const hasRows = rows.length > 0;

  return (
    <div className={`page theme-${theme}`}>
      <header className="header">
        <div className="title-section">
          <h1>OTO Revenue Analytics Mini</h1>
          <p className="sub">MVP dashboard for ticketing, F&B, merchandise, and event revenue intelligence.</p>
        </div>
        
        <div className="header-meta">
          <div className="header-actions">
            {hasRows && (
              <button className="ghost export-btn" onClick={() => exportToCSV(rows, data.summary)}>
                Export CSV
              </button>
            )}
            <div className="source-info">
              Data Source:{" "}
              <span className={`badge ${source === "cache" ? "cache" : "fresh"}`}>
                {source === "cache" ? "CACHE" : source === "fresh" ? "FRESH" : "-"}
              </span>
            </div>
          </div>
          <div className="theme-switcher">
            {THEMES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`theme-chip ${theme === item.id ? "active" : ""}`}
                onClick={() => handleChangeTheme(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="sidebar">
          <Filters 
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
          />

          <EntryForm 
            entryDate={entryDate} setEntryDate={setEntryDate}
            entryGuests={entryGuests} setEntryGuests={setEntryGuests}
            entryRevenue={entryRevenue} setEntryRevenue={setEntryRevenue}
            entryDiscount={entryDiscount} setEntryDiscount={setEntryDiscount}
            onSave={handleSaveEntry}
            saveState={saveState}
          />
        </div>

        <div className="content-area">
          {loading && (
            <div className="loader-container">
              <div className="loader"></div>
              <p className="state">Loading revenue data...</p>
            </div>
          )}
          
          {error && !loading && (
            <div className="error-container">
              <p className="state error">Failed to load: {error}</p>
              <button onClick={refetch}>Try Again</button>
            </div>
          )}

          {!loading && !error && data && (
            <>
              {!hasRows ? (
                <section className="empty-state">
                  <h2>No revenue data yet</h2>
                  <p>Use Quick Data Entry above to add your first day, then click Apply to refresh insights.</p>
                </section>
              ) : (
                <>
                  <RevenueDiscountChart rows={rows} />
                  <KpiGrid data={data} />
                  <InsightGrid data={data} />
                  <RevenueTable rows={rows} />
                  
                  <footer className="footer-note">
                    <p>
                      Rule config: expected spend/guest = {data.meta?.expectedSpendPerGuest ?? "-"} THB, guest delta alert threshold ={" "}
                      {data.meta?.guestDeltaAlertThreshold ?? "-"}.
                    </p>
                  </footer>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
