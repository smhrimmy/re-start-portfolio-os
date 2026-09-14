# Portfolio OS — Code Quality Standards (Write Like a Senior Dev)

These 10 code quality standards are mandatory rules for every file written or modified in the **Portfolio OS** codebase.

---

## 1. Names Carry the Meaning
- Variable, function, and component names must make their purpose clear without requiring comments.
- Booleans read as yes/no questions: `isLoading`, `hasError`, `canEdit` (not `loading`, `error`, `edit`).
- No non-standard abbreviations or single-letter variable names (except tight loop counters).

## 2. Functions Do One Thing
- A function does one job at one level of abstraction.
- Keep functions concise (~20-25 lines as a soft guideline; prioritize readability).
- A function should either **DO** something (side effect / action) or **ANSWER** something (return a value) — avoid mixing both where possible.

## 3. Avoid Deep Nesting — Use Guard Clauses
- Flatten conditional logic with early return guard clauses instead of deeply nested `if` statements.
- Avoid nesting deeper than 2-3 levels in any function.

```typescript
// Avoid:
function processPayload(payload?: Payload) {
  if (payload) {
    if (payload.isValid) {
      // Logic buried 3 levels deep
    }
  }
}

// Prefer (Guard Clauses):
function processPayload(payload?: Payload) {
  if (!payload) return;
  if (!payload.isValid) return;

  // Logic flat and obvious
}
```

## 4. Single Responsibility (Per File & Per Component)
- One component = one job.
- Separate data-fetching logic into custom hooks, keeping components focused exclusively on UI rendering.
- Keep theme folders completely self-contained (`src/themes/[theme-id]/`).

## 5. DRY, But Don't Abstract Too Early (YAGNI)
- Don't repeat non-trivial logic in 3+ places (extract shared helpers to `src/core/` or `src/shared-ui/`).
- Do not build generic, configurable abstractions for code used in only one place "in case it's needed later." Wait for a second real use case before generalizing.

## 6. Comments Explain WHY, Not WHAT
- Do not comment self-explanatory code (`// increment index` above `index++`).
- Use comments strictly to document non-obvious reasoning: browser workarounds, edge-case handling rationale, or hardware constraint choices.

## 7. Consistent Formatting Enforced by Tooling
- Enforce formatting using Prettier and ESLint.
- Keep import order, folder structure, and naming conventions identical across all 27 theme folders.

## 8. No Dead Weight
- Remove unused variables, dead imports, and commented-out code blocks immediately.
- Rely on Git history for old code, not inline comments.

## 9. Minimize Dependencies and Side Effects
- Prefer pure functions that depend only on explicit arguments.
- Separate pure formatting/calculation logic from side-effecting code (API requests, database mutations).

## 10. Write It So Change Is Cheap
- Ensure code is loosely coupled and highly cohesive.
- Six months from now, changing a requirement should involve editing one clear, obvious place.

---

## 🔍 Pre-Commit Self-Check Checklist

- [ ] Could someone unfamiliar with this file understand every function name instantly?
- [ ] Is every function doing strictly one job?
- [ ] Is nested logic flattened using early return guard clauses?
- [ ] Do comments explain **WHY** rather than **WHAT**?
- [ ] Are all unused imports, variables, and commented-out blocks removed?
- [ ] Is premature abstraction avoided (YAGNI principle)?
