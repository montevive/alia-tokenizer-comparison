import type { Locale } from '../examples'
import { LOCALE_LABELS } from '../examples'
import { useT } from '../i18n'

type Props = {
  active: Locale | null
  onPick: (locale: Locale) => void
}

const ORDER: Locale[] = ['es', 'ca', 'eu', 'gl', 'en']

export function LanguagePicker({ active, onPick }: Props) {
  const t = useT()
  return (
    <div className="lang-picker">
      <span className="lang-picker-label">{t.examplesLabel}</span>
      {ORDER.map((loc) => (
        <button
          key={loc}
          className={`lang-button ${active === loc ? 'is-active' : ''}`}
          onClick={() => onPick(loc)}
          type="button"
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  )
}
