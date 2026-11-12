/**
 * convert-tokens-to-css.js
 * 
 * Converts design-tokens.tokens.json into CSS custom properties (variables)
 * adhering strictly to standard design system architecture:
 * 
 * 1. Primitive tokens (palettes, scales): Internal foundation variables.
 *    Marked clearly with instructions that they must NOT be used directly in UI components.
 * 2. Semantic tokens (color roles, semantic spacing, semantic radius):
 *    Public UI design tokens that reference primitives using var(--primitive-*).
 *    These serve as the single source of truth for all UI styling.
 */

const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.resolve(__dirname, 'design-tokens.tokens.json');
const OUTPUT_PATH = path.resolve(__dirname, 'tokens.css');

function cleanHex(value) {
  if (typeof value !== 'string') return value;
  // If 8-digit hex ending with ff (full opacity), simplify to standard 6-digit hex
  if (/^#[0-9a-fA-F]{8}$/.test(value)) {
    if (value.toLowerCase().endsWith('ff')) {
      return value.slice(0, 7).toLowerCase();
    }
    // Convert 8-digit hex with alpha into rgba() for maximum CSS readability and broad compatibility
    const r = parseInt(value.slice(1, 3), 16);
    const g = parseInt(value.slice(3, 5), 16);
    const b = parseInt(value.slice(5, 7), 16);
    const a = +(parseInt(value.slice(7, 9), 16) / 255).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return value;
}

function normalizeKey(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9_-]/g, '');
}

function primitivePaletteVarName(paletteName, toneName) {
  const cleanPalette = normalizeKey(paletteName);
  const match = toneName.match(/\d+/);
  const toneNumber = match ? match[0] : (toneName.toLowerCase().includes('neutralvariant') ? '0' : normalizeKey(toneName));
  return `--primitive-${cleanPalette}-${toneNumber}`;
}

function primitiveKeyColorVarName(colorName) {
  const clean = normalizeKey(colorName).replace(/-key-color$/, '');
  return `--primitive-key-${clean}`;
}

function primitiveSpacingVarName(scaleKey) {
  const clean = normalizeKey(scaleKey).replace(/^scale-/, '');
  return `--primitive-spacing-${clean}`;
}

function primitiveRadiusVarName(radiusKey) {
  const clean = normalizeKey(radiusKey).replace(/^radius-/, '');
  return `--primitive-radius-${clean}`;
}

function resolveReferenceToVar(ref) {
  if (typeof ref !== 'string' || !ref.startsWith('{') || !ref.endsWith('}')) {
    // If not a token reference (e.g., raw hex value from deliberate regression), return cleaned literal
    return cleanHex(ref);
  }

  const inner = ref.slice(1, -1);
  const parts = inner.split('.');

  // Palette reference: primitives(color).color palettes.<palette>.<tone>
  if (parts[0] === 'primitives(color)' && parts[1] === 'color palettes' && parts[2] && parts[3]) {
    const varName = primitivePaletteVarName(parts[2], parts[3]);
    return `var(${varName})`;
  }

  // Key color reference: primitives(color).key colors.<name>
  if (parts[0] === 'primitives(color)' && parts[1] === 'key colors' && parts[2]) {
    const varName = primitiveKeyColorVarName(parts[2]);
    return `var(${varName})`;
  }

  // Spacing reference: spacing.scale-<n>
  if (parts[0] === 'spacing' && parts[1]) {
    const varName = primitiveSpacingVarName(parts[1]);
    return `var(${varName})`;
  }

  // Radius reference: radius.radius-<n>
  if (parts[0] === 'radius' && parts[1]) {
    const varName = primitiveRadiusVarName(parts[1]);
    return `var(${varName})`;
  }

  return ref;
}

