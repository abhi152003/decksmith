"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizWidgetProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function QuizWidget({
  question,
  options,
  correctIndex,
  explanation,
}: QuizWidgetProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const getStyle = (i: number): React.CSSProperties => {
    if (selected === null) {
      return {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#f5f0eb",
      };
    }
    if (i === correctIndex) {
      return {
        background: "rgba(16,185,129,0.15)",
        border: "1px solid rgba(16,185,129,0.6)",
        color: "#6ee7b7",
      };
    }
    if (i === selected) {
      return {
        background: "rgba(239,68,68,0.12)",
        border: "1px solid rgba(239,68,68,0.5)",
        color: "#fca5a5",
      };
    }
    return {
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      color: "rgba(245,240,235,0.4)",
    };
  };

  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "#c9f135" }}>
        Quick Check
      </p>
      <p className="text-sm mb-4" style={{ color: "#f5f0eb" }}>
        {question}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className="text-left text-xs rounded-xl px-3 py-2.5 transition-all duration-200 font-mono cursor-pointer"
            style={getStyle(i)}
          >
            <span className="mr-2 opacity-50">{String.fromCharCode(65 + i)}.</span>
            {opt}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-start gap-2"
          >
            <span className="text-xs" style={{ color: selected === correctIndex ? "#6ee7b7" : "#fca5a5" }}>
              {selected === correctIndex ? "✓ Correct! " : "✗ Not quite. "}
            </span>
            <span className="text-xs" style={{ color: "#c9c3bb" }}>
              {explanation}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {selected !== null && (
        <button
          onClick={() => setSelected(null)}
          className="mt-3 text-xs underline cursor-pointer"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
