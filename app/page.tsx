"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SlideProgress from "./components/SlideProgress";
import NavArrows from "./components/NavArrows";
import { getTheme } from "./lib/themes";
import { PRESENTATION } from "./config";

// ─────────────────────────────────────────────────────────────────────────────
// This file is managed by the agent — you don't need to edit it manually.
// Just describe your presentation and the agent will add slides here for you.
// ─────────────────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SLIDES: React.ComponentType<any>[] = [
  // Add your slide components here
];

const TOTAL = SLIDES.length;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const theme = getTheme(PRESENTATION.theme);

  const goTo = useCallback((index: number, dir?: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, index));
    setDirection(dir ?? (clamped > current ? 1 : -1));
    setCurrent(clamped);
  }, [current]);

  const next = useCallback(() => { if (current < TOTAL - 1) goTo(current + 1, 1); }, [current, goTo]);
  const prev = useCallback(() => { if (current > 0) goTo(current - 1, -1); }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "Home") goTo(0, -1);
      else if (e.key === "End") goTo(TOTAL - 1, 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, goTo]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  // Empty state — landing page
  if (TOTAL === 0) {
    const features = [
      { icon: "✦", label: "8 interactive components", desc: "Quiz, timeline, bar chart, flow diagram, and more — drop any into a slide." },
      { icon: "◈", label: "6 curated themes", desc: "From high-contrast dark to clean light. Each one designed for a specific audience and mood." },
      { icon: "⟳", label: "Keyboard & touch navigation", desc: "Arrow keys, space, Home/End, and swipe. Works on a laptop or a tablet on stage." },
    ];

    return (
      <div
        className="w-full h-full overflow-auto flex flex-col"
        style={{ background: theme.bg }}
      >
        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-center">
          {/* Badge */}
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ background: `rgba(${theme.accentRgb},0.1)`, border: `1px solid rgba(${theme.accentRgb},0.25)`, color: theme.accent }}
          >
            <span style={{ fontSize: 10 }}>✦</span> Vibe-coded presentations
          </div>

          {/* Name */}
          <h1
            className="text-7xl font-extrabold tracking-tight mb-4"
            style={{ color: theme.text, letterSpacing: "-0.04em", fontFamily: "var(--font-sans)", lineHeight: 1 }}
          >
            Decksmith
          </h1>

          {/* Tagline */}
          <p className="text-xl mb-2 max-w-lg" style={{ color: theme.textSecondary }}>
            Tell Claude what you want to present.
          </p>
          <p className="text-xl max-w-lg" style={{ color: theme.textSecondary }}>
            It builds the whole deck — interactive, branded, ready to present.
          </p>

          {/* CTA hint */}
          <div
            className="mt-10 rounded-2xl px-6 py-4 text-sm max-w-sm text-left"
            style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
          >
            <p className="font-semibold mb-2" style={{ color: theme.text }}>Get started</p>
            <ol className="flex flex-col gap-1.5 list-none">
              {[
                "Open Claude Code in this directory",
                "Describe your topic, audience, and talk length",
                "Claude asks a few questions, then builds everything",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-xs" style={{ color: theme.textSecondary }}>
                  <span
                    className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: `rgba(${theme.accentRgb},0.15)`, color: theme.accent }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Drop-in hint */}
          <p className="mt-5 text-xs" style={{ color: theme.textDim }}>
            Already have a deck? Drop a PDF or PPTX into{" "}
            <span className="font-mono" style={{ color: theme.accent }}>slides/</span>{" "}
            and Claude will convert it.
          </p>
        </div>

        {/* Feature cards */}
        <div
          className="px-8 pb-12 grid grid-cols-3 gap-4 max-w-4xl mx-auto w-full"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl px-5 py-4"
              style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
            >
              <div
                className="text-xl mb-3"
                style={{ color: theme.accent }}
              >
                {f.icon}
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: theme.text }}>{f.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const SlideComponent = SLIDES[current];

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: theme.bg }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", ease: "easeInOut", duration: 0.32 }}
          className="absolute inset-0"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      <NavArrows
        onPrev={prev}
        onNext={next}
        canPrev={current > 0}
        canNext={current < TOTAL - 1}
      />

      <SlideProgress current={current} total={TOTAL} onGoTo={(i) => goTo(i)} />
    </div>
  );
}
