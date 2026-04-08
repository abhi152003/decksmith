
---

# vibe-ppt — Agent Guide

You are building an interactive web presentation. **You do everything** — ask the user questions, then handle all file creation, config editing, slide writing, and registration yourself. The user should never have to touch a config file or write code.

---

## 1. Intake — Ask Before You Build

When the user starts a new presentation, run through this intake in one message. Ask all questions together, not one at a time.

```
I'll need a few details to get started:

1. What's the topic? (One sentence is enough.)
2. Who's the audience, and what's the setting?
   (e.g. "investors in a boardroom", "students in a workshop", "customers at a product demo")
3. What should they feel or do when it ends?
   (e.g. "convinced to sign up", "able to explain the concept", "excited about the roadmap")
4. How long is the talk? (This sets the slide count — roughly 1–2 min per slide.)
5. Do you have a brand or visual style in mind?
   - Specific colors or a hex code?
   - A logo or icon preference (asterisk ✳ / diamond ◇ / none)?
   - Or should I suggest themes based on your topic?
6. Do you already have slides or content somewhere?
   - Drop a PDF, PPTX, or any text file into the `slides/` directory and tell me — I'll read it and use it as the source of truth.
   - Or just describe the content and I'll build from scratch.
```

**Do not write a single slide until you have answers to at least 1, 2, 3, and 6.**

---

## 2. Theme Selection — You Pick, Not the User

If the user has no theme in mind, **you pick 3 options** based on the context they described. Never ask "dark or light?" — that's a non-answer. Present concrete names with one-line mood descriptions.

**Example response when user has no theme:**
> Based on your audience (product managers at a SaaS company) and goal (convince them to adopt the new workflow), here are 3 themes that would work well:
>
> **A. Crisp Blueprint** — Light background, blue accent. Feels professional and trustworthy. Good for internal pitches.
> **B. Chalk Studio** — Dark background, orange accent. Energetic and modern. Good if you want to stand out.
> **C. Signal** — Dark background, amber accent. Data-focused, precise. Good if the deck is numbers-heavy.
>
> Which feels right, or should I use one by default?

**Full theme menu** — use this to match theme to context:

| Theme ID | Name | Feel | Best for |
|---|---|---|---|
| `midnight-operator` | Midnight Operator | Authoritative, sharp, high-contrast. Commands attention in a dark room. | Tech demos, crypto/blockchain, developer talks, product launches |
| `chalk-studio` | Chalk Studio | Warm and energetic. Feels like creative work in progress. | Design critiques, startup pitches, creative direction, UX presentations |
| `crisp-blueprint` | Crisp Blueprint | Clean and trustworthy. Feels formal without being cold. | Investor decks, academic lectures, strategy presentations, consulting |
| `signal` | Signal | Dense and precise. Every element earns its place. | Data science, research findings, engineering deep-dives, analytics reviews |
| `sakura` | Sakura | Inviting and warm. Reduces friction for non-technical audiences. | Education, onboarding, community events, workshops |
| `carbon` | Carbon | Grounded and serious. Familiar to developers, not intimidating. | Open source, code walkthroughs, engineering retrospectives |

---

## 3. Handling Existing Content (PDF / PPTX / Notes)

If the user drops a file into `slides/`, read it before doing anything else.

- **PDF**: Use the Read tool on the file path. Extract slide titles, body text, speaker notes, and any data (numbers, comparisons, lists).
- **PPTX or other formats**: Ask the user to export as PDF, or ask them to paste the content as text.
- **Text/markdown notes**: Read directly and treat as the source outline.

After reading:
1. Confirm your understanding: "I see X slides covering [topics]. I'll restructure these into the vibe-ppt format — keeping all your content but improving the layout and adding [1–2 interactive components where it makes sense]. Does that sound right?"
2. Map each original slide to one of the 7 slide types.
3. Identify 1–3 places where an interactive component would replace a static list or table.
4. Then build.

---

## 4. What You Do After Intake

After gathering all inputs, in this order:

**Step 1 — Write the outline**
Present a numbered list of slide titles with one-sentence descriptions. Get a thumbs-up before building.

**Step 2 — Edit `app/config.ts`**
Set `brand.name`, `theme`, and `brand.accentColor` (if the user specified a custom color). Do this yourself — never tell the user to edit this file.

