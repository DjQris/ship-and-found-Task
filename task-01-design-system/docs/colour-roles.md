# Dwella — Color Roles and Contrast Specification

This document details the semantic color roles for **Dwella**, the primitive palette values they reference, and their calculated WCAG 2.1 contrast ratios.

---

## 1. Brand Color & Tonal Palette Foundation

- **Brand Primary Color**: `#286B46` (Forest Green).
- **Origin & Rationale**: Derived to communicate security, community prosperity, financial accountability, and calm clarity for residential estates in Abuja.
- **Pinning Strategy**: Pinned at tone **40** (`primary40`) within the Material/Figma HCT color engine. Pinning primary 40 anchors the tonal curve so that algorithmic tonal generation builds all lighter (50–100) and darker (0–30) steps around the exact brand hue rather than diluting or shifting it to an unintended hue angle.
- **Tonal Palette Count**: 14 tones per family (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100). Fourteen tones provide the exact perceptual luminance steps required to support high-contrast light and dark themes from a single mathematical model.

---

## 2. Semantic Roles Mapping

| Role Name | CSS Variable | Referenced Primitive | Hex Value | Purpose / Job |
|---|---|---|---|---|
| `primary` | `--color-primary` | `primary40` | `#286b46` | Key brand actions, active states, brand titles |
| `on primary` | `--color-on-primary` | `primary100` | `#ffffff` | Text and icons placed on top of primary buttons |
| `primary container` | `--color-primary-container` | `primary90` | `#acf2c3` | Soft accent banners, active pill backgrounds |
| `on primary container` | `--color-on-primary-container` | `primary30` | `#05522f` | High-contrast text placed on primary container |
| `secondary` | `--color-secondary` | `secondary40` | `#4a6453` | Auxiliary badges, secondary controls |
| `on secondary` | `--color-on-secondary` | `secondary100` | `#ffffff` | Content on secondary fills |
| `surface` | `--color-surface` | `neutral98` | `#f5fbf5` | Default page background |
| `on surface` | `--color-on-surface` | `neutral10` | `#171d1a` | Primary body typography and headers |
| `surface variant` | `--color-surface-variant` | `neutralvariant90` | `#dae5db` | Container fills, chip backgrounds |
| `on surface variant` | `--color-on-surface-variant` | `neutralvariant30` | `#3f4942` | Subtitles, auxiliary metadata, placeholder text |
| `surface-container-lowest` | `--color-surface-container-lowest` | `neutral100` | `#ffffff` | Card and modal surface containers |
| `outline` | `--color-outline` | `neutralvariant50` | `#6f7a71` | Interactive control borders, focus outlines |
| `outline variant` | `--color-outline-variant` | `neutralvariant80` | `#bec9c0` | Subtle decorative dividers and separators |
| `error` | `--color-error` | `error40` | `#c00100` | Critical failure, overdue levy alerts, validation |
| `on error` | `--color-on-error` | `error100` | `#ffffff` | Text and icons on error banners |
| `error container` | `--color-error-container` | `error90` | `#ffdad4` | Background of inline form validation banners |
| `on error container` | `--color-on-error-container` | `error30` | `#930100` | Text on error container alert banners |
| `success` | `--color-success` | `success40` | `#006e00` | Paid receipts, verified bank reconciliation |
| `on success` | `--color-on-success` | `success100` | `#ffffff` | Text on success states |
| `success container` | `--color-success-container` | `success90` | `#8dfb77` | Success status chip background |
| `on success container` | `--color-on-success-container` | `success30` | `#005300` | Text on success status chips |
| `warning` | `--color-warning` | `warning40` | `#8a5100` | Grace period expiration warnings |
| `on warning` | `--color-on-warning` | `warning100` | `#ffffff` | Text on warning states |

---

## 3. WCAG 2.1 Contrast Ratios Verification

Every pair planned for typography or actionable UI elements was evaluated against WCAG 2.1 relative luminance standards:

| Role Pair | Foreground | Background | Measured Ratio | WCAG Compliance Level | Result / Status |
|---|---|---|---|---|---|
| `on-primary` on `primary` | `#ffffff` | `#286b46` | **6.40:1** | AA (Normal), AAA (Large) | **PASS** |
| `on-primary-container` on `primary-container` | `#05522f` | `#acf2c3` | **7.20:1** | AAA (All sizes) | **PASS** |
| `primary` on `surface` | `#286b46` | `#f5fbf5` | **6.09:1** | AA (Normal), AAA (Large) | **PASS** |
| `primary` on `surface-container-lowest` | `#286b46` | `#ffffff` | **6.40:1** | AA (Normal), AAA (Large) | **PASS** |
| `on-surface` on `surface` | `#171d1a` | `#f5fbf5` | **16.30:1**| AAA (All sizes) | **PASS** |
| `on-surface` on `surface-container-lowest` | `#171d1a` | `#ffffff` | **17.11:1**| AAA (All sizes) | **PASS** |
| `on-surface-variant` on `surface-variant` | `#3f4942` | `#dae5db` | **7.23:1** | AAA (All sizes) | **PASS** |
| `on-secondary` on `secondary` | `#ffffff` | `#4a6453` | **6.48:1** | AA (Normal), AAA (Large) | **PASS** |
| `on-secondary-container` on `secondary-container` | `#334c3c` | `#ccead4` | **7.27:1** | AAA (All sizes) | **PASS** |
| `on-error` on `error` | `#ffffff` | `#c00100` | **6.47:1** | AA (Normal), AAA (Large) | **PASS** |
| `on-error-container` on `error-container` | `#930100` | `#ffdad4` | **7.23:1** | AAA (All sizes) | **PASS** |
| `on-success` on `success` | `#ffffff` | `#006e00` | **6.50:1** | AA (Normal), AAA (Large) | **PASS** |
| `on-success-container` on `success-container` | `#005300` | `#8dfb77` | **7.24:1** | AAA (All sizes) | **PASS** |
| `on-warning` on `warning` | `#ffffff` | `#8a5100` | **6.45:1** | AA (Normal), AAA (Large) | **PASS** |
| `on-warning-container` on `warning-container` | `#683c00` | `#ffdcbd` | **7.26:1** | AAA (All sizes) | **PASS** |
| `outline` on `surface` (Input borders) | `#6f7a71` | `#f5fbf5` | **4.26:1** | Non-text UI threshold ≥3.0:1 | **PASS** |
| `outline-variant` on `surface` | `#bec9c0` | `#f5fbf5` | **1.63:1** | Below 3.0:1 | **DOCUMENTED EXCLUSION** |

### Documented Exclusion:
`outline-variant` on `surface` measures **1.63:1**. By design system policy, this token is strictly prohibited for typography, interactive element boundaries, or critical icons. It is reserved exclusively for passive card dividing rules and aesthetic section borders where contrast is not essential for comprehension or navigation.
