# Dwella — Deliberate Design System Divergences

This document records the deliberate divergences from the baseline Material Design 3 type specifications, defending both the rationale and the specific failure scenarios where each decision would be disadvantageous.

---

## Divergence 1: Dual-Typeface Pairing vs. Material Single-Font Baseline

- **Material Baseline**: A single font family (traditionally Roboto) applied across all 15 typography styles.
- **Dwella Decision**: Two distinct typeface families:
  * **Plus Jakarta Sans** (SemiBold/Medium/Regular) for Display, Headline, and Title roles.
  * **Geist** (Regular/Medium) for Body and Label roles.
- **Why**: Dwella is an estate management and service-charge transparency platform. Headings require architectural weight and brand authority to convey community prestige, while fee ledgers, bank account numbers, invoice breakdowns, and resident dues tables demand Geist’s superior numeric legibility and compact horizontal rhythm.
- **Where this choice fails (The Trade-Off)**: On intermittent 2G/3G mobile networks (prevalent across parts of Abuja and residential outskirts), fetching two separate web font families requires multiple independent HTTP network roundtrips. This increases Cumulative Layout Shift (CLS) and Flash of Invisible Text (FOIT). In scenarios where a resident at an estate security gate needs to load a payment receipt instantly on minimal data, a single system font stack (`system-ui`) would perform significantly better.

---

## Divergence 2: Compact Line-Height on Display Scales (1.20× vs. Material 1.40×)

- **Material Baseline**: Proportional line height of 1.35×–1.40× on display styles (e.g., 57px font with 64px–76px leading).
- **Dwella Decision**: A tight **1.20× multiplier** across all display sizes:
  * Display Large: 57px → 68.4px line height
  * Display Medium: 45px → 54.0px line height
  * Display Small: 36px → 43.2px line height
- **Why**: Display headings on mobile viewports wrap frequently. Standard 1.4× line spacing creates exaggerated vertical chasms between lines of large text, breaking visual grouping. A 1.20× ratio binds multi-line estate headlines into cohesive typographical units.
- **Where this choice fails (The Trade-Off)**: If the system is localized for languages with stacked diacritics or tonal markers (such as accented Yoruba or Hausa orthography), tight 1.20× leading causes glyph collision between the descenders of line 1 (e.g., `g`, `j`, `y`) and the capitalized diacritics of line 2, causing severe visual clipping and illegibility.

---

## Divergence 3: Pronounced Negative Letter Spacing on Display Large (-5.0% vs. Material 0px)

- **Material Baseline**: Display Large tracking set near 0px or -0.25px.
- **Dwella Decision**: -2.85px (-5.0% of font size) on `display large`.
- **Why**: Plus Jakarta Sans is an expansive geometric sans-serif with wide internal counters. At 57px, default letter spacing causes the glyphs to appear disconnected and visually porous. Pulling the tracking in by 5% creates a dense, commanding display rhythm suited for landing page statements.
- **Where this choice fails (The Trade-Off)**: On low-DPI Android smartphone displays lacking subpixel font smoothing, -5% tracking creates glyph clumping (e.g., `r` and `n` merging into `m`, or `c` and `l` reading as `d`). For elderly estate residents (aged 55–65) with diminished visual acuity, this induces eye fatigue and reading errors.
