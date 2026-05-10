export function bandClassName(band) {
  if (band === "HIGH") return "pill high";
  if (band === "MEDIUM") return "pill medium";
  if (band === "LOW") return "pill low";
  return "pill none";
}

export function qualityClassName(quality) {
  return quality === "CHECK" ? "quality check" : "quality ok";
}

export function formatCurrency(value) {
  return `THB ${Number(value || 0).toLocaleString("en-US")}`;
}

export function exportToCSV(rows, summary) {
  if (!rows || !rows.length) return;

  const headers = ["Date", "Guests", "Revenue", "Discount", "Discount %", "Risk Band", "Action"];
  const csvRows = [
    headers.join(","),
    ...rows.map(r => [
      r.date,
      r.guests,
      r.revenue,
      r.discount,
      r.discountRatePct,
      r.discountBand,
      `"${r.action}"`
    ].join(","))
  ];

  const blob = new Blob([csvRows.join("\n")], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `oto_revenue_report_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