**Step 3 — Create all slides**
Write each slide as `app/slides/SlideNN_TopicName.tsx`. Use the slide type templates in Section 5.

**Step 4 — Register slides in `app/page.tsx`**
Add imports and update the `SLIDES` array. Do this yourself.

**Step 5 — Confirm**
Tell the user: "Done. Run `npm run dev` and navigate with arrow keys or swipe. Let me know what to adjust."

---

## 5. Slide Types — Use the Right One

Every slide fits one of these 7 types. If it doesn't fit, split it.

### `hero` — Opening or section title
One focal element. No body copy. Max 2 lines of text.
```tsx
<SlideLayout>
  <div className="h-full flex flex-col items-center justify-center text-center gap-4">
    <span className="text-xs uppercase tracking-widest" style={{ color: "var(--accent)" }}>Optional badge</span>
    <h1 className="text-6xl font-extrabold tracking-tight" style={{ color: "var(--text)" }}>
      Big Bold Title
    </h1>
    <p className="text-xl" style={{ color: "var(--text-secondary)" }}>One-line subtitle</p>
  </div>
</SlideLayout>
```

### `concept` — Introduce one idea
Label + heading + 2–4 bullets. Never more than 4 bullets.
```tsx
<SlideLayout>
  <div className="h-full flex flex-col justify-center max-w-3xl">
    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>Section label</p>
    <h2 className="text-4xl font-extrabold mb-6 tracking-tight" style={{ color: "var(--text)" }}>The Main Idea</h2>
    <ul className="flex flex-col gap-3">
      {["Point one", "Point two", "Point three"].map((p, i) => (
        <li key={i} className="flex items-start gap-3 text-base" style={{ color: "var(--text-secondary)" }}>
          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          {p}
        </li>
      ))}
    </ul>
  </div>
</SlideLayout>
```

### `code` — Show code + explanation
CodeBlock left, explanation right. Max 20 lines of code.
```tsx
<SlideLayout>
  <div className="h-full flex flex-col justify-center gap-4 max-w-5xl mx-auto">
    <h2 className="text-3xl font-bold" style={{ color: "var(--text)" }}>Slide Title</h2>
    <div className="grid grid-cols-2 gap-5 flex-1">
      <CodeBlock code={`your code here`} language="python" />
      <div className="flex flex-col justify-center gap-3">
        <p style={{ color: "var(--text-secondary)" }}>Explanation text here.</p>
      </div>
    </div>
  </div>
</SlideLayout>
```

### `demo` — Interactive component, full focus
One component. Minimal surrounding text.
```tsx
<SlideLayout>
  <div className="h-full flex flex-col justify-center max-w-4xl mx-auto gap-4">
    <h2 className="text-3xl font-bold" style={{ color: "var(--text)" }}>Try It</h2>
    <YourInteractiveComponent ... />
  </div>
</SlideLayout>
```

### `compare` — Two-column contrast
```tsx
<SlideLayout>
  <div className="h-full flex flex-col justify-center max-w-5xl mx-auto gap-5">
    <h2 className="text-3xl font-bold" style={{ color: "var(--text)" }}>A vs B</h2>
    <div className="grid grid-cols-2 gap-5">
      <div className="rounded-2xl p-5" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
        {/* Option A */}
      </div>
      <div className="rounded-2xl p-5" style={{ background: "rgba(var(--accent-rgb),0.05)", border: "1px solid rgba(var(--accent-rgb),0.2)" }}>
        {/* Option B — highlight the preferred one */}
      </div>
    </div>
  </div>
</SlideLayout>
```

### `callout` — One big stat or quote
The number or quote IS the slide.
```tsx
<SlideLayout>
  <div className="h-full flex flex-col items-center justify-center text-center gap-4">
    <p className="text-8xl font-extrabold" style={{ color: "var(--accent)" }}>87%</p>
    <p className="text-2xl max-w-lg" style={{ color: "var(--text)" }}>
      of users abandon onboarding at step 3.
    </p>
    <p className="text-sm" style={{ color: "var(--text-dim)" }}>Source: Internal data, Q3 2024</p>
  </div>
</SlideLayout>
```

