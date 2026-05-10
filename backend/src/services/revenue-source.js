const MOCK_POS_ROWS = [
  { date: "2026-05-01", guests: 148, revenue: 67800, discount: 5200 },
  { date: "2026-05-02", guests: 131, revenue: 59200, discount: 4200 },
  { date: "2026-05-03", guests: 173, revenue: 80100, discount: 9300 },
  { date: "2026-05-04", guests: 126, revenue: 57100, discount: 1800 },
  { date: "2026-05-05", guests: 119, revenue: 52300, discount: 1400 }
];

function filterByDateRange(rows, startDate, endDate) {
  return rows
    .filter((row) => (!startDate || row.date >= startDate) && (!endDate || row.date <= endDate))
    .sort((left, right) => left.date.localeCompare(right.date));
}

function createDatabaseRevenueSource(prisma) {
  return {
    mode: "database",
    async listRevenueRows({ startDate, endDate }) {
      const where = {};
      if (startDate || endDate) {
        where.date = {};
        if (startDate) where.date.gte = startDate;
        if (endDate) where.date.lte = endDate;
      }

      return prisma.revenueDaily.findMany({
        where,
        orderBy: { date: "asc" }
      });
    }
  };
}

function createMockPosRevenueSource() {
  return {
    mode: "mock-pos",
    async listRevenueRows({ startDate, endDate }) {
      return filterByDateRange(MOCK_POS_ROWS, startDate, endDate);
    }
  };
}

export function createRevenueSource({ prisma, mode = process.env.REVENUE_SOURCE || "database" }) {
  if (mode === "mock-pos") {
    return createMockPosRevenueSource();
  }
  return createDatabaseRevenueSource(prisma);
}
