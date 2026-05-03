import { createContext, useContext, useEffect, useState, type ReactNode, createElement } from 'react'

export type Lang = 'es' | 'en'

export type Strings = {
  brandTagline: ReactNode
  pageTitle: string
  pageSub: ReactNode
  examplesLabel: string
  inputPlaceholder: string
  charCount: (n: number) => ReactNode
  liveHint: string
  vocabSuffix: string
  tokensLabel: string
  charsPerTokenSuffix: string
  loadingDownloading: string
  loadError: string
  emptyPrompt: string
  detailToggle: (n: number) => string
  rankLabels: { 1: string; 2: string; 3: string }
  ratioWins: (label: string, ratio: string) => ReactNode
  ratioLoses: (label: string, inverse: string) => ReactNode
  whyTitle: string
  whyIntro: ReactNode
  whyItems: { title: string; body: ReactNode }[]
  footerColTitleAlia: string
  footerColTitleNvfp4: string
  footerColTitleDemo: string
  footerLicense: string
  footerLocal: string
  footerBuiltWith: string
  footerMoreDemos: string
  themeAriaLabel: string
  langAriaLabel: string
}

const ES: Strings = {
  brandTagline: createElement('span', null,
    'Demostración técnica abierta. ', createElement('strong', null, 'ALIA'),
    ' es el modelo de lenguaje del Gobierno de España, desarrollado por ',
    createElement('strong', null, 'BSC'),
    '. Esta versión cuantizada y empaquetada para hardware NVIDIA Blackwell la publica ',
    createElement('strong', null, 'Montevive'),
    '. Todo el código y los modelos, abiertos.',
  ),
  pageTitle: '¿Cuántos tokens cuesta tu texto?',
  pageSub: createElement('span', null,
    'Compara cómo tokenizan ',
    createElement('strong', null, 'ALIA'), ', ',
    createElement('strong', null, 'Llama 3'), ' y ',
    createElement('strong', null, 'Mistral'),
    ' exactamente las mismas palabras. 100% en tu navegador, sin servidores, sin datos saliendo.',
  ),
  examplesLabel: 'Ejemplos:',
  inputPlaceholder: 'Escribe o pega aquí cualquier texto…',
  charCount: (n) => createElement('span', null, createElement('strong', null, String(n)), ' caracteres'),
  liveHint: 'Tokenización en vivo · 100% local',
  vocabSuffix: 'K vocab',
  tokensLabel: 'tokens',
  charsPerTokenSuffix: 'caracteres / token',
  loadingDownloading: 'Descargando',
  loadError: 'Error cargando el tokenizador:',
  emptyPrompt: 'Escribe algo arriba para tokenizar.',
  detailToggle: (n) => `Detalle por token (${n})`,
  rankLabels: { 1: 'Más eficiente', 2: 'Segundo', 3: 'Tercero' },
  ratioWins: (label, ratio) => createElement('span', null,
    'ALIA es ', createElement('strong', null, ratio + '×'),
    ' más eficiente que ', createElement('strong', null, label),
  ),
  ratioLoses: (label, inverse) => createElement('span', null,
    'En este texto ', label, ' gana: usa ',
    createElement('strong', null, inverse + '×'),
    ' menos tokens que ALIA',
  ),
  whyTitle: '¿Por qué importa esto?',
  whyIntro: createElement('span', null,
    'En un LLM, el tokenizador es el primer eslabón: convierte tu texto en piezas que el modelo procesa. Cuanto más eficiente es ',
    'esa conversión para tu idioma, mejor funciona todo lo demás:',
  ),
  whyItems: [
    {
      title: 'Coste',
      body: 'Las APIs comerciales facturan por token. Si ALIA usa la mitad de tokens que Llama 3 para el mismo texto en castellano, el coste de procesarlo se reduce a la mitad.',
    },
    {
      title: 'Velocidad',
      body: 'Cada token requiere un pase por la red neuronal. Menos tokens = respuestas más rápidas y menos consumo energético, especialmente importante en despliegues locales.',
    },
    {
      title: 'Contexto',
      body: 'Los modelos tienen una ventana de contexto limitada. Con un tokenizador eficiente, en la misma ventana cabe más conversación, más documentos, más historial.',
    },
    {
      title: 'Calidad lingüística',
      body: 'Cuando «ayuntamiento» o «Cataluña» se dividen en 3-4 piezas sin sentido morfológico, el modelo aprende peor patrones de esas palabras. Una pieza por palabra preserva el significado.',
    },
    {
      title: 'Soberanía',
      body: 'ALIA cabe en hardware modesto (DGX Spark, ~4.000 €) en parte porque su vocabulario eficiente reduce el tamaño efectivo del modelo. Eso permite despliegues locales en administraciones y empresas españolas sin depender de la nube.',
    },
  ],
  footerColTitleAlia: 'Modelo base ALIA',
  footerColTitleNvfp4: 'Cuantización NVFP4 por Montevive',
  footerColTitleDemo: 'Esta demo',
  footerLicense: 'Apache 2.0 — el modelo es de todos',
  footerLocal: '100% local, ejecutándose en tu navegador',
  footerBuiltWith: 'Construida con',
  footerMoreDemos: 'Más demos en labs.montevive.ai',
  themeAriaLabel: 'Cambiar tema (claro / oscuro)',
  langAriaLabel: 'Cambiar idioma',
}

