// Dione Salon Theme Tokens
// Dark charcoal + fire accent palette

export const tokens = {
  vars: {
    // ── Backgrounds ──
    '--t-bg':        '#0d0d0d',   // Primary: near-black charcoal
    '--t-bg-2':      '#1a1a1a',   // Alternate sections: dark panel
    '--t-bg-3':      '#111111',   // Cards, forms: dark
    '--t-bg-dark':   '#000000',   // Darkest panels

    // ── Text ──
    '--t-text':      '#f5f5f4',   // Primary text: warm off-white
    '--t-text-2':    '#a1a1aa',   // Secondary text: zinc-400
    '--t-text-3':    '#71717a',   // Muted / placeholders: zinc-500

    // ── Accents (fire) ──
    '--t-accent':    'oklch(0.78 0.15 75)',  // Fire orange
    '--t-accent-2':  '#2a2a2a',              // Border/muted panel

    // ── Borders ──
    '--t-border':    'rgba(255, 255, 255, 0.06)',
    '--t-border-2':  'rgba(255, 255, 255, 0.15)',

    // ── Shape ──
    '--t-radius':    '0.5rem',

    // ── Typography ──
    '--t-font-display': 'var(--font-display), "Outfit", "Helvetica Neue", sans-serif',
    '--t-font-body':    'var(--font-body), "Outfit", "Helvetica Neue", sans-serif',
  },
  name: 'nine_zero_one' as const,
}
