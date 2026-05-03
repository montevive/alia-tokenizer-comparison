import { useState } from 'react'
import type { TokenizationResult } from '../useTokenizer'
import { useT } from '../i18n'

type Props = {
  result: TokenizationResult
}

export function AdvancedPanel({ result }: Props) {
  const [open, setOpen] = useState(false)
  const t = useT()
  return (
    <div className="advanced-panel">
      <button
        className="advanced-toggle"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {open ? '▼' : '▶'} {t.detailToggle(result.count)}
      </button>
      {open && (
        <ol className="advanced-list">
          {result.ids.map((id, i) => (
            <li key={i}>
              <span className="adv-idx">{i}</span>
              <span className="adv-id">{id}</span>
              <span className="adv-piece">«{result.pieces[i] ?? ''}»</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
