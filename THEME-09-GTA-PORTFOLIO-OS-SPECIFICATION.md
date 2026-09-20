# 🎮 THEME 09: ERA SELECT // GTA PORTFOLIO OS
## Complete Technical Specification & AI System Prompt (2026 Edition)

> **Architectural Paradigm**: Diegetic Video Game Pause Menu Portfolio Interface  
> **Target Experience**: Zero traditional website scrolling. Viewport locked (`100dvh`). Navigation is driven by pause-menu tabs, an era-switching radio station wheel, layered character plates, live HUD indicators, and Web Audio synthesized sound FX.

---

## 1. Core Concept & Diegetic Pillars

1. **Diegetic Pause Menu Interface**: The visitor does not enter a standard marketing landing page; they press **ESC** mid-game. The UI pretends to belong to a live gaming environment.
2. **6 Era Franchise Switcher**: Switching eras re-skins the entire OS instantaneously: CSS custom property tokens, typography, HUD geometry, character artwork cutouts, image filters, and copywriting voice.
3. **Layered Character Plate & Visual FX**: The right 62% of the viewport is reserved for character artwork cutouts stacked over era-specific backdrop gradients, film grain overlays, vignettes, and bottom gradient scrims.
4. **Sliding Highlight Navigation Rail**: The left 38% menu list uses a smooth sliding highlight bar (`.nav-sliding-highlight`) that calculates `offsetTop` and `offsetHeight` to slide behind the active nav item.
5. **Live Diegetic HUD**: Persistent bottom bar containing an era station selector, minimap radar box, skill star rating meter (1–5 stars), live cash balance counter, local clock (`HH:MM`), and Web Audio sound synthesizer toggle.
6. **Cheat Code Listener**: Typing `HESOYAM` or entering the Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`) triggers an audio chime, boosts cash to `$999,999,999`, sets wanted stars to max, and displays an animated cheat activation banner.

---

## 2. Grid Architecture & Layout Blueprint

```css
.pause-os {
  display: grid;
  grid-template-columns: 38fr 62fr; /* Nav Rail (38%) | Character Plate (62%) */
  grid-template-rows: 56px 1fr 76px; /* Top Tab Bar | Main Content | Bottom HUD */
  grid-template-areas:
    "tabs  tabs"
    "nav   plate"
    "hud   hud";
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  user-select: none;
}
```

```
+---------------------------------------------------------------------------------+
| TOP TABS:  [SOCIAL]   [MAP]   [BRIEF]   [STATS]   [SETTINGS]   [GAME] (56px)    |
+----------------------------------------+----------------------------------------+
| NAV RAIL (38%)                         | CHARACTER PLATE & PANEL OVERLAY (62%)  |
|                                        |                                        |
| Pause Menu                             | [Backdrop Gradient Image]              |
|                                        |                                        |
| > START                                |  +-----------------------------------+ |
|   ABOUT                                |  | OVERLAY CONTENT PANEL             | |
|   SKILLS                               |  | Kicker: WELCOME                   | |
|   PROJECTS                             |  | Title:  YOUR NAME                 | |
|   EXPERIENCE                           |  | Body:   Bio & Stack Overview      | |
|   ACHIEVEMENTS                         |  | Tags:   [React] [TypeScript] ...  | |
|   ACADEMY                              |  +-----------------------------------+ |
|   CONTACT                              |                                        |
|   EXIT                                 |  [Character Cutout PNG - Right 4%]     |
+----------------------------------------+----------------------------------------+
| HUD STRIP: ◀ [V] ▶ | [Radar] | ★★★☆☆ | CASH: $5,400,000 | 12:00 | [♪ Audio] (76px) |
+---------------------------------------------------------------------------------+
```

---

## 3. Complete 6-Era Token Manifest

Every era is activated by setting `data-era="<id>"` on the root container (`html` or `.pause-os`).

```css
:root {
  --tab-h: 56px;
  --hud-h: 76px;
  --nav-w: 38fr;
  --plate-w: 62fr;
  --ease: cubic-bezier(.22, .61, .36, 1);
}

/* ERA 1: III (Liberty City, 2001) */
[data-era="three"], html[data-era="iii"] {
  --bg: #1b1d1e; --bg2: #25292b; --accent: #c4622d; --accent2: #8c8f8f;
  --text: #e8e6e2; --text-dim: #a8a5a0; --hud: #0f1112; --glow: none;
  --radius: 0px; --border: 2px; --grain: .10; --tracking: .14em;
  --font-display: "Arial Narrow", "Haettenschweiler", Impact, sans-serif;
  --font-body: "Segoe UI", system-ui, sans-serif;
  --plate-filter: grayscale(.35) contrast(1.1);
}

