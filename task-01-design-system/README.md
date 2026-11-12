# Task 01 — Design System & Agent Verification

**Project**: Dwella (Residential Estate Service Charge Portal, Abuja)  
**Author Assessment**: Ship & Found — Task 01  
**Time to Read**: 4 minutes  

---

## 1. What This Task Was
The objective of Task 01 was to establish an engineering-grade design token system in Figma, export it as machine-readable JSON, convert it into standard CSS custom properties via a scripted compiler, and rigorously prove that an AI coding agent consumed the design system rather than falling back to generic default styling.

---

## 2. What I Built
1. **Figma Token Foundation**:
   - Pinned primary brand color `#286B46` (Forest Green) at tone 40.
   - Generated 14-step tonal palettes for primary, secondary, tertiary, neutral, neutral-variant, error, warning, and success.
   - Defined 58 semantic color roles separating functional intent from primitive color definitions.
   - Built a 15-style typography hierarchy across two paired typefaces: **Plus Jakarta Sans** (headings) and **Geist** (body/data).
   - Designed a 3-tier elevation shadow system tinted with the primary brand hue.
2. **Token Compiler (`convert-tokens-to-css.js`)**:
   - Node.js transformation script converting `design-tokens.tokens.json` into `tokens.css`.
   - Resolves token reference paths (`{primitives(color)...}` → `var(--primitive-*)`).
   - Normalizes alpha channels and units.
   - Maintains strict boundary between internal primitives and public semantic UI tokens.
3. **Consumer UI (`login.html`, `login.css`, `login.js`)**:
   - Implemented an accessible resident sign-in interface utilizing exclusively design tokens.
   - Zero hardcoded hex codes, rgb values, or arbitrary pixel margins.

---

## 3. What I Decided & Trade-offs
- **Semantic Layer as Single Source of Truth**: UI components are strictly forbidden from referencing `--primitive-*` variables. All components consume `--color-*`, `--spacing-*`, and `--radius-*`.
- **Primary-Tinted Shadows**: Shadows use `rgba(40, 107, 70, ...)` instead of `#000000` to simulate natural daylight ambient reflection, making elevated cards look integrated rather than dirty.
- **Dual-Typeface Pairing vs. Single Font**: Paired Plus Jakarta Sans for estate authority with Geist for tabular numeric service charge ledgers. *Trade-off*: Adds an extra network roundtrip on slow 2G/3G connections.

---

## 4. What Got Wrong & Defects Encountered
- **Figma Variable Export Omission (Step 5)**: The initial token export omitted color collections because Figma variables were not explicitly selected in the exporter plugin. Caught by inspecting the JSON payload and comparing against styles.
- **Figma Token Typo (`contrainer`)**: Propagated typo in `secondary contrainer` from Figma variable keys into CSS tokens (`tokens.css` line 166). Documented in `docs/defects.md`.
- **Initial Converter Script Failure**: First script iteration printed raw curly-brace string literals (`"{primitives...}"`) instead of parsing them into `var(--primitive-*)`. Refactored into an AST reference resolution engine.

---

## 5. Verification & Evidence Index
- `evidence/05-tokens-incomplete.json` & `evidence/06-tokens-complete.json`: The token export comparison demonstrating the variable omission.
- `evidence/07-raw-value-search.txt`: Terminal search confirming 0 raw hex/rgb values in UI styles.
- `evidence/08-agent-typography-answer.txt`: Verbatim agent audit confirming exact typography token usage.
- `docs/type-scale.md`: Full 15-style typography specification with line-height formulas.
- `docs/colour-roles.md`: Full semantic color mappings and mathematical WCAG contrast ratios.
- `docs/divergences.md`: Defense of Material baseline divergences and trade-off analysis.
- `docs/interview-answers.md`: Defense of all 12 frontend/design engineer interview questions.

