"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VisualItem {
  label: string;
  sublabel?: string;
  status: "active" | "done" | "pending" | "warning";
}

interface Step {
  title: string;
  description: string;
  visual?: VisualItem[];
}

interface StepThroughProps {
  steps: Step[];
  title?: string;
}

const STATUS_COLORS = {
  active: { bg: "rgba(var(--accent-rgb),0.15)", border: "rgba(var(--accent-rgb),0.5)", text: "var(--accent)" },
  done: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.4)", text: "#4ade80" },
  pending: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)", text: "var(--text-secondary)" },
  warning: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.4)", text: "#f87171" },
};

export default function StepThrough({ steps, title }: StepThroughProps) {
  const [step, setStep] = useState(0);
  const current = steps[step];

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
    >
      {title && (
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          {title}
        </p>
      )}

      {/* Step dots */}
      <div className="flex gap-2 items-center">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                background: i <= step ? "var(--accent)" : "rgba(255,255,255,0.15)",
              }}
            />
          </button>
        ))}
        <span className="text-xs ml-1" style={{ color: "var(--text-dim)" }}>
          {step + 1} / {steps.length}
        </span>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: current.visual ? "1fr 1fr" : "1fr" }}>
        {/* Text side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2"
          >
            <p className="text-base font-semibold" style={{ color: "var(--text)" }}>
              {current.title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Visual side */}
        {current.visual && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`vis-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              {current.visual.map((item, i) => {
                const c = STATUS_COLORS[item.status];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl px-3 py-2"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}
                  >
                    <p className="text-xs font-semibold" style={{ color: c.text }}>{item.label}</p>
                    {item.sublabel && (
                      <p className="text-[10px] mt-0.5" style={{ color: "var(--text-dim)" }}>{item.sublabel}</p>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-1">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-xs px-3 py-1.5 rounded-xl cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-secondary)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          ← Back
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="text-xs px-4 py-1.5 rounded-xl font-semibold cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: step < steps.length - 1 ? "var(--accent)" : "rgba(255,255,255,0.06)", color: step < steps.length - 1 ? "#0c0c0c" : "var(--text-secondary)" }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
