# Universal UI/UX Hard Rule — Applies to Every Page, Every Theme, Every Admin Module

This is the single standard for visual correctness across the ENTIRE system: all public themes' pages, and all 28 admin modules.

---

## THE HARD RULE

No page, in any theme, in any admin module, is considered complete until it passes EVERY check in this document, verified — not assumed because "it follows the same pattern as another page that was already checked."

---

## 1. Grid & Spacing (every page)

- All spacing/padding/margin values are multiples of 8px (4px only for fine icon/label micro-gaps).
- Layout maps to a column grid: 12 columns desktop (`lg:`), 8 columns tablet (`md:`), 4 columns mobile (`base`/`sm:`).
- Left/right page margins are IDENTICAL on both sides at every breakpoint (`px-4 sm:px-6 lg:px-8`).

---

## 2. Alignment (every page)

- Every element aligns to a shared edge (left, right, center axis, or baseline) with nearby elements.
- Icon+label pairs are ONE flex group with centered/consistent gap — never two independently positioned elements.
- Mixed type sizes (heading + caption side by side) align to a shared baseline, not vertical center.
- One alignment axis per section — do not mix left-aligned and center-aligned content within the same visual section.

---

## 3. Symmetry & Repeated-Component Consistency (every page)

- Every instance of a repeated component (cards, buttons, list rows, tags) has PIXEL-IDENTICAL internal padding, corner radius, and typography scale.
- Interactive element pairs (primary/secondary buttons) follow ONE explicit width rule (both full-width or both intrinsic-width and edge-aligned).
- Multi-item stat/metric rows use equal-gap distribution (`justify-between` / `justify-evenly`).

---

## 4. Overflow Prevention (every page)

- `box-sizing: border-box` globally.
- Relative units (`%`, `fr`, `minmax()`) and `max-width: 100%` on fixed widths.
- Long strings (URLs, titles, emails) have explicit `overflow-wrap: break-word` or `text-overflow: ellipsis`.
- Images specify `width`/`height` or `aspect-ratio` plus `max-width: 100%; height: auto`.
- Flex/grid children holding text default to `min-width: 0` (`min-w-0`).
- Zero horizontal scrollbar (`document.documentElement.scrollWidth <= document.documentElement.clientWidth`).

---

## 5. Fixed/Floating Element Safe-Area Reservation (every page)

- All fixed/floating UI elements (mobile bottom nav, taskbars, bottom docks, floating action bars) must have reserved padding beneath content:
  `padding-bottom: calc(<nav-height> + env(safe-area-inset-bottom))` (`pb-[calc(4rem+env(safe-area-inset-bottom))]` or `.pb-fixed-nav-safe`).
- When scrolling to the absolute bottom of any page, the LAST element (last tag, last button, last stat, last list item) MUST be fully visible above fixed bottom UI.

---

## 6. Optical Correction (every page)

- Icon+label button pairs and badges are optically centered relative to surrounding frames.

---

## Completion Protocol

For EVERY page (public themes + admin modules):
1. Test at 375px, 768px, 1024px, 1440px.
2. Verify Sections 1-6 checklist.
3. Confirm 0 horizontal scroll and 0 bottom nav content clipping.
