export interface Theme {
  id: string;
  name: string;
  mood: string;
  bg: string;
  bgSecondary: string;
  accent: string;
  accentRgb: string; // "r,g,b" for rgba()
  text: string;
  textSecondary: string;
  textDim: string;
  codeBg: string;
  cardBg: string;
  cardBorder: string;
  light: boolean; // true = light background (use dark text)
}

export const THEMES: Record<string, Theme> = {
  "midnight-operator": {
    id: "midnight-operator",
    name: "Midnight Operator",
    mood: "Tech, blockchain, hacker aesthetic — high contrast, sharp, authoritative",
    bg: "#0c0c0c",
    bgSecondary: "#111111",
    accent: "#c9f135",
    accentRgb: "201,241,53",
    text: "#f5f0eb",
    textSecondary: "#a0a09a",
    textDim: "rgba(255,255,255,0.3)",
    codeBg: "#161b22",
    cardBg: "rgba(255,255,255,0.04)",
    cardBorder: "rgba(255,255,255,0.08)",
    light: false,
  },
  "chalk-studio": {
    id: "chalk-studio",
    name: "Chalk Studio",
    mood: "Creative, startup, design — warm, energetic, approachable",
    bg: "#1c1c1e",
    bgSecondary: "#242426",
    accent: "#f97316",
    accentRgb: "249,115,22",
    text: "#f8f5f0",
    textSecondary: "#a8a29e",
    textDim: "rgba(255,255,255,0.3)",
    codeBg: "#18181b",
    cardBg: "rgba(255,255,255,0.04)",
    cardBorder: "rgba(255,255,255,0.08)",
    light: false,
  },
  "crisp-blueprint": {
    id: "crisp-blueprint",
    name: "Crisp Blueprint",
    mood: "Business, academic, consulting — clean, trustworthy, professional",
    bg: "#fafaf9",
    bgSecondary: "#f3f3f1",
    accent: "#2563eb",
    accentRgb: "37,99,235",
    text: "#1a1a1a",
    textSecondary: "#52525b",
    textDim: "rgba(0,0,0,0.35)",
    codeBg: "#1e293b",
    cardBg: "rgba(0,0,0,0.03)",
    cardBorder: "rgba(0,0,0,0.08)",
    light: true,
  },
  "signal": {
    id: "signal",
    name: "Signal",
    mood: "Dev, data science, terminal — focused, information-dense, precise",
    bg: "#111827",
    bgSecondary: "#1f2937",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    text: "#f9fafb",
    textSecondary: "#9ca3af",
    textDim: "rgba(255,255,255,0.3)",
    codeBg: "#0d1117",
    cardBg: "rgba(255,255,255,0.04)",
    cardBorder: "rgba(255,255,255,0.08)",
    light: false,
  },
  "sakura": {
    id: "sakura",
    name: "Sakura",
    mood: "Education, community, onboarding — warm, inviting, friendly",
    bg: "#fdf8f5",
    bgSecondary: "#f7ede6",
    accent: "#e91e8c",
    accentRgb: "233,30,140",
    text: "#1a0a0a",
    textSecondary: "#6b5050",
    textDim: "rgba(0,0,0,0.35)",
    codeBg: "#1e1e2e",
    cardBg: "rgba(0,0,0,0.03)",
    cardBorder: "rgba(0,0,0,0.08)",
    light: true,
  },
  "carbon": {
    id: "carbon",
    name: "Carbon",
    mood: "Open source, engineering, code review — familiar, grounded, serious",
    bg: "#161b22",
    bgSecondary: "#1c2128",
    accent: "#3dd68c",
    accentRgb: "61,214,140",
    text: "#e6edf3",
    textSecondary: "#8b949e",
    textDim: "rgba(255,255,255,0.3)",
    codeBg: "#0d1117",
    cardBg: "rgba(255,255,255,0.04)",
    cardBorder: "rgba(255,255,255,0.08)",
    light: false,
  },
};

export function getTheme(id: string): Theme {
  return THEMES[id] ?? THEMES["midnight-operator"];
}
