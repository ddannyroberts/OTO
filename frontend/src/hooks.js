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
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
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
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
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

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error("Auth check failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        return true;
      } else {
        setError(data.error || "Login failed");
        return false;
      }
    } catch (err) {
      setError("Network error");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { user, loading, error, login, logout };
}
