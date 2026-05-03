import { useCallback, useEffect, useState } from 'react'
import { AutoTokenizer, type PreTrainedTokenizer } from '@huggingface/transformers'

export type TokenizationResult = {
  ids: number[]
  pieces: string[]
  // Per-token visible substring as it appears in the original text. Built by
  // walking the input and consuming the chars produced by tokenizer.decode([id]).
  // Whitespace and SentencePiece sub-word markers are normalized away so the
  // chips render cleanly in the visualization.
  visible: string[]
  count: number
}

export type TokenizerState = {
  tokenizer: PreTrainedTokenizer | null
  ready: boolean
  loading: boolean
  progress: number
  error: string | null
  tokenize: (text: string) => TokenizationResult | null
}

export function useTokenizer(hfId: string): TokenizerState {
  const [tokenizer, setTokenizer] = useState<PreTrainedTokenizer | null>(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    AutoTokenizer.from_pretrained(hfId, {
      progress_callback: (p: { progress?: number; status?: string }) => {
        if (typeof p.progress === 'number') setProgress(p.progress)
      },
    })
      .then((tok) => {
        if (!cancelled) {
          // PreTrainedTokenizer is callable (implements _call). React's setState
          // would treat it as a reducer and call tok(null) → "text may not be null".
          // Wrap in functional setter form to bypass that detection.
          setTokenizer(() => tok)
          setProgress(100)
          setLoading(false)
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e))
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [hfId])

  const tokenize = useCallback(
    (text: string): TokenizationResult | null => {
      if (!tokenizer || !text) return null
      const ids: number[] = tokenizer.encode(text, { add_special_tokens: false }) as number[]
      // pieces are the raw tokenizer pieces (e.g. "▁hola", "Ġhello") - useful for the advanced view
      const pieces = ids.map((id) => {
        try {
          // @ts-expect-error decoder is not in public types but exists on every PreTrainedTokenizer
          return tokenizer.model?.convert_ids_to_tokens?.([id])?.[0] ?? String(id)
        } catch {
          return String(id)
        }
      })
      // visible is what each token contributes to the original text (decoded individually)
      const visible = ids.map((id) => {
        try {
          return tokenizer.decode([id], { skip_special_tokens: false }) as string
        } catch {
          return ''
        }
      })
      return { ids, pieces, visible, count: ids.length }
    },
    [tokenizer],
  )

  return { tokenizer, ready: !!tokenizer, loading, progress, error, tokenize }
}
