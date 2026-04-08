"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BarItem {
  label: string;
  value: number;
  note?: string;
}

interface BarChartProps {
  items: BarItem[];
  unit?: string;
  title?: string;
  /** If not provided, uses the max value in items */
  maxValue?: number;
}

export default function BarChart({ items, unit = "", title, maxValue }: BarChartProps) {
  const [tooltip, setTooltip] = useState<number | null>(null);
  const max = maxValue ?? Math.max(...items.map((i) => i.value));

  return (
    <div className="flex flex-col gap-3">
      {title && (
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          {title}
        </p>
      )}

      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => {
          const pct = (item.value / max) * 100;
          const isHovered = tooltip === i;

          return (
            <div
              key={i}
              className="flex items-center gap-3 cursor-pointer group"
              onMouseEnter={() => setTooltip(i)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Label */}
              <div className="text-xs w-28 shrink-0 text-right" style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </div>

              {/* Bar track */}
              <div className="flex-1 rounded-full h-6 relative" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: isHovered
                      ? `rgba(var(--accent-rgb),0.9)`
                      : `rgba(var(--accent-rgb),0.6)`,
                    minWidth: pct > 0 ? 8 : 0,
                    transition: "background 0.15s",
                  }}
                />

                {/* Tooltip */}
                {isHovered && item.note && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-8 left-2 text-[10px] px-2 py-1 rounded-lg whitespace-nowrap z-10"
                    style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--text)" }}
                  >
                    {item.note}
                  </motion.div>
                )}
              </div>

              {/* Value */}
              <div
                className="text-xs font-mono font-semibold w-16 shrink-0"
                style={{ color: isHovered ? "var(--accent)" : "var(--text)" }}
              >
                {item.value}{unit}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
