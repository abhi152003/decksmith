"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Stat {
  value: string;   // e.g. "87%", "$4.2B", "3x"
  label: string;
  trend?: "up" | "down" | "neutral";
  sublabel?: string;
}

interface StatHighlightProps {
  stats: Stat[];
  title?: string;
}

function AnimatedNumber({ value }: { value: string }) {
  // Extract number and suffix/prefix for counting animation
  const match = value.match(/^([^0-9]*)([0-9.]+)([^0-9]*)$/);
  const [displayed, setDisplayed] = useState("0");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!match) { setDisplayed(value); return; }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const duration = 1000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setDisplayed(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, match]);

  return <>{displayed}</>;
}

const TREND_ICONS = {
  up: { icon: "↑", color: "#4ade80" },
  down: { icon: "↓", color: "#f87171" },
  neutral: { icon: "→", color: "var(--text-dim)" },
};

export default function StatHighlight({ stats, title }: StatHighlightProps) {
  return (
    <div className="flex flex-col gap-4">
      {title && (
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          {title}
        </p>
      )}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)` }}>
        {stats.map((stat, i) => {
          const trend = stat.trend ? TREND_ICONS[stat.trend] : null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="rounded-2xl px-5 py-5 flex flex-col gap-1"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              <div className="flex items-end gap-2">
                <span
                  className="text-4xl font-extrabold tracking-tight"
                  style={{ color: "var(--accent)", fontFamily: "var(--font-sans)", lineHeight: 1 }}
                >
                  <AnimatedNumber value={stat.value} />
                </span>
                {trend && (
                  <span className="text-xl font-bold mb-0.5" style={{ color: trend.color }}>
                    {trend.icon}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{stat.label}</p>
              {stat.sublabel && (
                <p className="text-xs" style={{ color: "var(--text-dim)" }}>{stat.sublabel}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
