# Dwella — Shadow System Specification

This document details the elevation and shadow system for **Dwella**. In accordance with modern physical lighting principles, shadows are tinted using the brand primary color (`#286B46`) rather than achromatic dead black (`#000000`).

---

## The Shadow Scale

All elevations use two complementary shadow layers: a soft ambient dispersion layer and a sharper directional contact layer.

### 1. Soft (Level 1 — Elevated Cards, Chips, Banners)
- **Layer 1 (Key/Contact)**: X: `0px`, Y: `1px`, Blur: `2px`, Spread: `0px`, Color: `rgba(40, 107, 70, 0.30)` (`#286b464d`)
- **Layer 2 (Ambient)**: X: `0px`, Y: `1px`, Blur: `3px`, Spread: `1px`, Color: `rgba(40, 107, 70, 0.15)` (`#286b4626`)
- **CSS Token**: `--elevation-lvl-1`
- **Use case**: Cards, badges, filter chips, list items.

### 2. Medium (Level 2 — Scrolled Bars, Dropdowns, Hover States)
- **Layer 1 (Key/Contact)**: X: `0px`, Y: `1px`, Blur: `2px`, Spread: `0px`, Color: `rgba(40, 107, 70, 0.30)` (`#286b464d`)
- **Layer 2 (Ambient)**: X: `0px`, Y: `2px`, Blur: `6px`, Spread: `2px`, Color: `rgba(40, 107, 70, 0.15)` (`#286b4626`)
- **CSS Token**: `--elevation-lvl-2`
- **Use case**: Hovered cards, context menus, tooltips, sticky navigation headers.

### 3. Hard / Pronounced (Level 3 — Modals, Dialogs, Floating Action Buttons)
- **Layer 1 (Key/Contact)**: X: `0px`, Y: `1px`, Blur: `3px`, Spread: `0px`, Color: `rgba(40, 107, 70, 0.30)` (`#286b464d`)
- **Layer 2 (Ambient)**: X: `0px`, Y: `4px`, Blur: `8px`, Spread: `3px`, Color: `rgba(40, 107, 70, 0.15)` (`#286b4626`)
- **CSS Token**: `--elevation-lvl-3`
- **Use case**: Payment receipt preview modal, dispute submission drawer, FABs.

*(Supplementary Level 4 and Level 5 exist for full-screen takeovers and complex popovers).*

---

## Why Primary-Tinted Shadows Read Differently from Black

A pure black shadow desaturates underlying surfaces and creates an artificial, muddy grayish halo that feels detached from the UI's natural lighting environment. By infusing the shadow with the primary brand hue (`#286B46`), the elevation simulates realistic chromatic ambient reflection, making elevated cards and modals feel organic, warm, and deeply integrated into the estate interface.

