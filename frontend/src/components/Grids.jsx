import React from 'react';
import { formatCurrency } from '../utils';

export function KpiGrid({ data }) {
  if (!data) return null;

  const kpis = [
    { label: "Total Revenue", value: formatCurrency(data.summary.totalRevenue) },
    { label: "Total Guests", value: data.summary.totalGuests.toLocaleString() },
    { label: "Total Discount", value: formatCurrency(data.summary.totalDiscount) },
    { label: "Avg Spend / Guest", value: formatCurrency(data.summary.avgSpendPerGuest) },
    { label: "Holiday Days", value: data.insights?.holidayDays ?? 0 },
    { label: "Holiday Revenue", value: formatCurrency(data.insights?.holidayRevenue) },
    { label: "Guest Check Days", value: data.insights?.guestCheckDays ?? 0 },
  ];

  return (
    <section className="kpi-grid">
      {kpis.map((kpi, i) => (
        <article key={i} className="card kpi-card">
          <h3>{kpi.label}</h3>
          <p>{kpi.value}</p>
        </article>
      ))}
    </section>
  );
}

export function InsightGrid({ data }) {
  if (!data) return null;

  const insights = [
    { 
      label: "Overall Discount Rate", 
      value: `${data.summary.discountRatePct}%`,
      status: data.summary.discountRatePct > 25 ? "warning" : "good",
      recommendation: data.summary.discountRatePct > 25 ? "Review promo effectiveness." : "Healthy promo margins."
    },
    { 
      label: "High Risk Days", 
      value: data.insights.highRiskDays,
      status: data.insights.highRiskDays > 2 ? "danger" : "normal",
      recommendation: data.insights.highRiskDays > 2 ? "Audit staff headcount vs guests." : "Operational risk is low."
    },
    {
      label: "Guest Data Health",
      value: data.insights.guestCheckDays > 0 ? "Action Required" : "Optimal",
      status: data.insights.guestCheckDays > 0 ? "warning" : "good",
      recommendation: data.insights.guestCheckDays > 0 ? `${data.insights.guestCheckDays} days need verification.` : "All records verified."
    }
  ];

  return (
    <section className="insight-grid">
      {insights.map((insight, i) => (
        <article key={i} className={`card insight-card status-${insight.status}`}>
          <div className="insight-header">
            <h3>{insight.label}</h3>
            <span className={`status-dot ${insight.status}`}></span>
          </div>
          <p className="insight-value">{insight.value}</p>
          <p className="insight-recommendation">{insight.recommendation}</p>
        </article>
      ))}
    </section>
  );
}
