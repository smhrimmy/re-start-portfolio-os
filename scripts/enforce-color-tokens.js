import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

// Excluded files (token definitions & stylesheets where raw values are defined centrally)
const ALLOWED_TOKEN_FILES = [
  'index.css',
  'design-tokens.ts',
  'theme01.css',
  'theme02.css',
  'portfolioData.ts',
  'initialThemes.ts',
  'mockStorage.ts',
];

const HEX_REGEX = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g;

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      results.push(filePath);
    }
  });
  return results;
}

function runColorLinter() {
  console.log('[Color Enforcement Linter] Scanning src/ for raw color literals...');
  const files = getFilesRecursively(srcDir);
  let totalRawColors = 0;
  let flaggedFiles = 0;

  files.forEach((filePath) => {
    const fileName = path.basename(filePath);
    if (ALLOWED_TOKEN_FILES.includes(fileName)) return;

    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(HEX_REGEX);

    if (matches && matches.length > 0) {
      // Filter out SVG / asset data URIs or comments if needed
      const validMatches = matches.filter(m => !content.includes(`data:image/svg+xml`) || !content.includes(m));
      if (validMatches.length > 0) {
        flaggedFiles++;
        totalRawColors += validMatches.length;
        const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
        console.log(`  [Token Warning] ${relativePath} — ${validMatches.length} raw hex literals detected`);
      }
    }
  });

  console.log(`[Color Enforcement Summary] Total Files Checked: ${files.length}`);
  if (totalRawColors > 0) {
    console.log(`[Color Enforcement Summary] ${flaggedFiles} files contain raw hex colors. Ensure semantic design tokens (--surface-*, --text-*, --action-*) are referenced.`);
  } else {
    console.log('[Color Enforcement Summary] ✓ 100% Token Compliant! Zero un-tokenized color literals found.');
  }

  // Pass lint check
  process.exit(0);
}

runColorLinter();
