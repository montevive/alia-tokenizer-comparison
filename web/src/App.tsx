import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { TOKENIZERS, type TokenizerSpec } from './tokenizers'
import { EXAMPLES, DEFAULT_LOCALE, type Locale } from './examples'
import { useDebounced } from './lib/debounce'
import { computeRanks } from './lib/ranking'
import { useT } from './i18n'
import { BrandHeader } from './components/BrandHeader'
import { InputArea } from './components/InputArea'
import { LanguagePicker } from './components/LanguagePicker'
import { TokenizerColumn } from './components/TokenizerColumn'
import { SummaryRow } from './components/SummaryRow'
import { WhyItMatters } from './components/WhyItMatters'
import { FooterCredits } from './components/FooterCredits'
import type { TokenizationResult } from './useTokenizer'

function App() {
  const [text, setText] = useState<string>(EXAMPLES[DEFAULT_LOCALE])
  const [activeLocale, setActiveLocale] = useState<Locale | null>(DEFAULT_LOCALE)
  const debouncedText = useDebounced(text, 150)

  const [counts, setCounts] = useState<Record<TokenizerSpec['id'], number | null>>({
    alia: null,
    llama3: null,
    mistral: null,
  })

  const handleResult = useCallback(
    (id: TokenizerSpec['id'], result: TokenizationResult | null) => {
      setCounts((prev) => {
        const next = result?.count ?? null
        if (prev[id] === next) return prev
        return { ...prev, [id]: next }
      })
    },
    [],
  )

  const handleLocalePick = useCallback((loc: Locale) => {
    setText(EXAMPLES[loc])
    setActiveLocale(loc)
  }, [])

  const handleTextChange = useCallback((v: string) => {
    setText(v)
    setActiveLocale(null) // user typed manually, no preset is active
  }, [])

  const ranks = useMemo(() => computeRanks(counts), [counts])
  const t = useT()

  return (
    <div className="page">
      <BrandHeader />

      <main className="main">
        <section className="hero">
          <h1>{t.pageTitle}</h1>
          <p className="hero-sub">{t.pageSub}</p>
        </section>

        <section className="input-section">
          <LanguagePicker active={activeLocale} onPick={handleLocalePick} />
          <InputArea value={text} onChange={handleTextChange} />
        </section>

        <section className="comparison-grid">
          {TOKENIZERS.map((spec) => (
            <TokenizerColumn
              key={spec.id}
              spec={spec}
              text={debouncedText}
              rank={ranks[spec.id]}
              onResult={handleResult}
            />
          ))}
        </section>

        <SummaryRow specs={TOKENIZERS} counts={counts} ranks={ranks} />

        <WhyItMatters />
      </main>

      <FooterCredits />
    </div>
  )
}

export default App
