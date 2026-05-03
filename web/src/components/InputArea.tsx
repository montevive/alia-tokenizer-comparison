import { useT } from '../i18n'

type Props = {
  value: string
  onChange: (v: string) => void
}

export function InputArea({ value, onChange }: Props) {
  const t = useT()
  return (
    <div className="input-area">
      <textarea
        className="input-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder={t.inputPlaceholder}
        spellCheck={false}
      />
      <div className="input-meta">
        <span>{t.charCount(value.length)}</span>
        <span className="input-hint">{t.liveHint}</span>
      </div>
    </div>
  )
}
