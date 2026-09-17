---
name: taste-skill
description: Enforces high-taste visual design standards, Vercel Web Design Guidelines, and de-slop rules for frontend components.
---

# Taste Skill & Vercel Design Guidelines

## Core Principles

1. **Brief Inference (Read the Vibe)**
   Infer layout, motion, and density from the theme concept rather than applying generic templates.

2. **De-Slop (NEVER DO)**
   - Never use pure `#000000` black for backgrounds.
   - Never place three identical repetitive cards in a row without visual variance.
   - Never use uncalibrated neon drop-shadows.
   - Never omit focus outlines on buttons and interactive links.

3. **8pt Grid & Typography**
   - Use strictly 8pt spacing steps (8, 16, 24, 32, 40, 48, 64px).
   - Fluid font sizes using `clamp()`.
   - Accessible tap targets (minimum `44x44px`).
   - High WCAG 2.2 AA contrast compliance (> 4.5:1 text contrast).

4. **Restrained Motion**
   - Single bold hero interaction per theme.
   - Shared quiet entrance transition for all secondary sections (`opacity: 0 -> 1`, `translateY: 16px -> 0px`).
   - `@media (prefers-reduced-motion: reduce)` overrides for all animations.
