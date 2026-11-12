# Task 01: Interview Defence Answers

Answers to all twelve assessment questions for Design Engineer and Frontend roles. Each response is under 200 words.

---

### 1. How would you structure design tokens?
I structure design tokens in a three-tier architecture:

1. **Global/Primitive Tokens**: Foundational, context-agnostic raw values (`--primitive-primary-40: #286b46`, `--primitive-spacing-8: 8px`). These define what exists in the system but are never consumed directly in UI code.
2. **Semantic/System Tokens**: Intent-driven alias tokens that map primitives to functional roles (`--color-surface`, `--color-primary`, `--spacing-md`, `--radius-sm`). Components consume exclusively from this layer, ensuring design intent remains decoupled from raw values.
3. **Component-Specific Tokens** (optional for complex systems): Scoped overrides defining parameters for specific molecules (`--button-padding-x`, `--modal-elevation`).

This tiered hierarchy provides a strict abstraction boundary: brand redesigns or theme switches (such as Dark Mode) only require remapping semantic tokens to different primitives without refactoring component templates or CSS selectors.

---

### 2. When is a token change breaking?
A token change is breaking when it violates the semantic contract established with consuming components. Specifically:

1. **Deletion or Renaming**: Removing or changing a token name (e.g., renaming `--color-surface` to `--color-bg`) causes silent fallback failures or syntax breaks across the entire codebase.
2. **Type or Unit Shift**: Changing value structures—such as altering a spacing token from unitless `8` to `8px`, or converting an array of shadow coordinates into a single string—breaks scripts or calc() operations.
3. **Contrast Regression**: Remapping a semantic role that inverts contrast (e.g., changing `--color-surface` from tone 98 to tone 20 without updating `--color-on-surface`) renders typography illegible and breaks WCAG AA compliance.
4. **Scope Narrowing**: Changing an alias from a multi-purpose role to a component-specific role without a deprecation window.

---

### 3. How would you support multiple brands and themes?
I implement multi-brand and multi-theme support by keeping the semantic token layer completely stable while swapping the underlying primitive token definitions at the root level.

Component stylesheets consume semantic variables exclusively (`var(--color-primary)`, `var(--color-surface)`). Theme switching is achieved via data attributes or CSS classes on the `<html>` or `<body>` element (e.g., `[data-theme="dark"]`, `[data-brand="estate-b"]`).

In CSS, theme files override the mapping:
```css
:root { --color-surface: var(--primitive-neutral-98); --color-on-surface: var(--primitive-neutral-10); }
[data-theme="dark"] { --color-surface: var(--primitive-neutral-12); --color-on-surface: var(--primitive-neutral-90); }
```
Because component selectors only reference semantic roles, dark mode and white-label multi-tenant branding work instantaneously without duplicating CSS rules or component markup.

---

### 4. Can tokens guarantee accessible contrast?
No. Design tokens cannot independently guarantee accessible contrast because contrast is a relational calculation between two layered elements, whereas a token is a discrete, single-point value.

A token can store a mathematically calibrated color (e.g., `--color-primary`), but it cannot prevent a developer from incorrectly placing `--color-on-surface-variant` on top of `--color-primary`, producing an unreadable 2:1 ratio. 

Furthermore, factors like font size, font weight, background images, opacity blending, and screen glare cannot be constrained by an isolated color token.

Tokens only facilitate contrast when combined with paired semantic contracts (always pairing `--color-primary` with `--color-on-primary`), automated linter rules (like axe-core or stylelint-check-contrast), and component encapsulation that prevents arbitrary foreground/background pairing.

---

### 5. How do you ensure that colour contrast guidelines are met within a website or application's design?
I implement a four-stage verification pipeline:

1. **Design System Mathematical Grounding**: In Figma, palettes are generated using perceptually uniform color spaces (like HCT/CIELAB). Tone steps ensure predictable mathematical deltas between surfaces (tone 98) and content (tone 10).
2. **Semantic Coupling**: Colors are exported in paired roles (`background` with `on-background`, `primary` with `on-primary`). Token documentation strictly forbids uncoupling these pairs.
3. **Automated CI/CD Linting**: Automated checks using axe-core, Pa11y, and Lighthouse run in continuous integration against rendered pull request previews to catch contrast regressions below 4.5:1 (normal text) and 3.0:1 (UI controls).
4. **Manual & Assistive Verification**: Auditing pages with color-blindness emulators (protanopia, deuteranopia) and Windows High Contrast Mode to ensure interface elements remain clear without relying solely on hue.

---

### 6. Can you discuss the differences between WCAG levels A, AA and AAA?
WCAG compliance is structured across three tiers of increasing rigor:

- **Level A (Minimum Baseline)**: Essential accessibility foundations without which assistive technology users find access impossible. Requirements include non-text text alternatives, keyboard navigation, avoiding keyboard traps, and not relying solely on color to convey information. (No contrast minimum is enforced at Level A).
- **Level AA (Legal & Industry Standard)**: Addresses the most prevalent barriers for people with disabilities. Enforces a minimum contrast ratio of 4.5:1 for normal text and 3.0:1 for large text (≥18pt or bold ≥14pt) and UI components. Demands visible focus indicators, consistent navigation, and clear error identification. This is the legal benchmark for public software.
- **Level AAA (Specialized Enhancement)**: The highest standard, demanding 7.0:1 contrast for normal text and 4.5:1 for large text. It requires sign language interpretation, zero background audio, and reading level accommodations. Full AAA across an entire complex application is rarely mandated due to design constraints.

---

