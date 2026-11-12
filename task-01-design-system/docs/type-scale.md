# Dwella — Typography System Specification

This document details the 15-style typography scale established for **Dwella** (residential estate service charge management). The system is split across two typeface families: **Plus Jakarta Sans** for display/headline/title roles (delivering an authoritative, confident, architectural heading feel) and **Geist** for body/label roles (ensuring ultra-high legibility on small screens and numeric data tables).

---

## The 15 Styles

| Role | Style Name | Font Family | Weight | Size | Line Height | Multiplier | Letter Spacing |
|---|---|---|---|---|---|---|---|
| **Display** | `display large` | Plus Jakarta Sans | 600 (SemiBold) | 57px | 68.4px | 1.20× | -2.85px (-5.0%) |
| | `display medium` | Plus Jakarta Sans | 600 (SemiBold) | 45px | 54.0px | 1.20× | -2.25px (-5.0%) |
| | `display small` | Plus Jakarta Sans | 600 (SemiBold) | 36px | 43.2px | 1.20× | -1.80px (-5.0%) |
| **Headline** | `headline large` | Plus Jakarta Sans | 500 (Medium) | 32px | 44.8px | 1.40× | -1.60px (-5.0%) |
| | `headline medium`| Plus Jakarta Sans | 500 (Medium) | 28px | 39.2px | 1.40× | -1.40px (-5.0%) |
| | `headline small` | Plus Jakarta Sans | 500 (Medium) | 24px | 33.6px | 1.40× | -1.20px (-5.0%) |
| **Title** | `title large` | Plus Jakarta Sans | 400 (Regular) | 22px | 30.8px | 1.40× | -0.44px (-2.0%) |
| | `title medium` | Plus Jakarta Sans | 400 (Regular) | 16px | 22.4px | 1.40× | -0.32px (-2.0%) |
| | `title small` | Plus Jakarta Sans | 500 (Medium) | 14px | 19.6px | 1.40× | -0.28px (-2.0%) |
| **Body** | `body large` | Geist | 400 (Regular) | 16px | 24.0px | 1.50× | -0.08px (-0.5%) |
| | `body medium` | Geist | 400 (Regular) | 14px | 21.0px | 1.50× | -0.07px (-0.5%) |
| | `body small` | Geist | 400 (Regular) | 12px | 18.0px | 1.50× | -0.06px (-0.5%) |
| **Label** | `label large` | Geist | 500 (Medium) | 14px | 21.0px | 1.50× | +0.014px (+0.1%) |
| | `label medium` | Geist | 500 (Medium) | 12px | 18.0px | 1.50× | +0.060px (+0.5%) |
| | `label small` | Geist | 500 (Medium) | 11px | 16.5px | 1.50× | +0.055px (+0.5%) |

---

## Formula Derivation and Reasoning

### 1. Line Height Multipliers
- **Display (1.20×)**: Massive sizes (36px–57px) create loose visual vertical gaps if given a standard 1.4×–1.5× leading. A tighter 1.2× multiplier pulls multi-line hero headings together into cohesive graphical units.
- **Headline & Title (1.40×)**: Intermediate headings (14px–32px) require enough breathing room to avoid ascender/descender collision while maintaining grouping proximity to adjacent content.
- **Body & Label (1.50×)**: Continuous prose, breakdown of estate levies, invoices, and form input controls require 1.5× leading to preserve comfortable eye-tracking, especially when viewed on low-cost mobile screens under Nigerian sunlight.

### 2. Letter Spacing Justification
Display and headline styles carry deliberate negative tracking (-5% to -2%) because Plus Jakarta Sans has open geometric apertures; tightening large sizes improves rapid scannability on web dashboards. Conversely, small labels (+0.1% to +0.5%) receive positive tracking to prevent character collision at 11px–12px on high-DPI mobile viewports.

