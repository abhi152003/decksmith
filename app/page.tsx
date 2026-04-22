"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SlideProgress from "./components/SlideProgress";
import NavArrows from "./components/NavArrows";
import { getTheme } from "./lib/themes";
import { PRESENTATION } from "./config";

const SLIDE_W = 1280;
const SLIDE_H = 720;

function useSlideScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    function compute() {
      setScale(Math.min(1, window.innerWidth / SLIDE_W, window.innerHeight / SLIDE_H));
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return scale;
}

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
  const scale = useSlideScale();

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

  const features = [
    { icon: "✦", label: "8 interactive components", desc: "Quiz, timeline, bar chart, flow diagram, and more — drop any into a slide." },
    { icon: "◈", label: "6 curated themes", desc: "From high-contrast dark to clean light. Each one designed for a specific audience and mood." },
    { icon: "⟳", label: "Keyboard & touch navigation", desc: "Arrow keys, space, Home/End, and swipe. Works on a laptop or a tablet on stage." },
  ];

  const SlideComponent = TOTAL > 0 ? SLIDES[current] : null;

  return (
    // Outer shell: fills the viewport, centers the slide canvas
    <div
      className="w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{ background: theme.bg }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Fixed-size slide canvas — scaled to fit any viewport */}
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {TOTAL === 0 ? (
          /* Empty state — landing page, designed to fit exactly in 720px tall canvas */
          <div className="w-full h-full overflow-hidden flex flex-col" style={{ background: theme.bg }}>
            {/* Hero */}
            <div className="flex flex-col items-center justify-center px-8 pt-10 pb-6 text-center">
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
                style={{ background: `rgba(${theme.accentRgb},0.1)`, border: `1px solid rgba(${theme.accentRgb},0.25)`, color: theme.accent }}
              >
                <span style={{ fontSize: 10 }}>✦</span> Vibe-coded presentations
              </div>
              {/* Logo mark */}
              <div
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl"
                style={{
                  background: `linear-gradient(145deg, rgba(${theme.accentRgb},0.15) 0%, rgba(255,255,255,0.04) 100%)`,
                  border: `1px solid rgba(${theme.accentRgb},0.3)`,
                  boxShadow: `0 0 40px rgba(${theme.accentRgb},0.2), inset 0 1px 0 rgba(255,255,255,0.08)`,
                }}
              >
                <Image
                  src="/decksmith-logo-mark.png"
                  alt="Decksmith logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  priority
                />
              </div>
              <h1
                className="text-6xl font-extrabold tracking-tight mb-3"
                style={{ color: theme.text, letterSpacing: "-0.04em", fontFamily: "var(--font-sans)", lineHeight: 1 }}
              >
                Decksmith
              </h1>
              <p className="text-base max-w-md" style={{ color: theme.textSecondary }}>
                Tell Claude your topic. It builds the whole deck — interactive, branded, ready to present.
              </p>
            </div>

            {/* Two-column body: CTA card + feature cards */}
            <div className="flex-1 flex items-center gap-6 px-12 pb-8">
              {/* Get started card */}
              <div
                className="flex-1 rounded-2xl px-6 py-5"
                style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
              >
                <p className="text-sm font-semibold mb-3" style={{ color: theme.text }}>Get started</p>
                <ol className="flex flex-col gap-2.5 list-none mb-4">
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
                <p className="text-xs" style={{ color: theme.textDim }}>
                  Already have a deck? Drop a PDF into{" "}
                  <span className="font-mono" style={{ color: theme.accent }}>slides/</span>
                </p>
              </div>

              {/* Feature cards */}
              <div className="flex flex-col gap-3" style={{ width: 420 }}>
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-2xl px-5 py-3.5 flex items-start gap-4"
                    style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
                  >
                    <div className="text-lg shrink-0 mt-0.5" style={{ color: theme.accent }}>{f.icon}</div>
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: theme.text }}>{f.label}</p>
                      <p className="text-xs leading-relaxed" style={{ color: theme.textSecondary }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Presentation mode */
          <>
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
                {SlideComponent && <SlideComponent />}
              </motion.div>
            </AnimatePresence>

            <NavArrows
              onPrev={prev}
              onNext={next}
              canPrev={current > 0}
              canNext={current < TOTAL - 1}
            />

            <SlideProgress current={current} total={TOTAL} onGoTo={(i) => goTo(i)} />
          </>
        )}
      </div>
    </div>
  );
}
