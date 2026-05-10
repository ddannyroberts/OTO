import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:4000";

export function useRevenueData(startDate, endDate) {
  const [data, setData] = useState(null);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRevenue = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      const url = `${API_BASE}/api/revenue${params.toString() ? `?${params}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);

      setData(json);
      setSource(json.source);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchRevenue();
  }, [fetchRevenue]);

  return { data, source, loading, error, refetch: fetchRevenue };
}

export function useSaveRevenue() {
  const [saveState, setSaveState] = useState({ loading: false, error: "", success: "" });

  const saveEntry = async (entry) => {
    setSaveState({ loading: true, error: "", success: "" });
    try {
      const res = await fetch(`${API_BASE}/api/revenue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry)
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);

      setSaveState({ loading: false, error: "", success: "Saved successfully" });
      return true;
    } catch (err) {
      setSaveState({ loading: false, error: err.message || "Failed to save", success: "" });
      return false;
    }
  };

  const resetSaveState = () => setSaveState({ loading: false, error: "", success: "" });

  return { saveEntry, saveState, resetSaveState };
}
