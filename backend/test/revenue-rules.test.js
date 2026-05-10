import test from "node:test";
import assert from "node:assert/strict";
import {
  buildInsights,
  computeSummary,
  enrichRevenueRows,
  isValidDateString,
  mapDiscountBand
} from "../src/lib/revenue-rules.js";

test("isValidDateString validates YYYY-MM-DD format", () => {
  assert.equal(isValidDateString("2026-05-08"), true);
  assert.equal(isValidDateString("2026/05/08"), false);
  assert.equal(isValidDateString("08-05-2026"), false);
});

test("mapDiscountBand classifies thresholds correctly", () => {
  assert.equal(mapDiscountBand(13).discountBand, "HIGH");
  assert.equal(mapDiscountBand(7.1).discountBand, "MEDIUM");
  assert.equal(mapDiscountBand(1).discountBand, "LOW");
  assert.equal(mapDiscountBand(0).discountBand, "NONE");
});

test("enrichRevenueRows and summary produce expected outputs", () => {
  const rows = enrichRevenueRows([
    { date: "2026-05-01", guests: 10, revenue: 4500, discount: 600 },
    { date: "2026-05-02", guests: 10, revenue: 4500, discount: 0 }
  ]);

  const summary = computeSummary(rows);
  const insights = buildInsights(rows, summary);

  assert.equal(rows[0].discountBand, "HIGH");
  assert.equal(rows[0].guestDataQuality, "OK");
  assert.equal(summary.totalRevenue, 9000);
  assert.equal(summary.totalDiscount, 600);
  assert.equal(insights.highRiskDays, 1);
});
