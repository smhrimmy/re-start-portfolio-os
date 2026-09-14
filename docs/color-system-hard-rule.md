# Portfolio OS — Color System & Token Architecture Standard

This is the single hard rule for color usage, token hierarchy, accessibility contrast, and mechanical build enforcement across all themes and admin modules.

---

## 1. Three-Layer Token Architecture

No component file may contain raw hex, rgb, hsl, or oklch color literals. All colors must resolve through token layers:

- **Layer 1 — Primitives**: OKLCH-based raw color values defined centrally in global CSS/token definitions. Never imported directly by UI components.
- **Layer 2 — Semantic Tokens**: Intent-based tokens (`--surface-base`, `--surface-raised`, `--surface-overlay`, `--text-primary`, `--text-secondary`, `--text-on-emphasis`, `--action-primary`, `--action-danger`, `--border-default`).
- **Layer 3 — Component Tokens**: Explicit component overrides when divergence is strictly required (`--button-primary-bg`).

---

## 2. Color Distribution Rules

- **Data-Dense Interfaces (Admin OS, Analytics, Tables)**:
  - `~85-90%` Tinted Neutral Surfaces (low-saturation brand tint, avoiding harsh pure black or sterile gray).
  - Saturated Accent Colors reserved exclusively for interactive elements (CTAs, active nav states, links, focus rings, data highlights).
- **Hero & Editorial Surfaces (Theme 01, Theme 02, Landing Pages)**:
  - Classic 60-30-10 distribution (60% dominant neutral, 30% structural frame, 10% focal accent).

---

## 3. Contrast & Accessibility Standards

- **WCAG 2.2 AA Minimums**: `4.5:1` for normal text, `3:1` for large text (18px+ / bold 14px+) and border boundaries.
- **APCA (Accessible Perceptual Contrast Algorithm)**: Applied for dark-mode interfaces (`#0A0D10` / `#161B22`).
- **Multi-Modal State Signaling**: Never convey state through color alone — always pair status colors with icons, labels, or structural patterns.

---

## 4. Mechanical Enforcement & Build Rules

1. **Automated Token Linting (`scripts/enforce-color-tokens.js`)**: Scans `src/` component files for un-tokenized raw color literals (`#hex`, `rgb()`, `hsl()`). Fails `npm run build` if raw inline colors appear outside token definition files.
2. **Automated Contrast Verification (`scripts/verify-token-contrast.js`)**: Computes contrast ratios across semantic text/surface token pairs to guarantee WCAG 2.2 AA compliance before bundling.
3. **Cross-Page Token Equivalence**: Semantic tokens in a theme resolve identically across all page views.
