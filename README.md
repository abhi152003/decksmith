# Decksmith

An agent-driven interactive presentation builder. You describe the talk; your AI agent writes every slide, picks the theme, and wires everything up — you never touch a config file or write code.

Built on Next.js + TypeScript + Framer Motion. Navigate with arrow keys, Space, or swipe.

## Install as a skill

```bash
npx skills add abhi152003/decksmith
```

Once installed, tell your agent: *"Make me a presentation about X"* and it will conduct an intake, propose an outline, and build the full deck.

## Manual setup

```bash
git clone https://github.com/abhi152003/decksmith
cd decksmith
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The landing page shows the available themes and components. Add slides and it becomes a presentation.

## How it works

The agent runs a structured intake — topic, audience, goal, length, brand — then:

1. Proposes a slide outline for your approval
2. Edits `app/config.ts` (theme + brand name)
3. Writes each slide as `app/slides/SlideNN_TopicName.tsx`
4. Registers all slides in `app/page.tsx`
5. Runs `npm run build` to verify 0 TypeScript errors

You get a working presentation. No config editing, no wiring up imports.

## Themes

| ID | Name | Feel |
|---|---|---|
| `midnight-operator` | Midnight Operator | High-contrast dark, lime. Tech demos, launches. |
| `chalk-studio` | Chalk Studio | Warm dark, orange. Startup pitches, design talks. |
| `crisp-blueprint` | Crisp Blueprint | Clean light, blue. Investor decks, consulting. |
| `signal` | Signal | Dense dark, amber. Data science, engineering. |
| `sakura` | Sakura | Light warm, pink. Education, workshops. |
| `carbon` | Carbon | Grounded dark, emerald. Open source, code reviews. |

## Slide types

`hero` · `concept` · `code` · `demo` · `compare` · `callout` · `summary`

Every slide has one job. If it has two, it gets split.

## Interactive components

Drop any of these into a `demo` slide:

| Component | Use case |
|---|---|
| `QuizWidget` | Test one concept |
| `StepThrough` | Sequential process |
| `ComparisonTable` | Side-by-side options |
| `Timeline` | Events over time |
| `BarChart` | Animated rankings |
| `StatHighlight` | Animated number counter |
| `ClickReveal` | Expandable list / FAQs |
| `FlowDiagram` | Connected nodes / decision trees |

Use 2–3 per deck maximum.

## Stack

- Next.js 15 / React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12
- react-syntax-highlighter
