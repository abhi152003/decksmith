"use client";

import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { PRESENTATION } from "../config";
import { getTheme } from "../lib/themes";

interface SlideLayoutProps {
  children: ReactNode;
  /** Optional per-slide accent override */
  accent?: string;
}

export default function SlideLayout({ children, accent }: SlideLayoutProps) {
  const theme = getTheme(PRESENTATION.theme);
  const activeAccent = accent ?? PRESENTATION.brand.accentColor ?? theme.accent;
  const accentRgb = PRESENTATION.brand.accentColor
    ? hexToRgb(PRESENTATION.brand.accentColor)
    : theme.accentRgb;

  // Inject theme CSS variables into :root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--slide-bg", theme.bg);
    root.style.setProperty("--slide-bg-secondary", theme.bgSecondary);
    root.style.setProperty("--accent", activeAccent);
    root.style.setProperty("--accent-rgb", accentRgb);
    root.style.setProperty("--text", theme.text);
    root.style.setProperty("--text-secondary", theme.textSecondary);
    root.style.setProperty("--text-dim", theme.textDim);
    root.style.setProperty("--code-bg", theme.codeBg);
    root.style.setProperty("--card-bg", theme.cardBg);
    root.style.setProperty("--card-border", theme.cardBorder);
  }, [theme, activeAccent, accentRgb]);

  const gradient = `radial-gradient(ellipse at 80% 15%, rgba(${accentRgb},0.05) 0%, transparent 50%), linear-gradient(160deg, ${theme.bg} 0%, ${theme.bgSecondary} 100%)`;

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: gradient, color: theme.text }}
    >
      {/* Subtle corner bloom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 95% 5%, rgba(${accentRgb},0.04) 0%, transparent 30%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center py-3 px-8">
        <BrandLogo accent={activeAccent} light={theme.light} />
      </header>

      {/* Thin separator */}
      <div
        className="h-px w-full"
        style={{ background: theme.light ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)" }}
      />

      {/* Main content */}
      <main className="relative z-10 flex-1 overflow-hidden px-12 py-8">
        {children}
      </main>

      {/* Dot grid decoration */}
      <DotGrid accent={activeAccent} />
    </div>
  );
}

function BrandLogo({ accent, light }: { accent: string; light: boolean }) {
  const { name, logoStyle } = PRESENTATION.brand;
  const textColor = light ? "#1a1a1a" : "#f5f0eb";

  return (
    <div className="flex items-center gap-2.5">
      {logoStyle !== "none" && (
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{
            background: `linear-gradient(145deg, rgba(${hexToRgb(accent)},0.18) 0%, rgba(255,255,255,0.04) 100%)`,
            border: `1px solid rgba(${hexToRgb(accent)},0.3)`,
            boxShadow: `0 0 14px rgba(${hexToRgb(accent)},0.25)`,
          }}
        >
          <Image
            src="/decksmith-logo-mark.png"
            alt="Decksmith logo"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
            priority
          />
        </div>
      )}
      <span
        className="text-sm font-bold tracking-[0.2em] uppercase"
        style={{ color: textColor, fontFamily: "var(--font-sans)" }}
      >
        {name}
      </span>
    </div>
  );
}

function DotGrid({ accent }: { accent: string }) {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 opacity-10" style={{ width: 120, height: 120 }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="1.5" fill={accent} />
          ))
        )}
      </svg>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "201,241,53";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}
