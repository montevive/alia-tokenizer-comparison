import { useT } from '../i18n'
import { ThemeToggle } from './ThemeToggle'
import { LangToggle } from './LangToggle'

export function BrandHeader() {
  const t = useT()
  return (
    <header className="brand-header">
      <div className="brand-row">
        <a className="brand-mark" href="https://alia.gob.es" target="_blank" rel="noreferrer" aria-label="ALIA — Gobierno de España">
          <img src="img/alia-logo.svg" alt="ALIA" className="brand-mark-logo brand-mark-logo--alia" />
        </a>
        <span className="brand-x" aria-hidden="true">·</span>
        <a className="brand-mark" href="https://www.bsc.es" target="_blank" rel="noreferrer" aria-label="Barcelona Supercomputing Center">
          <img src="img/bsc-logo.svg" alt="BSC — Barcelona Supercomputing Center" className="brand-mark-logo brand-mark-logo--bsc" />
        </a>
        <span className="brand-x" aria-hidden="true">·</span>
        <a className="brand-mark" href="https://montevive.ai" target="_blank" rel="noreferrer" aria-label="Montevive">
          <img src="img/logo-montevive.png" alt="Montevive" className="brand-mark-logo brand-mark-logo--mv" />
        </a>
        <div className="brand-toolbar">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
      <p className="brand-tagline">{t.brandTagline}</p>
    </header>
  )
}
