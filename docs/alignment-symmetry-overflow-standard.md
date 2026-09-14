# Portfolio OS — Alignment, Symmetry & Overflow Standard

Grounded in principles used across major design systems (Apple HIG, Material Design, Swiss/International Typographic Style grid theory) and widely-cited practical UI guides (Refactoring UI, Jon Yablonski's Laws of UX).

---

## 1. The Grid Foundation

- **8-Point Spacing System**: Base rule for all spacing, padding, and margin values across every theme: every spacing value is a multiple of 8 (`8px`, `16px`, `24px`, `32px`, `40px`, `48px`, `64px`...), with `4px` permitted only for the smallest fine-grained adjustments (icon-to-label micro-gaps).
- **Responsive Column Grid**:
  - **Desktop (`lg:` and up)**: 12-column grid (`grid-cols-12`)
  - **Tablet (`md:`)**: 8-column grid (`grid-cols-8`)
  - **Mobile (`base`/`sm:`)**: 4-column grid (`grid-cols-4`)

---

## 2. Alignment Rules

1. **Edge Alignment**: Every element on a page must align to at least one shared edge (left, right, center axis, or baseline) with nearby elements.
2. **Optical Alignment over Mathematical Alignment**: Icons, triangular shapes (e.g. play buttons), and text with varying cap-heights must be optically centered relative to surrounding frames/badges. Applied to: icon+text pairs, badge/pill vertical centering, and button icon+label layouts.
3. **Baseline Alignment for Mixed Type Sizes**: Align headings and adjacent smaller captions to a shared text baseline, not vertical center.
4. **Consistent Alignment Axis per Section**: Do not mix left-aligned and center-aligned content within the same visual section.
5. **Gestalt Grouping**: Proximity and consistent spacing communicate relationships. Related elements sit closer than unrelated ones.

---

## 3. Symmetry & Balance

- **Visual Weight Balance**: Balance large images with proportionate text density and color contrast.
- **Consistent Margins**: Left and right page margins must be identical at every breakpoint (`px-4 sm:px-6 lg:px-8`).
- **Repeating Element Consistency**: Card grids, list items, skill bars, and repeated buttons must share identical internal padding, border radius, and typography scales.

---

## 4. Overflow Prevention (Hard Requirements)

1. **Global Border Box**: `box-sizing: border-box` globally so padding/border never push elements beyond container width.
2. **Relative Widths & Max-Width Fallbacks**: All fixed-width containers must include `max-width: 100%` or use relative grid/flex units (`%, fr, minmax()`).
3. **Word Break Wrappers**: Long unbroken text strings (URLs, titles, email addresses) must use `overflow-wrap: break-word` (`break-words`) or `text-overflow: ellipsis` (`truncate`).
4. **Oversized Images**: Always specify `max-width: 100%; height: auto` and explicit aspect ratios to eliminate layout shifts.
5. **Flex/Grid Item `min-width: 0`**: All flex and grid child containers holding text or dynamic content must specify `min-width: 0` (`min-w-0`) to prevent flex children from overflowing parent bounds.
6. **Zero Horizontal Scroll**: No page may produce horizontal scrollbars. Verified via `document.documentElement.scrollWidth <= document.documentElement.clientWidth` across all breakpoints.
7. **Constrained Nested Scroll Containers**: Scrollable panels inside scrollable pages must specify explicit height bounds (`h-...`, `max-h-...`, `overflow-y-auto`).

---

## 5. Automated & Visual Verification Checklist

For every page across breakpoints (`360px`, `375px`, `390px`, `412px`, `768px`, `1024px`, `1366px`, `1920px`):
- [ ] Verify `scrollWidth <= clientWidth` (0 horizontal overflow).
- [ ] Confirm `min-w-0` on all flex/grid children containing text.
- [ ] Verify identical left and right container margins (`px-4 sm:px-6 lg:px-8`).
- [ ] Check optical centering on icon+label buttons and badges.
- [ ] Confirm build passes `npx tsc --noEmit` and `npm run build` with 0 errors.
