# Git Commits, PRs & Comments — Professional Standard (Hard Rule)

Grounded in Chris Beams' "Seven Rules" and Conventional Commits specification.

---

## HARD RULE

Every commit pushed to this repository, every PR description, and every code comment must follow this standard. No exceptions for "quick fixes" or work-in-progress commits — a messy history is exactly what this prevents.

---

## 1. Commit Message Structure

```
<type>(<scope>): <subject line, imperative mood, max 50 chars, no period>

<body — wrapped at 72 chars, explains WHAT and WHY, not HOW>

<footer — optional: breaking changes, issue references>
```

### The Seven Rules (Apply to Every Commit)
1. Separate subject from body with a blank line.
2. Subject line ≤ 50 characters.
3. Capitalize the subject line.
4. No period at the end of the subject line.
5. Imperative mood in the subject — completes "If applied, this commit will ___" (e.g. "Fix overflow on mobile nav", not "Fixed overflow").
6. Wrap the body at 72 characters.
7. Use the body to explain WHAT changed and WHY — the code itself shows HOW.

### Conventional Commit Types
- `feat:` — a new feature
- `fix:` — a bug fix
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `style:` — formatting/whitespace only, no logic change
- `docs:` — documentation only
- `test:` — adding/correcting tests
- `perf:` — performance improvement
- `build:` / `ci:` — build tooling, dependencies, CI config
- `chore:` — maintenance tasks

---

## 2. Human Engineering Quality Standards

- **NO restating the obvious from the diff**: Explain why it was needed.
- **NO decorative emoji in commit subjects**: Keep subjects clean and professional.
- **NO hedging or filler language**: Plain, direct statements only.
- **NO AI tool attribution footers**: Do not append automated trailers by default.
- **Explain real motivation**: User impact, trade-offs, constraints, edge cases.

---

## 3. Pull Request Structure

```markdown
## What
1-3 sentences on what changed, in plain language.

## Why
The actual problem this solves or reason needed.

## How to verify
Concrete steps to test and verify the changes across target breakpoints.

## Screenshots (if visual)
Before/after visual evidence.
```

---

## 4. Code Commenting Standard

- Explain **WHY**, not **WHAT**.
- Document non-obvious trade-offs, browser workarounds, or hardware constraints.
- Eliminate redundant inline comments that state the obvious.
