# ALIA tokenizer comparison

Browser-only side-by-side comparison of the **ALIA** tokenizer (256K vocab, custom multilingual) against **Llama 3** (128K) and **Mistral** (32K). Demonstrates that ALIA is ~1.6-2× more token-efficient than Anglo-centric tokenizers on Castilian, Catalan, Basque and Galician text.

Live at `labs.montevive.ai/alia-tokenizer-comparison/` once deployed.

## How it works

- **No backend.** Tokenization runs 100% in the visitor's browser via [`@huggingface/transformers`](https://github.com/huggingface/transformers.js) (transformers.js v4).
- **Tokenizers loaded directly from Hugging Face Hub** the first time the page opens; subsequent visits hit browser cache:
  - ALIA — `montevive/ALIA-40b-instruct-2601-NVFP4` (~37 MB tokenizer.json)
  - Llama 3 — `Xenova/llama-3-tokenizer` (~9 MB)
  - Mistral — `Xenova/mistral-tokenizer-v3` (~500 KB)
- **No data leaves the device.** Whatever the visitor types stays in their browser tab.

## Local development

```bash
cd web
npm install
npm run dev      # http://localhost:5173/
```

TypeScript check: `npx tsc -b` (no output = clean).

Production build: `BASE_PATH=/alia-tokenizer-comparison/ npm run build`. Output goes to `web/dist/`.

## Docker build (prod artifact)

```bash
docker build -t alia-tokenizer-comparison:latest -f deploy/Dockerfile .
docker run --rm -p 8080:8080 alia-tokenizer-comparison:latest
# open http://localhost:8080/alia-tokenizer-comparison/
```

The Dockerfile is multi-stage: Node-alpine for the Vite build, then `nginx-unprivileged:1.27-alpine` runtime. `nginx.conf` enables gzip + immutable cache headers for static assets.

## Layout

```
alia-tokenizer-comparison/
├── README.md                            # this file
├── .gitignore
├── web/
│   ├── package.json
│   ├── vite.config.ts                   # base: process.env.BASE_PATH ?? '/'
│   ├── index.html                       # OG meta, theme-color, favicon
│   ├── public/img/logo-montevive.png    # copied from openai-privacy-filter
│   └── src/
│       ├── main.tsx
│       ├── App.tsx                      # top-level layout
│       ├── App.css                      # brand CSS variables (mirrors privacy-filter)
│       ├── index.css
│       ├── tokenizers.ts                # 3-tokenizer config (HF IDs, vocab sizes, accents)
│       ├── examples.ts                  # pre-canned ES/CA/EU/GL/EN sentences
│       ├── useTokenizer.ts              # React hook around AutoTokenizer.from_pretrained
│       ├── lib/{colors,debounce}.ts
│       └── components/
│           ├── BrandHeader.tsx          # ALIA + BSC + Montevive marks
│           ├── InputArea.tsx
│           ├── LanguagePicker.tsx       # ES / CA / EU / GL / EN buttons
│           ├── TokenizerColumn.tsx      # one column per tokenizer
│           ├── TokenChips.tsx           # color-coded token visualization
│           ├── AdvancedPanel.tsx        # collapsible per-token list
│           ├── SummaryRow.tsx           # ratios + emoji
│           └── FooterCredits.tsx
└── deploy/
    ├── Dockerfile
    └── nginx.conf
```

## Notable implementation details

- **`PreTrainedTokenizer` is callable.** React's `setState` treats functions as reducers, so `setTokenizer(tok)` would call `tok(null)` → `"text may not be null"`. We use `setTokenizer(() => tok)` to bypass that.
- **Live tokenization is debounced 150 ms** (`lib/debounce.ts`) so per-keystroke typing doesn't choke the main thread on the 256K-vocab ALIA tokenizer.
- **Token chips show the visible substring** (via per-token `tokenizer.decode([id])`) rather than the raw piece, so the chips re-form the input verbatim with colored backgrounds. Hover tooltip exposes the raw piece + token ID.
- **`accent` is a CSS variable** (`var(--mv-primary)` / `var(--mv-teal)` / hex) so colors track the dark/light theme automatically.

## Why three tokenizers (and not more)

- ALIA — the star
- Llama 3 — the most-recognized "Western" reference, 128K vocab
- Mistral — closest European baseline, 32K vocab (proxy for the original Llama 2 family)

GPT-4 (cl100k), Qwen, Gemma etc. would be straightforward additions but would clutter the layout. The 3-column grid stays readable on tablet; mobile breakpoint stacks vertically.

## Related

- **Source model**: [BSC-LT/ALIA-40b-instruct-2601](https://huggingface.co/BSC-LT/ALIA-40b-instruct-2601) — Apache 2.0
- **Our NVFP4 quantization**:
  - GGUF: [montevive/ALIA-40b-instruct-2601-NVFP4-GGUF](https://huggingface.co/montevive/ALIA-40b-instruct-2601-NVFP4-GGUF)
  - Safetensors (vLLM): [montevive/ALIA-40b-instruct-2601-NVFP4](https://huggingface.co/montevive/ALIA-40b-instruct-2601-NVFP4)
- **Upstream PR fixing the NVFP4 conversion bug we found**: [ggml-org/llama.cpp#22611](https://github.com/ggml-org/llama.cpp/pull/22611)
- **Blog post (ES)**: [montevive.ai/es/2026/alia-nvidia-dgx-spark-cuantizacion-nvfp4](https://montevive.ai/es/2026/alia-nvidia-dgx-spark-cuantizacion-nvfp4)

## License

Apache 2.0 (matches the model). See parent project root for the full license header.
