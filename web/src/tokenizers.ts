export type TokenizerSpec = {
  id: 'alia' | 'llama3' | 'mistral'
  label: string
  hfId: string
  vocab: number
  accent: string
  description: string
  homepage: string
}

export const TOKENIZERS: readonly TokenizerSpec[] = [
  {
    id: 'alia',
    label: 'ALIA',
    hfId: 'montevive/ALIA-40b-instruct-2601-NVFP4',
    vocab: 256000,
    accent: 'var(--mv-primary)',
    description: 'LLM del Gobierno de España (BSC). Vocabulario SentencePiece entrenado en datos ibéricos.',
    homepage: 'https://huggingface.co/BSC-LT/ALIA-40b-instruct-2601',
  },
  {
    id: 'llama3',
    label: 'Llama 3',
    hfId: 'Xenova/llama-3-tokenizer',
    vocab: 128000,
    accent: 'var(--mv-teal)',
    description: 'Tokenizador BPE tipo tiktoken. Vocabulario predominantemente anglo-céntrico.',
    homepage: 'https://huggingface.co/meta-llama/Meta-Llama-3-8B',
  },
  {
    id: 'mistral',
    label: 'Mistral',
    hfId: 'Xenova/mistral-tokenizer-v3',
    vocab: 32000,
    accent: '#c25e2c',
    description: 'Tokenizador SentencePiece europeo. 32K vocabulario, similar al Llama 2 original.',
    homepage: 'https://huggingface.co/mistralai/Mistral-7B-v0.1',
  },
] as const
