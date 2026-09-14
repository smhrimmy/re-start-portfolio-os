# Portfolio OS — Screen Size & Breakpoint Reference Guide

This document serves as the single source of truth for responsive breakpoints, layout rules, and device boundary testing across all 27 themes and the admin console.

---

## 📐 Breakpoint Scale (Tailwind Baseline)

| Tailwind Prefix | Min-Width | Target Device Category | Typical Real Devices |
|---|---|---|---|
| **(base)** | `0px` | Mobile Portrait | Small Android (`360px`), iPhone SE (`375px`), iPhone 14/15/16 (`390px`), Pixel (`412px`) |
| **`sm:`** | `640px` | Large Mobile / Landscape | Large phones in portrait, standard phones in landscape |
| **`md:`** | `768px` | Tablet Portrait | iPad Mini/Air portrait (`768px`), small laptops |
| **`lg:`** | `1024px` | Tablet Landscape / Laptop | iPad Pro landscape (`1024px`), entry laptops |
| **`xl:`** | `1280px` | Desktop | Standard laptop screens (`1366px`), 1080p monitors |
| **`2xl:`** | `1536px` | Large Desktop / Ultra-wide | Large 1440p / 4K displays (`1920px`, `2560px+`) |

---

## 📱 Explicit Test Target Widths

Layouts must be explicitly validated at these specific pixel boundary widths to catch off-by-one errors:

- `360px`: Common Android baseline width.
- `375px`: iPhone SE / legacy compact iPhones.
- `390px`: Standard modern iPhone width (14 / 15 / 16).
- `412px`: Android flagship / Google Pixel width.
- `768px`: Tablet portrait boundary edge (test AT `768px` exactly).
- `1024px`: Tablet landscape boundary edge (test AT `1024px` exactly).
- `1366px`: Most common laptop resolution worldwide.
- `1920px`: Standard desktop display resolution.
- `2560px+`: Ultra-wide display (ensure max-content-width container capping).

---

## 🛠️ Viewport & Safe-Area Inset Handling

All fixed HUD overlays, floating action buttons, and top/bottom navigation bars must respect modern mobile notches and home indicators.

### 1. Viewport Meta Configuration
Ensure `index.html` specifies `viewport-fit=cover`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

### 2. CSS Safe-Area Insets
Apply safe-area padding helpers for notch and home-indicator protection:
```css
.padding-safe {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

---

## 🎨 Layout & Typography Guidelines

1. **Mobile-First Approach**: Write unprefixed styles for base mobile (`0px`), expanding complexity using `sm:`, `md:`, `lg:`, `xl:`.
2. **Fluid Typography**: Use `clamp()` for hero headers to scale smoothly between mobile and desktop without layout jumps:
   ```css
   font-size: clamp(2rem, 5vw + 1rem, 4.5rem);
   ```
3. **Max-Width Container Capping**: Wrap main page content in `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` to prevent unreadable text stretching on 2K/4K displays.
