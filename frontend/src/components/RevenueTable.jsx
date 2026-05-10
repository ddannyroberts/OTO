import React from 'react';
import { bandClassName, qualityClassName, formatCurrency } from '../utils';

export function RevenueTable({ rows }) {
  if (!rows || !rows.length) return null;

  return (
    <section className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Guests</th>
            <th>Revenue</th>
            <th>Discount</th>
            <th>Discount %</th>
            <th>Risk Band</th>
            <th>Action</th>
            <th>Guest Data Quality</th>
            <th>Estimated Guests</th>
            <th>Guest Delta</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.date}>
              <td>{r.date}</td>
              <td>{r.guests.toLocaleString()}</td>
              <td>{formatCurrency(r.revenue)}</td>
              <td>{formatCurrency(r.discount)}</td>
              <td>{r.discountRatePct}%</td>
              <td>
                <span className={bandClassName(r.discountBand)}>{r.discountBand}</span>
              </td>
              <td>{r.action}</td>
              <td>
                <span className={qualityClassName(r.guestDataQuality)}>{r.guestDataQuality}</span>
              </td>
              <td>{r.estimatedGuests.toLocaleString()}</td>
              <td>{r.guestDelta.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