const EN: Strings = {
  brandTagline: createElement('span', null,
    'Open technical demo. ', createElement('strong', null, 'ALIA'),
    ' is the language model of the Spanish Government, developed by ',
    createElement('strong', null, 'BSC'),
    '. This version, quantized and packaged for NVIDIA Blackwell hardware, is published by ',
    createElement('strong', null, 'Montevive'),
    '. All code and models, open source.',
  ),
  pageTitle: 'How many tokens does your text cost?',
  pageSub: createElement('span', null,
    'Compare how ', createElement('strong', null, 'ALIA'), ', ',
    createElement('strong', null, 'Llama 3'), ' and ',
    createElement('strong', null, 'Mistral'),
    ' tokenize exactly the same words. 100% in your browser, no servers, no data leaving.',
  ),
  examplesLabel: 'Examples:',
  inputPlaceholder: 'Type or paste any text here…',
  charCount: (n) => createElement('span', null, createElement('strong', null, String(n)), ' characters'),
  liveHint: 'Live tokenization · 100% local',
  vocabSuffix: 'K vocab',
  tokensLabel: 'tokens',
  charsPerTokenSuffix: 'chars / token',
  loadingDownloading: 'Downloading',
  loadError: 'Error loading tokenizer:',
  emptyPrompt: 'Type something above to tokenize.',
  detailToggle: (n) => `Per-token detail (${n})`,
  rankLabels: { 1: 'Most efficient', 2: 'Second', 3: 'Third' },
  ratioWins: (label, ratio) => createElement('span', null,
    'ALIA is ', createElement('strong', null, ratio + '×'),
    ' more efficient than ', createElement('strong', null, label),
  ),
  ratioLoses: (label, inverse) => createElement('span', null,
    'On this text, ', label, ' wins: uses ',
    createElement('strong', null, inverse + '×'),
    ' fewer tokens than ALIA',
  ),
  whyTitle: 'Why does this matter?',
  whyIntro: createElement('span', null,
    'In an LLM, the tokenizer is the first link: it turns your text into pieces the model processes. ',
    'The more efficient that conversion is for your language, the better everything downstream works:',
  ),
  whyItems: [
    {
      title: 'Cost',
      body: 'Commercial APIs charge per token. If ALIA uses half as many tokens as Llama 3 for the same Spanish text, processing cost drops by half.',
    },
    {
      title: 'Speed',
      body: 'Each token requires a forward pass through the neural network. Fewer tokens = faster responses and lower energy use, especially important for local deployments.',
    },
    {
      title: 'Context window',
      body: 'Models have a limited context window. With an efficient tokenizer, the same window holds more conversation, more documents, more history.',
    },
    {
      title: 'Linguistic quality',
      body: 'When "ayuntamiento" or "Cataluña" gets split into 3-4 pieces with no morphological meaning, the model learns the patterns of those words less well. One piece per word preserves the meaning.',
    },
    {
      title: 'Sovereignty',
      body: 'ALIA fits on modest hardware (DGX Spark, ~€4,000) partly because its efficient vocabulary shrinks the effective model size. That enables local deployment in Spanish public administrations and companies without depending on the cloud.',
    },
  ],
  footerColTitleAlia: 'ALIA base model',
  footerColTitleNvfp4: 'NVFP4 quantization by Montevive',
  footerColTitleDemo: 'This demo',
  footerLicense: 'Apache 2.0 — the model belongs to everyone',
  footerLocal: '100% local, running in your browser',
  footerBuiltWith: 'Built with',
  footerMoreDemos: 'More demos at labs.montevive.ai',
  themeAriaLabel: 'Toggle theme (light / dark)',
  langAriaLabel: 'Change language',
}

const STRINGS: Record<Lang, Strings> = { es: ES, en: EN }

const STORAGE_KEY = 'lang'

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch { /* ignore */ }
  // Browser preference: any en-* → en, default to es (primary marketing audience)
  const nav = navigator.language?.toLowerCase() ?? 'es'
  return nav.startsWith('en') ? 'en' : 'es'
}

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Strings
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* ignore */ }
  }, [lang])
  const setLang = (l: Lang) => setLangState(l)
  return createElement(LangContext.Provider, { value: { lang, setLang, t: STRINGS[lang] } }, children)
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}

export function useT(): Strings {
  return useLang().t
}