/* ERA 2: VC (Vice City, 1986) */
[data-era="viceCity"], html[data-era="vc"] {
  --bg: #1a0a2e; --bg2: #2d0f45; --accent: #ff2a9d; --accent2: #22e0ff;
  --text: #fff0fb; --text-dim: #c79ed4; --hud: #12061f;
  --glow: 0 0 14px var(--accent), 0 0 34px rgba(255,42,157,.45);
  --radius: 26px; --border: 2px; --grain: .05; --tracking: .10em;
  --font-display: "Trebuchet MS", Verdana, sans-serif;
  --font-body: "Segoe UI", system-ui, sans-serif;
  --plate-filter: saturate(1.3) contrast(1.05);
}

/* ERA 3: SA (San Andreas, 1992) */
[data-era="sanAndreas"], html[data-era="sa"] {
  --bg: #1e2416; --bg2: #2b331f; --accent: #9ecb2e; --accent2: #d8b24a;
  --text: #f2f0e4; --text-dim: #b0b39a; --hud: #131709; --glow: none;
  --radius: 4px; --border: 3px; --grain: .12; --tracking: .08em;
  --font-display: "Impact", "Arial Black", sans-serif;
  --font-body: "Segoe UI", system-ui, sans-serif;
  --plate-filter: sepia(.18) saturate(1.15);
}

/* ERA 4: IV (Liberty City, 2008) */
[data-era="four"], html[data-era="iv"] {
  --bg: #14181c; --bg2: #1d242a; --accent: #d99b3d; --accent2: #5d7285;
  --text: #dfe4e8; --text-dim: #9aa5ad; --hud: #0b0e11; --glow: none;
  --radius: 2px; --border: 1px; --grain: .16; --tracking: .12em;
  --font-display: Georgia, "Times New Roman", serif;
  --font-body: "Segoe UI", system-ui, sans-serif;
  --plate-filter: grayscale(.25) brightness(.92) contrast(1.12);
}

/* ERA 5: V (Los Santos, 2013) */
[data-era="five"], html[data-era="v"] {
  --bg: #0e0e0e; --bg2: #1a1a1a; --accent: #f2a900; --accent2: #ffffff;
  --text: #ffffff; --text-dim: #b3b3b3; --hud: #000000; --glow: none;
  --radius: 0px; --border: 0px; --grain: .03; --tracking: .16em;
  --font-display: "Arial Black", "Helvetica Neue", sans-serif;
  --font-body: "Segoe UI", system-ui, sans-serif;
  --plate-filter: none;
}

/* ERA 6: VI (Leonida, 2025) */
[data-era="six"], html[data-era="vi"] {
  --bg: #0d1b26; --bg2: #123040; --accent: #ff7a5c; --accent2: #4fd6c8;
  --text: #f4fbff; --text-dim: #a9c4d1; --hud: rgba(8,20,28,.72);
  --glow: 0 8px 40px rgba(255,122,92,.28);
  --radius: 18px; --border: 1px; --grain: .02; --tracking: .20em;
  --font-display: "Segoe UI Semibold", system-ui, sans-serif;
  --font-body: "Segoe UI", system-ui, sans-serif;
  --plate-filter: saturate(1.15) brightness(1.04);
}
```

---

## 4. Character Personas & Data Manifest

| Era Code | Location Base | Character Persona Alias | Specialty Stack | Cash Value | Stat Metrics |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **III** (2001) | Portland Harbour, LC | `CLAUDE SPEED` | Low-Level Rust / C++ / Systems | `$450,000` | Stamina: 90%, Coding: 85%, Arch: 95%, Stealth: 90% |
| **VC** (1986) | Starfish Island, Vice City | `TOMMY VERCETTI` | React / WebGL / Synthwave UI | `$1,250,000` | Stamina: 85%, Coding: 90%, Arch: 90%, Driving: 90% |
| **SA** (1992) | Ganton, Los Santos | `CJ JOHNSON` | Node.js / Docker / SQL Turf Control | `$2,480,000` | Stamina: 100%, Coding: 95%, Arch: 95%, Respect: 100% |
| **IV** (2008) | Hove Beach, Broker | `NIKO BELLIC` | Go / PostgreSQL / Distributed Systems | `$890,000` | Stamina: 95%, Coding: 90%, Arch: 100%, Flying: 75% |
| **V** (2013) | Vinewood Hills, LS | `TRIO ARCHITECT` | Next.js / GraphQL / Cloud Heists | `$5,400,000` | Stamina: 95%, Coding: 98%, Arch: 92%, Flying: 95% |
| **VI** (2025) | Vice Port, Leonida | `LUCIA & JASON` | PyTorch / WebGPU / Spatial OS | `$12,800,000` | Stamina: 98%, Coding: 96%, Arch: 94%, Flying: 98% |

---

## 5. Visual Effects & Animation Specs

### A. Character Plate Image Swapping & Scrim Stack
- **Vignette Layer (`.plate-view::before`)**: `radial-gradient(ellipse at 65% 45%, transparent 30%, rgba(0,0,0,.72) 100%)`
- **Bottom Scrim Layer (`.plate-view::after`)**: `linear-gradient(transparent, var(--bg) 92%); height: 190px;`
- **Character Image Cutout (`.plate-view-img`)**: `position: absolute; right: 4%; bottom: 0; height: 96%; object-fit: contain; filter: var(--plate-filter) drop-shadow(...)`
- **Swapping Animation Class (`.swapping`)**:
  ```css
  .plate-view-img.swapping {
    opacity: 0;
    transform: translateX(26px) scale(.985);
    transition: opacity .35s var(--ease), transform .5s var(--ease);
  }
  ```

### B. Sliding Nav Highlight Easing
- Calculated via JavaScript `DOMRect`:
  ```js
  const activeBtn = navBtnRefs.current[sectionIndex];
  const hl = highlightRef.current;
  if (activeBtn && hl) {
    hl.style.height = `${activeBtn.offsetHeight}px`;
    hl.style.transform = `translateY(${activeBtn.parentElement.offsetTop}px)`;
  }
  ```
- **CSS Transition**: `transition: transform .30s cubic-bezier(.22,.61,.36,1), height .30s cubic-bezier(.22,.61,.36,1), background .45s cubic-bezier(.22,.61,.36,1);`

### C. Loading Screen Diagonal Wipe Sweep
```css
.wipe-overlay-screen {
  position: fixed; inset: 0; z-index: 90;
  transform: translateX(-102%) skewX(-8deg);
  pointer-events: none;
  display: flex; align-items: flex-end; justify-content: flex-start;
  padding: 60px;
}

