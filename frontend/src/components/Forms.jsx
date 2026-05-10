import React from 'react';

export function Filters({ startDate, setStartDate, endDate, setEndDate, onApply, onReset }) {
  return (
    <form className="filter" onSubmit={onApply}>
      <div className="field">
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>

      <div className="field">
        <label>End Date</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <div className="actions">
        <button type="submit">Apply</button>
        <button type="button" className="ghost" onClick={onReset}>
          Reset
        </button>
      </div>
    </form>
  );
}

export function EntryForm({ 
  entryDate, setEntryDate, 
  entryGuests, setEntryGuests, 
  entryRevenue, setEntryRevenue, 
  entryDiscount, setEntryDiscount, 
  onSave, saveState 
}) {
  return (
    <form className="entry-form" onSubmit={onSave}>
      <div className="entry-title">
        <h3>Quick Data Entry</h3>
        <p>Add or update daily figures quickly for interview demos.</p>
      </div>
      <div className="field">
        <label>Date</label>
        <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} required />
      </div>
      <div className="field">
        <label>Guests</label>
        <input type="number" min="0" value={entryGuests} onChange={(e) => setEntryGuests(e.target.value)} required />
      </div>
      <div className="field">
        <label>Revenue</label>
        <input type="number" min="0" value={entryRevenue} onChange={(e) => setEntryRevenue(e.target.value)} required />
      </div>
      <div className="field">
        <label>Discount</label>
        <input type="number" min="0" value={entryDiscount} onChange={(e) => setEntryDiscount(e.target.value)} required />
      </div>
      <div className="actions">
        <button type="submit" disabled={saveState.loading}>
          {saveState.loading ? "Saving..." : "Save Row"}
        </button>
      </div>
      {saveState.error && <p className="state error">{saveState.error}</p>}
      {saveState.success && <p className="state success">{saveState.success}</p>}
    </form>
  );
}
