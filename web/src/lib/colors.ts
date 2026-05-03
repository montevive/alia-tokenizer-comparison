// Deterministic background color for token chips based on token index.
// Two-tone alternating shades give visual separation without overwhelming.
export function tokenChipBg(index: number, accent: string): string {
  const isOdd = index % 2 === 1
  const opacity = isOdd ? 0.16 : 0.28
  // Accent may be a CSS variable (e.g. 'var(--mv-primary)') or a hex string.
  // For variable-based accents we wrap in color-mix; for hex we use rgba via mask.
  if (accent.startsWith('var(')) {
    return `color-mix(in srgb, ${accent} ${Math.round(opacity * 100)}%, transparent)`
  }
  return `color-mix(in srgb, ${accent} ${Math.round(opacity * 100)}%, transparent)`
}
