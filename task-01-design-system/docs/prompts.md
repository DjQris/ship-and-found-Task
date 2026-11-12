# Conversion Prompts Log

This document records the prompt engineering and iteration process used to convert `design-tokens.tokens.json` into production-ready CSS variables in `tokens.css`.

---

## 1. Initial Prompt (Draft 1)

```text
Write a JavaScript script that you will use to convert the design system in design-tokens.tokens.json to CSS variables. Take note of the primitive colors in the system and the color rules using standard color system practice. Remember that the color rules are what will be used directly on the UI and the primitives will not be used directly on the UI. Use CSS variables and ensure that this design system remains the source of truth for UI implementation.
```

### What went wrong / Limitations in early execution:
1. **Unresolved Token References**: The Figma Design Tokens export uses curly-brace reference syntax, such as `"{primitives(color).color palettes.primary.primary40}"`. A naive key-value extractor printed the raw string literal instead of turning it into a valid CSS variable reference `var(--primitive-primary-40)`.
2. **8-Digit Hex Alpha Handling**: Values like `#286b46ff` ended with `ff` (100% opacity) or had alpha channels (like `#286b464d` for shadows). Printing raw 8-digit hex without normalization created non-standard CSS for opacity and shadows.
3. **Duplicate Prefixing**: Spacing and radius tokens had names like `radius-4` and `scale-8`. A standard mapper produced `--primitive-radius-radius-4` instead of clean `--primitive-radius-4`.
4. **Missing Architectural Boundary**: The output needed explicit CSS comments clearly separating Tier 1 (Primitives - internal only) from Tier 2 (Semantic Roles - UI source of truth).

---

## 2. Refined Prompt & Script Implementation (Final)

To resolve the above defects, the script was refined with explicit rules:
- **Reference Resolution Engine**: A regex parser intercepts all `{...}` token references, traverses the token tree, and substitutes the exact generated primitive CSS variable name (`var(--primitive-*)`).
- **Delimiter Normalization**: Strips duplicate collection namespaces (`scale-`, `radius-`) to produce clean, predictable variables (`--primitive-spacing-8`, `--primitive-radius-4`).
- **Alpha Conversion**: Converts `#rrggbbaa` hex strings with alpha to standard `rgba(r, g, b, a)` values for multi-layered drop shadows.
- **Single Source of Truth Preservation**: Color roles resolve dynamically to `var(--primitive-*)`, meaning source-level changes to palette primitives automatically cascade through every UI role. If a reference is severed (raw hex), it gracefully falls back to the literal value.

The resulting converter script is maintained in `convert-tokens-to-css.js`.

