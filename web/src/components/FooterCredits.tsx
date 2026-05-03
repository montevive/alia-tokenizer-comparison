import { useT, useLang } from '../i18n'

export function FooterCredits() {
  const t = useT()
  const { lang } = useLang()
  const blogUrl = lang === 'en'
    ? 'https://montevive.ai/en/2026/alia-nvidia-dgx-spark-nvfp4-quantization'
    : 'https://montevive.ai/es/2026/alia-nvidia-dgx-spark-cuantizacion-nvfp4'
  return (
    <footer className="footer-credits">
      <div className="footer-col">
        <h3>{t.footerColTitleAlia}</h3>
        <ul>
          <li>
            <a href="https://alia.gob.es" target="_blank" rel="noreferrer">ALIA — {lang === 'en' ? 'Spanish Government' : 'Gobierno de España'}</a>
          </li>
          <li>
            <a href="https://www.bsc.es" target="_blank" rel="noreferrer">BSC — Barcelona Supercomputing Center</a>
          </li>
          <li>
            <a href="https://huggingface.co/BSC-LT/ALIA-40b-instruct-2601" target="_blank" rel="noreferrer">{lang === 'en' ? 'Original model on Hugging Face' : 'Modelo original en Hugging Face'}</a>
          </li>
          <li>{t.footerLicense}</li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>{t.footerColTitleNvfp4}</h3>
        <ul>
          <li>
            <a href="https://huggingface.co/montevive/ALIA-40b-instruct-2601-NVFP4-GGUF" target="_blank" rel="noreferrer">GGUF — llama.cpp / Ollama</a>
          </li>
          <li>
            <a href="https://huggingface.co/montevive/ALIA-40b-instruct-2601-NVFP4" target="_blank" rel="noreferrer">{lang === 'en' ? 'Safetensors for vLLM' : 'Safetensors para vLLM'}</a>
          </li>
          <li>
            <a href="https://github.com/ggml-org/llama.cpp/pull/22611" target="_blank" rel="noreferrer">{lang === 'en' ? 'Upstream PR to llama.cpp' : 'PR upstream a llama.cpp'}</a>
          </li>
          <li>
            <a href={blogUrl} target="_blank" rel="noreferrer">{lang === 'en' ? 'Blog post' : 'Artículo del blog'}</a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h3>{t.footerColTitleDemo}</h3>
        <ul>
          <li>{t.footerLocal}</li>
          <li>
            {t.footerBuiltWith}{' '}
            <a href="https://github.com/huggingface/transformers.js" target="_blank" rel="noreferrer">transformers.js</a>
          </li>
          <li>
            <a href="https://labs.montevive.ai" target="_blank" rel="noreferrer">{t.footerMoreDemos}</a>
          </li>
          <li>
            <a href="mailto:info@montevive.ai">info@montevive.ai</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
