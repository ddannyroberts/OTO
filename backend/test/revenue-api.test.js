import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/server.js";

async function startTestServer(revenueRows) {
  const app = createApp({
    revenueSource: {
      mode: "mock-pos",
      async listRevenueRows({ startDate, endDate }) {
        return revenueRows
          .filter((row) => (!startDate || row.date >= startDate) && (!endDate || row.date <= endDate))
          .sort((left, right) => left.date.localeCompare(right.date));
      }
    }
  });

  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const address = server.address();
      resolve({
        server,
        baseUrl: `http://127.0.0.1:${address.port}`
      });
    });
  });
}

test("GET /api/revenue validates malformed date", async () => {
  const { server, baseUrl } = await startTestServer([]);
  try {
    const res = await fetch(`${baseUrl}/api/revenue?startDate=2026/05/01`);
    const body = await res.json();

    assert.equal(res.status, 400);
    assert.match(body.error, /Invalid startDate format/);
  } finally {
    server.close();
  }
});

test("GET /api/revenue returns enriched payload", async () => {
  const { server, baseUrl } = await startTestServer([
    { date: "2026-05-01", guests: 100, revenue: 54000, discount: 3200 },
    { date: "2026-05-02", guests: 95, revenue: 47000, discount: 1200 }
  ]);

  try {
    const res = await fetch(`${baseUrl}/api/revenue?startDate=2026-05-01&endDate=2026-05-02`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.source, "fresh");
    assert.equal(body.rows.length, 2);
    assert.equal(body.meta.sourceMode, "mock-pos");
    assert.equal(typeof body.insights.guestCheckDays, "number");
    assert.equal(body.filters.startDate, "2026-05-01");
    assert.equal(body.filters.endDate, "2026-05-02");
  } finally {
    server.close();
  }
});