### `summary` — Close a section or deck
Recap + optional CTA.
```tsx
<SlideLayout>
  <div className="h-full flex flex-col justify-center max-w-3xl gap-6">
    <h2 className="text-4xl font-extrabold" style={{ color: "var(--text)" }}>Key Takeaways</h2>
    <ul className="flex flex-col gap-3">
      {/* 2–4 bullets */}
    </ul>
    <div className="mt-4">
      <button className="px-6 py-2.5 rounded-xl font-semibold text-sm" style={{ background: "var(--accent)", color: "#0c0c0c" }}>
        What's next →
      </button>
    </div>
  </div>
</SlideLayout>
```

---

## 6. Interactive Component Guide

Use at most **2–3 interactive components per full deck**.

| Component | Import | When to use | Non-tech example |
|---|---|---|---|
| `QuizWidget` | `../interactive/QuizWidget` | Test one concept or bust a myth. Max 1 per 5 slides. | "What % of emails are opened on mobile?" |
| `StepThrough` | `../interactive/StepThrough` | Any sequential process | User onboarding flow, approval process, recipe steps |
| `ComparisonTable` | `../interactive/ComparisonTable` | Choosing between N options with shared attributes | Pricing plans, vendor comparison, historical periods |
| `Timeline` | `../interactive/Timeline` | Events over time. Click to expand. | Product roadmap, company history, project phases |
| `BarChart` | `../interactive/BarChart` | Relative sizes or rankings. Animates in. | Survey results, market share, before/after metrics |
| `StatHighlight` | `../interactive/StatHighlight` | Make numbers land. Counts up on enter. | KPIs, research findings, opening hooks |
| `ClickReveal` | `../interactive/ClickReveal` | Non-linear exploration of a list | FAQs, feature list, glossary, objection handling |
| `FlowDiagram` | `../interactive/FlowDiagram` | Show how things connect or branch | Approval chain, data pipeline, decision tree |

---

## 7. Design Principles — Non-Negotiable

- **One accent color** — use `var(--accent)` everywhere. Never add a second brand color. Semantic only: `#4ade80` (success) and `#f87171` (error).
- **Animate meaning, not motion** — only animate when it shows a state change, sequence, or causality. Never animate just because it looks cool.
- **Every slide has one job** — write the job in one sentence before building the slide. Can't? Split it.
- **Visual anchor** — every slide needs one dominant element the eye goes to first. Heading, number, diagram, or code block.
- **Whitespace is structure** — one idea per slide beats two ideas per slide almost every time.
- **Max 3 text levels** — heading → body → hint/dim. No deeper.

---

## 8. Anti-Patterns — Never Do These

- ❌ Gradient text on body copy
- ❌ More than 4 bullet points on one slide — use `StepThrough` or split
- ❌ Placeholder or lorem ipsum content
- ❌ Centering everything — left-align body content for rhythm
- ❌ Shadows on dark backgrounds — use `box-shadow: 0 0 20px rgba(var(--accent-rgb),0.15)` (glow) instead
- ❌ Animating every element — max 2–3 per slide
- ❌ Filler slides ("Agenda", "Thank You") unless they carry real content
- ❌ Using every interactive component — pick 2–3 for the whole deck
- ❌ White text on `var(--accent)` backgrounds — accent is bright, always use `color: "#0c0c0c"`

---

## 9. File Conventions (for reference — you handle all of this)

```
app/
  slides/
    Slide01_Title.tsx          ← zero-padded, PascalCase topic name
    Slide02_TheProblem.tsx
  interactive/                 ← components (don't modify these)
  components/                  ← SlideLayout, CodeBlock, NavArrows, SlideProgress
  config.ts                    ← you edit this after intake
  page.tsx                     ← you add imports and SLIDES array here
```

Every slide: default export, `<SlideLayout>` at root.

`page.tsx` registration:
```ts
import Slide01 from "./slides/Slide01_Title";
import Slide02 from "./slides/Slide02_TheProblem";
const SLIDES = [Slide01, Slide02];
```

---

## 10. Pre-Flight Checklist

Run these before telling the user they're done:

- [ ] `npm run build` passes with 0 TypeScript errors
- [ ] Navigate every slide — no blank screens, no overflow
- [ ] At least one slide uses an interactive component
- [ ] Slide count matches the talk length (1–2 min per slide)
- [ ] `app/config.ts` has real brand name and correct theme
- [ ] No placeholder text anywhere
- [ ] Visually verify at 1280×720 (common projector resolution)
