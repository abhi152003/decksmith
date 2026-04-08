"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  category?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  title?: string;
}

export default function Timeline({ events, title }: TimelineProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {title && (
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          {title}
        </p>
      )}

      {/* Timeline track */}
      <div className="relative">
        {/* Connecting line */}
        <div
          className="absolute top-4 left-0 right-0 h-px"
          style={{ background: "var(--card-border)" }}
        />

        {/* Events */}
        <div className="relative flex justify-between gap-2">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-2 flex-1 cursor-pointer"
              onClick={() => setSelected(selected === i ? null : i)}
            >
              {/* Dot */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all duration-200"
                style={{
                  background: selected === i ? "var(--accent)" : "var(--card-bg)",
                  border: `2px solid ${selected === i ? "var(--accent)" : "rgba(var(--accent-rgb),0.4)"}`,
                  color: selected === i ? "#0c0c0c" : "var(--accent)",
                  boxShadow: selected === i ? `0 0 12px rgba(var(--accent-rgb),0.4)` : "none",
                }}
              >
                {i + 1}
              </div>

              {/* Date */}
              <span className="text-[10px] font-mono text-center" style={{ color: "var(--text-dim)" }}>
                {ev.date}
              </span>

              {/* Title (short) */}
              <span
                className="text-xs font-semibold text-center leading-tight"
                style={{ color: selected === i ? "var(--accent)" : "var(--text)" }}
              >
                {ev.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail card */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="rounded-xl px-4 py-3"
              style={{ background: "rgba(var(--accent-rgb),0.06)", border: "1px solid rgba(var(--accent-rgb),0.2)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>
                  {events[selected].date}
                </span>
                {events[selected].category && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "rgba(var(--accent-rgb),0.15)", color: "var(--accent)" }}
                  >
                    {events[selected].category}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>
                {events[selected].title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {events[selected].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
