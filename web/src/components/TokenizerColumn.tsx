import type { TokenizerSpec } from '../tokenizers'
import { useTokenizer } from '../useTokenizer'
import type { TokenizationResult } from '../useTokenizer'
import { TokenChips } from './TokenChips'
import { AdvancedPanel } from './AdvancedPanel'
import { useEffect } from 'react'
import { MEDAL_EMOJI, type Rank } from '../lib/ranking'
import { useT } from '../i18n'

type Props = {
  spec: TokenizerSpec
  text: string
  rank: Rank | null
  onResult: (id: TokenizerSpec['id'], result: TokenizationResult | null) => void
}

export function TokenizerColumn({ spec, text, rank, onResult }: Props) {
  const { ready, loading, progress, error, tokenize } = useTokenizer(spec.hfId)
  const result = tokenize(text)
  const t = useT()

  useEffect(() => {
    onResult(spec.id, result)
    // we deliberately bypass onResult identity; only re-fire when the count changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spec.id, result?.count, ready])

  return (
    <article
      className="tok-col"
      style={{ borderTopColor: spec.accent }}
      data-rank={rank ?? undefined}
    >
      {rank && (
        <span className="tok-col-medal" title={t.rankLabels[rank]} aria-label={t.rankLabels[rank]}>
          {MEDAL_EMOJI[rank]}
        </span>
      )}
      <header className="tok-col-head">
        <div className="tok-col-title">
          <h2>
            <a href={spec.homepage} target="_blank" rel="noreferrer">
              {spec.label}
            </a>
          </h2>
          <span className="tok-col-vocab">{(spec.vocab / 1000).toFixed(0)}{t.vocabSuffix}</span>
        </div>
        <p className="tok-col-desc">{spec.description}</p>
      </header>

      {error && (
        <div className="tok-col-err">
          <strong>{t.loadError}</strong>
          <code>{error}</code>
        </div>
      )}

      {!error && loading && (
        <div className="tok-col-loading">
          <div className="loading-bar">
            <div className="loading-fill" style={{ width: `${Math.min(100, progress)}%`, background: spec.accent }} />
          </div>
          <span>{t.loadingDownloading}… {Math.round(progress)}%</span>
        </div>
      )}

      {!error && ready && result && (
        <>
          <div className="tok-col-stats">
            <div className="stat-headline">
              <span className="stat-num" style={{ color: spec.accent }}>{result.count}</span>
              <span className="stat-label">{t.tokensLabel}</span>
            </div>
            {text.length > 0 && (
              <div className="stat-detail">
                {(text.length / result.count).toFixed(2)} {t.charsPerTokenSuffix}
              </div>
            )}
          </div>
          <TokenChips result={result} accent={spec.accent} />
          <AdvancedPanel result={result} />
        </>
      )}

      {!error && ready && !text && (
        <p className="tok-col-empty">{t.emptyPrompt}</p>
      )}
    </article>
  )
}