### 7. Discuss the importance of semantic HTML in the context of accessibility.
Semantic HTML elements (`<main>`, `<header>`, `<nav>`, `<button>`, `<label>`) communicate innate meaning, document structure, and interaction capabilities directly to the browser’s Accessibility Tree.

When developers use generic `<div>` and `<span>` elements with click handlers instead of native `<button>` tags, keyboard focusability (`tabindex`), keyboard activation (Enter/Space), and the implicit `button` role are lost unless manually coded and maintained with ARIA.

Semantic markup enables screen reader users to jump directly between landmarks, navigate headings hierarchically (`<h1>`–`<h6>`), and understand field relationships instantly via linked `<label for="...">` elements. Semantic HTML provides accessibility natively with zero JavaScript overhead, maximum performance, and built-in cross-device predictability.

---

### 8. How do you handle design handoff to developers using Figma?
I treat design handoff not as a static visual handover, but as a continuous synchronization of an engineering contract:

1. **Variables & Design Tokens**: All Figma colors, typography styles, spacing grids, and corner radii are linked to Figma Variables matching code token keys (`--color-surface`, `--spacing-md`).
2. **Auto Layout & Component Properties**: Components mirror frontend flexbox/grid layout structures, including explicit variant states (default, hover, focus, disabled, loading).
3. **Automated Token Export**: Token transforms (e.g. Style Dictionary or custom export pipelines) serialize Figma variables to JSON and commit them to Git.
4. **Dev Mode & Code Annotations**: Figma specs include explicit padding, max-width constraints, ARIA roles, error states, and responsive breakpoint behavior directly on the canvas.
5. **Interactive Review**: A pre-handoff walk-through ensures engineering feasibility before implementation begins.

---

### 9. Why do AI-generated interfaces tend to look generic, and what specifically do you hand an agent to stop it?
AI models generate generic interfaces because they optimize for probability distribution across broad web training data. When prompted with "build a clean login page," an LLM chooses the most probable, generic styling choices: flat neutral grays, default Inter/Roboto typefaces, blue action buttons, and arbitrary 16px padding.

To prevent this dilution, you must hand the agent strict constraints:
1. **The Design Token File**: A concrete JSON or CSS variable file (`tokens.css`) containing defined semantic roles, deliberate brand primary tones, and specific line-height formulas.
2. **Negative Constraints**: Strict instructions prohibiting raw hex codes (`#...`), inline rgb styling, or arbitrary pixel margins.
3. **Component Specs**: Clear visual hierarchy guidelines, required typography style tokens (e.g. `headline medium` for headers, `label large` for buttons), and specific corner radius tokens.

Constrained by explicit tokens, the agent is forced to build the custom system rather than default web averages.

---

### 10. Your line height for display large is a specific number. Why that number and not one step either side of it? What would you lose with each?
Dwella’s `display large` uses **68.4px** (a **1.20× multiplier** on 57px).

- **Why 68.4px**: Plus Jakarta Sans at 57px possesses tall ascenders and large geometric letterforms. A 1.20× line height binds multi-line estate headlines into a tight, cohesive visual unit on mobile screens without descenders touching ascenders.
- **One step tighter (e.g., 1.10× / ~62.7px)**: Leading collapses. Glyphs with descenders (`g`, `y`, `j`) physically collide with tall capitals and diacritical marks on succeeding lines, causing rendering artifacts and immediate reading disruption.
- **One step looser (e.g., 1.40× / ~79.8px)**: The vertical space between wrapped lines becomes too wide. On mobile screens, readers perceive multi-line headlines as disconnected fragments rather than a single sentence, disrupting visual hierarchy and wasting critical vertical viewport real estate above the fold.

---

### 11. Point at one place in your own token structure that you would build differently if you started again. Say what you would do instead and what it would cost.
If starting again, I would implement **mode-aware theme collections** directly inside the token JSON rather than a single static set of light-mode color roles.

Currently, `color roles` resolves directly to light-mode primitives (`neutral98` for surface, `neutral10` for on-surface). While clean for initial release, supporting dark mode requires post-processing or duplicating CSS variable blocks.

Instead, I would structure tokens using an explicit multi-mode matrix:
```json
"surface": {
  "light": "{primitives.neutral.98}",
  "dark": "{primitives.neutral.12}"
}
```
**What it would cost**:
1. Increased complexity in the conversion script parser (`convert-tokens-to-css.js`) to generate scoped `[data-theme="dark"]` CSS blocks.
2. A larger token JSON payload.
3. Greater upfront Figma variable configuration overhead during initial setup.

---

### 12. Wrong-answer analysis: "I set up design tokens by exporting hex values from Figma into a CSS file... That makes it a single source of truth."
**What is missing**:
This approach exports raw primitive values without a **semantic role abstraction layer**. Storing `--green-500: #286b46` in a CSS file does not create a design system; it merely creates named hex codes.

**What goes wrong in Month Four**:
1. **Component Coupling**: Component stylesheets will be littered with `--green-500` on buttons, badges, borders, and icons. When stakeholders change the primary brand color to teal, you cannot simply update `--green-500` to `#008080` without introducing absurd semantic nonsense into the codebase.
2. **Dark Mode Impossibility**: Because components reference a specific color rather than an intent (`--color-surface`, `--color-on-surface`), implementing dark mode requires manually rewriting every CSS selector across the application rather than flipping token aliases at the root.
3. **Zero Governance**: Developers have no guidance on whether to use `--green-400`, `--green-500`, or `--green-600`, leading to visual drift and contrast regressions.