function buildCss(tokens) {
  const lines = [];

  lines.push('/* ==========================================================================');
  lines.push('   DESIGN SYSTEM TOKENS - DWELLA');
  lines.push('   Generated automatically from design-tokens.tokens.json');
  lines.push('   ==========================================================================');
  lines.push('   SYSTEM ARCHITECTURE:');
  lines.push('   1. Primitives (--primitive-*):');
  lines.push('      Internal foundational values (scales, palettes, raw colors).');
  lines.push('      CRITICAL: Never consume primitive tokens directly in application UI.');
  lines.push('   2. Semantic Roles (--color-*, --spacing-*, --radius-*, --typography-*):');
  lines.push('      Purpose-driven UI design tokens that map semantic intents to primitives.');
  lines.push('      CRITICAL: Always consume ONLY semantic roles in component stylesheets.');
  lines.push('   ========================================================================== */');
  lines.push('');
  lines.push(':root {');

  // 1A. Primitive Key Colors
  if (tokens['primitives(color)']?.['key colors']) {
    lines.push('  /* ------------------------------------------------------------------------');
    lines.push('     1A. Primitive Key Colors (Internal foundation - DO NOT USE ON UI)');
    lines.push('     ------------------------------------------------------------------------ */');
    for (const [name, token] of Object.entries(tokens['primitives(color)']['key colors'])) {
      const varName = primitiveKeyColorVarName(name);
      lines.push(`  ${varName}: ${cleanHex(token.value)};`);
    }
    lines.push('');
  }

  // 1B. Primitive Tonal Palettes
  if (tokens['primitives(color)']?.['color palettes']) {
    lines.push('  /* ------------------------------------------------------------------------');
    lines.push('     1B. Primitive Tonal Palettes (Internal foundation - DO NOT USE ON UI)');
    lines.push('     ------------------------------------------------------------------------ */');
    for (const [paletteName, tones] of Object.entries(tokens['primitives(color)']['color palettes'])) {
      lines.push(`  /* Palette: ${paletteName} */`);
      for (const [toneName, token] of Object.entries(tones)) {
        const varName = primitivePaletteVarName(paletteName, toneName);
        lines.push(`  ${varName}: ${cleanHex(token.value)};`);
      }
    }
    lines.push('');
  }

  // 2. Semantic Color Roles (The core requirement)
  if (tokens['color roles']) {
    lines.push('  /* ========================================================================');
    lines.push('     2. SEMANTIC COLOR ROLES (SOURCE OF TRUTH FOR UI IMPLEMENTATION)');
    lines.push('     Consume EXCLUSIVELY these variables across buttons, text, cards, borders.');
    lines.push('     ======================================================================== */');
    for (const [roleName, token] of Object.entries(tokens['color roles'])) {
      const varName = `--color-${normalizeKey(roleName)}`;
      const val = resolveReferenceToVar(token.value);
      lines.push(`  ${varName}: ${val};`);
    }
    lines.push('');
  }

  // 3A & 3B. Spacing
  if (tokens['spacing']) {
    lines.push('  /* ------------------------------------------------------------------------');
    lines.push('     3A. Primitive Spacing Scale (Internal foundation - DO NOT USE ON UI)');
    lines.push('     ------------------------------------------------------------------------ */');
    for (const [key, token] of Object.entries(tokens['spacing'])) {
      if (key !== 'spacing' && token.value !== undefined) {
        const varName = primitiveSpacingVarName(key);
        lines.push(`  ${varName}: ${token.value}px;`);
      }
    }
    lines.push('');

    if (tokens['spacing']['spacing']) {
      lines.push('  /* ========================================================================');
      lines.push('     3B. SEMANTIC SPACING (SOURCE OF TRUTH FOR UI IMPLEMENTATION)');
      lines.push('     Use these semantic variables for layout spacing, margins, and padding.');
      lines.push('     ======================================================================== */');
      for (const [key, token] of Object.entries(tokens['spacing']['spacing'])) {
        const varName = `--spacing-${normalizeKey(key)}`;
        const val = resolveReferenceToVar(token.value);
        lines.push(`  ${varName}: ${val};`);
      }
      lines.push('');
    }
  }

  // 4A & 4B. Radius
  if (tokens['radius']) {
    lines.push('  /* ------------------------------------------------------------------------');
    lines.push('     4A. Primitive Corner Radius (Internal foundation - DO NOT USE ON UI)');
    lines.push('     ------------------------------------------------------------------------ */');
    for (const [key, token] of Object.entries(tokens['radius'])) {
      if (key !== 'radius' && token.value !== undefined) {
        const varName = primitiveRadiusVarName(key);
        const unit = token.value === 0 ? '0' : (token.value === 999 ? '9999px' : `${token.value}px`);
        lines.push(`  ${varName}: ${unit};`);
      }
    }
    lines.push('');

    if (tokens['radius']['radius']) {
      lines.push('  /* ========================================================================');
      lines.push('     4B. SEMANTIC CORNER RADIUS (SOURCE OF TRUTH FOR UI IMPLEMENTATION)');
      lines.push('     Use these semantic variables for border-radius across UI components.');
      lines.push('     ======================================================================== */');
      for (const [key, token] of Object.entries(tokens['radius']['radius'])) {
        const varName = `--radius-${normalizeKey(key)}`;
        const val = resolveReferenceToVar(token.value);
        lines.push(`  ${varName}: ${val};`);
      }
      lines.push('');
    }
  }

  // 5. Elevation & Shadows
  if (tokens['effect']?.['elevation']) {
    lines.push('  /* ========================================================================');
    lines.push('     5. ELEVATION & SHADOWS (SOURCE OF TRUTH FOR UI IMPLEMENTATION)');
    lines.push('     Derived from brand primary shadow curves. Use for surface elevations.');
    lines.push('     ======================================================================== */');
    for (const [lvl, token] of Object.entries(tokens['effect']['elevation'])) {
      const shadowParts = [];
      for (const key of Object.keys(token)) {
        if (!isNaN(key)) {
          const s = token[key].value;
          const color = cleanHex(s.color);
          shadowParts.push(`${s.offsetX}px ${s.offsetY}px ${s.radius}px ${s.spread}px ${color}`);
        }
      }
      if (shadowParts.length > 0) {
        lines.push(`  --elevation-${normalizeKey(lvl)}: ${shadowParts.join(', ')};`);
      }
    }
    lines.push('');
  }

  // 6. Typography
  const fontData = tokens['font'] || tokens['typography'];
  if (fontData) {
    lines.push('  /* ========================================================================');
    lines.push('     6. TYPOGRAPHY SYSTEM (SOURCE OF TRUTH FOR UI IMPLEMENTATION)');
    lines.push('     Standard 15-style typography scale with calculated line-heights.');
    lines.push('     ======================================================================== */');
    for (const [styleName, style] of Object.entries(fontData)) {
      const prefix = `--typography-${normalizeKey(styleName)}`;
      const val = style.value || style;

      const family = val.fontFamily?.value || val.fontFamily || 'inherit';
      const size = val.fontSize?.value || val.fontSize || 16;
      const weight = val.fontWeight?.value || val.fontWeight || 400;
      const lineHeight = val.lineHeight?.value || val.lineHeight || (size * 1.5);
      const letterSpacing = val.letterSpacing?.value ?? val.letterSpacing ?? 0;

      lines.push(`  ${prefix}-font-family: '${family}', sans-serif;`);
      lines.push(`  ${prefix}-font-size: ${size}px;`);
      lines.push(`  ${prefix}-font-weight: ${weight};`);
      lines.push(`  ${prefix}-line-height: ${lineHeight}px;`);
      lines.push(`  ${prefix}-letter-spacing: ${letterSpacing}px;`);
    }
    lines.push('');
  }

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

function run() {
  console.log(`Reading design tokens from: ${INPUT_PATH}`);
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`Error: File not found at ${INPUT_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(INPUT_PATH, 'utf8');
  const tokens = JSON.parse(raw);
  const css = buildCss(tokens);

  fs.writeFileSync(OUTPUT_PATH, css, 'utf8');
  console.log(`Successfully generated CSS variables at: ${OUTPUT_PATH}`);
}

run();
