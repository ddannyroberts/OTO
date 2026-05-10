import React from 'react';

export function RevenueDiscountChart({ rows }) {
  if (!rows || !rows.length) return null;

  const width = 820;
  const height = 220;
  const padding = 28;
  const maxValue = Math.max(...rows.map((r) => Math.max(r.revenue, r.discount)), 1);
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const getPoints = (key) => rows
    .map((row, index) => {
      const x = padding + (index * plotWidth) / Math.max(rows.length - 1, 1);
      const y = height - padding - (row[key] / maxValue) * plotHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const revenuePoints = getPoints('revenue');
  const discountPoints = getPoints('discount');

  const holidayOverlays = rows
    .map((row, index) => {
      if (!row.isHoliday) return null;
      const x = padding + (index * plotWidth) / Math.max(rows.length - 1, 1);
      const nextX = padding + ((index + 1) * plotWidth) / Math.max(rows.length - 1, 1);
      const rectWidth = rows.length > 1 ? nextX - x : 20;
      return (
        <rect
          key={`holiday-${index}`}
          x={x - rectWidth / 2}
          y={padding}
          width={rectWidth}
          height={plotHeight}
          className="holiday-overlay"
        >
          <title>Public/School Holiday</title>
        </rect>
      );
    })
    .filter(Boolean);

  return (
    <section className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <h3>Revenue vs Discount (Daily)</h3>
          <p>Visual comparison for trend and promo impact.</p>
        </div>
        <div className="chart-badges">
          <span className="badge holiday-badge">Holiday Overlays Active</span>
        </div>
      </div>
      <div className="svg-container">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Revenue and discount trend">
          {/* Holiday backgrounds */}
          {holidayOverlays}
          
          {/* Grid lines */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="axis" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} className="axis" />
          
          {/* Paths */}
          <polyline points={revenuePoints} fill="none" className="line revenue" />
          <polyline points={discountPoints} fill="none" className="line discount" />
          
          {/* Data points */}
          {rows.map((row, index) => {
            const x = padding + (index * plotWidth) / Math.max(rows.length - 1, 1);
            const ry = height - padding - (row.revenue / maxValue) * plotHeight;
            const dy = height - padding - (row.discount / maxValue) * plotHeight;
            return (
              <g key={index} className="chart-point-group">
                <circle cx={x} cy={ry} r="4" className="dot-point revenue">
                  <title>{`${row.date}: Revenue THB ${row.revenue.toLocaleString()}`}</title>
                </circle>
                <circle cx={x} cy={dy} r="4" className="dot-point discount">
                  <title>{`${row.date}: Discount THB ${row.discount.toLocaleString()}`}</title>
                </circle>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="legend">
        <span className="dot revenue" /> Revenue
        <span className="dot discount" /> Discount
      </div>
    </section>
  );
}
