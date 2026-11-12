# Known Defects Log — Task 01

In accordance with assessment standards, this document names real, observed defects in the Task 01 codebase, identified by file and line number, along with their tangible production cost.

---

### Defect 1: Typo in Token Key Propagated from Figma Export
- **File**: `tokens.css` (lines 166–167) / `design-tokens.tokens.json`
- **Line Reference**:
  ```css
  --color-secondary-contrainer: var(--primitive-secondary-90);
  --color-on-secondary-contrainer: var(--primitive-secondary-30);
  ```
- **The Defect**: The variable name contains a typographical error (`contrainer` instead of `container`) originating directly from the variable layer in Figma.
- **Production Cost**: Any standard UI component or future engineering team implementing a secondary container card following Material/design system naming conventions (`var(--color-secondary-container)`) will experience silent fallback failure. In CSS, an undefined custom property evaluates to `guaranteed-invalid`, causing secondary badges and transaction category chips to render transparent or default black, creating illegible low-contrast text on production dashboards.

---

### Defect 2: Missing High Contrast Mode Focus Indication
- **File**: `login.css`
- **Line Reference**: Lines 197–200
  ```css
  .field-input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-container);
  }
  ```
- **The Defect**: Focus visibility relies on `box-shadow`. Under Windows Contrast Themes (`forced-colors: active`), operating systems strip all custom `box-shadow` and non-system `border-color` declarations.
- **Production Cost**: Visually impaired users or estate administrators using Windows High Contrast Mode receive zero visual indicator when tabbing through the login form. The active input is completely invisible, failing WCAG 2.4.7 (Focus Visible) and blocking accessibility compliance certification. A production fix requires adding an explicit `outline: 2px solid transparent;` with `outline-offset: 2px`.

---

### Defect 3: Lack of Request Deduplication and Abort Handling
- **File**: `login.js`
- **Line Reference**: Lines 103–115
- **The Defect**: The login handler disables the button after click but lacks an `AbortController` and fails to debounce submission before network initiation.
- **Production Cost**: Under intermittent mobile network latency in Abuja (e.g. 3G cell tower handover), users repeatedly tap the submit button. Even with client button disabling, network latency jitter can dispatch multiple authentication handshakes, triggering server-side 429 Too Many Requests rate-limit lockouts on resident accounts.
