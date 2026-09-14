import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Standard WCAG 2.2 Relative Luminance Calculation
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
  const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex) {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Comprehensive WCAG 2.2 AA Token Pair Audit Suite
const TOKEN_PAIR_TESTS = [
  // Admin OS
  { name: 'Admin OS Light — Primary Ink Text on Base Surface', fg: '#1a1a1a', bg: '#ececeb', target: 4.5 },
  { name: 'Admin OS Light — Secondary Text on Base Surface', fg: '#555555', bg: '#ececeb', target: 4.5 },
  { name: 'Admin OS Light — Muted Caption Text on Card Surface', fg: '#6b6b6b', bg: '#f4f4f3', target: 4.5 },
  { name: 'Admin OS Light — Danger LED Text on Base Surface', fg: '#b91c1c', bg: '#ececeb', target: 4.5 },
  
  // Theme 01 (Editorial)
  { name: 'Theme 01 Editorial — Display Text on Paper Base', fg: '#111111', bg: '#F9F8F6', target: 4.5 },
  { name: 'Theme 01 Editorial — Secondary Text on Cream Surface', fg: '#555555', bg: '#F2F0EB', target: 4.5 },
  { name: 'Theme 01 Editorial — Muted Captions on Base Surface', fg: '#646464', bg: '#F9F8F6', target: 4.5 },
  { name: 'Theme 01 Editorial — Brand Accent Text on Cream', fg: '#8B0000', bg: '#F2F0EB', target: 4.5 },
  { name: 'Theme 01 Editorial — Destructive Danger Action on Base', fg: '#C53030', bg: '#F9F8F6', target: 4.5 },

  // Theme 02 (Control Deck)
  { name: 'Theme 02 Control Deck — Light Code on Dark Console', fg: '#E6EDF3', bg: '#0A0D10', target: 4.5 },
  { name: 'Theme 02 Control Deck — Technical Secondary Text on Card', fg: '#8B949E', bg: '#161B22', target: 4.5 },
  { name: 'Theme 02 Control Deck — Cyan Highlight on Dark Card', fg: '#00F0FF', bg: '#161B22', target: 4.5 },
  { name: 'Theme 02 Control Deck — Amber Warning on Dark Card', fg: '#FF9F1C', bg: '#161B22', target: 4.5 },
  { name: 'Theme 02 Control Deck — Destructive Danger Action on Card', fg: '#FF4D4D', bg: '#161B22', target: 4.5 },

  // Shell & Navigation
  { name: 'Global Topbar Switcher — White Text on Dark Shell', fg: '#FFFFFF', bg: '#1a1a1a', target: 4.5 },
];

function runContrastVerifier() {
  console.log('[Token Contrast Verifier] Checking WCAG 2.2 AA (4.5:1) compliance for semantic token pairs...\n');
  let passCount = 0;
  let failCount = 0;

  TOKEN_PAIR_TESTS.forEach((test) => {
    const rgbFg = hexToRgb(test.fg);
    const rgbBg = hexToRgb(test.bg);
    const ratio = getContrastRatio(rgbFg, rgbBg);
    const passed = ratio >= test.target;

    if (passed) {
      passCount++;
      console.log(`  ✓ [PASS ${ratio.toFixed(2)}:1] ${test.name}`);
    } else {
      failCount++;
      console.log(`  ✗ [FAIL ${ratio.toFixed(2)}:1 < ${test.target}:1] ${test.name}`);
    }
  });

  console.log(`\n[Token Contrast Summary] Total Pair Tests: ${TOKEN_PAIR_TESTS.length} | Passed: ${passCount} | Failed: ${failCount}`);

  if (failCount > 0) {
    console.error('[Token Contrast Failure] WCAG AA contrast threshold not met for all pairs!');
    process.exit(1);
  } else {
    console.log('[Token Contrast Verifier] ✓ All semantic token pairs pass WCAG 2.2 AA contrast standards.');
    process.exit(0);
  }
}

runContrastVerifier();
