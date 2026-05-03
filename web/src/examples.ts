export type Locale = 'es' | 'ca' | 'eu' | 'gl' | 'en'

export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Castellano',
  ca: 'Català',
  eu: 'Euskara',
  gl: 'Galego',
  en: 'English',
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  es: '🇪🇸',
  ca: '🏴󠁥󠁳󠁣󠁴󠁿',
  eu: '🏴󠁥󠁳󠁰󠁶󠁿',
  gl: '🏴󠁥󠁳󠁧󠁡󠁿',
  en: '🇬🇧',
}

// Pre-canned examples picked specifically to maximize the visible advantage of
// ALIA's Iberian-trained vocabulary over Anglo-centric tokenizers.
// Administrative / civic vocabulary is where the difference is most striking.
export const EXAMPLES: Record<Locale, string> = {
  es: 'La constitución del ayuntamiento garantiza la representación democrática de los ciudadanos de Andalucía y de Cataluña en el pleno municipal.',
  ca: "La Generalitat de Catalunya estableix els drets dels ciutadans en l'àmbit de l'ajuntament i del Parlament autonòmic.",
  eu: 'Euskadiko udalek euskaraz ematen dituzte zerbitzu publikoak herritarrei, eta Eusko Jaurlaritzak koordinatzen ditu lurralde historikoak.',
  gl: 'A Xunta de Galicia coordina os concellos e as deputacións provinciais para garantir os servizos públicos en galego.',
  en: 'The local government provides public services to the citizens of the autonomous region and coordinates with provincial councils.',
}

export const DEFAULT_LOCALE: Locale = 'es'
