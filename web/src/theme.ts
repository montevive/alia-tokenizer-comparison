import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'theme'

function detectInitial(): Theme {
  if (typeof window === 'undefined') return 'auto'
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved
  } catch { /* ignore */ }
  return 'auto'
}

function applyTheme(theme: Theme) {
  const html = document.documentElement
  if (theme === 'auto') {
    html.removeAttribute('data-theme')
  } else {
    html.setAttribute('data-theme', theme)
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(detectInitial)

  useEffect(() => {
    applyTheme(theme)
    try { localStorage.setItem(STORAGE_KEY, theme) } catch { /* ignore */ }
  }, [theme])

  // Cycle: auto → light → dark → auto
  const cycle = () => {
    setThemeState((prev) => (prev === 'auto' ? 'light' : prev === 'light' ? 'dark' : 'auto'))
  }

  return { theme, setTheme: setThemeState, cycle }
}
