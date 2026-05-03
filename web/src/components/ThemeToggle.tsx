import { useTheme } from '../theme'
import { useT } from '../i18n'

export function ThemeToggle() {
  const { theme, cycle } = useTheme()
  const t = useT()
  const icon = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🌓'
  const label = theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Auto'
  return (
    <button
      type="button"
      className="toolbar-button"
      onClick={cycle}
      aria-label={t.themeAriaLabel}
      title={`${t.themeAriaLabel} — ${label}`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="toolbar-button-label">{label}</span>
    </button>
  )
}
