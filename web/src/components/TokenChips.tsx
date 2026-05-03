import type { TokenizationResult } from '../useTokenizer'
import { tokenChipBg } from '../lib/colors'

type Props = {
  result: TokenizationResult
  accent: string
}

export function TokenChips({ result, accent }: Props) {
  return (
    <div className="token-chips">
      {result.visible.map((slice, i) => {
        const piece = result.pieces[i] ?? ''
        const id = result.ids[i] ?? -1
        // Render newlines as visible markers, preserve trailing/leading spaces
        const display = slice === '' ? '∅' : slice.replace(/\n/g, '↵\n')
        return (
          <span
            key={i}
            className="token-chip"
            style={{ background: tokenChipBg(i, accent) }}
            title={`Token #${i}  ·  ID ${id}  ·  pieza «${piece}»`}
          >
            {display}
          </span>
        )
      })}
    </div>
  )
}
