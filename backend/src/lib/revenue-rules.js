export const EXPECTED_SPEND_PER_GUEST = 450;
export const GUEST_DELTA_ALERT_THRESHOLD = 20;

export function isValidDateString(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function computeSummary(data) {
  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
  const totalGuests = data.reduce((sum, row) => sum + row.guests, 0);
  const totalDiscount = data.reduce((sum, row) => sum + row.discount, 0);
  const avgSpendPerGuest = totalGuests
    ? Number((totalRevenue / totalGuests).toFixed(2))
    : 0;
  const discountRatePct = totalRevenue
    ? Number(((totalDiscount / totalRevenue) * 100).toFixed(2))
    : 0;

  return {
    totalRevenue,
    totalGuests,
    totalDiscount,
    avgSpendPerGuest,
    discountRatePct
  };
}

export function mapDiscountBand(discountRatePct) {
  if (discountRatePct >= 12) {
    return {
      discountBand: "HIGH",
      action: "Review campaigns and coupon abuse risk"
    };
  }
  if (discountRatePct >= 7) {
    return {
      discountBand: "MEDIUM",
      action: "Monitor promo performance daily"
    };
  }
  if (discountRatePct > 0) {
    return {
      discountBand: "LOW",
      action: "Healthy discount level"
    };
  }
  return {
    discountBand: "NONE",
    action: "No discount applied"
  };
}

export function addDiscountInsights(rows) {
  return rows.map((row) => {
    const discountRatePct = row.revenue
      ? Number(((row.discount / row.revenue) * 100).toFixed(2))
      : 0;

    return {
      ...row,
      discountRatePct,
      ...mapDiscountBand(discountRatePct)
    };
  });
}

export function isSchoolHolidayDate(dateStr) {
  const holidayRanges = [
    { start: "2026-03-15", end: "2026-05-15" },
    { start: "2026-10-01", end: "2026-10-31" }
  ];
  return holidayRanges.some((range) => dateStr >= range.start && dateStr <= range.end);
}

export function addHolidayOverlay(rows) {
  return rows.map((row) => ({
    ...row,
    isSchoolHoliday: isSchoolHolidayDate(row.date)
  }));
}

export function applyGuestAutoRule(rows) {
  return rows.map((row) => {
    const estimatedGuests = Math.max(1, Math.round(row.revenue / EXPECTED_SPEND_PER_GUEST));
    const guestDelta = estimatedGuests - row.guests;

    return {
      ...row,
      estimatedGuests,
      guestDelta,
      guestDataQuality: Math.abs(guestDelta) >= GUEST_DELTA_ALERT_THRESHOLD ? "CHECK" : "OK"
    };
  });
}

export function buildInsights(enrichedRows, summary) {
  const highRiskDays = enrichedRows.filter((row) => row.discountBand === "HIGH").length;
  const holidayDays = enrichedRows.filter((row) => row.isSchoolHoliday).length;
  const guestCheckDays = enrichedRows.filter((row) => row.guestDataQuality === "CHECK").length;
  const holidayRevenue = enrichedRows
    .filter((row) => row.isSchoolHoliday)
    .reduce((sum, row) => sum + row.revenue, 0);

  return {
    highRiskDays,
    overallDiscountRatePct: summary.discountRatePct,
    holidayDays,
    holidayRevenue,
    guestCheckDays
  };
}

export function enrichRevenueRows(rows) {
  const withDiscountInsights = addDiscountInsights(rows);
  const withHolidayOverlay = addHolidayOverlay(withDiscountInsights);
  return applyGuestAutoRule(withHolidayOverlay);
}
