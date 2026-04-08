"use client";

import { motion } from "framer-motion";

interface Column {
  title: string;
  subtitle?: string;
}

interface Row {
  attribute: string;
  values: string[]; // one per column
}

interface ComparisonTableProps {
  columns: Column[];
  rows: Row[];
  /** Column index to visually highlight (0-based) */
  highlights?: number[];
  title?: string;
}

export default function ComparisonTable({ columns, rows, highlights = [], title }: ComparisonTableProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--card-border)" }}
    >
      {title && (
        <div className="px-5 py-3" style={{ background: "var(--card-bg)", borderBottom: "1px solid var(--card-border)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>{title}</p>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr>
              <th
                className="text-left px-4 py-3 text-xs font-medium w-36"
                style={{ color: "var(--text-dim)", background: "var(--card-bg)", borderBottom: "1px solid var(--card-border)" }}
              />
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="text-left px-4 py-3"
                  style={{
                    background: highlights.includes(i) ? `rgba(var(--accent-rgb),0.08)` : "var(--card-bg)",
                    borderBottom: `1px solid ${highlights.includes(i) ? "rgba(var(--accent-rgb),0.3)" : "var(--card-border)"}`,
                    borderLeft: "1px solid var(--card-border)",
                    minWidth: 120,
                  }}
                >
                  <p className="text-sm font-bold" style={{ color: highlights.includes(i) ? "var(--accent)" : "var(--text)" }}>
                    {col.title}
                  </p>
                  {col.subtitle && (
                    <p className="text-[10px] mt-0.5" style={{ color: "var(--text-dim)" }}>{col.subtitle}</p>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {rows.map((row, ri) => (
              <motion.tr
                key={ri}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ri * 0.06 }}
                style={{ borderBottom: "1px solid var(--card-border)" }}
              >
                <td
                  className="px-4 py-3 text-xs font-medium"
                  style={{ color: "var(--text-secondary)", background: "var(--card-bg)" }}
                >
                  {row.attribute}
                </td>
                {row.values.map((val, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-3 text-sm"
                    style={{
                      color: "var(--text)",
                      background: highlights.includes(ci) ? "rgba(var(--accent-rgb),0.04)" : "transparent",
                      borderLeft: "1px solid var(--card-border)",
                    }}
                  >
                    {val === "✓" ? (
                      <span className="font-bold" style={{ color: "#4ade80" }}>✓</span>
                    ) : val === "✗" ? (
                      <span className="font-bold" style={{ color: "#f87171" }}>✗</span>
                    ) : (
                      val
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
