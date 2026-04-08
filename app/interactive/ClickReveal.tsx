"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RevealItem {
  title: string;
  summary: string;
  detail: string;
}

interface ClickRevealProps {
  items: RevealItem[];
  title?: string;
}

export default function ClickReveal({ items, title }: ClickRevealProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
          {title}
        </p>
      )}

      {items.map((item, i) => {
        const isOpen = open === i;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl overflow-hidden cursor-pointer"
            style={{ border: `1px solid ${isOpen ? "rgba(var(--accent-rgb),0.3)" : "var(--card-border)"}` }}
            onClick={() => setOpen(isOpen ? null : i)}
          >
            {/* Header row */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: isOpen ? "rgba(var(--accent-rgb),0.06)" : "var(--card-bg)" }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: isOpen ? "var(--accent)" : "var(--text)" }}>
                  {item.title}
                </p>
                {!isOpen && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-dim)" }}>
                    {item.summary}
                  </p>
                )}
              </div>
              <span
                className="text-sm transition-transform duration-200 ml-4 shrink-0"
                style={{
                  color: "var(--text-dim)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  display: "inline-block",
                }}
              >
                ▾
              </span>
            </div>

            {/* Expandable detail */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-4 py-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--card-border)" }}
                  >
                    {item.detail}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
