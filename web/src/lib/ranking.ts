import type { TokenizerSpec } from '../tokenizers'

export type Counts = Record<TokenizerSpec['id'], number | null>
export type Rank = 1 | 2 | 3

// Standard "competition ranking" (1224): ties share a rank, the next gap is skipped.
// Returns null for any tokenizer that has no count yet (still loading).
export function computeRanks(counts: Counts): Record<TokenizerSpec['id'], Rank | null> {
  const entries = (Object.entries(counts) as [TokenizerSpec['id'], number | null][]).filter(
    (e): e is [TokenizerSpec['id'], number] => typeof e[1] === 'number' && e[1] > 0,
  )
  // If fewer than 2 results are in, ranking is meaningless yet.
  if (entries.length < 2) {
    return { alia: null, llama3: null, mistral: null }
  }
  // Sort ascending by count (fewer tokens wins).
  const sorted = [...entries].sort((a, b) => a[1] - b[1])
  const ranks: Record<TokenizerSpec['id'], Rank | null> = { alia: null, llama3: null, mistral: null }
  let position = 1
  let prevCount = sorted[0]![1]
  let sharedRank: Rank = 1
  sorted.forEach((entry, i) => {
    const [id, count] = entry
    if (i > 0 && count !== prevCount) {
      sharedRank = position as Rank
      prevCount = count
    } else if (i === 0) {
      sharedRank = 1
    }
    ranks[id] = sharedRank
    position++
  })
  return ranks
}

export const MEDAL_EMOJI: Record<Rank, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
}

export const RANK_LABEL: Record<Rank, string> = {
  1: 'Más eficiente',
  2: 'Segundo',
  3: 'Tercero',
}
