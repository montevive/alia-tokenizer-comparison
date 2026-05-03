import { useLang, type Lang } from '../i18n'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

export function LangToggle() {
  const { lang, setLang, t } = useLang()
  return (
    <div className="lang-toggle" role="group" aria-label={t.langAriaLabel}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`toolbar-button toolbar-button--segmented ${lang === l.code ? 'is-active' : ''}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
