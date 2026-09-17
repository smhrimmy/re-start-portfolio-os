# Portfolio OS — Design System & Guidelines (v3 Revamp)

This specification incorporates guidelines from:
1. **Taste Skill** (`Leonxlnx/taste-skill`) — De-slop standards, non-generic typography, fluid scales, and high-end visual polish.
2. **Vercel Web Design Guidelines** (`vercel-labs/agent-skills`) — 8pt grid system, WCAG 2.2 AA contrast, accessible tap targets (44px min), focus rings, and reduced motion support.
3. **Awesome DESIGN.md** (`VoltAgent/awesome-design-md`) — Structured visual token specification and component definitions.
4. **21st Dev Component Standards** (`21st-dev/magic-mcp`) — Production-ready React/Tailwind ergonomics and micro-interactions.

---

## 1. Core Design Dials & Principles

- **Design Variance**: 7/10 (High visual personality with bespoke themes).
- **Motion Intensity**: 4/10 (Restrained, intentional micro-interactions; single bold interaction per theme).
- **Visual Density**: 6/10 (Spacious reading flow with data-dense admin tools).

### Anti-Patterns (NEVER DO)
- ❌ NO pure black `#000000` (Use `#0A0C10`, `#0A0D10`, `#111215`, or `#18181B`).
- ❌ NO 3 identical repetitive cards in a row without visual variance.
- ❌ NO generic uncalibrated neon drop-shadows.
- ❌ NO missing focus rings on interactive elements.
- ❌ NO arbitrary pixel values outside the 8pt grid (4px permitted only for micro-gaps).

---

## 2. Spacing & Grid System (8pt Base)

All margins, paddings, gaps, and heights must be exact multiples of 8 (8, 16, 24, 32, 40, 48, 64, 80, 96px). 4px is allowed ONLY for icon-to-text gaps.

- `xs`: 4px (Icon-to-text gap)
- `sm`: 8px (Small padding/gap)
- `md`: 16px (Standard component padding)
- `lg`: 24px (Card padding / Grid gap)
- `xl`: 32px (Section gap)
- `2xl`: 48px (Major container gap)
- `3xl`: 64px (Page section spacing)

---

## 3. Color Token System

```css
:root {
  /* primitive tokens */
  --color-navy-900: #0a0c10;
  --color-navy-800: #0e121a;
  --color-navy-700: #18203a;
  
  --color-[#3054DE]: #3054de;
  --color-[#10b981]: #10b981;
  --color-[#00f0ff]: #00f0ff;
  
  /* semantic tokens */
  --bg-base: #ffffff;
  --bg-surface: #fcfcfa;
  --text-primary: #18203a;
  --text-muted: #536083;
  --border-subtle: rgba(24, 32, 58, 0.14);
}
```

---

## 4. Typography Scale

- **Display Heading (`h1`)**: `clamp(2.4rem, 5vw, 4rem)`, line-height 1.08, letter-spacing `-1px`.
- **Section Heading (`h2`)**: `clamp(2.0rem, 4vw, 3.2rem)`, line-height 1.1, letter-spacing `-0.8px`.
- **Card Title (`h3`)**: `clamp(1.2rem, 2.5vw, 1.6rem)`, line-height 1.2.
- **Body Copy**: `0.95rem` (15.2px), line-height 1.6.
- **Caption / Meta**: `0.75rem` (12px), letter-spacing `0.5px`, tabular numerals.

---

## 5. Touch & Accessibility Rules

1. **Tap Targets**: Every button and link MUST have a minimum tap target of `44x44px` (or `padding` expanding hit area).
2. **Focus Rings**: All interactive controls must render visible focus outlines: `outline: 2px solid #3054DE; outline-offset: 2px;`.
3. **Reduced Motion**: All CSS animations and Framer Motion transitions must respect `@media (prefers-reduced-motion: reduce)`.

---

## 6. Theme Specifics

- **Theme 01 (Minimal Editorial)**: High-contrast paper/dark publication layout, `Geist Sans` + `JetBrains Mono`.
- **Theme 02 (Control Deck)**: High-density cyber console deck, `#0A0D10` base, `#00F0FF` indicators.
- **Theme 03 (The Archive Desk)**: Tactile physical desk, 3D vector oblique archive box, `Instrument Serif` + `Satoshi`.
