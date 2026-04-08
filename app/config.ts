// ─────────────────────────────────────────────────────────────────────────────
// PRESENTATION CONFIG — managed by the agent, not edited manually.
// The agent sets brand name, theme, and accent color here after intake.
// ─────────────────────────────────────────────────────────────────────────────

export const PRESENTATION = {
  brand: {
    /** Shown in the header on every slide */
    name: "Your Brand",
    /** Primary accent color — overrides the theme's default accent if set */
    accentColor: null as string | null,
    /** Header logo shape: "asterisk" | "diamond" | "none" */
    logoStyle: "asterisk" as "asterisk" | "diamond" | "none",
  },

  /**
   * Theme preset. Options:
   *   "midnight-operator" — dark, lime green, tech/hacker feel
   *   "chalk-studio"      — dark, orange, creative/startup feel
   *   "crisp-blueprint"   — light, blue, business/academic feel
   *   "signal"            — dark, amber, dev/data-science feel
   *   "sakura"            — light, pink, education/community feel
   *   "carbon"            — dark, emerald, open-source/engineering feel
   */
  theme: "midnight-operator",

  font: {
    /** Google Font name for body text */
    sans: "Plus Jakarta Sans",
    /** Google Font name for code/mono text */
    mono: "JetBrains Mono",
  },
} as const;
