import type { TokenizerSpec } from '../tokenizers'
import { MEDAL_EMOJI, type Rank } from '../lib/ranking'
import { useT } from '../i18n'

type Counts = Record<TokenizerSpec['id'], number | null>
type Ranks = Record<TokenizerSpec['id'], Rank | null>

type Props = {
  specs: readonly TokenizerSpec[]
  counts: Counts
  ranks: Ranks
}

export function SummaryRow({ specs, counts, ranks }: Props) {
  const t = useT()
  const aliaCount = counts.alia
  if (aliaCount == null || aliaCount === 0) return null

  // ratios: how many times more efficient is ALIA vs each other tokenizer
  const ratios = specs
    .filter((s) => s.id !== 'alia')
    .map((s) => {
      const c = counts[s.id]
      if (c == null || c === 0) return { spec: s, ratio: null as number | null }
      return { spec: s, ratio: c / aliaCount }
    })

  return (
    <section className="summary-row">
      <div className="summary-counts">
        {specs.map((s) => {
          const rank = ranks[s.id]
          return (
            <div key={s.id} className="summary-count" data-rank={rank ?? undefined}>
              {rank && <span className="summary-count-medal">{MEDAL_EMOJI[rank]}</span>}
              <span className="summary-count-num" style={{ color: s.accent }}>
                {counts[s.id] ?? '—'}
              </span>
              <span className="summary-count-label">{s.label}</span>
            </div>
          )
        })}
      </div>
      <div className="summary-ratios">
        {ratios.map(({ spec, ratio }) => {
          if (ratio == null) return null
          const aliaWins = ratio >= 1.0
          return (
            <p key={spec.id} className={`summary-ratio ${aliaWins ? 'alia-wins' : 'alia-loses'}`}>
              {aliaWins
                ? <>{t.ratioWins(spec.label, ratio.toFixed(2))}{ratio >= 1.5 && ' 🚀'}</>
                : t.ratioLoses(spec.label, (1 / ratio).toFixed(2))}
            </p>
          )
        })}
      </div>
    </section>
  )
}