.wipe-overlay-screen.run {
  animation: sweep .62s cubic-bezier(.22,.61,.36,1) forwards;
}

@keyframes sweep {
  0% { transform: translateX(-102%) skewX(-8deg); }
  48% { transform: translateX(0) skewX(-8deg); }
  100% { transform: translateX(102%) skewX(-8deg); }
}
```

---

## 6. Sound Synthesizer Engine (Web Audio API)

No external `.mp3` audio files required. The UI generates real-time synthesized audio blips:

```js
let audioCtx;

export function beep(freq = 440, dur = 0.06, vol = 0.06) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.value = vol;
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    osc.stop(audioCtx.currentTime + dur);
  } catch (e) {
    // Audio context fallback
  }
}

// Sound Events
// Select / Era Switch: beep(520, 0.05)
// Hover Move: beep(660, 0.03, 0.04)
// Cheat Activated: beep(880, 0.12)
```

---

## 7. Interactive Content Navigation Sections

1. **`Start`** (`RESUME`): Hero intro, candidate headline, primary tech stack.
2. **`About`** (`PROFILE`): Career summary, location base, engineering philosophy.
3. **`Skills`** (`LOADOUT / RESPECT`): Categorized skill matrix with star ratings.
4. **`Projects`** (`MISSIONS / CONTRACTS`): Shipped applications, GitHub repos, live demos.
5. **`Experience`** (`CAREER LOG / RAP SHEET`): Work history, company milestones, leadership roles.
6. **`Achievements`** (`100% COMPLETION / TROPHIES`): Awards, hackathons, certifications.
7. **`Academy`** (`EDUCATION / TRAINING`): B.Tech Computer Science degree & self-taught masterclasses.
8. **`Contact`** (`SAFEHOUSE UPLINK`): Contact form, email, LinkedIn, GitHub links.
9. **`Exit`** (`CREDITS`): Game credits roll & return to top command.

---

## 8. Complete Drop-in Build Prompt for AI Agents

```text
Build a complete diegetic GTA Pause Menu Portfolio UI named Theme 09.
Requirements:
1. CSS Grid layout locked to 100dvh with areas: 'tabs' (56px), 'nav' (38%), 'plate' (62%), 'hud' (76px).
2. Support 6 era themes (iii, vc, sa, iv, v, vi) driven by root data-era attribute and CSS custom properties.
3. Right plate area must render backdrop gradient, vignette, bottom gradient scrim (190px), subject cutout image with swapping transition class, and left overlay content panel.
4. Left nav column must contain vertical section list with smooth sliding highlight bar moving behind active button via translateY.
5. Top bar must contain diegetic tabs: Social, Map, Brief, Stats, Settings, Game.
6. Bottom HUD must render Era switcher arrows, minimap box with radar direction icon, skill star rating meter, animated cash balance counter, era title, live HH:MM clock, and WebAudio synth mute toggle.
7. Support Konami code and 'HESOYAM' keyboard cheat code that boosts cash to $999,999,999 and shows an alert toast.
8. Support 600ms diagonal sweep loading screen wipe on era change.
```

---

### File Location in Repository
- `THEME-09-GTA-PORTFOLIO-OS-SPECIFICATION.md`
